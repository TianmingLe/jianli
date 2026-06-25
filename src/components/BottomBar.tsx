import { Link, useLocation } from "react-router-dom";
import { Home, FolderKanban, HelpCircle } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", label: "整体概述", icon: Home },
  { to: "/projects", label: "精选项目", icon: FolderKanban },
  { to: "/qa", label: "Q&A", icon: HelpCircle },
];

export default function BottomBar() {
  const { pathname } = useLocation();

  return (
    <motion.nav
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      className="fixed inset-x-0 bottom-0 z-50 border-t border-ink-700/60 bg-ink-950/80 backdrop-blur-xl"
    >
      <div className="mx-auto grid h-16 max-w-shell grid-cols-3 px-4">
        {tabs.map((tab) => {
          const isActive = pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`group relative flex flex-col items-center justify-center gap-1 px-4 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                isActive
                  ? "text-mist-50"
                  : "text-mist-500 hover:text-mist-300"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-bar-active"
                  initial={false}
                  className="pointer-events-none absolute -top-px left-1/2 h-0.5 w-6 -translate-x-1/2 bg-volt-400"
                  transition={{ duration: 0.3 }}
                />
              )}
              <tab.icon className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
}
