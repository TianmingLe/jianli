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
// 黑名单持久化文件（与日志同目录，部署时不会被清空）
const BLACKLIST_FILE = path.resolve(__dirname, "../../blacklist.json");
// 是否信任反向代理的 X-Forwarded-For 头（仅在服务器前面有 Nginx 等代理时设为 "1"）
const TRUST_PROXY = process.env.TRUST_PROXY === "1";
// 日志文件大小上限，超过则轮转
const LOG_MAX_SIZE = 5 * 1024 * 1024; // 5MB
// 管理接口鉴权 token（不设置则不允许通过接口修改黑名单，只能自动拉黑）
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "";
// 永久白名单 IP（逗号分隔，环境变量 WHITELIST_IPS，默认包含本地回环）
const WHITELIST_IPS = new Set([
  "127.0.0.1",
  "::1",
  "localhost",
  ...(process.env.WHITELIST_IPS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
]);

// ====== 恶意行为检测规则 ======
// 规则A: 已知扫描器/机器人 User-Agent 关键词（正则，命中即拉黑）
const BAD_UA_PATTERNS = [
  /zgrab/i, // 互联网大规模扫描器
  /nmap/i, // Nmap 扫描器
  /masscan/i, // 大规模端口扫描器
  /nikto/i, // Web 漏洞扫描器
  /l9explore/i, // L9 漏洞扫描器
  /l9tcpid/i, // L9 指纹识别
  /odin-scanner/i, // Odin 扫描器
  /python-requests/i, // Python 脚本（几乎都是自动化）
  /^curl\//i, // curl 命令行（自动化探测）
  /^wget\//i, // wget 命令行
  /research-scan/i, // 学术研究扫描
  /GenomeCrawlerd/i, // 登录页爬虫
  /getdomaindata/i, // 域名数据爬虫
  /censys/i, // Censys 扫描器
  /shodan/i, // Shodan 扫描器
  /netcraftsurvey/i, // Netcraft 调查
  /^Mozilla\/5\.0$/, // 过短 UA，明显伪造
  /^$/, // 空 UA
];

// 规则B: 敏感路径扫描（正则，命中即拉黑）。本站为简历站点，不存在这些后台/敏感路径
const BAD_PATH_PATTERNS = [
  /^\/\.env/i, // .env 文件泄露扫描
  /^\/\.git\//i, // Git 仓库泄露
  /^\/\.aws\//i, // AWS 凭证扫描
  /^\/\.ssh\//i, // SSH 密钥扫描
  /^\/\.svn\//i, // SVN 泄露
  /^\/\.hg\//i, // Mercurial 泄露
  /^\/wp-admin/i, // WordPress 后台
  /^\/wp-login/i, // WordPress 登录
  /^\/phpmyadmin/i, // phpMyAdmin
  /^\/adminer/i, // Adminer
  /^\/actuator\//i, // Spring Boot 端点泄露
  /^\/graphql/i, // GraphQL 端点探测
  /^\/api\/config$/i, // 配置接口扫描
  /^\/admin\/?$/i, // 后台路径
  /^\/login(\.html)?$/i, // 登录页
  /^\/manage\//i, // 管理路径
  /^\/remote\//i, // 远程路径
  /^\/web\/?$/i, // Web 路径
  /^\/webpages\//i, // Web 页面路径
  /^\/doc\/?$/i, // 文档路径
  /^\/sdk\/?$/i, // SDK 路径
  /^\/\+CSCOE/i, // Cisco VPN 登录页扫描
  /\/Nmap/i, // Nmap 探测路径
  /nmaplowercheck/i,
  /NmapUpperCheck/i,
  /^\/manager\/?$/i, // Tomcat manager
  /^\/solr\//i, // Solr 扫描
  /^\/struts/i, // Struts 漏洞扫描
  /^\/cgi-bin\//i, // CGI 扫描
  /shell\.php/i, // Webshell 扫描
  /\.(php|asp|aspx|jsp|cgi)(\?|$)/i, // 动态脚本扫描（本站纯静态）
];

// 规则C: 频率限制（基于内存滑动窗口）
const RATE_WINDOW_MS = 60 * 1000; // 60 秒窗口
const RATE_MAX_REQUESTS = 20; // 60 秒内最多 20 次请求
const RATE_MAX_PATHS = 10; // 60 秒内最多访问 10 个不同路径（扫描行为）
// 记录每个 IP 的请求时间戳和访问过的路径（用于频率检测）
const rateMap = new Map(); // ip -> { times: number[], paths: Set<string> }
// 定期清理过期的频率记录（避免内存无限增长）
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, rec] of rateMap) {
      rec.times = rec.times.filter((t) => now - t < RATE_WINDOW_MS);
      if (rec.times.length === 0) rateMap.delete(ip);
    }
  },
  5 * 60 * 1000,
).unref?.();

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

