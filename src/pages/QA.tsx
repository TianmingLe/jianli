import { useEffect, useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import QandA from "@/components/QandA";

const navItems = [
  { id: "qa-q1", label: "核心优势", cn: "核心竞争力" },
  { id: "qa-q2", label: "AI 工具价值", cn: "AI 工具价值" },
  { id: "qa-q3", label: "跨界能力", cn: "跨界能力" },
];

/**
 * 将一个值限制在 [min, max] 区间内。
 */
function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function QA() {
  // 滚动进度：0 = 顶部，1 = 页面底部
  const [progress, setProgress] = useState(0);
  // rAF 引用，避免在快速滚动时重复排队
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const update = () => {
      rafRef.current = null;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      // 当页面高度不足一屏时，max 为 0，避免除零异常
      const ratio = max > 0 ? window.scrollY / max : 0;
      setProgress(clamp(ratio, 0, 1));
    };

    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // 模糊：顶部 4px（≈ 20% 体感），底部 28px（几乎不可辨认）
  const blurPx = 4 + progress * 24;
  // 暗化：顶部 0.55，底部 0.9，让背景图在底部进一步沉入黑色
  const dimOpacity = 0.55 + progress * 0.35;
  // 位移：略快于滚动同步感，但不超过一屏高度，避免出现“被裁掉”的错位
  const translateY = progress * Math.min(window.innerHeight * 0.6, 600);
  // 黑色遮罩：顶部 0，底部接近 0.95
  const maskOpacity = progress * 0.95;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-ink-950 pb-20 pt-20 md:pt-24">
      {/* 模糊背景图（随滚动增强模糊并下移） */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: "url(/qa-bg.webp)",
          filter: `blur(${blurPx.toFixed(2)}px)`,
          opacity: dimOpacity,
          transform: `translate3d(0, ${translateY.toFixed(2)}px, 0)`,
          willChange: "filter, opacity, transform",
        }}
      />
      {/* 底部黑色渐层遮罩：顶部透明，向下逐渐加深至几乎纯黑 */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(6,6,7,0) 0%, rgba(6,6,7,0.35) 45%, rgba(6,6,7,0.85) 80%, rgba(6,6,7,1) 100%)",
          opacity: maskOpacity.toFixed(3),
        }}
      />
      <div className="relative z-10">
        <PageHeader navItems={navItems} />
        <QandA />
      </div>
    </main>
  );
}
