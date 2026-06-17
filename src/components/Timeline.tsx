import { motion } from "framer-motion";
import { timeline } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Timeline() {
  return (
    <section id="timeline" className="relative w-full bg-ink-900 py-28 md:py-40">
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
            <span className="eyebrow">/ 04 — Timeline</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              成长轨迹
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-mist-500 md:block">
            2023 — 2026，
            <br />
            从入学到 AI Native 的演进。
          </p>
        </motion.div>

        {/* 时间线主体 */}
        <div className="relative">
          {/* 中央竖线 */}
          <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gradient-to-b from-volt-400/40 via-ink-600 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="flex flex-col gap-12 md:gap-16">
            {timeline.map((year, yi) => (
              <motion.div
                key={year.year}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.9, ease, delay: yi * 0.1 }}
                className="relative"
              >
                {/* 年份节点 */}
                <div className="relative mb-8 flex items-center gap-4 md:mb-10 md:justify-center">
                  <div
                    className={`relative z-10 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${
                      year.color === "volt"
                        ? "border-volt-400 bg-ink-900"
                        : "border-mist-500 bg-ink-900"
                    }`}
                  >
                    <span
                      className={`h-1 w-1 rounded-full ${
                        year.color === "volt" ? "bg-volt-400" : "bg-mist-500"
                      }`}
                    />
                  </div>
                  <span className="font-display text-5xl font-bold tracking-tightest text-mist-50 md:text-7xl">
                    {year.year}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mist-700">
                    / {year.events.length} events
                  </span>
                </div>

                {/* 事件网格 */}
                <div className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 pl-8 md:grid-cols-2 md:pl-0 lg:grid-cols-3">
                  {year.events.map((ev, ei) => (
                    <motion.div
                      key={ei}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.6, ease, delay: ei * 0.08 }}
                      className="group bg-ink-950 p-5 transition-colors hover:bg-ink-850"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-mono text-[11px] uppercase tracking-widest ${
                            year.color === "volt"
                              ? "text-volt-400"
                              : "text-mist-500"
                          }`}
                        >
                          {ev.month}
                        </span>
                        <span className="h-px flex-1 bg-ink-700" />
                      </div>
                      <p className="mt-3 font-display text-base font-bold text-mist-50">
                        {ev.title}
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-mist-300">
                        {ev.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="mt-12 text-right font-mono text-[10px] uppercase tracking-widest text-mist-700"
        >
          * 时间线基于《简历二版》附录：时间线总览
        </motion.p>
      </div>
    </section>
  );
}
