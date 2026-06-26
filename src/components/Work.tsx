import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Zap, X, ChevronLeft, ChevronRight } from "lucide-react";
import { projects, Project } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

/* 图片放大查看器 */
function ImageLightbox({
  images,
  startIndex,
  onClose,
}: {
  images: string[];
  startIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(startIndex);
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-950/90 backdrop-blur-md"
      onClick={onClose}
      onDoubleClick={onClose}
    >
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-ink-600 text-mist-300 hover:text-volt-400"
      >
        <X className="h-5 w-5" />
      </button>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i - 1 + images.length) % images.length); }}
            className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ink-600 text-mist-300 hover:text-volt-400"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIdx((i) => (i + 1) % images.length); }}
            className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border border-ink-600 text-mist-300 hover:text-volt-400"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}
      <img
        src={images[idx]}
        alt="放大查看"
        className="max-h-[85vh] max-w-[85vw] cursor-zoom-out object-contain"
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => { e.stopPropagation(); onClose(); }}
      />
      {images.length > 1 && (
        <span className="absolute bottom-6 font-mono text-xs text-mist-500">
          {idx + 1} / {images.length}
        </span>
      )}
    </div>
  );
}

function useImageZoom() {
  const [state, setState] = useState<{ images: string[]; index: number } | null>(null);
  const open = (images: string[], index = 0) => setState({ images, index });
  const close = () => setState(null);
  return { state, open, close };
}

// 根据图片原始宽高比选择 fit 模式：超宽横图/竖图用 contain 避免截断，其他用 cover
function fitClass(p: Project) {
  return p.coverFit === "contain"
    ? "object-contain bg-ink-850"
    : "object-cover";
}

/* ============================ 分区一：能动技术 · 数据网格 ============================ */
function EnergyGrid({ items, onZoom }: { items: Project[]; onZoom: ZoomFn }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 lg:grid-cols-2">
      {items.map((p, i) => (
        <EnergyCard key={p.id} p={p} i={i} onZoom={onZoom} />
      ))}
    </div>
  );
}

