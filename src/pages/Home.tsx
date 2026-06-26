import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AbilityMap from "@/components/AbilityMap";
import Timeline from "@/components/Timeline";
import Awards from "@/components/Awards";
import Strengths from "@/components/Strengths";
import Contact from "@/components/Contact";
import ClickSpark from "@/components/ClickSpark";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-ink-950 pb-20">
      <ClickSpark
        sparkColor="#7DD3FC"
        sparkSize={15}
        sparkRadius={25}
        sparkCount={8}
        duration={500}
      >
        <Navbar />
        <Hero />
        <About />
        <Awards />
        <AbilityMap />
        <Timeline />
        <Strengths />
        <Contact />
      </ClickSpark>
    </main>
  );
}
