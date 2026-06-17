// 所有作品集内容数据集中于此，按《简历二版》结构与格式完整抽取

const IMG = (prompt: string, size = "landscape_16_9") =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=${size}`;

/* ============================== 首页 / 个人定位 ============================== */
export const profile = {
  name: "胡亚伟",
  nameEn: "HU Yawei",
  identity: ["视觉设计师", "AI 设计师", "品牌设计师"],
  identityEn: "Visual / AI / Brand Designer",
  tagline: "AI NATIVE DESIGNER",
  taglineSub: "用 AI 重塑视觉与品牌的边界",
  positioning:
    "一名对视觉表达与人工智能交叉领域充满热情的设计师。具备扎实的品牌系统设计能力，同时深度拥抱 AIGC 技术，致力于探索 AI 赋能视觉创作与品牌建设的创新方案。",
  bio: "从 4K 影像修复到数字人、AI 绘画、AI 视频、AI 音乐，持续以技术拓展设计的可能性。能源动力工程背景 + AI 技术应用 + 视觉设计的复合能力，善于以新技术解决传统问题。",
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
  coreTraits: [
    { icon: "Wrench", title: "扎实的设计工程能力", desc: "品牌系统 / 海报 / 排版 / 视觉规范" },
    { icon: "Bot", title: "前沿的 AIGC 应用能力", desc: "Agent 开发 / AI 绘画 / 数字人 / AI 视频" },
    { icon: "BarChart3", title: "数据驱动的创作思维", desc: "Python / SQL / 数据分析" },
    { icon: "Target", title: "出色的项目执行力", desc: "团队协作 / 跨界整合" },
  ],
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

/* ============================== 个人综述 / 基本信息 + 教育背景 ============================== */
export const basicInfo = [
  { label: "姓名", value: "胡亚伟" },
  { label: "性别", value: "男" },
  { label: "民族", value: "汉" },
  { label: "政治面貌", value: "共青团员" },
  { label: "生源地", value: "山西" },
  { label: "英语水平", value: "CET-4" },
  { label: "MBTI", value: "ENTJ-A" },
  { label: "健康状况", value: "健康" },
];

export const education = [
  {
    school: "山西大学",
    degree: "能源与动力工程（全日制本科）",
    period: "2023.09 — 2027.06",
    level: "双一流本科",
    note: "2022 年入选国家级一流本科专业建设点，2020 年省级一流专业",
  },
  {
    school: "忻州一中",
    degree: "高中",
    period: "2020.09 — 2023.06",
    level: "全国百强高中",
    note: "",
  },
];

export const careerPlan = {
  short: ["完成本科学业（2027.06 毕业）", "考取注册公用设备工程师基础考试", "进入热能 / 电力行业工作", "持续深化 AI 技术应用能力"],
  mid: ["积累工程项目经验（≥5 个大型项目）", "考取注册公用设备工程师执业资格", "在工作中应用 AI 提升效率", "建立行业影响力（论文 / 专利）"],
  long: ["成为能源 + AI 领域专家", "主导或参与国家级重点项目", "推动行业数字化转型", "创业方向：AI 赋能能源管理系统"],
};

/* ============================== 能力地图（五大能力域） ============================== */
export const abilityMap = [
  {
    id: "am01",
    no: "01",
    domain: "能动技术",
    en: "Energy & Power",
    level: "★★★★★",
    role: "专业核心",
    icon: "Flame",
    keywords: ["CFD 仿真", "三维设计", "热工测试", "工程管理"],
    summary: "掌握能源动力领域核心仿真工具链，ANSYS Fluent 流动传热燃烧仿真，AutoCAD / SolidWorks / UG 三维设计。",
    skills: ["ANSYS Fluent（流动 / 传热 / 燃烧）", "AutoCAD / SolidWorks / UG", "热电偶 / 流量计 / NI DAQ", "PERT / 甘特图 / ROI 评估"],
  },
  {
    id: "am02",
    no: "02",
    domain: "AI 特种技术",
    en: "AI Special Forces",
    level: "★★★★★",
    role: "前沿探索",
    icon: "Bot",
    keywords: ["智能体开发", "大模型应用", "AIGC", "Prompt 工程"],
    summary: "ComfyUI / 模型微调，Spring AI / RAG / MCP，数字人 / 语音克隆 / AI 绘画 / AI 音乐 / AI 视频，LangChain 多 Agent 编排。",
    skills: ["ComfyUI / 模型微调 / LoRA", "Spring AI / RAG / MCP / ReAct", "AIGC：数字人 / 语音克隆 / AI 绘画", "Prompt Engineering / Harness Engineering"],
  },
  {
    id: "am03",
    no: "03",
    domain: "编程开发",
    en: "Engineering",
    level: "★★★★★",
    role: "全栈支撑",
    icon: "Code2",
    keywords: ["Python", "Java", "C/C++", "前端 + 嵌入式"],
    summary: "Python 精通（数据分析 / 自动化），Java 精通（Web 系统），C/C++ 嵌入式，JS/TS 前端 + Electron，SQL / Git / Docker / Linux。",
    skills: ["Python 精通 / Java 精通", "C/C++ 嵌入式 / JS/TS 前端", "SQL / Git / Docker / Linux", "Office 精通 / HTML / CSS"],
  },
  {
    id: "am04",
    no: "04",
    domain: "自媒体特种技术",
    en: "Content Creation",
    level: "★★★★☆",
    role: "内容创作",
    icon: "Video",
    keywords: ["视频抓取", "AI 视频", "新媒体运营", "4K 修复"],
    summary: "OmniScraper Pro 视频抓取工具链，AI 视频技术，B 站 12K+ / 抖音 4.9K+ / 小红书 4.6K+，4K 修复技术，剪映 / AE / PS / Audition。",
    skills: ["OmniScraper Pro 视频抓取", "AI 视频 / 4K 修复技术", "B 站 / 抖音 / 小红书 / 公众号", "剪映 / AE / PS / Audition"],
  },
  {
    id: "am05",
    no: "05",
    domain: "思想领域高度技术",
    en: "Strategic Thinking",
    level: "★★★★☆",
    role: "战略思维",
    icon: "Brain",
    keywords: ["辩证唯物主义", "前瞻布局", "项目管理", "技术方法论"],
    summary: "辩证唯物主义 + 毛泽东思想为指导，前瞻总体布局思想，项目管理 PERT / 甘特图，工程经济学 ROI / NPV，Vibe Coding / AI 协作方法论。",
    skills: ["辩证唯物主义 + 毛泽东思想", "前瞻总体布局思想", "项目管理 PERT / 甘特图", "Vibe Coding / AI 协作方法论"],
  },
];

/* ============================== 精选项目（按简历分区） ============================== */
export type Project = {
  id: string;
  index: string;
  part: string;
  partEn: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  keywords: string[];
  summary: string;
  stack: string[];
  achievements: string[];
  tags: string[];
};

export const projects: Project[] = [
  {
    id: "p01",
    index: "01",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "Altezhong 智能眼镜系统",
    category: "AI Hardware / Embedded",
    year: "2025.04 — 2026.05",
    cover: IMG(
      "futuristic smart glasses product shot on pure black background, glowing cyan accent lines, tech hardware, minimal premium industrial design, studio lighting, high detail",
      "landscape_16_9",
    ),
    keywords: ["智能眼镜", "ESP32-S3", "BLE 音频", "视觉特征提取", "Flutter", "FastAPI"],
    summary:
      "基于「轻眼镜 + 重后端」架构的智能眼镜系统，实现眼镜-手机-PC-云的多条链路。包含 ESP32-S3 固件、Flutter 移动应用、FastAPI 后端和 PC 中继服务，支持断点续传与 OTA 升级。",
    stack: ["ESP32-S3 / C/C++", "TFLite Micro / RNNoise", "Flutter / Dart / BLE", "FastAPI / WebSocket", "TypeScript / Node.js"],
    achievements: [
      "音频传输延迟 < 100ms，BLE 通过率门禁测试",
      "特征提取耗时 < 50ms，RAM 占用 < 2MB",
      "信噪比提升 15dB，OTA 成功率 > 95%",
      "断点续传成功率 > 99%，数据完整性 100%",
    ],
    tags: ["ESP32-S3", "Flutter", "FastAPI", "BLE 音频", "OTA"],
  },
  {
    id: "p02",
    index: "02",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "知心 AI — 情感与规划助手",
    category: "AI Agent / RAG / MCP",
    year: "2025.12 — 2026.03",
    cover: IMG(
      "abstract AI neural network visualization, dark background with glowing cyan nodes and connections, data flowing, minimal premium tech aesthetic, depth of field",
      "landscape_16_9",
    ),
    keywords: ["Spring AI", "智能体", "RAG", "PGvector", "MCP 协议", "ReAct 模式"],
    summary:
      "基于 Spring AI 框架构建 AI 智能体应用，实现多轮情感咨询与自主规划两大核心功能。支持知识库问答、动态工具调用、任务自主分解执行，完成从用户指令到行动交付的完整闭环。",
    stack: ["Spring Boot 3 / Spring AI", "PGvector 向量数据库", "RAG / Tool Calling / MCP", "ReAct 模式 / 分层智能体", "Redis / CompletableFuture"],
    achievements: [
      "支持 10 轮以上连续对话，上下文准确率 > 95%",
      "检索准确率从 75% 提升至 92%（混合检索 + 重排序）",
      "工具调用准确率 > 90%，平均调用耗时 < 2s",
      "响应时间降低 60%，QPS 提升至 200+",
    ],
    tags: ["Spring AI", "RAG", "MCP", "ReAct", "PGvector"],
  },
  {
    id: "p03",
    index: "03",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "书生·浦语大模型实战营",
    category: "LLM Fine-tuning",
    year: "2024",
    cover: IMG(
      "dark server room with glowing GPU racks, cyan data streams, AI training visualization, premium tech aesthetic, cinematic depth",
      "landscape_16_9",
    ),
    keywords: ["InternLM", "大模型微调", "A100", "LoRA", "DeepSpeed"],
    summary:
      "完成书生·浦语大模型实战营项目，在 A100 上训练基于 InternLM 的 8B 微调角色模型，掌握大模型微调基本流程与技巧。",
    stack: ["InternLM-8B", "NVIDIA A100 GPU", "PyTorch / DeepSpeed", "LoRA 参数高效微调"],
    achievements: [
      "使用 LoRA 进行参数高效微调",
      "配置超参 lr=2e-4, batch=16, epochs=3",
      "角色对话质量提升 40%",
      "掌握分布式训练与模型评估方法",
    ],
    tags: ["InternLM", "LoRA", "A100", "DeepSpeed"],
  },
  {
    id: "p04",
    index: "04",
    part: "自媒体特种技术",
    partEn: "Content Creation",
    title: "OmniScraper Pro — 视频抓取工具",
    category: "AI Tool / Desktop",
    year: "2026.03 — 2026.05",
    cover: IMG(
      "dark data visualization concept, video frames grid flowing into analysis pipeline, matrix style cyan glow on black, minimal tech interface, premium",
      "landscape_16_9",
    ),
    keywords: ["视频抓取", "抖音分析", "Whisper ASR", "yt-dlp", "Electron", "MediaCrawler"],
    summary:
      "从 0 开始手搓视频抓取工具，后基于 MediaCrawler 和 omi 项目进行 AI 能力扩展。实现「采集 → 下载 → ASR 转写 → LLM 分析 → 导出」完整链路，支持抖音等多平台。",
    stack: ["MediaCrawler 爬虫框架", "yt-dlp 下载 / Whisper ASR", "LiteLLM 多模型", "Electron / TypeScript / React", "Jest / Pytest / GitHub Actions"],
    achievements: [
      "MVP 闭环：抓取 → 下载 → 转写 → 输出 → 清理",
      "Desktop 端 167 个测试全部通过",
      "MediaCrawler 46 个测试通过",
      "代理可用率从 60% 提升至 90%",
    ],
    tags: ["Electron", "Whisper", "MediaCrawler", "CI/CD"],
  },
  {
    id: "p05",
    index: "05",
    part: "自媒体特种技术",
    partEn: "Content Creation",
    title: "《钢铁是怎样炼成的》4K 修复",
    category: "Video Restoration / AIGC",
    year: "2025.04 — 2025.05",
    cover: IMG(
      "dark cinematic vintage film still, soviet era worker silhouette, dramatic black and white with subtle cold blue tint, film grain, 4k restored look, moody atmosphere, classic cinema",
      "landscape_16_9",
    ),
    keywords: ["视频修复", "4K", "AI 增强", "保尔·柯察金", "内容发布"],
    summary:
      "独立完成经典影片《钢铁是怎样炼成的》4K 修复与发布，使用 AI 技术进行画质增强、分辨率提升、色彩校正，全网引发对保尔·柯察金精神的学习热潮。",
    stack: ["Topaz Video AI（超分 / 去噪）", "剪映（色彩校正）", "RIFE 插帧 / 光流法（25→60fps）"],
    achievements: [
      "B 站播放 200 万+，抖音切片 1500 万+",
      "带动话题量 10 亿+",
      "引发红色经典学习与讨论热潮",
      "验证 AI 修复技术的有效性与必要性",
    ],
    tags: ["4K 修复", "AI 超分", "色彩校正", "60fps 插帧"],
  },
  {
    id: "p06",
    index: "06",
    part: "自媒体特种技术",
    partEn: "Content Creation",
    title: "自媒体品牌矩阵",
    category: "Brand / Content Operation",
    year: "2024 — 2026",
    cover: IMG(
      "dark moody social media content grid mockup on black background, minimal premium brand layout, cyan accent, editorial design, floating cards",
      "landscape_16_9",
    ),
    keywords: ["B 站 UP 主", "抖音创作者", "小红书博主", "内容运营"],
    summary:
      "B 站 12K+、抖音 4.9K+、小红书 4.6K+ 的个人品牌矩阵，持续输出技术分享、AI 应用、视频修复等内容，形成跨平台个人品牌影响力。",
    stack: ["B 站 / 抖音 / 小红书 / 公众号", "剪映 / AE / PR", "Photoshop / Audition", "内容运营策略"],
    achievements: [
      "哔哩哔哩 12,000+ 粉丝",
      "抖音 4,900+ 粉丝",
      "小红书 4,600+ 粉丝",
      "代表作《钢铁是怎样炼成的》4K 修复 200 万+ 播放",
    ],
    tags: ["B 站", "小红书", "抖音", "内容运营"],
  },
];

/* ============================== 时间线（2023-2026） ============================== */
export const timeline = [
  {
    year: "2023",
    color: "volt",
    events: [
      { month: "09", title: "入学山西大学", desc: "能源与动力工程，担任军训负责人" },
      { month: "10", title: "加入彩虹志愿者协会", desc: "开启校园组织生活" },
    ],
  },
  {
    year: "2024",
    color: "mist",
    events: [
      { month: "01", title: "自媒体创号", desc: "小红书首月斩获 1000+ 粉丝" },
      { month: "03", title: "百度网盘校园大使", desc: "同时担任小红书宣传大使" },
      { month: "05", title: "InternLM 学习", desc: "About-InternLM-study 笔记" },
      { month: "10", title: "英语视频制作比赛", desc: "校级二等奖" },
      { month: "—", title: "全年自媒体", desc: "抖音 1600+ / 小红书 3000+ / B 站 800+" },
    ],
  },
  {
    year: "2025",
    color: "volt",
    events: [
      { month: "02", title: "市场调查大赛", desc: "《LLM 市场应用》校级二等奖" },
      { month: "03", title: "4K 修复项目", desc: "《钢铁是怎样炼成的》4K 修复启动" },
      { month: "06", title: "风电场运维实习", desc: "山西粤电盂县粤鑫风电场" },
      { month: "06", title: "青草计划", desc: "小红书新媒体职业技能大赛" },
      { month: "09", title: "数学建模竞赛", desc: "省级一等奖（烟幕干扰弹投放策略）" },
      { month: "—", title: "全年自媒体", desc: "抖音 4600+ / 小红书 4000+ / B 站 9800+" },
    ],
  },
  {
    year: "2026",
    color: "mist",
    events: [
      { month: "03", title: "市场调查大赛", desc: "省级一等奖（康养五寨文旅研究）" },
      { month: "03", title: "video-claw 开发", desc: "第一版视频抓取工具" },
      { month: "04", title: "智能眼镜 v0.1", desc: "Altezhong-yanjing MVP" },
      { month: "04", title: "video-tezhong 启动", desc: "第二版视频抓取工具" },
      { month: "05", title: "web-niu / 眼镜 v2", desc: "Ambient Dream v2 + AItezhongyanjing-2" },
    ],
  },
];

/* ============================== 获奖与证书 ============================== */
export const awards = [
  {
    id: "a01",
    year: "2026.01 — 2026.03",
    title: "市场调查与分析大赛",
    level: "省级一等奖",
    role: "核心成员（5人）",
    project: "《康养五寨，药韵文旅——山西五寨中医药康养旅游游客体验及文旅提升路径研究》",
  },
  {
    id: "a02",
    year: "2025.09",
    title: "数学建模竞赛",
    level: "省级一等奖",
    role: "核心成员（3人）",
    project: "《烟幕干扰弹的投放策略》— 负责模型构建与数据分析",
  },
  {
    id: "a03",
    year: "2025.02 — 2025.03",
    title: "市场调查与分析大赛",
    level: "校级二等奖",
    role: "核心成员（3人）",
    project: "《2024 年 LLM 的市场应用及发展前景调研》",
  },
  {
    id: "a04",
    year: "2024.10 — 2024.11",
    title: "英语高教杯英语视频制作比赛",
    level: "校级二等奖",
    role: "核心成员（3人）",
    project: "负责视频创意与制作",
  },
];

export const certificates = [
  { id: "c01", icon: "Languages", title: "大学英语四级证书", desc: "CET-4，英语读写能力" },
  { id: "c02", icon: "Car", title: "机动车驾驶证", desc: "C1，便于工程现场调研" },
  { id: "c03", icon: "Plane", title: "轻型无人机驾驶证", desc: "电力巡检 / 航拍测绘" },
  { id: "c04", icon: "Award", title: "竞赛奖证书", desc: "省一 ×2 / 校二 ×2" },
];

/* ============================== 实习经历 ============================== */
export const internships = [
  {
    id: "i01",
    company: "山西粤电能源有限公司",
    role: "盂县粤鑫风电场运维实习生",
    period: "2025.06",
    keywords: ["220kV 升压站", "SCADA", "红外测温", "数据诊断"],
    summary:
      "深度参与风电场日常运维与监控，协助工程师完成电气设备巡检及 SCADA 数据分析，从现场实操到云端数据管理，全面初步掌握风电场智慧运维核心流程。",
    points: [
      "严格遵循「五防」闭锁逻辑，巡检 GIS / 主变 / SVG / 箱变",
      "红外测温排查过热隐患，建立巡检日志即时汇报异常",
      "SCADA 监控全场机组，导出发电量 / 可利用率 KPI 指标",
      "功率曲线拆解分析，锁定低效机组，辅助诊断报告",
    ],
  },
  {
    id: "i02",
    company: "百度网盘",
    role: "校园大使 & 小红书宣传大使",
    period: "2024.03 — 至今",
    keywords: ["品牌推广", "线上线下", "内容创作", "社群运营"],
    summary:
      "协助品牌进行线上线下宣传活动策划与执行，提升产品在校园用户中的影响力。",
    points: [
      "线下组织「网盘使用技巧」讲座，设立宣传展台",
      "线上校园群 / 论坛分享，累计拉新 50+ 人",
      "小红书每周 2 篇攻略笔记，总阅读量 10 万+",
      "建立 200+ 人学习资源分享群，社群活跃度 > 30%",
    ],
  },
];

/* ============================== 核心竞争力 ============================== */
export const strengths = [
  {
    id: "s01",
    no: "01",
    title: "AI 视觉创作",
    en: "AI Visual Creation",
    description: "精通 Midjourney、Stable Diffusion、ControlNet、ComfyUI 工作流，从概念设计到成品输出全链路把控。",
    icon: "Sparkles",
  },
  {
    id: "s02",
    no: "02",
    title: "品牌系统设计",
    en: "Brand System Design",
    description: "具备完整的品牌视觉识别系统构建能力，从 Logo、字体、色彩到应用规范的系统性输出。",
    icon: "Gem",
  },
  {
    id: "s03",
    no: "03",
    title: "AIGC 全链路",
    en: "AIGC Full Stack",
    description: "数字人、语音克隆、AI 绘画、AI 音乐、AI 视频全栈 AIGC 能力，独立完成从创意到成品。",
    icon: "Wand2",
  },
  {
    id: "s04",
    no: "04",
    title: "视觉修复与增强",
    en: "Restoration & Enhancement",
    description: "4K 超分、去噪、色彩校正、60fps 插帧，以 AI 技术赋予经典影像新生，10 亿级话题验证。",
    icon: "Film",
  },
  {
    id: "s05",
    no: "05",
    title: "数据驱动设计",
    en: "Data-Driven Design",
    description: "Python、SQL、数据分析能力支撑下的设计决策，以数据洞察驱动视觉与内容优化。",
    icon: "BarChart3",
  },
  {
    id: "s06",
    no: "06",
    title: "跨界整合",
    en: "Cross-Discipline",
    description: "能源工程 + AI 技术 + 视觉设计的复合背景，善于以新技术解决传统问题，打破学科壁垒。",
    icon: "Layers",
  },
];

/* ============================== 导航 ============================== */
export const navItems = [
  { id: "hero", label: "Index", cn: "首页" },
  { id: "about", label: "About", cn: "综述" },
  { id: "ability", label: "Ability", cn: "能力" },
  { id: "work", label: "Work", cn: "作品" },
  { id: "timeline", label: "Timeline", cn: "轨迹" },
  { id: "awards", label: "Awards", cn: "荣誉" },
  { id: "edge", label: "Edge", cn: "优势" },
  { id: "contact", label: "Contact", cn: "联系" },
];
