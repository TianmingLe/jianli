import PageHeader from "@/components/PageHeader";
import Work from "@/components/Work";
import BaoerFeedback from "@/components/BaoerFeedback";

export default function Projects() {
  return (
    <main className="relative min-h-screen w-full bg-ink-950 pb-20 pt-20 md:pt-24">
      <PageHeader
        index="03"
        title="精选项目"
        subtitle="15 Projects"
      />
      <Work />
      <BaoerFeedback />
    </main>
  );
}
