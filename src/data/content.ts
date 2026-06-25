// 所有作品集内容数据集中于此，按《简历二版》结构与格式完整抽取
import baiduNetdiskIcon from "@/data/icon/baidu-netdisk.png";

const IMG = (prompt: string, size = "landscape_16_9") =>
  `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(
    prompt,
  )}&image_size=${size}`;

/* ============================== 首页 / 个人定位 ============================== */
export const profile = {
  name: "胡亚伟",
  nameEn: "HU Yawei",
  // 主业：能源与动力工程本科生；副线：AI Native Graduate / 视觉与品牌设计
  identity: ["能源与动力工程本科生", "AI Native Graduate", "视觉与品牌设计"],
  identityEn: "Energy & Power Undergrad · AI Native · Designer",
  tagline: "AI NATIVE ENERGY ENGINEER",
  taglineSub: "能源动力 × AI 特种技术，以新工具重塑传统工科",
  positioning:
    "山西大学能源与动力工程全日制本科生（2027 届），国家级一流专业建设点。以「AI Native Graduate」为自我定位，在扎实掌握能动专业核心（CFD 仿真、三维设计、热工测试）的同时，深度拥抱 AIGC、智能体开发与全栈工程，致力于用 AI 重塑能源动力行业的传统工作流。",
  bio: "主业是能源与动力工程本科生，专业核心能力覆盖 ANSYS Fluent 流动传热燃烧仿真、AutoCAD / SolidWorks 三维设计、热工测试与工程管理。在此之上，以 AI Native Graduate身份拓展第二曲线：从 4K 影像修复到智能眼镜、AI 智能体、视频抓取工具链，持续以新技术解决传统问题。视觉与品牌设计是表达与副业，服务于内容创作与个人品牌建设。",
  mbti: "ENTJ-A",
  avatar: IMG(
    "dark moody cinematic portrait of a young east asian male engineering student, side profile silhouette, dramatic rim lighting, deep black background with subtle cyan glow, high contrast, film grain, editorial photography, 35mm, tech aesthetic",
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
    { icon: "Flame", title: "能动专业核心能力", desc: "CFD 仿真 / 三维设计 / 热工测试 / 工程管理" },
    { icon: "Bot", title: "AI Native Graduate", desc: "Agent 开发 / AIGC / 大模型微调 / 全栈工程" },
    { icon: "BarChart3", title: "数据驱动工程思维", desc: "Python / SQL / 数据分析 / 工程经济学" },
    { icon: "Target", title: "跨界整合执行力", desc: "能源 × AI × 设计 复合落地" },
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
    gallery: [
      { src: "/energy/heat-exchanger-cad.png", caption: "换热器 CAD 三维设计图" },
      { src: "/energy/heat-exchanger-temp.png", caption: "壳管式换热器中心截面温度分布" },
      { src: "/energy/residual-distribution.png", caption: "CFD 仿真残差分布图" },
    ],
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
      "独立完成经典影片《钢铁是怎样炼成的》4K 修复与发布，使用 AI 技术进行画质增强、分辨率提升、色彩校正。作品在 B 站与抖音形成「长视频修复 + 短视频切片」的传播矩阵，引发全网对保尔·柯察金精神的学习与讨论热潮。",
    stack: ["Topaz Video AI（超分 / 去噪）", "剪映（色彩校正）", "RIFE 插帧 / 光流法（25→60fps）"],
    achievements: [
      "B 站播放 200 万+，抖音切片 1500 万+",
      "带动话题量 10 亿+",
      "《钢铁是怎样炼成的》话题热度峰值突破 25 万，均值 2.9 万",
      "「保尔柯察金」话题热度峰值近 50 万，角色 IP 爆发力强",
      "18-23 岁男性用户为核心受众，河南、江苏、山东偏好度最高",
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
    image: "/awards/market-research-provincial-1.png",
  },
  {
    id: "a02",
    year: "2025.09",
    title: "数学建模竞赛",
    level: "省级一等奖",
    role: "核心成员（3人）",
    project: "《烟幕干扰弹的投放策略》— 负责模型构建与数据分析",
    image: "/awards/math-modeling-provincial-1.jpg",
  },
  {
    id: "a03",
    year: "2025.02 — 2025.03",
    title: "市场调查与分析大赛",
    level: "校级二等奖",
    role: "核心成员（3人）",
    project: "《2024 年 LLM 的市场应用及发展前景调研》",
    image: "/awards/market-research-school-2.jpg",
  },
  {
    id: "a04",
    year: "2025.06",
    title: "青草计划 · 小红书新媒体职业技能大赛",
    level: "参赛认证",
    role: "个人参赛",
    project: "小红书新媒体内容创作与运营技能实战",
    image: "/awards/xhs-qingcao-plan.jpg",
  },
  {
    id: "a05",
    year: "2024.10 — 2024.11",
    title: "英语高教杯英语视频制作比赛",
    level: "校级二等奖",
    role: "核心成员（3人）",
    project: "负责视频创意与制作",
  },
];

export const certificates = [
  {
    id: "c01",
    icon: "Award",
    title: "书生·浦语大模型实战营证书",
    desc: "完成 InternLM 大模型微调实战营，掌握 LoRA 微调全流程",
    image: "/certs/internlm-camp-cert.png",
  },
  {
    id: "c02",
    icon: "Plane",
    title: "轻型无人机驾驶证",
    desc: "电力巡检 / 航拍测绘",
    image: "/certs/drone-license.png",
  },
  { id: "c03", icon: "Languages", title: "大学英语四级证书", desc: "CET-4，英语读写能力" },
  { id: "c04", icon: "Car", title: "机动车驾驶证", desc: "C1，便于工程现场调研" },
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
    icon: baiduNetdiskIcon,
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
    title: "能动专业核心",
    en: "Energy & Power Core",
    description: "ANSYS Fluent 流动 / 传热 / 燃烧仿真，AutoCAD / SolidWorks / UG 三维设计，热工测试与工程管理，国家级一流专业建设点系统训练。",
    icon: "Flame",
  },
  {
    id: "s02",
    no: "02",
    title: "AI Native Graduate",
    en: "AI Native Special Forces",
    description: "Spring AI / RAG / MCP / ReAct 智能体开发，ComfyUI / LoRA 大模型微调，AIGC 全链路（数字人 / 语音克隆 / AI 绘画 / AI 视频）。",
    icon: "Bot",
  },
  {
    id: "s03",
    no: "03",
    title: "全栈工程能力",
    en: "Full-Stack Engineering",
    description: "Python / Java 精通，C/C++ 嵌入式（ESP32-S3），JS/TS 前端 + Electron 桌面端，SQL / Git / Docker / Linux 工程化全链路。",
    icon: "Code2",
  },
  {
    id: "s04",
    no: "04",
    title: "AI 视觉修复",
    en: "AI Visual Restoration",
    description: "4K 超分、去噪、色彩校正、60fps 插帧，以 AI 技术赋予经典影像新生，10 亿级话题验证，200 万+ 单视频播放。",
    icon: "Film",
  },
  {
    id: "s05",
    no: "05",
    title: "数据驱动决策",
    en: "Data-Driven Decisions",
    description: "Python / SQL / 数据分析能力支撑下的工程与内容决策，以数据洞察驱动仿真优化、项目评估与运营策略。",
    icon: "BarChart3",
  },
  {
    id: "s06",
    no: "06",
    title: "视觉与品牌设计（副线）",
    en: "Visual & Brand Design",
    description: "品牌视觉识别系统构建、AIGC 创作工坊、自媒体品牌矩阵运营，服务于内容表达与个人品牌建设。",
    icon: "Gem",
  },
];

