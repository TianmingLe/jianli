import PageHeader from "@/components/PageHeader";
import Work from "@/components/Work";
import BaoerFeedback from "@/components/BaoerFeedback";

const navItems = [
  { id: "work", label: "Work", cn: "精选项目" },
  { id: "baoer-feedback", label: "Feedback", cn: "观众反馈" },
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
