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

        {/* 获奖列表 */}
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

          <div className="flex flex-col gap-px border border-ink-700 bg-ink-700">
            {awards.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, ease, delay: i * 0.08 }}
                className="group grid grid-cols-1 gap-4 bg-ink-900 p-6 transition-colors hover:bg-ink-850 md:grid-cols-12 md:items-center md:gap-6"
              >
                {/* 时间 */}
                <div className="md:col-span-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                    {a.year}
                  </span>
                </div>
                {/* 标题 + 项目 */}
                <div className="md:col-span-6">
                  <p className="font-display text-lg font-bold text-mist-50">
                    {a.title}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-mist-300">
                    {a.project}
                  </p>
                </div>
                {/* 角色 */}
                <div className="md:col-span-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                    {a.role}
                  </span>
                </div>
                {/* 级别 */}
                <div className="md:col-span-2 md:text-right">
                  <span
                    className={`inline-block border px-3 py-1 font-mono text-[10px] uppercase tracking-widest ${
                      levelStyle[a.level] ?? "border-ink-600 text-mist-300"
                    }`}
                  >
                    {a.level}
                  </span>
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
                  className="group relative bg-ink-900 p-7 transition-colors hover:bg-ink-850"
                >
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-volt-400 transition-transform duration-500 group-hover:scale-x-100" />
                  <div className="flex h-12 w-12 items-center justify-center border border-ink-600 text-mist-300 transition-all duration-500 group-hover:border-volt-400 group-hover:text-volt-400">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-5 font-display text-base font-bold text-mist-50">
                    {c.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-mist-300">
                    {c.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
