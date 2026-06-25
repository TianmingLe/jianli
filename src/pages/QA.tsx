import PageHeader from "@/components/PageHeader";
import QandA from "@/components/QandA";

const navItems = [
  { id: "qa", label: "Q&A", cn: "常见问题" },
];

export default function QA() {
  return (
    <main className="relative min-h-screen w-full bg-ink-950 pb-20 pt-20 md:pt-24">
      <PageHeader navItems={navItems} />
      <QandA />
    </main>
  );
}
