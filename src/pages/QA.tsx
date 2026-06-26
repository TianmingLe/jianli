import PageHeader from "@/components/PageHeader";
import QandA from "@/components/QandA";
import ScrollParallaxBg from "@/components/ScrollParallaxBg";

const navItems = [
  { id: "qa-q1", label: "核心优势", cn: "核心竞争力" },
  { id: "qa-q2", label: "AI 工具价值", cn: "AI 工具价值" },
  { id: "qa-q3", label: "跨界能力", cn: "跨界能力" },
];

export default function QA() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-ink-950 pb-20 pt-20 md:pt-24">
      {/* 滚动视差背景 —— 顶部对应长图顶部，底部对应长图底部 */}
      <ScrollParallaxBg image="/qa-bg.webp" className="opacity-25" />
      <div className="relative z-10">
        <PageHeader navItems={navItems} />
        <QandA />
      </div>
    </main>
  );
}
