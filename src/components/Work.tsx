import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { projects } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Work() {
  return (
    <section id="work" className="relative w-full bg-ink-950 py-28 md:py-40">
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
            <span className="eyebrow">/ 03 — Selected Work</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              精选项目
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-mist-500 md:block">
            按《简历二版》分区组织，
            <br />
            AI 特种技术 × 自媒体特种技术。
          </p>
        </motion.div>

        {/* 大卡片纵向堆叠 */}
        <div className="flex flex-col gap-6 md:gap-10">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease, delay: (i % 2) * 0.1 }}
              className="group relative overflow-hidden border border-ink-700 bg-ink-900"
            >
              {/* 顶部：分区标签条 */}
              <div className="flex items-center justify-between border-b border-ink-700 bg-ink-850 px-6 py-3 md:px-10">
                <div className="flex items-center gap-3">
                  <span className="font-display text-2xl font-bold tracking-tighter text-mist-50/20 transition-colors duration-500 group-hover:text-volt-400/40 md:text-3xl">
                    {p.index}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                    {p.part} / {p.partEn}
                  </span>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                  {p.year}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* 左：封面图 */}
                <div className="relative aspect-[16/10] w-full overflow-hidden lg:col-span-7 lg:aspect-auto">
                  <img
                    src={p.cover}
                    alt={p.title}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-ink-900/40" />
                  {/* 关键词浮层 */}
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5">
                    {p.keywords.map((k) => (
                      <span
                        key={k}
                        className="border border-ink-600/80 bg-ink-950/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-mist-300 backdrop-blur-sm"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 右：信息 */}
                <div className="flex flex-col justify-between p-6 md:p-8 lg:col-span-5">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-volt-400">
                      {p.category}
                    </p>
                    <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tighter text-mist-50 md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-mist-300">
                      {p.summary}
                    </p>

                    {/* 技术栈 */}
                    <div className="mt-6">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-mist-700">
                        / Tech Stack
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {p.stack.map((s) => (
                          <span
                            key={s}
                            className="border border-ink-600 px-2 py-0.5 text-[11px] text-mist-100"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* 成果数据 */}
                  <div className="mt-6">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-mist-700">
                      / Achievements
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {p.achievements.map((ach, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs leading-relaxed text-mist-100"
                        >
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-volt-400" />
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* 底部标签 + 箭头 */}
                  <div className="mt-6 flex items-center justify-between border-t border-ink-700 pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[10px] uppercase tracking-widest text-mist-500"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#contact"
                      className="flex h-9 w-9 shrink-0 items-center justify-center border border-ink-600 text-mist-300 transition-all duration-300 hover:border-volt-400 hover:bg-volt-400 hover:text-ink-950"
                      aria-label="联系合作"
                    >
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
