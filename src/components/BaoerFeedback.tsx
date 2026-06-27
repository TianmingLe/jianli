import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  TrendingUp,
  MessageCircle,
  Heart,
  BarChart3,
} from "lucide-react";
import BounceCards from "@/components/BounceCards/BounceCards";
import Masonry, { type MasonryItem } from "@/components/Masonry/Masonry";
import audienceAge from "@/data/self-media/baoer/《钢铁是怎样炼成的》年龄画像受众.webp";
import pavelData from "@/data/self-media/baoer/保尔柯察金数据分析.webp";
import genderDist from "@/data/self-media/baoer/观众性别分布.webp";
import audienceProfile from "@/data/self-media/baoer/观众画像.webp";
import topicHeat from "@/data/self-media/baoer/钢铁是怎样炼成的巨量算数话题热度.webp";
import c1 from "@/data/self-media/baoer/评论区1.webp";
import c2 from "@/data/self-media/baoer/评论区2.webp";
import c3 from "@/data/self-media/baoer/评论区3.webp";
import c4 from "@/data/self-media/baoer/评论区4.webp";
import c5 from "@/data/self-media/baoer/评论区5.webp";
import c6 from "@/data/self-media/baoer/评论区6.webp";
import c7 from "@/data/self-media/baoer/评论区7.webp";
import c8 from "@/data/self-media/baoer/评论区8.webp";
import c10 from "@/data/self-media/baoer/评论区10.webp";
import c11 from "@/data/self-media/baoer/评论区11.webp";
import c12 from "@/data/self-media/baoer/评论区12.webp";

const ease = [0.22, 1, 0.36, 1] as const;

const stats = [
  { label: "核心受众", value: "18-23 岁", desc: "男性占比 71%-80%" },
  { label: "话题峰值", value: "25 万+", desc: "《钢铁是怎样炼成的》热度" },
  { label: "角色峰值", value: "近 50 万", desc: "「保尔柯察金」热度" },
  { label: "高偏好省份", value: "河南 / 江苏 / 山东", desc: "TGI 高于大盘" },
];

const quotes = [
  {
    user: "在悠远的苍穹中",
    content:
      "我是在部队看完《钢铁是怎样炼成的》的，我哭三次……保尔加入第一骑兵军、战友唱《华沙曲》牺牲、获红旗勋章，每一个画面都像是刻在心里。",
    source: "B 站长评",
  },
  {
    user: "润",
    content:
      "我看这本书的时候真的好几次激动地流泪！他一定程度上塑造了我的信仰体系！",
    source: "抖音评论",
  },
  {
    user: "烟鬼",
    content:
      "小学四年级第一次读这本书，读得我头皮发麻，读得心里滚热且沸腾着……苏维埃的共产主义精神，一定能给中国人带来自由。",
    source: "抖音评论",
  },
  {
    user: "是小林_",
    content:
      "铁路食堂后厨好真实啊……4 个小时能给我累到腰抬不起来。从此以后我对饮食服务业的兼职就祛魅了。",
    source: "B 站评论",
  },
];

const charts = [
  { src: audienceProfile, label: "观众画像", icon: Users },
  { src: audienceAge, label: "年龄分布", icon: BarChart3 },
  { src: genderDist, label: "性别分布", icon: Users },
  { src: topicHeat, label: "话题热度", icon: TrendingUp },
  { src: pavelData, label: "保尔柯察金热度", icon: TrendingUp },
];

const comments = [
  { src: c1, label: "评论区 1" },
  { src: c2, label: "评论区 2" },
  { src: c3, label: "评论区 3" },
  { src: c4, label: "评论区 4" },
  { src: c5, label: "评论区 5" },
  { src: c6, label: "评论区 6" },
  { src: c7, label: "评论区 7" },
  { src: c8, label: "评论区 8" },
  { src: c10, label: "评论区 10" },
  { src: c11, label: "评论区 11" },
  { src: c12, label: "评论区 12" },
];

