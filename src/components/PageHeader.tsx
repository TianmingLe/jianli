import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

type Props = {
  index: string;
  title: string;
  subtitle: string;
};

export default function PageHeader({ index, title, subtitle }: Props) {
  const location = useLocation();
  const isProjects = location.pathname === "/projects";
  const isQA = location.pathname === "/qa";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-50 border-b border-ink-700/60 bg-ink-950/80 backdrop-blur-xl"
    >
      <div className="shell flex h-16 items-center justify-between md:h-20">
        {/* 左：返回首页 + Logo */}
        <div className="flex items-center gap-5">
          <Link
            to="/"
            className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-mist-500 transition-colors hover:text-volt-400"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Back</span>
          </Link>
          <span className="h-4 w-px bg-ink-700" />
          <a href="#hero" className="font-display text-lg font-bold tracking-tighter text-mist-50">
            HU<span className="text-volt-400">.</span>YW
          </a>
        </div>

        {/* 中：页面标题 */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-3 md:flex">
          <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
            / {index}
          </span>
          <span className="h-3 w-px bg-ink-700" />
          <span className="font-display text-sm font-bold tracking-tight text-mist-50">
            {title}
          </span>
        </div>

        {/* 右：页面切换 Tab + 状态点 */}
        <div className="flex items-center gap-4">
          <nav className="flex items-center gap-1">
            <Link
              to="/projects"
              className={`px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                isProjects
                  ? "text-mist-50"
                  : "text-mist-500 hover:text-mist-300"
              }`}
            >
              Projects
            </Link>
            <Link
              to="/qa"
              className={`px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                isQA
                  ? "text-mist-50"
                  : "text-mist-500 hover:text-mist-300"
              }`}
            >
              Q&A
            </Link>
          </nav>
          <span className="hidden items-center gap-2 border-l border-ink-700 pl-4 font-mono text-[10px] uppercase tracking-widest text-mist-500 sm:flex">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-volt-400" />
            {subtitle}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
