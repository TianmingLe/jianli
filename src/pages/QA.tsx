import PageHeader from "@/components/PageHeader";
import QandA from "@/components/QandA";

const navItems = [
  { id: "qa-q1", label: "核心优势", cn: "核心竞争力" },
  { id: "qa-q2", label: "AI 工具价值", cn: "AI 工具价值" },
  { id: "qa-q3", label: "跨界能力", cn: "跨界能力" },
];

export default function QA() {
  return (
    <main className="relative min-h-screen w-full bg-ink-950 pb-20 pt-20 md:pt-24">
      <PageHeader navItems={navItems} />
      <QandA />
    </main>
  );
}
