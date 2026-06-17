import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Work() {
  return (
    <section id="work" className="relative w-full bg-ink-900 py-28 md:py-40">
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
            <span className="eyebrow">/ 02 — Selected Work</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              精选项目
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-mist-500 md:block">
            从 4K 影像修复到 AI 智能硬件，
            <br />
            六个代表作品，六种可能。
          </p>
        </motion.div>

        {/* 大卡片纵向堆叠 */}
        <div className="flex flex-col gap-6 md:gap-10">
          {projects.map((p, i) => (
            <motion.a
              key={p.id}
              href="#contact"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease, delay: (i % 2) * 0.1 }}
              className="group relative block overflow-hidden border border-ink-700 bg-ink-850"
            >
              {/* 图片层 */}
              <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-950/60 via-transparent to-transparent" />

                {/* 序号 */}
                <span className="absolute right-6 top-6 font-display text-6xl font-bold tracking-tighter text-mist-50/15 transition-colors duration-500 group-hover:text-volt-400/40 md:text-8xl">
                  {p.index}
                </span>

                {/* 年份 */}
                <span className="absolute left-6 top-6 font-mono text-[11px] uppercase tracking-widest text-mist-300">
                  {p.year}
                </span>
              </div>

              {/* 信息层 */}
              <div className="relative z-10 -mt-32 p-6 md:-mt-48 md:p-10">
                <p className="font-mono text-[11px] uppercase tracking-widest text-volt-400">
                  {p.category}
                </p>
                <h3 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-tight tracking-tighter text-mist-50 md:text-5xl">
                  {p.title}
                </h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-mist-300 opacity-0 transition-all duration-500 group-hover:opacity-100">
                  {p.description}
                </p>

                {/* 标签 + 箭头 */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="border border-ink-600 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-mist-300 transition-colors group-hover:border-ink-500"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink-600 text-mist-300 transition-all duration-300 group-hover:border-volt-400 group-hover:bg-volt-400 group-hover:text-ink-950">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
