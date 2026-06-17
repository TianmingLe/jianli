import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { heroPoster, profile } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[680px] w-full items-center overflow-hidden"
    >
      {/* 背景层：生成的暗调氛围图 + 缓慢平移 + 渐变遮罩 */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 animate-slow-pan bg-cover bg-center"
          style={{ backgroundImage: `url(${heroPoster})` }}
        />
        {/* 多层渐变遮罩，保证文字可读 */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/80 via-ink-950/60 to-ink-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-transparent to-ink-950/40" />
        {/* 顶部网格线装饰 */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #7DD3FC 1px, transparent 1px), linear-gradient(to bottom, #7DD3FC 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
        {/* 角落光晕 */}
        <div className="absolute -left-40 top-1/4 h-96 w-96 animate-pulse-soft rounded-full bg-volt-500/10 blur-[120px]" />
      </div>

      {/* 内容 */}
      <div className="shell relative z-10 w-full">
        <div className="max-w-[1200px]">
          {/* 顶部小标 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-volt-400" />
            <span className="eyebrow">{profile.tagline}</span>
          </motion.div>

          {/* 大标题 */}
          <h1 className="font-display font-bold leading-[0.92] tracking-tightest text-mist-50">
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.55 }}
              className="block text-[14vw] md:text-[10vw] lg:text-[9rem]"
            >
              {profile.nameEn.split(" ")[0]}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease, delay: 0.7 }}
              className="block text-[14vw] md:text-[10vw] lg:text-[9rem]"
            >
              {profile.nameEn.split(" ")[1]}
              <span className="text-volt-400">.</span>
            </motion.span>
          </h1>

          {/* 副标题 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.95 }}
            className="mt-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
          >
            <div>
              <p className="font-display text-xl tracking-tight text-mist-100 md:text-2xl">
                {profile.identity.join(" / ")}
              </p>
              <p className="mt-2 max-w-md text-sm text-mist-300">
                {profile.taglineSub}
              </p>
            </div>
            <a href="#contact" className="btn-ghost shrink-0">
              发起合作
              <span className="ml-1">→</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* 右下角滚动提示 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2"
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

      {/* 左侧竖排年份 */}
      <div className="absolute bottom-8 left-6 z-10 hidden lg:block">
        <span className="font-mono text-[10px] uppercase tracking-widest text-mist-700 [writing-mode:vertical-rl]">
          Portfolio / 2026
        </span>
      </div>
    </section>
  );
}
