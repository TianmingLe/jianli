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
    </main>
  );
}