// ====== 黑名单管理 ======
// 内存黑名单：ip -> { reason, time }
const blacklist = new Map();
let blacklistDirty = false;

/**
 * 从持久化文件加载黑名单（服务启动时调用一次）
 */
function loadBlacklist() {
  try {
    const data = fs.readFileSync(BLACKLIST_FILE, "utf-8");
    const arr = JSON.parse(data);
    if (Array.isArray(arr)) {
      for (const item of arr) {
        if (item && item.ip) {
          blacklist.set(item.ip, {
            reason: item.reason || "unknown",
            time: item.time || new Date().toISOString(),
          });
        }
      }
      console.log(`[jianli] 已加载 ${blacklist.size} 个拉黑 IP`);
    }
  } catch {
    // 文件不存在或解析失败，忽略
  }
}

/**
 * 异步保存黑名单到文件（节流：标记 dirty 后定时批量写入）
 */
function saveBlacklist() {
  const arr = Array.from(blacklist.entries()).map(([ip, v]) => ({
    ip,
    reason: v.reason,
    time: v.time,
  }));
  fs.writeFile(BLACKLIST_FILE, JSON.stringify(arr, null, 2), (err) => {
    if (err) console.error("[jianli] 保存黑名单失败:", err.message);
  });
}

// 每 10 秒检查一次 dirty 标记，若有变更则落盘（避免高频写入）
setInterval(
  () => {
    if (blacklistDirty) {
      blacklistDirty = false;
      saveBlacklist();
    }
  },
  10 * 1000,
).unref?.();

/**
 * 将 IP 加入黑名单
 * @param {string} ip 访客 IP
 * @param {string} reason 拉黑原因
 */
function blockIP(ip, reason) {
  if (!ip || ip === "unknown" || WHITELIST_IPS.has(ip)) return false;
  if (blacklist.has(ip)) return false; // 已在黑名单
  blacklist.set(ip, {
    reason,
    time: new Date().toISOString(),
  });
  blacklistDirty = true;
  console.log(`[jianli] 已拉黑 IP: ${ip} (原因: ${reason})`);
  return true;
}

/**
 * 检查 IP 是否已被拉黑
 */
function isBlocked(ip) {
  return blacklist.has(ip);
}

/**
 * 检测 User-Agent 是否为已知扫描器/机器人
 */
function isMaliciousUA(ua) {
  if (!ua) return true; // 空 UA 视为可疑
  for (const pattern of BAD_UA_PATTERNS) {
    if (pattern.test(ua)) return true;
  }
  return false;
}

/**
 * 检测访问路径是否为敏感路径扫描
 */
function isMaliciousPath(p) {
  if (!p) return false;
  for (const pattern of BAD_PATH_PATTERNS) {
    if (pattern.test(p)) return true;
  }
  return false;
}

/**
 * 频率检测：返回是否超限及原因
 * @returns {{ blocked: boolean, reason: string }}
 */
