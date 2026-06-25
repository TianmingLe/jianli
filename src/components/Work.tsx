import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { projects, Project } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

/* ============================ 分区一：能动技术 · 数据网格 ============================ */
function EnergyGrid({ items }: { items: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 md:grid-cols-2">
      {items.map((p, i) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: i * 0.08 }}
          className="group relative bg-ink-900 transition-colors hover:bg-ink-850"
        >
          {/* 顶部：序号 + 封面缩略 + 年份 */}
          <div className="flex items-stretch border-b border-ink-700">
            <div className="flex w-16 shrink-0 flex-col items-center justify-center border-r border-ink-700 bg-ink-850 p-2">
              <span className="font-display text-2xl font-bold tracking-tighter text-mist-50/30 transition-colors group-hover:text-volt-400 md:text-3xl">
                {p.index}
              </span>
            </div>
            <div className="relative h-20 flex-1 overflow-hidden">
              <img
                src={p.cover}
                alt={p.title}
                className="h-full w-full object-cover opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 to-transparent" />
              <span className="absolute right-3 top-2 font-mono text-[10px] uppercase tracking-widest text-mist-400">
                {p.year}
              </span>
            </div>
          </div>
          {/* 主体 */}
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
              {p.category}
            </p>
            <h3 className="mt-2 font-display text-base font-bold leading-tight text-mist-50 md:text-lg">
              {p.title}
            </h3>
            <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-mist-400">
              {p.summary}
            </p>
            {/* 关键指标精简展示 */}
            <div className="mt-3 flex flex-wrap gap-1">
              {p.achievements.slice(0, 2).map((a, idx) => (
                <span
                  key={idx}
                  className="border border-ink-600 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-mist-300"
                >
                  {a.length > 24 ? a.slice(0, 22) + "…" : a}
                </span>
              ))}
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

/* ============================ 分区二：AI 特种 · 列表流 ============================ */
function AIListFlow({ items }: { items: Project[] }) {
  return (
    <div className="flex flex-col">
      {items.map((p, i) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease, delay: Math.min(i * 0.08, 0.4) }}
          className="group relative flex flex-col gap-4 border-b border-ink-700 py-5 transition-colors hover:bg-ink-850/50 md:flex-row md:items-center md:gap-6 md:py-6"
        >
          {/* 序号 */}
          <div className="flex shrink-0 items-center gap-3 md:w-16">
            <span className="font-display text-3xl font-bold tracking-tighter text-mist-50/20 transition-colors group-hover:text-volt-400 md:text-4xl">
              {p.index}
            </span>
          </div>
          {/* 封面缩略 */}
          <div className="shrink-0 md:w-40">
            <div className="relative aspect-[4/3] overflow-hidden border border-ink-700">
              <img
                src={p.cover}
                alt={p.title}
                className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-110 group-hover:opacity-90"
              />
            </div>
          </div>
          {/* 标题 + 关键词（主体，flex-1 占据剩余空间） */}
          <div className="min-w-0 flex-1">
            <p className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
              {p.category}
            </p>
            <h3 className="mt-1 font-display text-lg font-bold leading-tight text-mist-50 md:text-xl">
              {p.title}
            </h3>
            <p className="mt-1.5 line-clamp-1 text-xs leading-relaxed text-mist-400 md:hidden">
              {p.summary}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {p.keywords.slice(0, 3).map((k) => (
                <span
                  key={k}
                  className="font-mono text-[9px] uppercase tracking-wider text-mist-500"
                >
                  /{k}
                </span>
              ))}
            </div>
          </div>
          {/* 年份 + 箭头 */}
          <div className="flex shrink-0 items-center justify-end gap-3 md:w-32">
            <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
              {p.year}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border border-ink-600 text-mist-400 transition-all duration-300 group-hover:border-volt-400 group-hover:bg-volt-400 group-hover:text-ink-950">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </span>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

/* ============================ 分区三：Vibe Coding · 产品特写（单项目） ============================ */
function VibeProductSpotlight({ items }: { items: Project[] }) {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {items.map((p, i) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease, delay: i * 0.1 }}
          className="group relative grid grid-cols-1 overflow-hidden border border-ink-700 bg-ink-900 lg:grid-cols-2"
        >
          {/* 左：大封面（垂直） */}
          <div className="relative aspect-[4/3] w-full overflow-hidden lg:aspect-auto">
            <img
              src={p.cover}
              alt={p.title}
              className="h-full w-full object-cover opacity-80 transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent lg:bg-gradient-to-r" />
            {/* 序号浮层 */}
            <span className="absolute left-6 top-5 font-display text-7xl font-bold tracking-tighter text-mist-50/15 drop-shadow-2xl md:text-8xl">
              {p.index}
            </span>
          </div>
          {/* 右：信息面板 */}
          <div className="flex flex-col justify-between p-6 md:p-10">
            <div>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-amber-300">
                  {p.category}
                </span>
                <span className="h-px flex-1 bg-amber-300/30" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist-400">
                  {p.year}
                </span>
              </div>
              <h3 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-mist-50 md:text-4xl">
                {p.title}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-mist-300">
                {p.summary}
              </p>
            </div>
            {/* 技术栈（amber 风格） */}
            <div className="mt-8">
              <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
                / Tech Stack
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-amber-300/40 bg-amber-300/5 px-2 py-1 text-[10px] text-amber-200"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
            {/* 成果 */}
            <div className="mt-6">
              <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
                / Achievements
              </p>
              <ul className="mt-3 space-y-2">
                {p.achievements.slice(0, 3).map((a, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs leading-relaxed text-mist-200"
                  >
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-amber-300" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

/* ============================ 分区四：自媒体 · 大图特写 ============================ */
function MediaFeature({ items }: { items: Project[] }) {
  return (
    <div className="flex flex-col gap-8 md:gap-12">
      {items.map((p, i) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease, delay: i * 0.1 }}
          className="group relative overflow-hidden border border-ink-700 bg-ink-900"
        >
          {/* 全宽大封面 */}
          <div className="relative aspect-[21/9] w-full overflow-hidden md:aspect-[21/7]">
            <img
              src={p.cover}
              alt={p.title}
              className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-ink-900/60 via-transparent to-transparent" />
            {/* 序号大字水印 */}
            <span className="absolute right-6 top-4 font-display text-6xl font-bold tracking-tighter text-mist-50/10 drop-shadow-2xl md:text-8xl">
              {p.index}
            </span>
            {/* 标题浮层 */}
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                  {p.category}
                </span>
                <span className="h-px flex-1 bg-volt-400/30" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist-400">
                  {p.year}
                </span>
              </div>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight tracking-tight text-mist-50 md:text-4xl">
                {p.title}
              </h3>
            </div>
          </div>
          {/* 信息条 */}
          <div className="grid grid-cols-1 gap-6 p-5 md:grid-cols-3 md:p-8">
            <div className="md:col-span-2">
              <p className="text-sm leading-relaxed text-mist-300">{p.summary}</p>
              {/* 成果数据 */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                {p.achievements.slice(0, 4).map((a, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-3 w-3 shrink-0 text-volt-400" />
                    <span className="text-[11px] leading-relaxed text-mist-200">{a}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* 右侧关键词 */}
            <div className="border-l border-ink-700 pl-5">
              <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
                / Keywords
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {p.keywords.map((k) => (
                  <span
                    key={k}
                    className="border border-ink-600 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-mist-300"
                  >
                    {k}
                  </span>
                ))}
              </div>
              <p className="mt-4 font-mono text-[9px] uppercase tracking-widest text-mist-700">
                / Stack
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="border border-ink-600 px-1.5 py-0.5 text-[10px] text-mist-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

/* ============================ 分区头部 ============================ */
function PartHeader({ part, partEn, count, accent }: { part: string; partEn: string; count: number; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease }}
      className="mb-6 flex items-end justify-between border-b border-ink-700 pb-4 md:mb-8"
    >
      <div className="flex items-center gap-4">
        <span className={`h-8 w-1 ${accent}`} />
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight text-mist-50 md:text-3xl">
            {part}
          </h3>
          <p className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
            / {partEn}
          </p>
        </div>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
        {String(count).padStart(2, "0")} projects
      </span>
    </motion.div>
  );
}

/* ============================ 主组件 ============================ */
export default function Work() {
  // 按分区分组
  const parts = ["能动技术", "AI 特种技术", "Vibe Coding 产品", "自媒体特种技术"];
  const grouped = parts.map((partName) => ({
    part: partName,
    items: projects.filter((p) => p.part === partName),
  }));

  // 分区配置：每个分区用不同的渲染器 + accent 色
  // partEn 必须与 Projects 页 PageHeader 的 navItems id 对应（proj-<partEn去空格小写>）
  const partConfig: Record<string, { renderer: "grid" | "list" | "spotlight" | "feature"; accent: string; partEn: string }> = {
    "能动技术": { renderer: "grid", accent: "bg-volt-400", partEn: "Energy & Power" },
    "AI 特种技术": { renderer: "list", accent: "bg-mist-300", partEn: "AI Special Forces" },
    "Vibe Coding 产品": { renderer: "spotlight", accent: "bg-amber-300", partEn: "Vibe Coding Products" },
    "自媒体特种技术": { renderer: "feature", accent: "bg-volt-500", partEn: "Content Creation" },
  };

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
            按《简历二版》四大分区组织，
            <br />
            每区采用差异化的视觉语法。
          </p>
        </motion.div>

        {/* 四大分区 */}
        <div className="flex flex-col gap-20 md:gap-28">
          {grouped.map((g) => {
            const cfg = partConfig[g.part];
            if (!cfg || g.items.length === 0) return null;
            // 锚点 id 用第一个项目的 partEn
            const anchorId = `proj-${cfg.partEn.toLowerCase().replace(/[^a-z]/g, "")}`;
            return (
              <div key={g.part} id={anchorId} className="scroll-mt-24">
                <PartHeader
                  part={g.part}
                  partEn={cfg.partEn}
                  count={g.items.length}
                  accent={cfg.accent}
                />
                {cfg.renderer === "grid" && <EnergyGrid items={g.items} />}
                {cfg.renderer === "list" && <AIListFlow items={g.items} />}
                {cfg.renderer === "spotlight" && <VibeProductSpotlight items={g.items} />}
                {cfg.renderer === "feature" && <MediaFeature items={g.items} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
