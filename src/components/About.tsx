import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Github,
  Youtube,
  BookOpen,
  Video,
} from "lucide-react";
import { profile } from "@/data/content";

const ease = [0.22, 1, 0.36, 1] as const;

const contactLinks = [
  { icon: Phone, label: "Phone", value: profile.contacts.phone, href: `tel:${profile.contacts.phone}` },
  { icon: Mail, label: "Email", value: profile.contacts.email, href: `mailto:${profile.contacts.email}` },
  { icon: Github, label: "GitHub", value: "TianmingLe", href: profile.contacts.github },
  { icon: Youtube, label: "Bilibili", value: "12K+ 粉丝", href: profile.contacts.bilibili },
  { icon: BookOpen, label: "小红书", value: "4.6K+ 粉丝", href: profile.contacts.xiaohongshu },
  { icon: Video, label: "抖音", value: "4.9K+ 粉丝", href: profile.contacts.douyin },
];

export default function About() {
  return (
    <section id="about" className="relative w-full bg-ink-950 py-28 md:py-40">
      {/* 顶部细线 */}
      <div className="shell">
        <div className="hairline" />
      </div>

      <div className="shell mt-20">
        {/* 章节标 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 flex items-end justify-between"
        >
          <div>
            <span className="eyebrow">/ 01 — About</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              关于我
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-mist-700 md:block">
            {profile.mbti} · AI Native
          </span>
        </motion.div>

        {/* 主体：左图右文 */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* 左：人物图 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5"
          >
            <div className="group relative aspect-[4/5] overflow-hidden border border-ink-700">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              {/* 角标 */}
              <div className="absolute left-4 top-4 flex items-center gap-2 border border-ink-600/60 bg-ink-950/60 px-3 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-volt-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist-300">
                  Available
                </span>
              </div>
              {/* 底部姓名 */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-3xl font-bold tracking-tighter text-mist-50">
                  {profile.name}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-volt-400">
                  {profile.identityEn}
                </p>
              </div>
            </div>
          </motion.div>

          {/* 右：介绍 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="flex flex-col justify-between lg:col-span-7"
          >
            <div>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight text-mist-50 md:text-3xl">
                {profile.taglineSub}
              </p>
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-mist-300">
                {profile.bio}
              </p>

              {/* 核心特质 */}
              <div className="mt-10 grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 sm:grid-cols-2">
                {profile.traits.map((trait, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                    className="flex items-start gap-3 bg-ink-900 p-5"
                  >
                    <span className="mt-0.5 font-mono text-[11px] text-volt-400">
                      0{i + 1}
                    </span>
                    <span className="text-sm leading-relaxed text-mist-100">
                      {trait}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 联系方式网格 */}
            <div className="mt-10">
              <span className="eyebrow">/ Contact Channels</span>
              <div className="mt-4 grid grid-cols-2 gap-px border border-ink-700 bg-ink-700 md:grid-cols-3">
                {contactLinks.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="group flex items-center gap-3 bg-ink-900 p-4 transition-colors hover:bg-ink-800"
                  >
                    <c.icon className="h-4 w-4 shrink-0 text-mist-500 transition-colors group-hover:text-volt-400" />
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                        {c.label}
                      </p>
                      <p className="truncate text-xs text-mist-100">
                        {c.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 底部数据条 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease }}
          className="mt-20 grid grid-cols-2 gap-px border border-ink-700 bg-ink-700 md:grid-cols-3 lg:grid-cols-6"
        >
          {profile.stats.map((s, i) => (
            <div
              key={i}
              className="group bg-ink-900 p-6 transition-colors hover:bg-ink-850"
            >
              <p className="font-display text-3xl font-bold tracking-tighter text-mist-50 transition-colors group-hover:text-volt-400 md:text-4xl">
                {s.value}
              </p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-mist-500">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