function checkRate(ip, reqPath) {
  if (WHITELIST_IPS.has(ip)) return { blocked: false, reason: "" };
  const now = Date.now();
  let rec = rateMap.get(ip);
  if (!rec) {
    rec = { times: [], paths: new Set() };
    rateMap.set(ip, rec);
  }
  // 清理窗口外的时间戳
  rec.times = rec.times.filter((t) => now - t < RATE_WINDOW_MS);
  rec.times.push(now);
  if (reqPath) rec.paths.add(reqPath);
  // 清理过期路径集合（按 times 最后时间判断，简化处理）
  if (rec.times.length > RATE_MAX_REQUESTS) {
    return { blocked: true, reason: `频率超限: 60秒内 ${rec.times.length} 次请求` };
  }
  if (rec.paths.size > RATE_MAX_PATHS) {
    return { blocked: true, reason: `扫描行为: 60秒内访问 ${rec.paths.size} 个不同路径` };
  }
  return { blocked: false, reason: "" };
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
 * 解析 URL 查询参数为对象（简易实现，避免引入 query 模块）
 */
function parseQuery(search) {
  const params = {};
  if (!search) return params;
  const qs = search.startsWith("?") ? search.slice(1) : search;
  for (const pair of qs.split("&")) {
    if (!pair) continue;
    const eq = pair.indexOf("=");
    const k = eq === -1 ? pair : pair.slice(0, eq);
    const v = eq === -1 ? "" : pair.slice(eq + 1);
    try {
      params[decodeURIComponent(k)] = decodeURIComponent(v);
    } catch {
      params[k] = v;
    }
  }
  return params;
}

/**
 * 处理 /api/blacklist 请求
 * GET  /api/blacklist              - 查看当前黑名单（公开，与 /api/visitors 一致）
 * POST /api/blacklist?action=add&ip=x&token=xxx    - 添加 IP 到黑名单
 * POST /api/blacklist?action=remove&ip=x&token=xxx - 从黑名单移除 IP
 * POST /api/blacklist?action=clear&token=xxx       - 清空黑名单（慎用）
 * 写操作需要 ADMIN_TOKEN 鉴权
 */
function handleBlacklistApi(req, res) {
  const search = req.url.split("?")[1] || "";
  const query = parseQuery(search);

  if (req.method === "GET") {
    const list = Array.from(blacklist.entries()).map(([ip, v]) => ({
      ip,
      reason: v.reason,
      time: v.time,
    }));
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(
      JSON.stringify(
        { blacklist: list, total: list.length },
        null,
        2,
      ),
    );
    return;
  }

  if (req.method !== "POST") {
    res.writeHead(405);
    res.end("Method not allowed");
    return;
  }

  // 写操作需要 token 鉴权
  if (!ADMIN_TOKEN) {
    res.writeHead(403);
    res.end(
      JSON.stringify({
        error: "管理接口未启用（服务器未配置 ADMIN_TOKEN）",
      }),
    );
    return;
  }
  if (query.token !== ADMIN_TOKEN) {
    res.writeHead(401);
    res.end(JSON.stringify({ error: "token 无效" }));
    return;
  }

  const action = query.action;
  const ip = (query.ip || "").trim();

  if (action === "add") {
    if (!ip) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "缺少 ip 参数" }));
      return;
    }
    if (WHITELIST_IPS.has(ip)) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: `${ip} 在白名单中，不可拉黑` }));
      return;
    }
    const added = blockIP(ip, query.reason || "手动添加");
    saveBlacklist();
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true, added, ip, reason: query.reason || "手动添加" }));
    return;
  }

  if (action === "remove") {
    if (!ip) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: "缺少 ip 参数" }));
      return;
    }
    const removed = blacklist.delete(ip);
    if (removed) {
      blacklistDirty = true;
      saveBlacklist();
    }
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true, removed, ip }));
    return;
  }

  if (action === "clear") {
    const count = blacklist.size;
    blacklist.clear();
    blacklistDirty = true;
    saveBlacklist();
    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ok: true, cleared: count }));
    return;
  }

  res.writeHead(400);
  res.end(JSON.stringify({ error: "未知 action，支持: add / remove / clear" }));
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

  // 提取访客 IP（所有请求都需要，包括黑名单检查）
  const clientIP = getClientIP(req);

  // ====== 拦截阶段 1: 黑名单检查（命中直接 403，不再记录日志）======
  if (isBlocked(clientIP) && !WHITELIST_IPS.has(clientIP)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("403 Forbidden");
    return;
  }

  // 黑名单管理接口（在恶意路径检测之前，避免访问 /api/blacklist 被误判）
  if (urlPath === "/api/blacklist") {
    handleBlacklistApi(req, res);
    return;
  }

  // 访问记录查看接口
  if (urlPath === "/api/visitors") {
    handleVisitorsApi(res);
    return;
  }

  // ====== 拦截阶段 2: 恶意 User-Agent 检测（命中即拉黑 + 403）======
  const ua = req.headers["user-agent"] || "";
  if (!WHITELIST_IPS.has(clientIP) && isMaliciousUA(ua)) {
    blockIP(clientIP, `恶意UA: ${ua.slice(0, 80) || "(空)"}`);
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("403 Forbidden");
    return;
  }

  // ====== 拦截阶段 3: 敏感路径扫描检测（命中即拉黑 + 403）======
  if (!WHITELIST_IPS.has(clientIP) && isMaliciousPath(urlPath)) {
    blockIP(clientIP, `敏感路径扫描: ${urlPath}`);
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("403 Forbidden");
    return;
  }

  // 记录页面访问（跳过静态资源，只记录路由页面访问）
  const ext = path.extname(urlPath);
  if (!ext || ext === ".html") {
    logAccess(req);
  }

  // ====== 拦截阶段 4: 频率检测（仅对页面访问计数，超限即拉黑 + 403）======
  if (!ext || ext === ".html") {
    const rate = checkRate(clientIP, urlPath);
    if (rate.blocked) {
      blockIP(clientIP, rate.reason);
      res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("403 Forbidden");
      return;
    }
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

// 启动时加载持久化黑名单
loadBlacklist();

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[jianli] 静态服务已启动 → http://0.0.0.0:${PORT}`);
  console.log(`[jianli] 托管目录: ${DIST}`);
  console.log(`[jianli] 拉黑 IP 数: ${blacklist.size}`);
  console.log(
    `[jianli] 管理接口: ${ADMIN_TOKEN ? "已启用（ADMIN_TOKEN 已配置）" : "未启用（仅自动拉黑）"}`,
  );
});
