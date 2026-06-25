import { motion } from "framer-motion";
import { timeline } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

type FlatEvent = {
  year: string;
  color: "volt" | "mist";
  month: string;
  title: string;
  desc: string;
  image?: string;
};

export default function Timeline() {
  // 把按年份分组的事件展平成一条流，用于左右交替排布
  const flat: FlatEvent[] = [];
  timeline.forEach((year) => {
    year.events.forEach((ev) => {
      flat.push({
        year: year.year,
        color: year.color,
        month: ev.month,
        title: ev.title,
        desc: ev.desc,
        image: "image" in ev ? (ev.image as string) : undefined,
      });
    });
  });

  return (
    <section id="timeline" className="relative w-full overflow-hidden bg-ink-900 py-28 md:py-40">
      {/* 背景柔光 */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-volt-500/5 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-volt-600/4 blur-[140px]" />

      <div className="shell">
        {/* 章节标 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-24 flex items-end justify-between"
        >
          <div>
            <span className="eyebrow">/ 04 — Timeline</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              成长轨迹
            </h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-mist-500 md:block">
            2023 — 2026，
            <br />
            从入学到 AI Native 的演进。
          </p>
        </motion.div>

        {/* 弯曲时间线主体 */}
        <div className="relative">
          {flat.map((ev, i) => {
            const isLeft = i % 2 === 0;
            const isVolt = ev.color === "volt";
            const showYear =
              i === 0 || flat[i - 1].year !== ev.year;

            return (
              <div
                key={i}
                className="relative mb-16 md:mb-24"
              >
                {/* 年份大标 */}
                {showYear && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.8, ease }}
                    className="relative mb-10 flex items-center gap-4 md:mb-14 md:justify-center"
                  >
                    <span className="font-display text-4xl font-bold tracking-tightest text-mist-50 md:text-6xl">
                      {ev.year}
                    </span>
                    <span className="h-px w-12 bg-volt-400/40" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-mist-700">
                      / {ev.year}
                    </span>
                  </motion.div>
                )}

                {/* 单事件行：左右交错 */}
                <div
                  className={`relative flex w-full items-center gap-4 md:gap-12 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* 事件卡 */}
                  <motion.div
                    initial={{ opacity: 0, x: isLeft ? -30 : 30, y: 20 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, ease }}
                    className="group relative w-full md:w-[calc(50%-3rem)]"
                  >
                    <div className="relative border border-ink-700 bg-ink-950/80 backdrop-blur-sm transition-colors hover:border-ink-600 hover:bg-ink-900">
                      {/* 事件配图 */}
                      {ev.image && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-ink-700">
                          <img
                            src={ev.image}
                            alt={ev.title}
                            className="h-full w-full object-cover opacity-60 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
                        </div>
                      )}
                      <div className="p-5 md:p-6">
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-mono text-[11px] uppercase tracking-widest ${
                              isVolt ? "text-volt-400" : "text-mist-400"
                            }`}
                          >
                            {ev.month}
                          </span>
                          <span className="h-px flex-1 bg-ink-700" />
                          <span className="font-mono text-[10px] uppercase tracking-widest text-mist-700">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        <p className="mt-3 font-display text-lg font-bold leading-snug text-mist-50 md:text-xl">
                          {ev.title}
                        </p>
                        <p className="mt-2 text-xs leading-relaxed text-mist-300 md:text-sm">
                          {ev.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* 中心节点 */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, ease, delay: 0.2 }}
                    className="relative z-10 flex shrink-0 items-center justify-center"
                  >
                    <div
                      className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                        isVolt
                          ? "border-volt-400 bg-ink-900"
                          : "border-mist-500 bg-ink-900"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          isVolt ? "bg-volt-400" : "bg-mist-500"
                        }`}
                      />
                      <span
                        className={`absolute h-8 w-8 animate-ping-slow rounded-full ${
                          isVolt ? "bg-volt-400/10" : "bg-mist-500/10"
                        }`}
                      />
                    </div>
                  </motion.div>

                  {/* 另一侧的占位（保持节点居中） */}
                  <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                </div>

                {/* 弯曲连接线 SVG（在两事件之间的间隙画曲线） */}
                {i < flat.length - 1 && (
                  <div
                    className="pointer-events-none absolute left-1/2 top-full h-16 w-32 -translate-x-1/2 md:h-24 md:w-48"
                    aria-hidden
                  >
                    <svg
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      className="h-full w-full"
                    >
                      <motion.path
                        d={
                          isLeft
                            ? "M 50 0 C 90 25, 90 75, 50 100"
                            : "M 50 0 C 10 25, 10 75, 50 100"
                        }
                        fill="none"
                        stroke={isVolt ? "#7DD3FC" : "#475569"}
                        strokeWidth="0.6"
                        strokeDasharray="2 2"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease, delay: 0.3 }}
                      />
                    </svg>
                  </div>
                )}
              </div>
            );
          })}

          {/* 终点节点 */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="mx-auto flex w-fit items-center gap-3 border border-volt-400/40 bg-ink-950/80 px-5 py-3 backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-volt-400" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
              To be continued · 2026+
            </span>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="mt-12 text-right font-mono text-[10px] uppercase tracking-widest text-mist-700"
        >
          * 时间线基于《简历二版》附录：时间线总览
        </motion.p>
      </div>
    </section>
  );
}