function EnergyCard({ p, i, onZoom }: { p: Project; i: number; onZoom: ZoomFn }) {
  return (
    <motion.article
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
        <div className="relative h-52 flex-1 overflow-hidden">
          <img loading="lazy" decoding="async"
            src={p.cover}
            alt={p.title}
            className={`h-full w-full cursor-zoom-in ${fitClass(p)} opacity-50 transition-all duration-700 group-hover:scale-110 group-hover:opacity-80`}
            onDoubleClick={() => onZoom(p.gallery ?? [p.cover], 0)}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 to-transparent" />
          <span className="absolute right-3 top-2 font-mono text-[10px] uppercase tracking-widest text-mist-400">
            {p.year}
          </span>
        </div>
      </div>
      {/* 主体（默认展示） */}
      <div className="relative p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
          {p.category}
        </p>
        <h3 className="mt-2 font-display text-base font-bold leading-tight text-mist-50 md:text-lg">
          {p.title}
        </h3>
        <p className="mt-2 text-xs leading-relaxed text-amber-200/80">
          {p.summary}
        </p>
        <div className="mt-3 flex flex-wrap gap-1">
          {p.achievements.slice(0, 2).map((a, idx) => (
            <span
              key={idx}
              className="border border-ink-600 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-mist-300"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Hover 遮罩浮层：覆盖整个卡片，模糊背景 + 淡入显示完整内容 */}
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col overflow-y-auto bg-ink-900/95 p-5 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
        <p className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
          {p.category}
        </p>
        <h3 className="mt-2 font-display text-base font-bold leading-tight text-mist-50 md:text-lg">
          {p.title}
        </h3>
        {/* 概要 */}
        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-mist-700">
          / 概要 · What it does
        </p>
        <p className="mt-1 text-xs leading-relaxed text-amber-200">{p.summary}</p>
        {/* 电厂价值 */}
        <p className="mt-3 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-volt-400">
          <Zap className="h-2.5 w-2.5" /> / 电厂价值 · Power Value
        </p>
        <p className="mt-1.5 text-xs leading-relaxed text-volt-200">{p.valueToPower}</p>
        {/* 成果 */}
        <p className="mt-4 font-mono text-[9px] uppercase tracking-widest text-mist-700">
          / Achievements
        </p>
        <ul className="mt-1.5 space-y-1.5">
          {p.achievements.map((a, idx) => (
            <li key={idx} className="flex items-start gap-1.5 text-[10px] leading-relaxed text-mist-300">
              <Check className="mt-0.5 h-2.5 w-2.5 shrink-0 text-volt-400" />
              {a}
            </li>
          ))}
        </ul>
        {/* 技术栈 */}
        <p className="mt-4 font-mono text-[9px] uppercase tracking-widest text-mist-700">
          / Stack
        </p>
        <div className="mt-1.5 flex flex-wrap gap-1">
          {p.stack.map((s) => (
            <span key={s} className="border border-ink-600 px-1.5 py-0.5 text-[9px] text-mist-300">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

/* ============================ 分区二：AI 特种 · 左右交替 ============================ */
function AIListFlow({ items, onZoom }: { items: Project[]; onZoom: ZoomFn }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {items.map((p, i) => (
        <AIAlternateItem key={p.id} p={p} i={i} onZoom={onZoom} />
      ))}
    </div>
  );
}

function AIAlternateItem({ p, i, onZoom }: { p: Project; i: number; onZoom: ZoomFn }) {
  const reversed = i % 2 === 1;
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease, delay: i * 0.08 }}
      className="group relative overflow-hidden border border-ink-700 bg-ink-900 md:grid md:grid-cols-12"
    >
      {/* 封面：奇数项在左，偶数项在右 */}
      <div
        className={`relative aspect-[16/10] w-full ${
          p.coverFit === "contain" ? "" : "overflow-hidden"
        } md:aspect-auto md:min-h-[320px] ${
          reversed ? "md:order-2 md:col-span-5" : "md:order-1 md:col-span-5"
        }`}
      >
        <img loading="lazy" decoding="async"
          src={p.cover}
          alt={p.title}
          className={`h-full w-full cursor-zoom-in ${fitClass(p)} ${
            p.coverFit === "contain" ? "p-6" : ""
          } opacity-80 transition-transform duration-700 group-hover:scale-105`}
          onDoubleClick={() => onZoom(p.gallery ?? [p.cover], 0)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent md:bg-gradient-to-r" />
        <span
          className={`absolute font-display text-5xl font-bold tracking-tighter text-mist-50/15 drop-shadow-2xl md:text-6xl ${
            reversed ? "left-4 top-3" : "right-4 top-3"
          }`}
        >
          {p.index}
        </span>
      </div>
      {/* 信息面板 */}
      <div
        className={`flex flex-col p-4 md:p-6 ${
          reversed ? "md:order-1 md:col-span-7" : "md:order-2 md:col-span-7"
        }`}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-mist-300">
            {p.category}
          </span>
          <span className="h-px flex-1 bg-mist-300/30" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-mist-400">
            {p.year}
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-mist-50 md:text-2xl">
          {p.title}
        </h3>
        {/* 概要 */}
        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-mist-700">
          / 概要 · What it does
        </p>
        <p className="mt-1 text-xs leading-relaxed text-amber-200">{p.summary}</p>
        {/* 电厂价值 */}
        <p className="mt-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-mist-300">
          <Zap className="h-2.5 w-2.5" /> / 电厂价值 · Power Value
        </p>
        <p className="mt-1 text-xs leading-relaxed text-mist-200">{p.valueToPower}</p>
        {/* 技术栈 + 成果：横向并排 */}
        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
              / Stack
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="border border-mist-300/40 bg-mist-300/5 px-1.5 py-0.5 text-[9px] text-mist-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
              / Achievements
            </p>
            <ul className="mt-1.5 space-y-0.5">
              {p.achievements.slice(0, 2).map((a, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-1.5 text-[10px] leading-relaxed text-mist-200"
                >
                  <Check className="mt-0.5 h-2.5 w-2.5 shrink-0 text-mist-300" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Gallery 画廊 */}
        {p.gallery && p.gallery.length > 0 && (
          <div className="border-t border-ink-700 p-3 md:col-span-12">
            <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-mist-700">
              / Gallery · AI 艺术作品集
            </p>
            <div className="grid grid-cols-5 gap-2">
              {p.gallery.map((g, gi) => (
                <div
                  key={gi}
                  className="group/gallery relative aspect-square cursor-zoom-in overflow-hidden border border-ink-700"
                  onDoubleClick={() => onZoom(p.gallery!, gi)}
                >
                  <img loading="lazy" decoding="async"
                    src={g}
                    alt={`${p.title} - ${gi + 1}`}
                    className="h-full w-full object-cover opacity-60 transition-all duration-500 hover:opacity-100 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.article>
  );
}

/* ============================ 分区三：Vibe Coding · 产品特写 ============================ */
function VibeProductSpotlight({ items, onZoom }: { items: Project[]; onZoom: ZoomFn }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {items.map((p, i) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: i * 0.08 }}
          className="group relative grid grid-cols-1 overflow-hidden border border-ink-700 bg-ink-900 md:grid-cols-12"
        >
          {/* 左：封面（占 5/12） */}
          <div className="relative aspect-[16/10] w-full overflow-hidden md:col-span-5 md:aspect-auto">
            <img loading="lazy" decoding="async"
              src={p.cover}
              alt={p.title}
              className={`h-full w-full cursor-zoom-in ${fitClass(p)} opacity-80 transition-transform duration-700 group-hover:scale-105`}
              onDoubleClick={() => onZoom(p.gallery ?? [p.cover], 0)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent md:bg-gradient-to-r" />
            <span className="absolute left-4 top-3 font-display text-5xl font-bold tracking-tighter text-mist-50/15 drop-shadow-2xl md:text-6xl">
              {p.index}
            </span>
          </div>
          {/* 右：信息面板（占 7/12） */}
          <div className="flex flex-col justify-between p-4 md:col-span-7 md:p-6">
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
              <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-mist-50 md:text-2xl">
                {p.title}
              </h3>
              {/* 概要 */}
              <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-mist-700">
                / 概要 · What it does
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-200 line-clamp-2">
                {p.summary}
              </p>
              {/* 电厂价值 */}
              <p className="mt-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-amber-300">
                <Zap className="h-2.5 w-2.5" /> / 电厂价值 · Power Value
              </p>
              <p className="mt-1 text-xs leading-relaxed text-amber-200 line-clamp-2">
                {p.valueToPower}
              </p>
            </div>
            {/* 技术栈 + 成果：横向并排，节省纵向空间 */}
            <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-end">
              <div className="flex-1">
                <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
                  / Stack
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="border border-amber-300/40 bg-amber-300/5 px-1.5 py-0.5 text-[9px] text-amber-200"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
                  / Achievements
                </p>
                <ul className="mt-1.5 space-y-0.5">
                  {p.achievements.slice(0, 2).map((a, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-1.5 text-[10px] leading-relaxed text-mist-200"
                    >
                      <Check className="mt-0.5 h-2.5 w-2.5 shrink-0 text-amber-300" />
                      <span className="line-clamp-1">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Gallery 画廊 */}
          {p.gallery && p.gallery.length > 0 && (
            <div className="border-t border-ink-700 p-3 md:col-span-12">
              <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-mist-700">
                / Gallery · 项目展示
              </p>
              <div className="grid grid-cols-4 gap-2">
                {p.gallery.map((g, gi) => (
                  <div
                    key={gi}
                    className="group/gallery relative aspect-video cursor-zoom-in overflow-hidden border border-ink-700"
                    onDoubleClick={() => onZoom(p.gallery!, gi)}
                  >
                    <img loading="lazy" decoding="async"
                      src={g}
                      alt={`${p.title} - ${gi + 1}`}
                      className="h-full w-full object-cover opacity-60 transition-all duration-500 hover:opacity-100 hover:scale-110"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
}

/* ============================ 分区四：自媒体 · 大图特写 ============================ */
function MediaFeature({ items, onZoom }: { items: Project[]; onZoom: ZoomFn }) {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {items.map((p, i) => (
        <motion.article
          key={p.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease, delay: i * 0.08 }}
          className="group relative overflow-hidden border border-ink-700 bg-ink-900 md:grid md:grid-cols-12"
        >
          {/* 左：封面（占 4/12，更紧凑） */}
          <div className={`relative aspect-[16/9] w-full overflow-hidden md:aspect-auto ${
            p.coverFit === "contain"
              ? `md:col-span-4 ${p.compact ? "md:min-h-[120px]" : "md:min-h-[200px]"}`
              : "md:col-span-5"
          }`}>
            <img loading="lazy" decoding="async"
              src={p.cover}
              alt={p.title}
              className={`h-full w-full cursor-zoom-in ${fitClass(p)} ${
                p.coverFit === "contain" ? "p-4" : ""
              } transition-transform duration-700 group-hover:scale-105`}
              onDoubleClick={() => onZoom(p.gallery ?? [p.cover], 0)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent md:bg-gradient-to-r" />
            <span className="absolute right-4 top-3 font-display text-5xl font-bold tracking-tighter text-mist-50/15 drop-shadow-2xl md:text-6xl">
              {p.index}
            </span>
          </div>
          {/* 右：信息面板 */}
          <div className={`flex flex-col p-4 ${p.compact ? "" : "md:p-6"} ${
            p.coverFit === "contain" ? "md:col-span-8" : "md:col-span-7"
          }`}>
            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                {p.category}
              </span>
              <span className="h-px flex-1 bg-volt-400/30" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-mist-400">
                {p.year}
              </span>
            </div>
            <h3 className="mt-2 font-display text-xl font-bold leading-tight tracking-tight text-mist-50 md:text-2xl">
              {p.title}
            </h3>
            {/* 概要 */}
            <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-mist-700">
              / 概要 · What it does
            </p>
            <p className="mt-1 text-xs leading-relaxed text-amber-200 line-clamp-2">{p.summary}</p>
            {/* 电厂价值 */}
            <p className="mt-2 flex items-center gap-1 font-mono text-[9px] uppercase tracking-widest text-volt-400">
              <Zap className="h-2.5 w-2.5" /> / 电厂价值 · Power Value
            </p>
            <p className="mt-1 text-xs leading-relaxed text-volt-200 line-clamp-2">{p.valueToPower}</p>
            {/* 关键词 + 技术栈 + 成果：横向并排，节省纵向空间 */}
            <div className={`mt-3 grid grid-cols-1 gap-3 ${p.compact ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
              {!p.compact && (
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
                    / Keywords
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {p.keywords.slice(0, 3).map((k) => (
                      <span
                        key={k}
                        className="border border-ink-600 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-mist-300"
                      >
                        {k}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
                  / Stack
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {p.stack.slice(0, 4).map((s) => (
                    <span
                      key={s}
                      className="border border-ink-600 px-1.5 py-0.5 text-[9px] text-mist-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-widest text-mist-700">
                  / Achievements
                </p>
                <ul className="mt-1.5 space-y-0.5">
                  {p.achievements.slice(0, 2).map((a, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 text-[10px] leading-relaxed text-mist-200">
                      <Check className="mt-0.5 h-2.5 w-2.5 shrink-0 text-volt-400" />
                      <span className="line-clamp-1">{a}</span>
                    </li>
                  ))}
                </ul>
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
/* 图片双击放大回调类型 */
type ZoomFn = (images: string[], index?: number) => void;

export default function Work() {
  const zoom = useImageZoom();
  const parts = ["能动技术", "AI 特种技术", "Vibe Coding 产品", "自媒体特种技术"];
  const grouped = parts.map((partName) => ({
    part: partName,
    items: projects.filter((p) => p.part === partName),
  }));

  const partConfig: Record<string, { renderer: "grid" | "list" | "spotlight" | "feature"; accent: string; partEn: string }> = {
    "能动技术": { renderer: "grid", accent: "bg-volt-400", partEn: "Energy & Power" },
    "AI 特种技术": { renderer: "list", accent: "bg-mist-300", partEn: "AI Special Forces" },
    "Vibe Coding 产品": { renderer: "spotlight", accent: "bg-amber-300", partEn: "Vibe Coding Products" },
    "自媒体特种技术": { renderer: "feature", accent: "bg-volt-500", partEn: "Content Creation" },
  };

  return (
    <section id="work" className="relative w-full bg-ink-950 py-20 md:py-28">
      {/* 模糊星空背景 */}
      <div
        className="pointer-events-none fixed inset-0 z-0 bg-cover bg-center opacity-20 blur-md"
        style={{ backgroundImage: "url(/星空2.webp)" }}
      />
      <AnimatePresence>
        {zoom.state && (
          <ImageLightbox
            images={zoom.state.images}
            startIndex={zoom.state.index}
            onClose={zoom.close}
          />
        )}
      </AnimatePresence>
      <div className="shell relative z-10">
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

        <div className="flex flex-col gap-12 md:gap-16">
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
                  accent={cfg.accent}
                />
                {cfg.renderer === "grid" && <EnergyGrid items={g.items} onZoom={zoom.open} />}
                {cfg.renderer === "list" && <AIListFlow items={g.items} onZoom={zoom.open} />}
                {cfg.renderer === "spotlight" && <VibeProductSpotlight items={g.items} onZoom={zoom.open} />}
                {cfg.renderer === "feature" && <MediaFeature items={g.items} onZoom={zoom.open} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
