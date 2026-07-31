import PageHeader from "@/components/PageHeader";
import Work from "@/components/Work";
import BaoerFeedback from "@/components/BaoerFeedback";

const navItems = [
  { id: "proj-energypower", label: "能动", cn: "能动技术" },
  { id: "proj-aispecialforces", label: "AI 特种", cn: "AI 特种技术" },
  { id: "proj-vibecodingproducts", label: "Vibe", cn: "Vibe Coding" },
  { id: "proj-contentcreation", label: "自媒体", cn: "自媒体特种技术" },
  { id: "baoer-feedback", label: "反馈", cn: "观众反馈" },
];

export default function Projects() {
  return (
    <main className="relative min-h-screen w-full bg-ink-950 pb-20 pt-20 md:pt-24">
      <PageHeader navItems={navItems} />
      <Work />
      <BaoerFeedback />
      <footer className="relative z-10 mt-16 border-t border-ink-800/50 bg-ink-950 px-6 py-8 text-center">
        <p className="text-[12px] tracking-wider text-mist-700 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]" style={{ fontFamily: '"FangSong", "仿宋", "STFangsong", serif' }}>
          Copyright © 2026胡亚伟-晋ICP备2026008906号-1
        </p>
      </footer>
    </main>
  );
}
