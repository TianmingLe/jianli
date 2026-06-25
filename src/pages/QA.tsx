import PageHeader from "@/components/PageHeader";
import QandA from "@/components/QandA";

export default function QA() {
  return (
    <main className="relative min-h-screen w-full bg-ink-950 pb-20 pt-20 md:pt-24">
      <PageHeader
        index="07"
        title="常见问题"
        subtitle="Q&A"
      />
      <QandA />
    </main>
  );
}
