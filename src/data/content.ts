// 所有作品集内容数据集中于此，便于后续替换为 CMS / API

const IMG = (prompt: string, size = "landscape_16_9") =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=${size}`;

export const profile = {
  name: "胡亚伟",
  nameEn: "HU Yawei",
  identity: ["视觉设计师", "AI 设计师", "品牌设计师"],
  identityEn: "Visual / AI / Brand Designer",
  tagline: "AI Native Designer",
  taglineSub: "用 AI 重塑视觉与品牌的边界",
  bio: "一名对视觉表达与人工智能交叉领域充满热情的设计师。具备扎实的品牌系统设计能力，同时深度拥抱 AIGC 技术，致力于探索 AI 赋能视觉创作与品牌建设的创新方案。从 4K 影像修复到数字人、AI 绘画、AI 视频，持续以技术拓展设计的可能性。",
  traits: [
    "视觉系统构建能力（品牌识别 / 海报 / 排版）",
    "前沿 AIGC 应用能力（AI 绘画 / 数字人 / AI 视频 / AI 音乐）",
    "数据驱动的创作思维（Python / SQL / 数据分析）",
    "出色的项目执行力与跨界整合能力",
  ],
  mbti: "ENTJ-A",
  avatar: IMG(
    "dark moody cinematic portrait of a young east asian male designer, side profile silhouette, dramatic rim lighting, deep black background with subtle cyan glow, high contrast, film grain, editorial fashion photography, 35mm",
    "portrait_4_3",
  ),
  contacts: {
    phone: "19935072544",
    email: "1767976037@qq.com",
    github: "https://github.com/TianmingLe",
    bilibili: "https://b23.tv/NPxHvW4",
    xiaohongshu: "https://xhslink.com/m/5h3GEynfA7n",
    douyin: "https://v.douyin.com/mMECQWKw-Vs/",
  },
  stats: [
    { label: "全网话题量", value: "10亿+" },
    { label: "单视频播放", value: "200万+" },
    { label: "全网粉丝", value: "21K+" },
    { label: "完整项目", value: "6+" },
    { label: "竞赛获奖", value: "4 项" },
    { label: "志愿时长", value: "100+ h" },
  ],
};

export const heroPoster = IMG(
  "ultra dark abstract atmospheric background, flowing black ink particles, deep space with subtle electric blue glow, cinematic volumetric light, minimal, premium, tech aesthetic, 4k, grain texture",
  "landscape_16_9",
);

export const projects = [
  {
    id: "p01",
    index: "01",
    title: "《钢铁是怎样炼成的》4K 修复",
    category: "Video Restoration / AIGC",
    year: "2025",
    cover: IMG(
      "dark cinematic vintage film still, soviet era worker silhouette, dramatic black and white with subtle cold blue tint, film grain, 4k restored look, moody atmosphere, classic cinema",
      "landscape_16_9",
    ),
    description:
      "独立完成经典影片 4K 修复与发布，使用 AI 超分、去噪、色彩校正与 60fps 插帧，全网引发 10 亿级话题热度，唤醒红色经典的学习浪潮。",
    tags: ["4K 修复", "AI 超分", "色彩校正", "60fps 插帧"],
  },
  {
    id: "p02",
    index: "02",
    title: "Altezhong 智能眼镜系统",
    category: "AI Hardware / Embedded",
    year: "2025 — 2026",
    cover: IMG(
      "futuristic smart glasses product shot on pure black background, glowing cyan accent lines, tech hardware, minimal premium industrial design, studio lighting, high detail",
      "landscape_16_9",
    ),
    description:
      "基于「轻眼镜 + 重后端」架构的智能眼镜系统，覆盖 ESP32-S3 固件、Flutter App、FastAPI 后端与 PC 中继，实现 BLE 音频、视觉特征提取与 OTA 升级全链路。",
    tags: ["ESP32-S3", "Flutter", "FastAPI", "BLE 音频"],
  },
  {
    id: "p03",
    index: "03",
    title: "知心 AI — 情感与规划助手",
    category: "AI Agent / RAG",
    year: "2025 — 2026",
    cover: IMG(
      "abstract AI neural network visualization, dark background with glowing cyan nodes and connections, data flowing, minimal premium tech aesthetic, depth of field",
      "landscape_16_9",
    ),
    description:
      "基于 Spring AI 构建的智能体应用，融合 RAG 检索、MCP 协议与 ReAct 模式，实现多轮情感咨询与自主任务规划闭环，工具调用准确率 >90%。",
    tags: ["Spring AI", "RAG", "MCP", "ReAct"],
  },
  {
    id: "p04",
    index: "04",
    title: "OmniScraper Pro — 视频抓取工具",
    category: "AI Tool / Desktop",
    year: "2026",
    cover: IMG(
      "dark data visualization concept, video frames grid flowing into analysis pipeline, matrix style cyan glow on black, minimal tech interface, premium",
      "landscape_16_9",
    ),
    description:
      "从 0 到 1 手搓的视频抓取工具链，实现「采集 → 下载 → ASR 转写 → LLM 分析 → 导出」完整闭环，支持抖音等多平台，含 Electron 桌面端与 CI/CD。",
    tags: ["Electron", "Whisper", "MediaCrawler", "CI/CD"],
  },
  {
    id: "p05",
    index: "05",
    title: "AIGC 创作工坊",
    category: "AIGC / Creative",
    year: "2024 — 2026",
    cover: IMG(
      "dark surreal AI generated portrait, half human half digital, cyan and warm orange glow, particles dissolving, premium digital art, mysterious atmosphere",
      "landscape_16_9",
    ),
    description:
      "覆盖数字人、语音克隆、AI 绘画、AI 音乐、AI 视频的 AIGC 全链路创作能力，独立完成从创意到成品的全流程，应用于教学视频、产品介绍与虚拟主播。",
    tags: ["数字人", "语音克隆", "Midjourney", "AI 音乐"],
  },
  {
    id: "p06",
    index: "06",
    title: "自媒体品牌矩阵",
    category: "Brand / Content",
    year: "2024 — 2026",
    cover: IMG(
      "dark moody social media content grid mockup on black background, minimal premium brand layout, cyan accent, editorial design, floating cards",
      "landscape_16_9",
    ),
    description:
      "B 站 12K+、抖音 4.9K+、小红书 4.6K+ 的个人品牌矩阵，持续输出技术分享、AI 应用与视觉修复内容，形成跨平台个人品牌影响力。",
    tags: ["B 站", "小红书", "抖音", "内容运营"],
  },
];

export const strengths = [
  {
    id: "s01",
    no: "01",
    title: "AI 视觉创作",
    en: "AI Visual Creation",
    description:
      "精通 Midjourney、Stable Diffusion、ControlNet、ComfyUI 工作流，从概念设计到成品输出全链路把控。",
    icon: "Sparkles",
  },
  {
    id: "s02",
    no: "02",
    title: "品牌系统设计",
    en: "Brand System Design",
    description:
      "具备完整的品牌视觉识别系统构建能力，从 Logo、字体、色彩到应用规范的系统性输出。",
    icon: "Gem",
  },
  {
    id: "s03",
    no: "03",
    title: "AIGC 全链路",
    en: "AIGC Full Stack",
    description:
      "数字人、语音克隆、AI 绘画、AI 音乐、AI 视频全栈 AIGC 能力，独立完成从创意到成品。",
    icon: "Wand2",
  },
  {
    id: "s04",
    no: "04",
    title: "视觉修复与增强",
    en: "Restoration & Enhancement",
    description:
      "4K 超分、去噪、色彩校正、60fps 插帧，以 AI 技术赋予经典影像新生，10 亿级话题验证。",
    icon: "Film",
  },
  {
    id: "s05",
    no: "05",
    title: "数据驱动设计",
    en: "Data-Driven Design",
    description:
      "Python、SQL、数据分析能力支撑下的设计决策，以数据洞察驱动视觉与内容优化。",
    icon: "BarChart3",
  },
  {
    id: "s06",
    no: "06",
    title: "跨界整合",
    en: "Cross-Discipline",
    description:
      "能源工程 + AI 技术 + 视觉设计的复合背景，善于以新技术解决传统问题，打破学科壁垒。",
    icon: "Layers",
  },
];

export const navItems = [
  { id: "hero", label: "Index", cn: "首页" },
  { id: "about", label: "About", cn: "关于" },
  { id: "work", label: "Work", cn: "作品" },
  { id: "strength", label: "Edge", cn: "优势" },
  { id: "contact", label: "Contact", cn: "联系" },
];
