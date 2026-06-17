import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Strengths from "@/components/Strengths";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full bg-ink-950">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Strengths />
      <Contact />
    </main>
  );
}
