import { motion } from "framer-motion";
import {
  Sparkles,
  Gem,
  Wand2,
  Film,
  BarChart3,
  Layers,
  type LucideIcon,
} from "lucide-react";
import { strengths } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  Gem,
  Wand2,
  Film,
  BarChart3,
  Layers,
};

export default function Strengths() {
  return (
    <section id="strength" className="relative w-full bg-ink-950 py-28 md:py-40">
      <div className="shell">
        {/* 章节标 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-20 flex items-end justify-between"
        >
          <div>
            <span className="eyebrow">/ 03 — My Edge</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              个人优势
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-mist-500 md:block">
            视觉 × AI × 品牌，
            <br />
            复合能力的交叉优势。
          </p>
        </motion.div>

        {/* 能力卡片网格 */}
        <div className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
          {strengths.map((s, i) => {
            const Icon = iconMap[s.icon] ?? Sparkles;
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: (i % 3) * 0.1 }}
                className="group relative bg-ink-900 p-8 transition-colors duration-500 hover:bg-ink-850 md:p-10"
              >
                {/* hover 顶部亮线 */}
                <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-volt-400 transition-transform duration-500 group-hover:scale-x-100" />

                {/* 序号 + 图标 */}
                <div className="mb-8 flex items-start justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-mist-700 transition-colors group-hover:text-volt-400">
                    / {s.no}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center border border-ink-600 text-mist-300 transition-all duration-500 group-hover:border-volt-400 group-hover:text-volt-400">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* 标题 */}
                <h3 className="font-display text-2xl font-bold tracking-tight text-mist-50">
                  {s.title}
                </h3>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-mist-500">
                  {s.en}
                </p>

                {/* 描述 */}
                <p className="mt-5 text-sm leading-relaxed text-mist-300">
                  {s.description}
                </p>

                {/* 底部装饰 */}
                <div className="mt-8 flex items-center gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="h-px w-8 bg-volt-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                    Capability
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
