import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import { ArrowDown, Flame, Bot, BarChart3, Target } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const traitIcons = { Flame, Bot, BarChart3, Target };

const VIDEO_DURATION_MS = 28_000; // 视频时长，结束时重载以实现循环
const BILIBILI_EMBED =
  "https://player.bilibili.com/player.html?bvid=BV1617T6iEGj&page=1&high_quality=1&autoplay=1&muted=1&danmaku=0";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleReload = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setReloadKey((k) => k + 1);
    }, VIDEO_DURATION_MS);
  };

  useEffect(() => {
    scheduleReload();
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [reloadKey]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const blur = useTransform(scrollYProgress, [0, 1], [2, 16]);
  const blurFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative flex h-screen min-h-[720px] w-full items-start overflow-hidden"
    >
      {/* 背景层 */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <iframe
          key={reloadKey}
          src={BILIBILI_EMBED}
          title="Hero background video"
          allow="autoplay; fullscreen"
          onLoad={scheduleReload}
          style={{ filter: blurFilter }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-[56.25vw] min-h-full w-full min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2 scale-110 border-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/85 via-ink-950/65 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-transparent to-ink-950/40" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #7DD3FC 1px, transparent 1px), linear-gradient(to bottom, #7DD3FC 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute -left-40 top-1/4 h-96 w-96 animate-pulse-soft rounded-full bg-volt-500/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-1/4 h-96 w-96 animate-pulse-soft rounded-full bg-volt-600/8 blur-[140px]" />
      </div>

      {/* 内容 */}
      <div className="shell relative z-10 w-full pt-20 md:pt-24">
        <div className="max-w-[1300px]">
          {/* 顶部小标 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-volt-400" />
            <span className="eyebrow">{profile.tagline}</span>
            <span className="font-mono text-[11px] uppercase tracking-widest text-mist-700">
              · {profile.mbti}
            </span>
          </motion.div>

          {/* 大标题 */}
          <h1 className="font-display font-bold leading-[0.9] tracking-tightest text-mist-50">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.55 }}
              className="block text-[15vw] md:text-[11vw] lg:text-[10rem]"
            >
              {profile.nameEn.split(" ")[0]}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.7 }}
              className="block text-[15vw] md:text-[11vw] lg:text-[10rem]"
            >
              {profile.nameEn.split(" ")[1]}
              <span className="text-volt-400">.</span>
            </motion.span>
          </h1>

          {/* 副标题 + 定位 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.95 }}
            className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          >
            <div className="max-w-xl">
              <p className="font-display text-xl tracking-tight text-mist-100 md:text-2xl">
                {profile.identity.join(" / ")}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-mist-300">
                {profile.positioning}
              </p>
            </div>
            <a href="#contact" className="btn-ghost shrink-0">
              发起合作
              <span className="ml-1">→</span>
            </a>
          </motion.div>

          {/* 核心特质条 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1.15 }}
            className="mt-14 mb-24 grid grid-cols-2 gap-px border border-ink-700 bg-ink-700 md:grid-cols-4"
          >
            {profile.coreTraits.map((t) => {
              const Icon = traitIcons[t.icon as keyof typeof traitIcons] ?? Flame;
              return (
                <div
                  key={t.title}
                  className="group bg-ink-950/60 p-5 backdrop-blur-sm transition-colors hover:bg-ink-900"
                >
                  <Icon className="h-5 w-5 text-volt-400 transition-transform duration-300 group-hover:scale-110" />
                  <p className="mt-3 text-sm font-medium text-mist-50">
                    {t.title}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-mist-500">
                    {t.desc}
                  </p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* 滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-volt-400" />
        </motion.div>
      </motion.div>

      {/* 左侧竖排 */}
      <div className="absolute bottom-8 left-6 z-10 hidden lg:block">
        <span className="font-mono text-[10px] uppercase tracking-widest text-mist-700 [writing-mode:vertical-rl]">
          Portfolio / 2026
        </span>
      </div>
    </section>
  );
}
