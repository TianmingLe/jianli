import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type NavItem = { id: string; label: string; cn: string };

type Props = {
  navItems: NavItem[];
};

export default function PageHeader({ navItems }: Props) {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(navItems[0]?.id ?? "");

  useEffect(() => {
    // 缓存 section 元素引用 + rAF 节流，避免每次滚动都 getElementById（触发布局）
    const sections = navItems.map((n) => document.getElementById(n.id));
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 40);
        const y = window.scrollY + window.innerHeight / 3;
        for (let i = sections.length - 1; i >= 0; i--) {
          const s = sections[i];
          if (s && s.offsetTop <= y) {
            setActive(navItems[i].id);
            break;
          }
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [navItems]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease, delay: 0.1 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-ink-700/60 bg-ink-950/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        {/* 左：返回 + Logo */}
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mist-500 transition-colors hover:text-volt-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          <span className="h-4 w-px bg-ink-700" />
          <a href="#hero" className="font-display text-lg font-bold tracking-tighter text-mist-50">
            HU<span className="text-volt-400">.</span>YW
          </a>
        </div>

        {/* 中：页面内锚点导航 */}
        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
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
                  layoutId="page-header-active"
                  className="absolute inset-x-2 -bottom-px h-px bg-volt-400"
                  transition={{ duration: 0.4 }}
                />
              )}
            </a>
          ))}
        </nav>

        {/* 右：当前页面名 + 状态点 */}
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mist-500">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-volt-400" />
          {location.pathname === "/projects" ? "Projects" : "Q&A"}
        </div>
      </div>
    </motion.header>
  );
}
