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

const server = http.createServer((req, res) => {
  const urlPath = decodeURIComponent(req.url.split("?")[0]);
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