// 评论区精选 Masonry 瀑布流（错落高度）
const masonryHeights = [520, 380, 640, 440, 580, 400, 680, 460, 600, 420, 560];
const masonryItems: MasonryItem[] = comments.map((c, i) => ({
  id: String(i + 1),
  img: c.src,
  height: masonryHeights[i % masonryHeights.length],
}));

// 数据洞察 BounceCards 展示（5 张图表错落卡片）
const chartBounceImages = charts.map((c) => c.src);
const chartBounceTransforms = [
  "rotate(5deg) translate(-200px)",
  "rotate(0deg) translate(-100px)",
  "rotate(-5deg)",
  "rotate(5deg) translate(100px)",
  "rotate(-5deg) translate(200px)",
];

export default function BaoerFeedback() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section id="baoer-feedback" className="relative w-full scroll-mt-24 bg-ink-950 py-28 md:py-40">
      <div className="shell">
        {/* 章节标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-20"
        >
          <span className="eyebrow">/ 05 — Audience Feedback</span>
          <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
            观众回响
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-mist-500">
            基于巨量算数、B 站与抖音后台数据，以及真实评论区截图。数字背后，是年轻观众对红色经典与保尔精神的一次集体回望。
          </p>
        </motion.div>

        {/* 核心数据卡 */}
        <div className="mb-20 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              className="border border-ink-700 bg-ink-900 p-6"
            >
              <p className="font-mono text-[10px] uppercase tracking-widest text-mist-700">
                {s.label}
              </p>
              <p className="mt-3 font-display text-3xl font-bold tracking-tighter text-mist-50">
                {s.value}
              </p>
              <p className="mt-2 text-xs text-mist-500">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* 数据图表 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-20"
        >
          <div className="mb-6 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-volt-400" />
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-mist-300">
              / 数据洞察
            </h3>
          </div>
          <div className="flex w-full justify-center overflow-hidden py-4">
            <BounceCards
              className="custom-bounceCards"
              images={chartBounceImages}
              labels={charts.map((c) => c.label)}
              containerWidth={640}
              containerHeight={250}
              animationDelay={1.4}
              animationStagger={0.12}
              easeType="elastic.out(1, 0.5)"
              transformStyles={chartBounceTransforms}
              enableHover
              onCardDoubleClick={(i) => setLightbox(chartBounceImages[i])}
            />
          </div>
        </motion.div>

        {/* 精选评论 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-20"
        >
          <div className="mb-6 flex items-center gap-2">
            <MessageCircle className="h-4 w-4 text-volt-400" />
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-mist-300">
              / 精选观后感
            </h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {quotes.map((q, i) => (
              <motion.div
                key={q.user}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.08 }}
                className="relative border border-ink-700 bg-ink-900 p-6"
              >
                <Heart className="absolute right-5 top-5 h-4 w-4 text-volt-400/40" />
                <p className="text-sm leading-relaxed text-mist-200">
                  “{q.content}”
                </p>
                <div className="mt-5 flex items-center justify-between border-t border-ink-700 pt-4">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                    {q.user}
                  </span>
                  <span className="font-mono text-[10px] text-mist-600">
                    {q.source}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 评论区截图 — 网格展示 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-volt-400" />
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-mist-300">
                / 评论区精选
              </h3>
            </div>
            <span className="font-mono text-[10px] text-mist-600">
              双击图片放大查看
            </span>
          </div>

          <Masonry
            items={masonryItems}
            ease="power3.out"
            duration={0.6}
            stagger={0.16}
            animateFrom="bottom"
            scaleOnHover
            hoverScale={0.95}
            blurToFocus={false}
            colorShiftOnHover
            onItemDoubleClick={(item) => setLightbox(item.img)}
          />
          <div style={{ height: 20 }} />
        </motion.div>
      </div>

      {/* 图片放大查看 — 点击其他地方退出 */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="放大查看"
            className="max-h-[90vh] max-w-[90vw] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
