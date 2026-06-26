import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Github,
  GraduationCap,
  Building2,
} from "lucide-react";
import {
  profile,
  basicInfo,
  education,
  internships,
} from "@/data/content";
import bilibiliIcon from "@/data/icon/bilibili.png";
import xiaohongshuIcon from "@/data/icon/xiaohongshu.png";
import douyinIcon from "@/data/icon/douyin.png";

const ease = [0.22, 1, 0.36, 1] as const;

const contactLinks = [
  { icon: Phone, label: "Phone", value: profile.contacts.phone, href: `tel:${profile.contacts.phone}` },
  { icon: Mail, label: "Email", value: profile.contacts.email, href: `mailto:${profile.contacts.email}` },
  { icon: Github, label: "GitHub", value: "TianmingLe", href: profile.contacts.github },
  { iconSrc: bilibiliIcon, label: "Bilibili", value: "12K+ 粉丝", href: profile.contacts.bilibili },
  { iconSrc: xiaohongshuIcon, label: "小红书", value: "4.6K+ 粉丝", href: profile.contacts.xiaohongshu },
  { iconSrc: douyinIcon, label: "抖音", value: "4.9K+ 粉丝", href: profile.contacts.douyin },
];

export default function About() {
  return (
    <section id="about" className="relative w-full bg-ink-950 py-28 md:py-40">
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
            <span className="eyebrow">/ 01 — Overview</span>
            <h2 className="mt-4 font-display text-5xl font-bold tracking-tighter text-mist-50 md:text-7xl">
              个人综述
            </h2>
          </div>
          <span className="hidden font-mono text-xs text-mist-700 md:block">
            {profile.mbti} · AI Native
          </span>
        </motion.div>

        {/* 主体：左图右文 */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* 左：人物图 + 基本信息 */}
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
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
              <div className="absolute left-4 top-4 flex items-center gap-2 border border-ink-600/60 bg-ink-950/60 px-3 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-volt-400" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-mist-300">
                  Available
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-display text-3xl font-bold tracking-tighter text-mist-50">
                  {profile.name}
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-volt-400">
                  {profile.identityEn}
                </p>
              </div>
            </div>

            {/* 基本信息表 */}
            <div className="mt-6 grid grid-cols-2 gap-px border border-ink-700 bg-ink-700">
              {basicInfo.map((info) => (
                <div key={info.label} className="bg-ink-900 px-4 py-3">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                    {info.label}
                  </p>
                  <p className="mt-1 text-sm text-mist-100">{info.value}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* 右：介绍 + 教育 + 联系方式 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease, delay: 0.15 }}
            className="flex flex-col gap-10 lg:col-span-7"
          >
            {/* 个人定位 */}
            <div>
              <span className="eyebrow">/ Positioning</span>
              <p className="mt-4 font-display text-2xl font-medium leading-snug tracking-tight text-mist-50 md:text-3xl">
                {profile.taglineSub}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-mist-300">
                {profile.bio}
              </p>
            </div>

            {/* 教育背景 */}
            <div>
              <span className="eyebrow">/ Education</span>
              <div className="mt-4 flex flex-col gap-px border border-ink-700 bg-ink-700">
                {education.map((e) => (
                  <div
                    key={e.school}
                    className="group flex items-start gap-4 bg-ink-900 p-5 transition-colors hover:bg-ink-850"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink-600 text-mist-300 transition-colors group-hover:border-volt-400 group-hover:text-volt-400">
                      <GraduationCap className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <p className="font-display text-lg font-bold text-mist-50">
                          {e.school}
                        </p>
                        <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                          {e.period}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-mist-100">{e.degree}</p>
                      <p className="mt-1 text-xs text-mist-500">
                        {e.level}
                        {e.note && ` · ${e.note}`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 联系方式 */}
            <div>
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
                    {"iconSrc" in c ? (
                      <img
                        src={c.iconSrc}
                        alt={c.label}
                        className="h-4 w-4 shrink-0 rounded-sm object-contain"
                      />
                    ) : (
                      <c.icon className="h-4 w-4 shrink-0 text-mist-500 transition-colors group-hover:text-volt-400" />
                    )}
                    <div className="min-w-0">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                        {c.label}
                      </p>
                      <p className="truncate text-xs text-mist-100">{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* 数据条 */}
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

        {/* 实习经历 */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease }}
            className="mb-10"
          >
            <span className="eyebrow">/ Internship</span>
            <h3 className="mt-3 font-display text-3xl font-bold tracking-tighter text-mist-50 md:text-4xl">
              实习经历
            </h3>
          </motion.div>
          <div className="grid grid-cols-1 gap-px border border-ink-700 bg-ink-700 lg:grid-cols-2">
            {internships.map((intern, i) => (
              <motion.div
                key={intern.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, ease, delay: i * 0.1 }}
                className="group bg-ink-900 p-7 transition-colors hover:bg-ink-850"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center overflow-hidden border border-ink-600 text-mist-300 transition-colors group-hover:border-volt-400 group-hover:text-volt-400">
                      {intern.icon ? (
                        <img
                          src={intern.icon}
                          alt={intern.company}
                          className="h-8 w-8 object-contain"
                        />
                      ) : (
                        <Building2 className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-display text-lg font-bold text-mist-50">
                        {intern.company}
                      </p>
                      <p className="text-xs text-mist-300">{intern.role}</p>
                    </div>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-volt-400">
                    {intern.period}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {intern.keywords.map((k) => (
                    <span
                      key={k}
                      className="border border-ink-600 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-mist-300"
                    >
                      {k}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-mist-300">
                  {intern.summary}
                </p>
                <ul className="mt-4 space-y-2">
                  {intern.points.map((pt, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs leading-relaxed text-mist-100"
                    >
                      <span className="mt-1 h-1 w-1 shrink-0 rounded-full bg-volt-400" />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
