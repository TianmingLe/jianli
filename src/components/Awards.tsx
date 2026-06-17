import { motion } from "framer-motion";
import {
  Award,
  Languages,
  Car,
  Plane,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { awards, certificates } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const certIcons: Record<string, LucideIcon> = {
  Languages,
  Car,
  Plane,
  Award,
};

const levelStyle: Record<string, string> = {
  省级一等奖: "border-volt-400/60 text-volt-400 bg-volt-400/5",
  校级二等奖: "border-mist-500/60 text-mist-300 bg-mist-500/5",
  参赛认证: "border-mist-500/60 text-mist-300 bg-mist-500/5",
};

export default function Awards() {
  return (
    <section id="awards" className="relative w-full bg-ink-950 py-28 md:py-40">
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
            <span className="eyebrow">/ 05 — Awards & Certs</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              获奖与证书
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-mist-500 md:block">
            覆盖技术、市场、能源、艺术，
            <br />
            持续从校级到省级的进步。
          </p>
        </motion.div>

        {/* 获奖卡片网格（带图片） */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="mb-8 flex items-center gap-3"
          >
            <Trophy className="h-5 w-5 text-volt-400" />
            <span className="eyebrow">/ Competition Awards</span>
          </motion.div>

          <div className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-3">
            {awards.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="group relative flex flex-col bg-ink-900 transition-colors hover:bg-ink-850"
              >
                <span className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-volt-400 transition-transform duration-500 group-hover:scale-x-100" />

                {/* 证书图片 */}
                {a.image ? (
                  <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-ink-700">
                    <img
                      src={a.image}
                      alt={a.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                    {/* 级别标签浮层 */}
                    <span
                      className={`absolute right-3 top-3 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest backdrop-blur-sm ${
                        levelStyle[a.level] ?? "border-ink-600 text-mist-300"
                      }`}
                    >
                      {a.level}
                    </span>
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center border-b border-ink-700 bg-ink-850">
                    <Trophy className="h-10 w-10 text-ink-600" />
                    <span
                      className={`absolute right-3 top-3 border px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest ${
                        levelStyle[a.level] ?? "border-ink-600 text-mist-300"
                      }`}
                    >
                      {a.level}
                    </span>
                  </div>
                )}

                {/* 信息 */}
                <div className="flex flex-1 flex-col p-5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                    {a.year}
                  </span>
                  <p className="mt-2 font-display text-base font-bold leading-tight text-mist-50">
                    {a.title}
                  </p>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-mist-300">
                    {a.project}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-mist-500">
                    {a.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 证书 */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="mb-8 flex items-center gap-3"
          >
            <Award className="h-5 w-5 text-volt-400" />
            <span className="eyebrow">/ Certificates</span>
          </motion.div>

          <div className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((c, i) => {
              const Icon = certIcons[c.icon] ?? Award;
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                  className="group relative flex flex-col bg-ink-900 transition-colors hover:bg-ink-850"
                >
                  <span className="absolute inset-x-0 top-0 z-10 h-px origin-left scale-x-0 bg-volt-400 transition-transform duration-500 group-hover:scale-x-100" />

                  {/* 证书图片或图标 */}
                  {c.image ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-ink-700">
                      <img
                        src={c.image}
                        alt={c.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center border-b border-ink-700 bg-ink-850">
                      <Icon className="h-12 w-12 text-ink-600 transition-colors group-hover:text-volt-400" />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <p className="font-display text-sm font-bold text-mist-50">
                      {c.title}
                    </p>
                    <p className="mt-1.5 flex-1 text-xs leading-relaxed text-mist-300">
                      {c.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
