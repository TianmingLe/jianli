// 图片优化脚本：批量转 WebP + 压缩（可重跑，已是 webp 的会跳过）
// 用法: npm run optimize-images
// 规则:
//   - 首屏头像 (位于 "Profile Picture" 目录): 仅转 WebP, 保持原尺寸, quality 85
//   - 其余 png/jpg/jpeg: width>1920 时缩放至 1920 (不放大), quality 80
//   - 已是 .webp 的文件跳过 (避免二次有损压缩)
//   - 输出 .webp 同目录, 生成映射供引用更新使用
//   - 注意: 转换后需手动将代码中 .png/.jpg/.jpeg 引用改为 .webp, 并删除原图
import sharp from "sharp";
import { readdir, stat } from "node:fs/promises";
import { join, extname, basename, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
// 路径基于脚本自身位置解析, 任意 cwd 下运行均可
const ROOTS = [resolve(__dirname, "../src/data"), resolve(__dirname, "../public")];
const AVATAR_HINT = "Profile Picture";
const MAX_WIDTH = 1920;
const IMG_EXT = [".png", ".jpg", ".jpeg"];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) files.push(...(await walk(p)));
    else if (e.isFile()) files.push(p);
  }
  return files;
}

const mapping = {};
let totalBefore = 0;
let totalAfter = 0;
let skipped = 0;

for (const root of ROOTS) {
  const files = await walk(root);
  for (const f of files) {
    const ext = extname(f).toLowerCase();
    if (ext === ".webp") {
      skipped++;
      continue;
    }
    if (!IMG_EXT.includes(ext)) continue;

    const isAvatar = f.includes(AVATAR_HINT);
    const out = f.replace(new RegExp(ext + "$", "i"), ".webp");

    const before = (await stat(f)).size;
    const md = await sharp(f, { failOn: "none" }).metadata();

    let pipeline = sharp(f, { failOn: "none" });
    if (!isAvatar && md.width && md.width > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
    const quality = isAvatar ? 85 : 80;
    await pipeline.webp({ quality }).toFile(out);

    const after = (await stat(out)).size;
    mapping[f] = out;
    totalBefore += before;
    totalAfter += after;
    const tag = isAvatar ? "[AVATAR]" : "        ";
    const resize = md.width > MAX_WIDTH && !isAvatar ? ` (resized ${md.width}->${MAX_WIDTH})` : "";
    console.log(
      `${tag} ${String(Math.round(before / 1024)).padStart(5)}K -> ${String(
        Math.round(after / 1024),
      ).padStart(5)}K${resize}  ${basename(f)}`,
    );
  }
}

const reduction = totalBefore > 0 ? (100 * (1 - totalAfter / totalBefore)).toFixed(1) : 0;
console.log(`\nTOTAL: ${(totalBefore / 1048576).toFixed(1)}MB -> ${(totalAfter / 1048576).toFixed(1)}MB  (-${reduction}%)`);
console.log(`Converted: ${Object.keys(mapping).length}  |  Skipped existing webp: ${skipped}`);
