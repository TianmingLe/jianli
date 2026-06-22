import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { navItems } from "@/data/content";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = navItems.map((n) => document.getElementById(n.id));
      const y = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const s = sections[i];
        if (s && s.offsetTop <= y) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-ink-700/60 bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        {/* Logo */}
        <a href="#hero" className="group flex items-center gap-3">
          <span className="font-display text-lg font-bold tracking-tighter text-mist-50">
            HU<span className="text-volt-400">.</span>YW
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-mist-500 transition-colors group-hover:text-mist-300 lg:inline">
            / Designer
          </span>
        </a>

        {/* Nav */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) =>
            item.id === "work" ? (
              <Link
                key={item.id}
                to="/projects"
                className="group relative px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-mist-500 transition-colors hover:text-mist-100"
              >
                <span className="mr-1 text-volt-400/60">/</span>
                {item.label}
              </Link>
            ) : (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative px-3 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  active === item.id
                    ? "text-mist-50"
                    : "text-mist-500 hover:text-mist-100"
                }`}
              >
                <span className="mr-1 text-volt-400/60">/</span>
                {item.label}
                {active === item.id && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-x-2 -bottom-px h-px bg-volt-400"
                    transition={{ duration: 0.4 }}
                  />
                )}
              </a>
            ),
          )}
        </nav>

        {/* CTA */}
        <a href="#contact" className="btn-ghost !px-4 !py-2.5 !text-[10px]">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-volt-400" />
          联系合作
        </a>
      </div>
    </motion.header>
  );
}
