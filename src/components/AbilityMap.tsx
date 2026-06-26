import { motion } from "framer-motion";
import {
  Flame,
  Bot,
  Code2,
  Video,
  Brain,
  type LucideIcon,
} from "lucide-react";
import { abilityMap } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const iconMap: Record<string, LucideIcon> = {
  Flame,
  Bot,
  Code2,
  Video,
  Brain,
};

export default function AbilityMap() {
  return (
    <section id="ability" className="relative w-full bg-ink-900 py-28 md:py-40">
      <div className="shell">
        {/* 章节标 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <span className="eyebrow">/ 03 — Ability Map</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              能力地图
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-mist-500 md:block">
            五大能力域，从专业核心到战略思维，
            <br />
            构成完整的复合能力体系。
          </p>
        </motion.div>

        {/* 能力域卡片 —— 纵向堆叠，树状结构 */}
        <div className="flex flex-col gap-px border border-ink-700 bg-ink-700">
          {abilityMap.map((a, i) => {
            const Icon = iconMap[a.icon] ?? Flame;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="group relative bg-ink-950 transition-colors hover:bg-ink-850"
              >
                {/* 左侧序号竖条 */}
                <span className="absolute left-0 top-0 h-full w-1 origin-top scale-y-0 bg-volt-400 transition-transform duration-500 group-hover:scale-y-100" />

                <div className="grid grid-cols-1 gap-6 p-7 md:grid-cols-12 md:items-center md:gap-8 md:p-9">
                  {/* 左：序号 + 图标 + 域名 */}
                  <div className="md:col-span-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-ink-600 text-mist-300 transition-all duration-500 group-hover:border-volt-400 group-hover:text-volt-400">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[11px] uppercase tracking-widest text-mist-700">
                            / {a.no}
                          </span>
                          <span className="font-mono text-[11px] uppercase tracking-widest text-volt-400">
                            {a.level}
                          </span>
                        </div>
                        <p className="mt-1 font-display text-2xl font-bold tracking-tight text-mist-50">
                          {a.domain}
                        </p>
                        <p className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                          {a.en} · {a.role}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 中：摘要 + 关键词 */}
                  <div className="md:col-span-5">
                    <p className="text-sm leading-relaxed text-mist-300">
                      {a.summary}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {a.keywords.map((k) => (
                        <span
                          key={k}
                          className="border border-ink-600 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-mist-300 transition-colors group-hover:border-ink-500"
                        >
                          {k}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* 右：技能树 */}
                  <div className="md:col-span-3">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-mist-700">
                      └─ Skills
                    </p>
                    <ul className="space-y-1.5">
                      {a.skills.map((s, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs leading-relaxed text-mist-100"
                        >
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-volt-400/60" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gallery：能力域实证图片（仅当存在 gallery 时展示） */}
                  {a.gallery && a.gallery.length > 0 && (
                    <div className="md:col-span-12">
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-mist-700">
                        └─ Gallery · 实证
                      </p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {a.gallery.map((g, gi) => (
                          <figure
                            key={gi}
                            className="group/img relative overflow-hidden border border-ink-700 bg-ink-900"
                          >
                            <div className="aspect-[4/3] w-full overflow-hidden">
                              <img
                                src={g.src}
                                alt={g.caption}
                                className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover/img:scale-105 group-hover/img:opacity-100"
                              />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-ink-950/90 via-transparent to-transparent" />
                            <figcaption className="absolute bottom-0 left-0 right-0 p-3">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                                / 0{gi + 1}
                              </span>
                              <p className="mt-1 text-xs leading-snug text-mist-100">
                                {g.caption}
                              </p>
                            </figcaption>
                          </figure>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 底部说明 */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="mt-8 text-right font-mono text-[10px] uppercase tracking-widest text-mist-700"
        >
          * 能力地图基于《简历二版》能力地图章节，熟练度自评
        </motion.p>
      </div>
    </section>
  );
}
