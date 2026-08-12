/**
 * 生产环境静态文件服务器（零依赖，仅用 Node.js 内置模块）
 * 用于在 ECS 上托管 dist/ 构建产物，支持 SPA 客户端路由回退。
 *
 * 用法: node scripts/serve.mjs [port]   默认端口 80
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.argv[2]) || 80;
const DIST = path.resolve(__dirname, "../dist");
// 日志文件放在部署目录之外，避免部署时 rm -rf 清空
const LOG_FILE = path.resolve(__dirname, "../../access.log");
// 是否信任反向代理的 X-Forwarded-For 头（仅在服务器前面有 Nginx 等代理时设为 "1"）
const TRUST_PROXY = process.env.TRUST_PROXY === "1";
// 日志文件大小上限，超过则轮转
const LOG_MAX_SIZE = 5 * 1024 * 1024; // 5MB

// === 访问防御配置 ===
// 黑名单文件（部署目录之外，部署时不被清空，跨重启保留）
const BLOCKLIST_FILE = path.resolve(__dirname, "../../blocklist.txt");
// 管理 API 令牌（未设置时 /api/block、/api/unblock 不可用，仅允许读取 /api/blocked）
const BLOCK_TOKEN = process.env.BLOCK_TOKEN || "";
// 速率限制：单 IP 在窗口内超过该请求数则拉黑
const RATE_WINDOW = 60 * 1000; // 1 分钟
const RATE_MAX = 120; // 普通浏览（含静态资源）不会超过此值
// 黑名单自动重载间隔（支持手动编辑文件后自动生效）
const BLOCKLIST_RELOAD_MS = 60 * 1000;

// 已确认的恶意扫描 IP（首次启动且黑名单文件不存在时写入作为种子）
const KNOWN_BAD_IPS = [
  "62.210.142.174", // GenomeCrawlerd 扫描 /admin /login /remote/login /manage/account/login /+CSCOE+ 等
  "121.41.164.45",  // Nmap 扫描 /sdk /Nmap/*
  "45.148.10.95",   // 扫描 /.git/config
  "179.43.150.26",  // 扫描 /.env /.e2093 /s/6521 /z4851
  "5.61.209.92",    // 扫描 /SDK/webLanguage
  "20.65.193.233",  // zgrab 扫描 /developmentserver/metadatauploader
  "45.33.14.197",   // zgrab
  "159.65.168.103", // zgrab
  "94.154.43.233",  // Shodan
  "34.251.107.140", // NetcraftSurvey
];

// 已知扫描器 User-Agent（小写子串匹配，命中即拉黑）
const SCANNER_UA = [
  "zgrab", "nmap", "shodan", "masscan", "nikto", "dirbuster", "sqlmap",
  "acunetix", "nessus", "openvas", "wpscan", "fimap", "genomecrawler",
  "netcraftsurvey", "hydra", "arachni", "skipfish", "whatweb", "joomscan",
  "gobuster", "ffuf", "dirb", "wfuzz",
];

// 已知扫描路径（正则，命中即拉黑）
const SCANNER_PATH = [
  /^\/\.(git|env|aws|ssh|svn|hg|DS_Store)/i,
  /^\/(admin|phpmyadmin|wp-admin|wp-login|manager|manage|sdk|remote|webpages|developmentserver|nmap)/i,
  /^\/\+CSCOE\+/i,
  /^\/login\.html$/i,
  /^\/doc\/index/i,
  /^\/(backup|config)\.(php|json|bak|sql|txt)/i,
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".json": "application/json; charset=utf-8",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".map": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json",
  ".wasm": "application/wasm",
};

/**
 * 提取客户端真实 IP
 * 仅在 TRUST_PROXY=1 时信任 X-Forwarded-For（用于 Nginx 等反向代理场景），
 * 否则直接使用 socket 地址，防止客户端伪造该头
 */
function getClientIP(req) {
  if (TRUST_PROXY) {
    const xff = req.headers["x-forwarded-for"];
    if (xff) {
      return xff.split(",")[0].trim();
    }
  }
  let ip = req.socket.remoteAddress || "unknown";
  return ip.replace(/^::ffff:/, "");
}

// === IP 黑名单管理（持久化到 /root/blocklist.txt，跨重启保留）===
let blockedSet = new Set();
let blocklistMtime = 0;

function loadBlocklist() {
  try {
    const stat = fs.statSync(BLOCKLIST_FILE);
    if (stat.mtimeMs === blocklistMtime) return; // 文件未变化，跳过
    blocklistMtime = stat.mtimeMs;
    const data = fs.readFileSync(BLOCKLIST_FILE, "utf8");
    blockedSet = new Set(
      data.split("\n").map((s) => s.trim()).filter(Boolean)
    );
    console.log(`[jianli] 已加载黑名单: ${blockedSet.size} 个 IP`);
  } catch {
    // 文件不存在等异常，保持当前集合
  }
}

