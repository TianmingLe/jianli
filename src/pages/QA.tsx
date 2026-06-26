import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import QandA from "@/components/QandA";

const navItems = [
  { id: "qa-q1", label: "核心优势", cn: "核心竞争力" },
  { id: "qa-q2", label: "AI 工具价值", cn: "AI 工具价值" },
  { id: "qa-q3", label: "跨界能力", cn: "跨界能力" },
];

export default function QA() {
  const [progress, setProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(y);
      setProgress(max > 0 ? Math.min(1, y / max) : 0);
    };
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // 模糊度：起始约 20%（6px）→ 底部 100%（约 32px）
  const blur = 6 + progress * 26;
  // 黑色渐层透明度：起始 0 → 底部接近 1（全黑）
  const overlayOpacity = progress * 0.92;
  // 背景随滚动向下平移（接近同步，0.85 倍速，到底部基本移出视口）
  const bgY = scrollY * 0.85;

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-ink-950 pb-20 pt-20 md:pt-24">
      {/* 模糊背景图：随滚动向下平移 + 模糊度递增 */}
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-0"
        style={{
          backgroundImage: "url(/qa-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "120vh",
          transform: `translate3d(0, ${bgY}px, 0)`,
          filter: `blur(${blur}px)`,
          opacity: 0.45,
          willChange: "transform, filter",
        }}
      />
      {/* 黑色渐层：随滚动逐渐覆盖到全黑 */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-ink-950"
        style={{ opacity: overlayOpacity }}
      />
      <div className="relative z-10">
        <PageHeader navItems={navItems} />
        <QandA />
      </div>
    </main>
  );
}
