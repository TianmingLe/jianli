import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import AbilityMap from "@/components/AbilityMap";
import Work from "@/components/Work";
import Timeline from "@/components/Timeline";
import Awards from "@/components/Awards";
import Strengths from "@/components/Strengths";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-ink-950">
      <Navbar />
      <Hero />
      <About />
      <AbilityMap />
      <Work />
      <Timeline />
      <Awards />
      <Strengths />
      <Contact />
    </main>
  );
}