function saveBlocklist() {
  try {
    fs.writeFileSync(
      BLOCKLIST_FILE,
      Array.from(blockedSet).sort().join("\n") + "\n"
    );
    blocklistMtime = fs.statSync(BLOCKLIST_FILE).mtimeMs;
  } catch (e) {
    console.error("[jianli] 写入黑名单失败:", e.message);
  }
}

function ensureSeedBlocklist() {
  try {
    fs.accessSync(BLOCKLIST_FILE);
    // 文件已存在，加载即可（保留历史动态拉黑的 IP）
    loadBlocklist();
  } catch {
    // 首次启动：写入已知恶意 IP 作为种子
    blockedSet = new Set(KNOWN_BAD_IPS);
    saveBlocklist();
    console.log(`[jianli] 初始化黑名单种子: ${KNOWN_BAD_IPS.length} 个 IP`);
  }
}

function blockIP(ip, reason) {
  if (!ip || ip === "unknown") return;
  if (blockedSet.has(ip)) return;
  blockedSet.add(ip);
  saveBlocklist();
  console.log(`[jianli] 拉黑 IP: ${ip} (${reason})`);
}

// === 速率限制（内存滑动窗口，触发即持久化拉黑）===
const rateMap = new Map(); // ip -> { count, windowStart }

function rateLimitCheck(ip) {
  const now = Date.now();
  let entry = rateMap.get(ip);
  if (!entry || now - entry.windowStart > RATE_WINDOW) {
    entry = { count: 0, windowStart: now };
    rateMap.set(ip, entry);
  }
  entry.count++;
  if (entry.count > RATE_MAX) {
    blockIP(ip, `速率限制 ${entry.count}次/${RATE_WINDOW / 1000}秒`);
    return true;
  }
  return false;
}

// === 恶意请求检测 ===
function isScannerUA(ua) {
  const lower = (ua || "").toLowerCase();
  return SCANNER_UA.some((p) => lower.includes(p));
}

function isScannerPath(p) {
  return SCANNER_PATH.some((re) => re.test(p));
}

let writeCount = 0;

/**
 * 将一条访问记录追加写入日志文件（JSON Lines 格式）
 * 每写入 100 条检查一次文件大小，超过上限则轮转（旧文件重命名为 .old）
 */
function logAccess(req) {
  const entry =
    JSON.stringify({
      ip: getClientIP(req),
      time: new Date().toISOString(),
      path: req.url.split("?")[0],
      ua: req.headers["user-agent"] || "",
    }) + "\n";
  try {
    fs.appendFileSync(LOG_FILE, entry);
    // 每 100 次写入检查一次文件大小，避免每次都 stat 带来性能开销
    if (++writeCount % 100 === 0) {
      try {
        const stat = fs.statSync(LOG_FILE);
        if (stat.size > LOG_MAX_SIZE) {
          fs.renameSync(LOG_FILE, LOG_FILE + ".old");
        }
      } catch {
        // 文件不存在等异常，忽略
      }
    }
  } catch (e) {
    console.error("[jianli] 写入访问日志失败:", e.message);
  }
}

/**
 * 处理 /api/visitors 请求，返回最近 100 条访问记录及统计信息
 */
function handleVisitorsApi(res) {
  // 读取当前日志文件
  fs.readFile(LOG_FILE, (err, data) => {
    const lines = err
      ? []
      : data.toString().trim().split("\n").filter(Boolean);

    // 最近 100 条记录（从当前日志文件中取）
    const recent = lines.slice(-100)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .reverse();

    // 统计独立 IP 和总访问数：合并当前日志和轮转旧日志
    const ipSet = new Set();
    let totalCount = lines.length;
    for (const line of lines) {
      try {
        ipSet.add(JSON.parse(line).ip);
      } catch {}
    }
    // 尝试读取轮转旧文件中的 IP 和条目数
    try {
      const oldData = fs.readFileSync(LOG_FILE + ".old");
      const oldLines = oldData.toString().trim().split("\n").filter(Boolean);
      totalCount += oldLines.length;
      for (const line of oldLines) {
        try {
          ipSet.add(JSON.parse(line).ip);
        } catch {}
      }
    } catch {}

    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
    });
    res.end(
      JSON.stringify({
        visitors: recent,
        total: totalCount,
        uniqueIPs: ipSet.size,
      })
    );
  });
}

/**
 * 处理 /api/blocked 请求，返回当前黑名单 IP 列表（只读，无需令牌）
 */
