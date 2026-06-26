import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { qnaData } from "@/data/content";
import BorderGlow from "./BorderGlow";
import BlurText from "./BlurText";

const ease = [0.22, 1, 0.36, 1] as const;
const EMAIL = "1767976037@qq.com";

/**
 * Render text with inline markup:
 *  - **重点**  → 白色加粗（重点短语）
 *  - [[关键词]] → 电光蓝高亮（技术 / 工具 / 数值关键词）
 */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[\[[^\]]+\]\])/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-mist-50">
              {part.slice(2, -2)}
            </strong>
          );
        }
        if (part.startsWith("[[") && part.endsWith("]]")) {
          return (
            <span key={i} className="font-semibold text-volt-400">
              {part.slice(2, -2)}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// BorderGlow 通用配置 —— 问题卡 / 回答卡共享同一套发光参数
const BORDER_GLOW_PROPS = {
  edgeSensitivity: 28,
  glowColor: "199 92 74",
  backgroundColor: "#0A0A0B",
  borderRadius: 20,
  glowRadius: 24,
  glowIntensity: 1.0,
  coneSpread: 25,
  animated: false,
  colors: ["#7DD3FC", "#38BDF8", "#FCD34D"],
  fillOpacity: 0.45,
} as const;

export default function QandA() {
  const [activeIdx, setActiveIdx] = useState(-1);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight / 2;
      let current = -1;
      for (let i = 0; i < qnaData.length; i++) {
        const el = document.getElementById(`qa-q${i + 1}`);
        if (el && el.offsetTop <= y) current = i;
      }
      setActiveIdx(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleCopyEmail = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).catch(() => {});
    setShowToast(true);
  }, []);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(false), 3000);
    return () => clearTimeout(t);
  }, [showToast]);

  return (
    <section id="qa" className="relative w-full bg-transparent py-28 md:py-40">
      {/* 右侧固定 Q&A 索引点 —— 仅桌面端显示 */}
      <nav className="fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-4 lg:flex">
        {qnaData.map((item, i) => (
          <a
            key={item.id}
            href={`#qa-q${i + 1}`}
            className="group flex items-center justify-end gap-3"
            title={item.question}
          >
            <span className={`whitespace-nowrap font-mono text-[10px] uppercase tracking-widest transition-opacity duration-300 ${
              activeIdx === i ? "text-volt-400 opacity-100" : "text-mist-500 opacity-0 group-hover:opacity-60"
            }`}>
              Q{i + 1}
            </span>
            <span className={`h-2 w-2 rounded-full transition-all duration-300 ${
              activeIdx === i
                ? "scale-125 bg-volt-400"
                : "bg-mist-700 group-hover:bg-mist-300"
            }`} />
          </a>
        ))}
      </nav>
      <div className="shell">
        {/* 章节标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-20 flex items-end justify-between"
        >
          <div>
            <span className="eyebrow">/ 07 — Q&A</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              常见问题
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist-500">
              关于学习路径、能力价值与面试高频问题的结构化回答。
            </p>
          </div>
          <div className="hidden h-12 w-12 items-center justify-center border border-ink-600 text-mist-300 md:flex">
            <HelpCircle className="h-5 w-5" />
          </div>
        </motion.div>

        {/* Q&A 列表 —— Q1 问题左答案右，Q2 问题右答案左，Q3 整屏 */}
        <div className="space-y-16 md:space-y-24">
          {qnaData.map((item, index) => {
            const reversed = index % 2 === 1;
            const isFullWidth = !item.scenarios && index === qnaData.length - 1;

            return (
              <motion.article
                key={item.id}
                id={`qa-q${index + 1}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease, delay: index * 0.1 }}
                className="group scroll-mt-24"
              >
                {/* Q3 整屏布局：问题 + 答案 + 场景卡纵向排列 */}
                {item.scenarios ? (
                  <div className="w-full">
                    {/* 问题卡 */}
                    <BorderGlow {...BORDER_GLOW_PROPS} className="qna-card qna-card--question mb-4 md:mb-5">
                      <div className="p-6 md:p-8">
                        <div className="flex items-start gap-4 md:gap-6">
                          <span className="mt-1 font-mono text-2xl font-bold tracking-tighter text-volt-400 md:text-3xl">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="flex-1">
                            <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                              / Question
                            </span>
                            <h3 className="mt-1 font-display text-2xl font-bold leading-snug tracking-tight text-amber-300 md:text-3xl">
                              {item.question}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </BorderGlow>
                    {/* 答案卡 */}
                    <BorderGlow {...BORDER_GLOW_PROPS} className="qna-card qna-card--answer">
                      <div className="p-6 md:p-8">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                          / Answer
                        </span>
                        <div className="mt-4 space-y-4">
                          {item.paragraphs.map((paragraph, pIdx) => (
                            <p key={pIdx} className="text-sm leading-relaxed text-mist-300 md:text-base">
                              <RichText text={paragraph} />
                            </p>
                          ))}
                        </div>
                        {/* 场景卡 —— 整屏 grid，左右页边距一致 */}
                        <div className="mt-10 grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 md:grid-cols-2">
                          {item.scenarios.map((scenario, sIdx) => (
                            <motion.div
                              key={sIdx}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true, margin: "-60px" }}
                              transition={{ duration: 0.6, ease, delay: (sIdx % 2) * 0.1 }}
                              className="relative bg-ink-950 p-6 transition-colors hover:bg-ink-850 md:p-7"
                            >
                              <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-volt-400 transition-transform duration-500 group-hover:scale-x-100" />
                              <h4 className="font-display text-lg font-bold tracking-tight text-mist-50">
                                {scenario.title}
                              </h4>
                              <div className="mt-4 space-y-3">
                                <div>
                                  <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                                    痛点
                                  </span>
                                  <p className="mt-1 text-xs leading-relaxed text-mist-400 md:text-sm">
                                    <RichText text={scenario.pain} />
                                  </p>
                                </div>
                                <div>
                                  <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                                    价值
                                  </span>
                                  <p className="mt-1 text-xs leading-relaxed text-mist-100 md:text-sm">
                                    <RichText text={scenario.value} />
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </BorderGlow>
                  </div>
                ) : (
                  /* Q1/Q2 左右分栏布局 */
                  <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 ${
                    isFullWidth ? "" : ""
                  }`}>
                    {/* 问题卡 —— Q1 在左，Q2 在右 */}
                    <div className={reversed ? "md:order-2" : "md:order-1"}>
                      <BorderGlow {...BORDER_GLOW_PROPS} className="qna-card qna-card--question h-full">
                        <div className="p-6 md:p-8">
                          <div className="flex items-start gap-4 md:gap-6">
                            <span className="mt-1 font-mono text-2xl font-bold tracking-tighter text-volt-400 md:text-3xl">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="flex-1">
                              <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                                / Question
                              </span>
                              <h3 className="mt-1 font-display text-2xl font-bold leading-snug tracking-tight text-amber-300 md:text-3xl">
                                {item.question}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </BorderGlow>
                    </div>
                    {/* 答案卡 —— Q1 在右，Q2 在左 */}
                    <div className={reversed ? "md:order-1" : "md:order-2"}>
                      <BorderGlow {...BORDER_GLOW_PROPS} className="qna-card qna-card--answer h-full">
                        <div className="p-6 md:p-8">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                            / Answer
                          </span>
                          <div className="mt-4 space-y-4">
                            {item.paragraphs.map((paragraph, pIdx) => (
                              <p key={pIdx} className="text-sm leading-relaxed text-mist-300 md:text-base">
                                <RichText text={paragraph} />
                              </p>
                            ))}
                          </div>
                        </div>
                      </BorderGlow>
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>

        {/* 底部 BlurText 标语 + CTA */}
        <div className="mt-24 flex flex-col items-center md:mt-32">
          <BlurText
            text="Work With YW—未来已来"
            animateBy="words"
            direction="top"
            delay={150}
            className="text-center font-display text-4xl font-bold tracking-tight text-mist-50 md:text-6xl"
          />
          <button
            onClick={handleCopyEmail}
            className="btn-ghost mt-10 cursor-pointer"
          >
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-volt-400" />
            开始合作
          </button>
        </div>
      </div>

      {/* 复制邮箱成功提示 —— 胶囊弹窗 */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 80, x: "-50%", scale: 0.8 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: 20, x: "-50%", scale: 0.9, transition: { duration: 0.6 } }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="fixed bottom-10 left-1/2 z-50 flex items-center gap-3 rounded-full border border-volt-400/30 bg-ink-900/90 px-6 py-3 backdrop-blur-md"
          >
            <span className="h-2 w-2 animate-pulse-soft rounded-full bg-volt-400" />
            <span className="font-mono text-xs tracking-wider text-mist-50">
              已复制邮箱地址
            </span>
            <span className="font-mono text-xs text-volt-400">{EMAIL}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
