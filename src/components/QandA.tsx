import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { qnaData } from "@/data/content";
import BorderGlow from "./BorderGlow";

const ease = [0.22, 1, 0.36, 1] as const;

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
  return (
    <section id="qa" className="relative w-full bg-transparent py-28 md:py-40">
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

        {/* Q&A 列表 —— 每个 Q&A 拆成「问题模块」与「回答模块」两个独立 BorderGlow 卡片 */}
        <div className="space-y-16 md:space-y-24">
          {qnaData.map((item, index) => (
            <motion.article
              key={item.id}
              id={`qa-q${index + 1}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.8, ease, delay: index * 0.1 }}
              className={`group scroll-mt-24 space-y-4 md:space-y-5 w-full max-w-3xl ${
                index % 2 === 0 ? "mr-auto" : "ml-auto"
              }`}
            >
              {/* ============ 问题模块 ============ */}
              <BorderGlow
                {...BORDER_GLOW_PROPS}
                className="qna-card qna-card--question"
              >
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

              {/* ============ 回答模块 ============ */}
              <BorderGlow
                {...BORDER_GLOW_PROPS}
                className="qna-card qna-card--answer"
              >
                <div className="p-7 md:p-10">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                    / Answer
                  </span>

                  {/* 回答段落 */}
                  <div className="mt-4 space-y-4 md:pl-0">
                    {item.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="max-w-4xl text-sm leading-relaxed text-mist-300 md:text-base"
                      >
                        <RichText text={paragraph} />
                      </p>
                    ))}
                  </div>

                  {/* 场景化价值卡片（Q3） */}
                  {item.scenarios && (
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
                  )}
                </div>
              </BorderGlow>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
