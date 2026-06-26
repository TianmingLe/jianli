import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  Github,
  ArrowUpRight,
  MessageCircle,
  X,
} from "lucide-react";
import { profile } from "@/data/content";
import bilibiliIcon from "@/data/icon/bilibili.webp";
import xiaohongshuIcon from "@/data/icon/xiaohongshu.webp";
import douyinIcon from "@/data/icon/douyin.webp";

const ease = [0.22, 1, 0.36, 1] as const;

const links = [
  { icon: Phone, label: "电话", value: profile.contacts.phone, href: `tel:${profile.contacts.phone}` },
  { icon: Mail, label: "邮箱", value: profile.contacts.email, href: `mailto:${profile.contacts.email}` },
  { icon: Github, label: "GitHub", value: "github.com/TianmingLe", href: profile.contacts.github },
  { iconSrc: bilibiliIcon, label: "哔哩哔哩", value: "11K+ 粉丝", href: profile.contacts.bilibili },
  { iconSrc: xiaohongshuIcon, label: "小红书", value: "4.6K+ 粉丝", href: profile.contacts.xiaohongshu },
  { iconSrc: douyinIcon, label: "抖音", value: "4.9K+ 粉丝", href: profile.contacts.douyin },
];

export default function Contact() {
  const [showWechat, setShowWechat] = useState(false);

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-ink-950 py-28 md:py-32"
    >
      {/* 背景光晕 */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 animate-pulse-soft rounded-full bg-volt-500/8 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #7DD3FC 1px, transparent 1px), linear-gradient(to bottom, #7DD3FC 1px, transparent 1px)",
            backgroundSize: "100px 100px",
          }}
        />
      </div>

      <div className="shell relative z-10">
        {/* 顶部小标 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-12 bg-volt-400" />
          <span className="eyebrow">/ 06 — Let's Connect</span>
        </motion.div>
      </div>

      {/* 中部超大 CTA */}
      <div className="shell relative z-10 flex flex-1 flex-col items-center justify-center py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="font-mono text-xs uppercase tracking-widest text-mist-500"
        >
          有能源 / AI / 项目想法？让我们一起实现
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease, delay: 0.15 }}
          className="mt-6 font-display text-[16vw] font-bold leading-[0.9] tracking-tightest text-mist-50 md:text-[12vw] lg:text-[11rem]"
        >
          Let's
          <br />
          Create<span className="text-volt-400">.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a href={`mailto:${profile.contacts.email}`} className="btn-ghost">
            发送邮件
            <ArrowUpRight className="h-4 w-4" />
          </a>
          {/* 发起合作 · 微信二维码 */}
          <button
            type="button"
            onClick={() => setShowWechat((v) => !v)}
            onMouseEnter={() => setShowWechat(true)}
            onMouseLeave={() => setShowWechat(false)}
            className="btn-ghost flex items-center gap-2"
          >
            <MessageCircle className="h-4 w-4" />
            发起合作
          </button>
        </motion.div>
      </div>

      {/* 微信二维码浮层 — 固定在屏幕右侧 */}
      <AnimatePresence>
        {showWechat && (
          <motion.div
            key="wechat-qr"
            initial={{ opacity: 0, scale: 0.6, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: 40 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="fixed right-6 top-1/2 z-50 -translate-y-1/2 md:right-10"
          >
            <div className="relative border border-volt-400/30 bg-ink-900/95 p-4 backdrop-blur-md shadow-2xl">
              {/* 关闭按钮 */}
              <button
                type="button"
                onClick={() => setShowWechat(false)}
                className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-ink-600 bg-ink-850 text-mist-400 transition-colors hover:text-volt-400"
              >
                <X className="h-3 w-3" />
              </button>
              <p className="mb-2 text-center font-mono text-[10px] uppercase tracking-widest text-volt-400">
                / 微信合作
              </p>
              <div className="relative h-64 w-64 overflow-hidden border border-ink-700">
                <img loading="lazy" decoding="async"
                  src={profile.contacts.wechatQr}
                  alt="微信二维码"
                  className="h-full w-full object-contain"
                />
              </div>
              <p className="mt-2 text-center text-xs text-mist-300">扫码添加微信</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部联系方式网格 */}
      <div className="shell relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="grid grid-cols-2 gap-px border border-ink-700 bg-ink-700 md:grid-cols-3 lg:grid-cols-6"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="group flex flex-col gap-3 bg-ink-900 p-6 transition-colors hover:bg-ink-850"
            >
              <div className="flex items-center justify-between">
                {"iconSrc" in l ? (
                  <img loading="lazy" decoding="async"
                    src={l.iconSrc}
                    alt={l.label}
                    className="h-5 w-5 rounded-sm object-contain"
                  />
                ) : (
                  <l.icon className="h-5 w-5 text-mist-500 transition-colors group-hover:text-volt-400" />
                )}
                <ArrowUpRight className="h-3 w-3 text-mist-700 transition-colors group-hover:text-volt-400" />
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-mist-500">
                  {l.label}
                </p>
                <p className="mt-1 truncate text-xs text-mist-100">
                  {l.value}
                </p>
              </div>
            </a>
          ))}
        </motion.div>

        {/* 页脚 */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-700 pt-8 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-widest text-mist-700">
            © 2026 {profile.name} — {profile.identityEn}
          </p>
          <p className="font-mono text-[10px] uppercase tracking-widest text-mist-700">
            Designed & Built with AI · Dark Mode Native
          </p>
        </div>
      </div>
    </section>
  );
}
