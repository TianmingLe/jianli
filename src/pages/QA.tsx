import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import QandA from "@/components/QandA";

const navItems = [
  { id: "qa-q1", label: "核心优势", cn: "核心竞争力" },
  { id: "qa-q2", label: "AI 工具价值", cn: "AI 工具价值" },
  { id: "qa-q3", label: "跨界能力", cn: "跨界能力" },
];

export default function QA() {
  // 滚动进度 0~1：scrollY / (scrollHeight - innerHeight)
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? y / max : 0;
      // clamp 到 [0, 1]
      setProgress(Math.max(0, Math.min(1, p)));
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      // 节流：每帧最多更新一次
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 模糊度：起始约 20%（6px）→ 底部全模糊（约 32px），随滚动进度线性变化
  const blur = 6 + progress * 26;
  // 黑色渐变层高度：从 0 增长到 100vh（黑色从底部向上生长）
  const overlayHeight = progress * 100;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-ink-950 pb-20 pt-20 md:pt-24">
      {/* 背景图：固定不动（fixed），不做视差位移，仅模糊度随滚动递增 */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: "url(/qa-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: `blur(${blur}px)`,
          opacity: 0.55,
          transform: "translate3d(0, 0, 0)",
          willChange: "filter",
        }}
      />
      {/* 黑色渐变层：固定在底部，高度随滚动进度从 0 增长到 100vh，黑色从底部向上扩展 */}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-0"
        style={{
          height: `${overlayHeight}vh`,
          background:
            "linear-gradient(to top, rgba(6,6,7,0.98) 0%, rgba(6,6,7,0.85) 60%, transparent 100%)",
          transform: "translate3d(0, 0, 0)",
          willChange: "height",
        }}
      />
      <div className="relative z-10">
        <PageHeader navItems={navItems} />
        <QandA />
      </div>
    </main>
  );
}