function handleBlockedApi(res) {
  res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
  res.end(
    JSON.stringify({
      blocked: Array.from(blockedSet).sort(),
      count: blockedSet.size,
    })
  );
}

/**
 * 处理 /api/block、/api/unblock 请求（需 BLOCK_TOKEN 令牌）
 * 用法: /api/block?token=XXX&ip=1.2.3.4  /api/unblock?token=XXX&ip=1.2.3.4
 */
function handleBlockMutateApi(urlPath, req, res) {
  if (!BLOCK_TOKEN) {
    res.writeHead(404);
    res.end("Not found");
    return;
  }
  let params;
  try {
    params = new URL(req.url, "http://localhost").searchParams;
  } catch {
    res.writeHead(400);
    res.end("Bad request");
    return;
  }
  if (params.get("token") !== BLOCK_TOKEN) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  const ip = (params.get("ip") || "").trim();
  if (!ip) {
    res.writeHead(400);
    res.end("Missing ip");
    return;
  }
  if (urlPath === "/api/block") {
    blockIP(ip, "手动拉黑");
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true, blocked: ip, count: blockedSet.size }));
  } else {
    if (blockedSet.delete(ip)) saveBlocklist();
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true, unblocked: ip, count: blockedSet.size }));
  }
}

const server = http.createServer((req, res) => {
  let urlPath;
  try {
    urlPath = decodeURIComponent(req.url.split("?")[0]);
  } catch {
    // 非法百分号编码（如 %ZZ），拒绝请求而不是崩溃
    res.writeHead(400);
    res.end("Bad request");
    return;
  }

  const clientIP = getClientIP(req);

  // 1) 静态黑名单拦截（已确认的恶意 IP，直接 403）
  if (blockedSet.has(clientIP)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // 2) 扫描器检测：User-Agent 或访问路径命中即拉黑并 403
  if (isScannerUA(req.headers["user-agent"]) || isScannerPath(urlPath)) {
    blockIP(clientIP, `扫描器 ${req.headers["user-agent"] || "?"} ${urlPath}`);
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // 3) 速率限制：单 IP 短时间请求过多则拉黑
  if (rateLimitCheck(clientIP)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  // 访问记录查看接口
  if (urlPath === "/api/visitors") {
    handleVisitorsApi(res);
    return;
  }

  // 黑名单查看接口（只读）
  if (urlPath === "/api/blocked") {
    handleBlockedApi(res);
    return;
  }

  // 黑名单管理接口（需令牌）
  if (urlPath === "/api/block" || urlPath === "/api/unblock") {
    handleBlockMutateApi(urlPath, req, res);
    return;
  }

  // 记录页面访问（跳过静态资源，只记录路由页面访问）
  const ext = path.extname(urlPath);
  if (!ext || ext === ".html") {
    logAccess(req);
  }

  // 防路径穿越
  let filePath = path.join(DIST, urlPath);
  if (!filePath.startsWith(DIST + path.sep)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      sendFile(filePath);
    } else if (!err && stat.isDirectory()) {
      // 目录 → 尝试 index.html
      const idx = path.join(filePath, "index.html");
      fs.stat(idx, (e, s) => (e || !s.isFile() ? spaFallback(urlPath) : sendFile(idx)));
    } else {
      spaFallback(urlPath);
    }
  });

  function spaFallback(originalPath) {
    const ext = path.extname(originalPath);
    // 带扩展名的缺失资源直接 404，不回退 index.html
    if (ext && ext !== ".html") {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    sendFile(path.join(DIST, "index.html"), true);
  }

  function sendFile(fp, isSpa = false) {
    const ext = path.extname(fp);
    const ct = MIME[ext] || "application/octet-stream";
    fs.readFile(fp, (e, data) => {
      if (e) {
        res.writeHead(500);
        res.end("Internal error");
        return;
      }
      res.writeHead(200, {
        "Content-Type": ct,
        "Cache-Control": isSpa
          ? "no-cache"
          : ext === ".html"
            ? "no-cache"
            : "public, max-age=31536000, immutable",
      });
      res.end(data);
    });
  }
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[jianli] 静态服务已启动 → http://0.0.0.0:${PORT}`);
  console.log(`[jianli] 托管目录: ${DIST}`);
  ensureSeedBlocklist();
  // 定期重载黑名单（手动编辑 blocklist.txt 后可自动生效）并清理过期速率记录
  setInterval(() => {
    loadBlocklist();
    const now = Date.now();
    for (const [ip, entry] of rateMap) {
      if (now - entry.windowStart > RATE_WINDOW) rateMap.delete(ip);
    }
  }, BLOCKLIST_RELOAD_MS);
});
