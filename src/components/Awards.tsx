import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Award,
  Languages,
  Car,
  Plane,
  Trophy,
  X,
  ChevronLeft,
  ChevronRight,
  type LucideIcon,
} from "lucide-react";
import { awards, certificates } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

/* 全局图片放大查看器 */
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
        className="max-h-[85vh] max-w-[85vw] object-contain"
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

/* 图片双击放大 hook */
function useImageZoom() {
  const [state, setState] = useState<{ images: string[]; index: number } | null>(null);
  const open = (images: string[], index = 0) => setState({ images, index });
  const close = () => setState(null);
  return { state, open, close };
}

const certIcons: Record<string, LucideIcon> = {
  Languages,
  Car,
  Plane,
  Award,
};

// 排名配置：省级一等奖最醒目（金色实心 + 呼吸光晕动效）
const levelConfig: Record<
  string,
  { badge: string; top: boolean; icon: LucideIcon }
> = {
  省级一等奖: {
    badge:
      "bg-amber-400 text-ink-950 shadow-[0_0_14px_rgba(251,191,36,0.55)]",
    top: true,
    icon: Trophy,
  },
  校级二等奖: {
    badge: "border border-amber-300/70 text-amber-200 bg-amber-300/10",
    top: false,
    icon: Award,
  },
  参赛认证: {
    badge: "border border-mist-500/50 text-mist-300 bg-mist-500/5",
    top: false,
    icon: Award,
  },
};

function LevelBadge({ level }: { level: string }) {
  const cfg = levelConfig[level] ?? {
    badge: "border border-ink-600 text-mist-300",
    top: false,
    icon: Award,
  };
  const Icon = cfg.icon;
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0, y: 6 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ type: "spring", stiffness: 380, damping: 15, delay: 0.18 }}
      className="relative inline-flex w-fit"
    >
      {/* 省级一等奖：常驻呼吸光晕 */}
      {cfg.top && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -inset-1 rounded"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(251,191,36,0.0)",
              "0 0 18px 5px rgba(251,191,36,0.5)",
              "0 0 0 0 rgba(251,191,36,0.0)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span
        className={`relative inline-flex items-center gap-1.5 rounded-sm px-2.5 py-1 text-xs font-bold tracking-wider ${cfg.badge}`}
      >
        <Icon className="h-3.5 w-3.5" />
        {level}
      </span>
    </motion.div>
  );
}

export default function Awards() {
  const zoom = useImageZoom();
  return (
    <section id="awards" className="relative w-full bg-ink-950 py-28 md:py-40">
      <AnimatePresence>
        {zoom.state && (
          <ImageLightbox
            images={zoom.state.images}
            startIndex={zoom.state.index}
            onClose={zoom.close}
          />
        )}
      </AnimatePresence>
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
            <span className="eyebrow">/ 02 — Awards & Certs</span>
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
                      className="h-full w-full cursor-zoom-in object-cover transition-transform duration-700 group-hover:scale-105"
                      onDoubleClick={() => zoom.open(a.gallery ?? [a.image!], 0)}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] items-center justify-center border-b border-ink-700 bg-ink-850">
                    <Trophy className="h-10 w-10 text-ink-600" />
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
                  <div className="mt-3">
                    <LevelBadge level={a.level} />
                  </div>
                  <p className="mt-3 flex-1 text-xs leading-relaxed text-mist-300">
                    {a.project}
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-mist-500">
                    {a.role}
                  </p>
                  {/* Gallery 比赛实录 */}
                  {a.gallery && a.gallery.length > 0 && (
                    <div className="mt-4 border-t border-ink-700 pt-3">
                      <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-mist-700">
                        / Gallery · 比赛实录
                      </p>
                      <div className="grid grid-cols-3 gap-1.5">
                        {a.gallery.map((g, gi) => (
                          <div
                            key={gi}
                            className="relative aspect-square cursor-zoom-in overflow-hidden border border-ink-700"
                            onDoubleClick={() => zoom.open(a.gallery!, gi)}
                          >
                            <img
                              src={g}
                              alt={`${a.title} - ${gi + 1}`}
                              className="h-full w-full object-cover opacity-60 transition-all duration-500 hover:opacity-100 hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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

          <div className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2 lg:grid-cols-5">
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
                        className="h-full w-full cursor-zoom-in object-cover transition-transform duration-700 group-hover:scale-105"
                        onDoubleClick={() => zoom.open([c.image!])}
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
