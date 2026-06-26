// 为非首屏 <img> 注入 loading="lazy" decoding="async"
// 跳过首屏头像 (src={profile.avatar}) 与 lightbox 弹窗图 (src={images[idx]})，保持 eager
import { readFile, writeFile } from "node:fs/promises";

const FILES = [
  "/root/jianli/src/components/Work.tsx",
  "/root/jianli/src/components/Awards.tsx",
  "/root/jianli/src/components/BaoerFeedback.tsx",
  "/root/jianli/src/components/Timeline.tsx",
  "/root/jianli/src/components/Contact.tsx",
  "/root/jianli/src/components/AbilityMap.tsx",
  "/root/jianli/src/components/About.tsx",
];

const SKIP_SRC = ["profile.avatar", "images[idx]"];

let total = 0;
for (const f of FILES) {
  let src = await readFile(f, "utf8");
  let changed = 0;
  src = src.replace(/<img(\s+)(src=\{([^}]+)\})/g, (m, ws, srcExpr, inner) => {
    if (SKIP_SRC.includes(inner)) return m; // 受保护，保持原样
    changed++;
    return `<img loading="lazy" decoding="async"${ws}${srcExpr}`;
  });
  if (changed > 0) {
    await writeFile(f, src);
    console.log(`${f.split("/").pop()}: +${changed} lazy`);
    total += changed;
  }
}
console.log(`Total imgs made lazy: ${total}`);
