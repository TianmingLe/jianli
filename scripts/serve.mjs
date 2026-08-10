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

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);

  // 访问记录查看接口
  if (urlPath === "/api/visitors") {
    handleVisitorsApi(res);
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
});