/* ============================== 常见问题 Q&A ============================== */
export type QnAItem = {
  id: string;
  question: string;
  paragraphs: string[];
  scenarios?: { title: string; pain: string; value: string }[];
};

export const qnaData: QnAItem[] = [
  {
    id: "q1",
    question: "你认为自己的核心竞争优势是什么？这与你的大学规划有何关联？",
    paragraphs: [
      "从大一开始，我就明确自己的职业定位是应用型工程技术人才，而非纯学术研究型人才。因此，我采取了一套以终为始的差异化学习策略。",
      "第一，确保专业核心底座扎实。对于《工程热力学》《流体力学》《汽轮机原理》等核心课程，我始终保持高标准掌握，能熟练运用 ANSYS Fluent 进行多物理场耦合仿真，独立完成换热器三维建模与装配设计，以及使用红外测温仪、振动传感器等仪表进行设备状态检测。",
      "第二，主动把课堂延伸到工厂车间和实验室。掌握离心泵和汽轮机的拆装检修、车床铣床精加工操作、热工仪表现场标定与数据采集，以及 PLC 控制系统编程调试，从梯形图、结构化文本编程到现场接线与信号联调，都能上手。",
      "第三，把目光投向行业的下一个十年。电力行业已完成电气化，下一波浪潮必然是智能化、AI 化。从 PLC 底层控制学起，向上延伸到 51/STM32 嵌入式开发，再向上延伸到 Python 数据分析与 LLM、VLM 智能体应用，这条现场级→系统级→智能级的技术链路正好对应智慧电厂、智能运维、预测性维护等真实工业场景。",
      "第四，更关注能力的含金量而非名次。班里 40 人中我大约排在 10 多名，但我选择了一条以工程实战 + 技术融合为导向的差异化路线，比同龄人更早接触工业控制、嵌入式开发、AI 智能体、数据分析、自媒体运营等多领域技能。",
      "既懂热力系统、又懂 PLC 底层控制、还能用 AI 做数据分析的跨界人才是稀缺的。如果贵单位需要的是能够快速融入现场、理解工艺与控制、并能推动智能化转型的工程师，我的实干经历和跨界视野会更有长期价值。",
    ],
  },
  {
    id: "q2",
    question: "你做这些互联网爬虫和 AI 工具，对我们电厂 / 传统能源企业有什么用？",
    paragraphs: [
      "电厂目前最大的资产流失，其实是隐性经验的流失。我在简历中写的这些工具，对电厂的价值主要体现在三个方面。",
      "第一，把闭源平台上的一线实操经验变成电厂的数字资产。电厂很多老专家、老技师处理风机异响、排查变压器缺陷的土办法和实操手感，往往没有写进标准规程里。我的 OmniScraper Pro 工具可以批量抓取抖音、小红书等平台的检修视频，通过 Whisper 转写成文字，再用大模型提炼成标准的故障排查 SOP，相当于用 AI 给电厂自动建立一个活的师傅经验库。",
      "第二，把开源社区的前沿算法与电厂的现场缺陷结合。我的 MCP 热点追踪系统可以 7×24 小时抓取 GitHub、知网、电力论坛的最新设备故障诊断模型和 CFD 仿真优化方案，自动推送到技术科的飞书文档，让技术人员永远站在全网技术的最前沿。",
      "第三，构建电厂专属的多模态 RAG 智能问答助手。把开源理论论文、闭源实操视频以及电厂内部的历史缺陷台账全部向量化后，新员工在现场遇到设备报警，只需要用智能眼镜或手机问一句：2 号风机齿轮箱温度异常怎么处理？系统不仅能调出规程，还能直接调出实操视频片段，用全网数据赋能一线生产。",
      "我做的不仅仅是几个爬虫或 AI 玩具，而是全网多源异构数据的自动化采集与知识沉淀底座。",
    ],
  },
  {
    id: "q3",
    question: "你这些额外的能力，能给我们电厂带来什么？",
    paragraphs: [
      "我的跨界能力可以从基层减负、安全宣传、技术翻译、团队赋能、智能巡检、抢发电量、备件情报、碳资产管理等八个维度，为电厂创造差异化价值。",
    ],
    scenarios: [
      {
        title: "价值一：用「Vibe Coding」为基层班组减负",
        pain: "大型系统往往不接地气，基层班组每天还要花大量时间手工统计缺陷台账、整理「两票」、盘点备品备件。",
        value: "利用 Vibe Coding（AI 辅助编程）和全栈开发能力，我能在几天内用 Python + AI 帮班组定制缺陷台账自动统计小工具或两票合规性 AI 审查插件，直接部署到阿里云或科室 Linux 服务器，把每天 1 小时的填表时间压缩到 5 分钟。",
      },
      {
        title: "价值二：用「爆款自媒体思维」重塑安全培训与企业宣传",
        pain: "传统安规培训、事故通报极其枯燥，员工往往是「应付考试」，难以入脑入心；同时传统电厂对外形象刻板。",
        value: "我有全网 2.1 万粉丝的自媒体经验和策划过 10 亿+ 播放量爆款的网感。我能把枯燥的安规考试变成生动的 AI 数字人安全宣讲，用 AI 视频技术把事故通报做成沉浸式 3D 还原短片；对外策划智慧风电、绿色火电科普短视频，打造企业的科技雇主品牌。",
      },
      {
        title: "价值三：充当「业务」与「IT」的超级翻译官",
        pain: "外包互联网公司不懂「汽轮机轴振」「风机偏航」，做出来的 AI 模型没法用；厂里的老专家又不懂「大模型、向量数据库」，提不出准确需求。",
        value: "我既懂热力学、去过风电场实习、看得懂 SCADA 数据，又精通 Spring AI、RAG 和 Agent 编排，知道 AI 的边界在哪。我能把现场真痛点准确转化为 IT 能听懂的 AI 需求，帮厂里把控技术方向，避免被外包公司忽悠。",
      },
      {
        title: "价值四：引入「AI 协作」新范式，打造效能型科室",
        pain: "传统能源企业工作氛围相对固化，员工写材料、做 PPT、处理海量运行数据耗费大量精力。",
        value: "作为 ENTJ 和 AI Native，我能把如何用大模型写公文、用 Python 一键清洗百个 Excel 运行报表、用 AI 做数据可视化汇报沉淀成 SOP，在科室里做分享，带动整个班组效能提升。",
      },
      {
        title: "场景五：把智能眼镜改造成 AI 安全与巡检神器",
        pain: "传统巡检靠「眼观耳听 + 手工填表」，容易漏检、造假；遇到疑难杂症，现场工人搞不定，等专家赶来黄花菜都凉了。",
        value: "简历里的 Altezhong 智能眼镜系统经过防爆和工业级改造后，巡检员戴上即可实时采集第一视角画面，云端 VLM 识别仪表盘读数并判断是否超限，AI 自动框选跑冒滴漏；遇到设备异响，后方专家可通过眼镜画面 + 空间音频进行沉浸式远程指导，把事后维修变成实时干预。",
      },
      {
        title: "场景六：用「CFD 仿真 + SCADA 数据」给风机调姿势",
        pain: "风机之间存在「尾流效应」，前排风机挡风导致后排风机吃不饱，全场发电量受损。",
        value: "我懂 ANSYS Fluent 三维 CFD 风场仿真，又懂 Python 处理 SCADA 数据。可以把风电场地形、气象数据和机组历史运行数据结合起来建立尾流模型，通过 AI 算法动态计算并调整每台风机在不同风向下的偏航角，牺牲前排一点点电量让后排多吃风，帮风电场整体提升 1%-3% 发电量。",
      },
      {
        title: "场景七：用「全网爬虫」打一场备件采购情报战",
        pain: "备品备件买多了资金压在仓库生锈，买少了关键设备一坏停机损失惨重。",
        value: "用 OmniScraper 7×24 小时盯着淘宝工业品、京东、厂家官网和行业论坛，抓取特定型号备件的价格波动、交货周期、停产公告和替代型号；结合 SCADA 故障频率用 LSTM 预测未来半年需求，AI 智能体自动生成《备件采购情报与优化建议》，盘活库存资金。",
      },
      {
        title: "场景八：碳资产管理，把「双碳政策」变成真金白银",
        pain: "火电 / 新能源企业面临严苛的「双碳」考核和碳交易，但政策天天变，碳配额怎么算、CCER 怎么开发是一笔糊涂账。",
        value: "用 MCP 热点追踪框架每天自动抓取国家生态环境部、各省发改委最新碳排放政策和绿电绿证交易行情，结合 SCADA 能耗数据自动核算实时碳排放量与配额盈亏；再用工程经济学 ROI/NPV 评估技改项目，帮电厂把政策压力转化为资产管理动力。",
      },
    ],
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
