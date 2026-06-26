import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { projects, Project } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

function fitClass(p: Project) {
  return p.coverFit === "contain"
    ? "object-contain bg-ink-850"
    : "object-cover";
}

/* ============================================================
 * 分区一：能动技术 — 技术数据表
 * 第一个项目作为 hero 横幅，其余以紧凑数据网格展示
 * ============================================================ */
function EnergySection({ items }: { items: Project[] }) {
  const [hero, ...rest] = items;
  return (
    <div className="flex flex-col gap-6">
      {/* Hero 项目 */}
      {hero && (
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease }}
          className="group relative overflow-hidden bg-ink-900"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* 封面 */}
            <div className="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto">
              <img
                src={hero.cover}
                alt={hero.title}
                className={`h-full w-full ${fitClass(hero)} transition-transform duration-[1.2s] ease-out group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent lg:bg-gradient-to-r" />
              <span className="absolute left-5 top-4 font-display text-6xl font-bold tracking-tighter text-mist-50/20 md:text-7xl">
                {hero.index}
              </span>
            </div>
            {/* 信息 */}
            <div className="flex flex-col justify-between p-6 lg:col-span-5 lg:p-8">
              <div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-volt-400">
                    {hero.category}
                  </span>
                  <span className="h-px flex-1 bg-ink-600" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-mist-500">
                    {hero.year}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-xl font-bold leading-tight tracking-tight text-mist-50 md:text-2xl">
                  {hero.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-mist-300">
                  {hero.summary}
                </p>
                {/* 电厂价值 */}
                <div className="mt-4 bg-volt-400/5 px-4 py-3">
                  <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-volt-400">
                    <Zap className="h-3 w-3" /> 电厂价值 · Power Value
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-volt-200">
                    {hero.valueToPower}
                  </p>
                </div>
              </div>
              {/* 技术栈 */}
              <div className="mt-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-mist-700">
                  / Stack
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {hero.stack.map((s) => (
                    <span key={s} className="border border-ink-600 px-2 py-1 text-[11px] text-mist-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      )}

      {/* 其余项目：紧凑数据网格 */}
      <div className="grid grid-cols-1 gap-px bg-ink-700 md:grid-cols-3">
        {rest.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.1 }}
            className="group flex flex-col bg-ink-900 p-5 transition-colors hover:bg-ink-850"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-display text-2xl font-bold tracking-tighter text-mist-50/25 transition-colors group-hover:text-volt-400 md:text-3xl">
                {p.index}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-mist-500">
                {p.year}
              </span>
            </div>
            <span className="font-mono text-[11px] uppercase tracking-widest text-volt-400">
              {p.category}
            </span>
            <h4 className="mt-1.5 font-display text-sm font-bold leading-tight text-mist-50">
              {p.title}
            </h4>
            <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-mist-300">
              {p.summary}
            </p>
            {/* 电厂价值 */}
            <div className="mt-3 border-t border-ink-700 pt-3">
              <p className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-volt-400">
                <Zap className="h-2.5 w-2.5" /> 电厂价值
              </p>
              <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-volt-200/80">
                {p.valueToPower}
              </p>
            </div>
            {/* 关键成果 */}
            <ul className="mt-3 space-y-1">
              {p.achievements.slice(0, 2).map((a, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-mist-300">
                  <Check className="mt-0.5 h-3 w-3 shrink-0 text-volt-400" />
                  <span className="line-clamp-1">{a}</span>
                </li>
              ))}
            </ul>
            {/* 技术栈 */}
            <div className="mt-auto flex flex-wrap gap-1 pt-3">
              {p.stack.slice(0, 3).map((s) => (
                <span key={s} className="font-mono text-[11px] text-mist-500">
                  /{s}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
 * 分区二：AI 特种技术 — 交替面板流
 * 全宽左右交替，内容始终可见，电厂价值高亮
 * ============================================================ */
function AISection({ items }: { items: Project[] }) {
  return (
    <div className="flex flex-col">
      {items.map((p, i) => {
        const reversed = i % 2 === 1;
        return (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease }}
            className="group relative border-b border-ink-700 last:border-b-0"
          >
            <div className={`grid grid-cols-1 lg:grid-cols-12 ${reversed ? "lg:[direction:rtl]" : ""}`}>
              {/* 封面 */}
              <div className="relative aspect-[16/10] overflow-hidden lg:col-span-6 lg:aspect-auto">
                <img
                  src={p.cover}
                  alt={p.title}
                  className={`h-full w-full ${fitClass(p)} opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
                <span className="absolute left-5 top-4 font-display text-5xl font-bold tracking-tighter text-mist-50/20 drop-shadow-2xl md:text-6xl">
                  {p.index}
                </span>
              </div>
              {/* 信息面板 */}
              <div className="flex flex-col justify-center p-6 lg:col-span-6 lg:p-10 [direction:ltr]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-volt-400">
                    {p.category}
                  </span>
                  <span className="h-px flex-1 bg-ink-600" />
                  <span className="font-mono text-[11px] uppercase tracking-widest text-mist-500">
                    {p.year}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-mist-50 md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-mist-300">
                  {p.summary}
                </p>
                {/* 电厂价值 — 高亮卡片 */}
                <div className="mt-4 bg-ink-850 px-4 py-3">
                  <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-volt-400">
                    <Zap className="h-3 w-3" /> 电厂价值 · Power Value
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-volt-200">
                    {p.valueToPower}
                  </p>
                </div>
                {/* 成果 + 技术栈 */}
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-mist-700">
                      / Achievements
                    </p>
                    <ul className="mt-2 space-y-1">
                      {p.achievements.slice(0, 3).map((a, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-mist-300">
                          <Check className="mt-0.5 h-3 w-3 shrink-0 text-volt-400" />
                          <span className="line-clamp-2">{a}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-widest text-mist-700">
                      / Stack
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {p.stack.map((s) => (
                        <span key={s} className="border border-ink-600 px-1.5 py-0.5 text-[11px] text-mist-200">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}

/* ============================================================
 * 分区三：Vibe Coding 产品 — 产品特写展示
 * 单项目居中 hero 展示，琥珀色主题
 * ============================================================ */
function VibeSection({ items }: { items: Project[] }) {
  return (
    <div className="flex flex-col gap-6">
      {items.map((p, i) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: i * 0.08 }}
          className="group relative overflow-hidden bg-ink-900"
        >
          {/* 封面全宽 */}
          <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-[21/9]">
            <img
              src={p.cover}
              alt={p.title}
              className={`h-full w-full ${fitClass(p)} opacity-80 transition-transform duration-700 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent" />
            <span className="absolute left-6 top-5 font-display text-6xl font-bold tracking-tighter text-mist-50/20 drop-shadow-2xl md:text-8xl">
              {p.index}
            </span>
          </div>
          {/* 浮动信息面板 */}
          <div className="relative z-10 -mt-20 mx-auto max-w-2xl px-6 pb-8 md:-mt-24 md:pb-10">
            <div className="bg-ink-900/95 p-6 backdrop-blur-sm md:p-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-amber-300">
                  {p.category}
                </span>
                <span className="h-px flex-1 bg-amber-300/30" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-mist-500">
                  {p.year}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-mist-50 md:text-3xl">
                {p.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-mist-300">
                {p.summary}
              </p>
              {/* 电厂价值 */}
              <div className="mt-4 bg-amber-300/5 px-4 py-3">
                <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-amber-300">
                  <Zap className="h-3 w-3" /> 电厂价值 · Power Value
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-amber-200">
                  {p.valueToPower}
                </p>
              </div>
              {/* 成果网格 */}
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {p.achievements.map((a, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-[11px] leading-relaxed text-mist-300">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-amber-300" />
                    <span>{a}</span>
                  </div>
                ))}
              </div>
              {/* 技术栈 */}
              <div className="mt-5">
                <p className="font-mono text-[11px] uppercase tracking-widest text-mist-700">
                  / Tech Stack
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="border border-amber-300/30 bg-amber-300/5 px-2 py-1 text-[11px] text-amber-200">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

/* ============================================================
 * 分区四：自媒体特种技术 — 编辑杂志风
 * 第一个项目（4K修复）作为全宽 editorial hero，突出数据指标
 * 其余以数据驱动的紧凑布局展示
 * ============================================================ */
function MediaSection({ items }: { items: Project[] }) {
  const [hero, ...rest] = items;
  return (
    <div className="flex flex-col gap-6">
      {/* Editorial Hero — 4K修复 */}
      {hero && (
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="group relative overflow-hidden bg-ink-900"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden md:aspect-[21/9]">
            <img
              src={hero.cover}
              alt={hero.title}
              className={`h-full w-full ${fitClass(hero)} transition-transform duration-700 group-hover:scale-105`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
          </div>
          {/* 叠加内容 */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-volt-400">
                {hero.category}
              </span>
              <span className="h-px w-12 bg-volt-400/50" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-mist-500">
                {hero.year}
              </span>
            </div>
            <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-mist-50 md:text-4xl">
              {hero.title}
            </h3>
            {/* 数据指标行 */}
            <div className="mt-4 flex flex-wrap gap-6">
              {hero.achievements.slice(0, 4).map((a, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="font-display text-lg font-bold tracking-tight text-volt-400 md:text-xl">
                    {a}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-4 max-w-2xl text-xs leading-relaxed text-mist-300 md:text-sm">
              {hero.summary}
            </p>
            {/* 电厂价值 */}
            <div className="mt-4 max-w-2xl bg-volt-400/5 px-4 py-3">
              <p className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-volt-400">
                <Zap className="h-3 w-3" /> 电厂价值 · Power Value
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-volt-200">
                {hero.valueToPower}
              </p>
            </div>
            {/* 技术栈 */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {hero.stack.map((s) => (
                <span key={s} className="border border-ink-600/80 bg-ink-950/60 px-2 py-1 text-[11px] text-mist-200 backdrop-blur-sm">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      )}

      {/* 其余项目：数据驱动紧凑布局 */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {rest.map((p, i) => (
          <motion.article
            key={p.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease, delay: i * 0.1 }}
            className="group flex flex-col overflow-hidden bg-ink-900"
          >
            {/* 封面 */}
            <div className="relative aspect-[16/9] overflow-hidden">
              <img
                src={p.cover}
                alt={p.title}
                className={`h-full w-full ${fitClass(p)} transition-transform duration-700 group-hover:scale-105`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
              <span className="absolute left-4 top-3 font-display text-4xl font-bold tracking-tighter text-mist-50/20 md:text-5xl">
                {p.index}
              </span>
            </div>
            {/* 信息 */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-volt-400">
                  {p.category}
                </span>
                <span className="h-px flex-1 bg-ink-600" />
                <span className="font-mono text-[11px] uppercase tracking-widest text-mist-500">
                  {p.year}
                </span>
              </div>
              <h4 className="mt-2 font-display text-lg font-bold leading-tight tracking-tight text-mist-50">
                {p.title}
              </h4>
              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-mist-300">
                {p.summary}
              </p>
              {/* 数据指标 */}
              <div className="mt-3 space-y-1">
                {p.achievements.slice(0, 3).map((a, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-[11px] text-mist-300">
                    <span className="h-1 w-1 shrink-0 rounded-full bg-volt-400" />
                    <span className="line-clamp-1">{a}</span>
                  </div>
                ))}
              </div>
              {/* 电厂价值 */}
              <div className="mt-3 border-t border-ink-700 pt-3">
                <p className="flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-volt-400">
                  <Zap className="h-2.5 w-2.5" /> 电厂价值
                </p>
                <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-volt-200/80">
                  {p.valueToPower}
                </p>
              </div>
              {/* 技术栈 */}
              <div className="mt-auto flex flex-wrap gap-1 pt-3">
                {p.stack.slice(0, 3).map((s) => (
                  <span key={s} className="border border-ink-600 px-1.5 py-0.5 text-[11px] text-mist-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

/* ============================================================
 * 分区头部 — 去除 banned 的侧条纹，改用全宽编号 + 底线
 * ============================================================ */
function PartHeader({
  part,
  partEn,
  count,
  accentText,
}: {
  part: string;
  partEn: string;
  count: number;
  accentText: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease }}
      className="mb-8 border-b border-ink-700 pb-5 md:mb-10"
    >
      <div className="flex items-end justify-between">
        <div className="flex items-baseline gap-4">
          <span className={`font-display text-4xl font-bold tracking-tighter md:text-5xl ${accentText}`}>
            {String(count).padStart(2, "0")}
          </span>
          <div>
            <h3 className="font-display text-2xl font-bold tracking-tight text-mist-50 md:text-3xl">
              {part}
            </h3>
            <p className="font-mono text-[11px] uppercase tracking-widest text-mist-500">
              / {partEn}
            </p>
          </div>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-widest text-mist-700">
          {count} {count === 1 ? "project" : "projects"}
        </span>
      </div>
    </motion.div>
  );
}

/* ============================================================
 * 主组件
 * ============================================================ */
export default function Work() {
  const parts = ["能动技术", "AI 特种技术", "Vibe Coding 产品", "自媒体特种技术"];
  const grouped = parts.map((partName) => ({
    part: partName,
    items: projects.filter((p) => p.part === partName),
  }));

  const partConfig: Record<
    string,
    { renderer: "energy" | "ai" | "vibe" | "media"; accentText: string; partEn: string }
  > = {
    "能动技术": { renderer: "energy", accentText: "text-volt-400", partEn: "Energy & Power" },
    "AI 特种技术": { renderer: "ai", accentText: "text-mist-100", partEn: "AI Special Forces" },
    "Vibe Coding 产品": { renderer: "vibe", accentText: "text-amber-300", partEn: "Vibe Coding Products" },
    "自媒体特种技术": { renderer: "media", accentText: "text-volt-500", partEn: "Content Creation" },
  };

  return (
    <section id="work" className="relative w-full bg-ink-950 py-20 md:py-28">
      <div className="shell">
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
            按《简历二版》四大分区组织，
            <br />
            每区采用差异化的视觉语法。
          </p>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-24">
          {grouped.map((g) => {
            const cfg = partConfig[g.part];
            if (!cfg || g.items.length === 0) return null;
            const anchorId = `proj-${cfg.partEn.toLowerCase().replace(/[^a-z]/g, "")}`;
            return (
              <div key={g.part} id={anchorId} className="scroll-mt-24">
                <PartHeader
                  part={g.part}
                  partEn={cfg.partEn}
                  count={g.items.length}
                  accentText={cfg.accentText}
                />
                {cfg.renderer === "energy" && <EnergySection items={g.items} />}
                {cfg.renderer === "ai" && <AISection items={g.items} />}
                {cfg.renderer === "vibe" && <VibeSection items={g.items} />}
                {cfg.renderer === "media" && <MediaSection items={g.items} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
