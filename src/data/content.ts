// 所有作品集内容数据集中于此，按《简历二版》结构与格式完整抽取
import baiduNetdiskIcon from "@/data/icon/baidu-netdisk.png";
import writingMachineImg from "@/data/xiangmu/写字机项目.jpg";
import smartGlassesImg from "@/data/xiangmu/AI眼镜.png";
import internlmImg from "@/data/xiangmu/书生浦语大模型微调作品.png";
import baoer4kImg from "@/data/self-media/《钢铁是怎样炼成的》4K修复视频.png";
import bilibiliSpaceImg from "@/data/self-media/哔哩哔哩空间.png";
import douyinHomeImg from "@/data/self-media/抖音主页.png";
import xhsHomeImg from "@/data/self-media/小红书主业.png";
import cet4Img from "@/data/Certificate/英语四级证书.png";
import driverLicenseImg from "@/data/Certificate/机动车驾驶证.jpg";
import xhsQingcaoImg from "@/data/Certificate/小红书青草计划项目展示1.png";
import baiduContentCertImg from "@/data/Certificate/百度网盘小红书内容创作官证书.jpg";
import baiduCampusAmbassadorImg from "@/data/Certificate/百度网盘校园大使.png";
import devConferenceImg from "@/data/xiangmu/2024全球开发者先锋大会参会证.jpg";
import msReactorImg from "@/data/xiangmu/微软 Reactor线下聚会.jpg";
import selfieImg from "@/data/Profile Picture/角度自拍 (9).jpeg";

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
  tagline: "AI NATIVE GRADUATE",
  taglineSub: "一名对能源动力技术与人工智能交叉领域充满热情的工科生",
  positioning:
    "山西大学能源与动力工程全日制本科生（2027 届），国家级一流专业建设点。以「AI Native Graduate」为自我定位，在扎实掌握能动专业核心（ANSYS Fluent 多物理场仿真、AutoCAD/SolidWorks 三维设计、热工测试与 PLC/STM32 控制）的同时，深度拥抱 AIGC、智能体开发与全栈工程。具备 Python/Java 全栈能力，熟练运用 Spring AI、RAG、多 Agent 编排及端侧推理（TFLite Micro），独立完成智能眼镜系统和 OmniScraper Pro 视频分析工具等软硬一体项目，从传感器采集到云端处理全链路打通。",
  bio: "主业是能源与动力工程本科生，专业核心能力覆盖 ANSYS Fluent 多物理场仿真、AutoCAD / SolidWorks 三维设计、热工测试与 PLC/STM32 控制。在此之上，以 AI Native Graduate 身份拓展第二曲线：具备 Python/Java 全栈能力，熟练运用 Spring AI、RAG、多 Agent 编排及端侧推理（TFLite Micro），独立完成智能眼镜系统和 OmniScraper Pro 视频分析工具等软硬一体项目，从传感器采集到云端处理全链路打通。",
  mbti: "ENTJ-A",
  avatar: selfieImg,
  contacts: {
    phone: "19935072544",
    email: "1767976037@qq.com",
    github: "https://github.com/TianmingLe",
    bilibili: "https://b23.tv/NPxHvW4",
    xiaohongshu: "https://xhslink.com/m/5h3GEynfA7n",
    douyin: "https://v.douyin.com/mMECQWKw-Vs/",
  },
  coreTraits: [
    { icon: "Flame", title: "扎实的工程专业能力", desc: "ANSYS / AutoCAD / 实践操作技术" },
    { icon: "Bot", title: "前沿的 AI 技术应用能力", desc: "Agent 开发 / CC / Harness Engineering / Prompt 工程" },
    { icon: "BarChart3", title: "数据驱动的思维方式", desc: "Python / SQL / 数据分析" },
    { icon: "Target", title: "出色的项目执行力与团队协作精神", desc: "能源 × AI × 全栈 复合落地" },
  ],
  stats: [
    { label: "全网话题量", value: "10亿+" },
    { label: "单视频播放", value: "200万+" },
    { label: "全网粉丝", value: "21K+" },
    { label: "完整项目", value: "6+" },
    { label: "竞赛获奖", value: "4 项" },
    { label: "志愿时长", value: "20+ h" },
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
  short: ["考取注册公用设备工程师证书", "进入热能 / 电力行业实践"],
  mid: ["在热能行业实践中继续学习进步", "深化 AI + 能源创新应用探索"],
  long: ["成为既懂热力系统又懂 AI 的跨界工程师", "推动能源行业智能化转型"],
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
    keywords: ["CFD 仿真", "proteus 仿真", "三维设计", "实验操作"],
    summary: "掌握能源动力领域核心仿真工具链，ANSYS Fluent 流动传热燃烧仿真，proteus 仿真，AutoCAD / SolidWorks / UG 三维设计，实验操作能力强悍。",
    skills: ["实验操作能力强悍", "ANSYS Fluent（流动 / 传热 / 燃烧）", "proteus 仿真", "AutoCAD / SolidWorks / UG"],
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
    keywords: ["智能体开发", "大模型应用", "AIGC", "Vibe Coding", "单片机", "智能眼镜"],
    summary: "ComfyUI / 模型微调，Spring AI / RAG / MCP，AIGC 全链路，Vibe Coding 实践，Prompt / Harness Engineering，LangChain 多 Agent 编排，SEO/GEO 推广优化，单片机技术（写字机 / 51 单片机），智能眼镜系统（ESP32 / Flutter / FastAPI）。",
    skills: ["智能体开发（ComfyUI / 模型微调）", "大模型应用（Spring AI / RAG / MCP）", "AIGC（数字人 / 语音克隆 / AI 绘画 / AI 音乐 / AI 视频）", "Vibe Coding / Prompt Engineering / Harness Engineering", "SEO & GEO 推广优化 / AI 热点监控 Skills", "LangChain 多 Agent 编排 / Context 工程", "单片机技术（写字机 / 51 单片机）", "智能眼镜系统（ESP32 / Flutter / FastAPI）"],
    gallery: [
      { src: smartGlassesImg, caption: "Altezhong 智能眼镜系统实物图" },
      { src: internlmImg, caption: "书生·浦语大模型微调作品" },
      { src: writingMachineImg, caption: "写字机系统集成项目" },
    ],
  },
  {
    id: "am03",
    no: "03",
    domain: "编程开发",
    en: "Engineering",
    level: "★★★★★",
    role: "全栈支撑",
    icon: "Code2",
    keywords: ["Python", "Java", "C/C++", "JS/TS", "SQL", "Git", "Docker", "Linux"],
    summary: "Python 精通（数据分析 / 科学计算 / 自动化），Java 精通（Web 系统开发），C/C++ 掌握（嵌入式开发），JS/TS 熟练（前端 + Electron），SQL / Git / Docker / Linux / Office 全栈工程能力。",
    skills: ["Python 精通 / Java 精通", "C/C++ 掌握 / JS/TS 熟练", "SQL / Git 熟练", "Docker 掌握 / Linux 掌握（阿里云 ECS + Web 部署）", "Office 精通 / HTML / CSS 熟练"],
    gallery: [
      { src: devConferenceImg, caption: "2024 全球开发者先锋大会参会证" },
      { src: msReactorImg, caption: "微软 Reactor 线下技术聚会" },
      { src: baiduNetdiskIcon, caption: "百度网盘校园大使 & 技术推广" },
    ],
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
    gallery: [
      { src: baoer4kImg, caption: "《钢铁是怎样炼成的》4K 修复视频" },
      { src: bilibiliSpaceImg, caption: "哔哩哔哩主页 12K+ 粉丝" },
      { src: douyinHomeImg, caption: "抖音创作者主页" },
    ],
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
  // 超宽横图(宽>长且比例>2:1)或竖图(长>宽)时设为 "contain" 避免截断；默认 "cover"
  coverFit?: "cover" | "contain";
  keywords: string[];
  // 项目做了什么（技术内容描述）
  summary: string;
  // 对电厂/能源工作的应用价值（技能迁移场景）
  valueToPower: string;
  stack: string[];
  achievements: string[];
  tags: string[];
};

export const projects: Project[] = [
  /* ====== 第一部分 | 能动技术 ====== */
  {
    id: "p01",
    index: "01",
    part: "能动技术",
    partEn: "Energy & Power",
    title: "卧式壳管式换热器仿真与三维设计",
    category: "CFD 仿真 / 三维设计",
    year: "2024 — 2025",
    cover: "/energy/heat-exchanger-temp.png",
    coverFit: "contain",
    keywords: ["CFD 仿真", "ANSYS Fluent", "三维建模", "多物理场耦合"],
    summary:
      "完成卧式壳管式换热器零部件三维建模与装配设计，并对核心设备进行流动、传热等多物理场耦合仿真。使用 ANSYS Fluent 模拟壳管式换热器中心截面温度分布，验证理论公式与仿真结果的一致性。",
    valueToPower:
      "ANSYS Fluent 流动传热仿真能力可直接迁移到电厂凝汽器、冷油器、高压加热器等换热设备性能分析与节能改造，三维设计支撑热力系统技改方案落地。",
    stack: ["ANSYS Fluent（流动 / 传热 / 燃烧）", "AutoCAD / SolidWorks / UG", "proteus 仿真", "热工测试仪器"],
    achievements: [
      "独立完成换热器零部件三维建模与装配设计",
      "对核心设备进行流动、传热等多物理场耦合仿真",
      "用仿真结果反向验证理论公式，连接理论与实践",
      "掌握 CFD 仿真残差监控与收敛判定方法",
    ],
    tags: ["ANSYS Fluent", "CFD", "SolidWorks", "换热器"],
  },
  {
    id: "p02",
    index: "02",
    part: "能动技术",
    partEn: "Energy & Power",
    title: "写字机系统集成与落地应用",
    category: "嵌入式 / 开源硬件",
    year: "2025.02 — 2025.03",
    cover: writingMachineImg,
    coverFit: "contain",
    keywords: ["写字机", "Arduino", "GRBL 固件", "步进电机", "开源方案"],
    summary:
      "作为能源与动力工程专业学生突破学科壁垒，从 0 到 1 独立完成写字机项目全流程。从 GitHub 调研技术方案，对比 3 种主流架构后选择笛卡尔式结构，完成整机装配、固件烧录、参数校准与软件工作流搭建。",
    valueToPower:
      "步进电机驱动与 GRBL 固件参数校准经验可迁移到电厂电动执行机构、伺服阀定位与电动门调试，固件烧录与联调能力支撑现场仪控设备维护。",
    stack: ["Arduino Uno / STM32", "GRBL 固件", "A4988 / TMC2208 步进电机驱动", "Inkscape / Processing 矢量图形", "CNCjs / Universal Gcode Sender"],
    achievements: [
      "书写速度达 150 字/min，字迹工整度优于人工手写（一致性误差 < 0.5mm）",
      "优化笔压、抬笔高度、移动速度等 20+ 项关键参数",
      "累计自动化书写 500+ 页 A4 文档，节省手写时间 200+ 小时",
      "单次连续工作时长 3-4 小时，大学三年几乎完全替代传统手写作业",
    ],
    tags: ["Arduino", "GRBL", "步进电机", "开源方案"],
  },
  {
    id: "p03",
    index: "03",
    part: "能动技术",
    partEn: "Energy & Power",
    title: "基于 51 单片机的多功能智能控制系统",
    category: "嵌入式开发 / 单片机",
    year: "2025.06 — 2025.07",
    cover: IMG("close-up of a microcontroller board with LED lights and circuit wires on dark background, cyan glow, tech hardware, macro photography, premium", "landscape_16_9"),
    keywords: ["51 单片机", "PWM", "矩阵键盘", "数码管", "传感器驱动"],
    summary:
      "基于 51 单片机完成多功能智能控制系统开发，整合 10+ 种外设模块，涵盖 IO 控制、显示驱动、通信存储、传感器采集、电机控制、AD/DA 转换与点阵显示，形成完整的技术文档与代码库。",
    valueToPower:
      "DS18B20 测温与 PWM 电机调速能力可服务于电厂热工测控仪表调试与执行机构控制，传感器驱动与通信协议经验支撑现场二次仪表与采集回路维护。",
    stack: ["51 单片机", "Keil 开发环境", "UART / I2C 通信协议", "DS1302 / DS18B20 传感器", "LCD1602 / 数码管 / 8×8 点阵"],
    achievements: [
      "系统整合 10+ 种外设模块，代码采用模块化设计，复用率 > 80%",
      "矩阵键盘密码锁，软件消抖算法确保按键识别准确率 > 99%",
      "DS18B20 测温范围 -55℃~+125℃，精度 ±0.5℃",
      "PWM 直流电机无级调速（占空比 0-100%），红外遥控响应延迟 < 100ms",
    ],
    tags: ["51 单片机", "嵌入式", "PWM", "传感器"],
  },
  {
    id: "p04",
    index: "04",
    part: "能动技术",
    partEn: "Energy & Power",
    title: "基于 STM32 的嵌入式系统综合开发实践",
    category: "嵌入式开发 / STM32",
    year: "2025.07 — 2025.09",
    cover: IMG("dark macro shot of STM32 development board with cyan circuit traces glowing, chips and headers, premium tech hardware photography", "landscape_16_9"),
    keywords: ["STM32", "EXTI 中断", "ADC + DMA", "I2C / SPI", "MPU6050", "低功耗"],
    summary:
      "系统整合 20+ 种外设模块与通信协议，代码采用分层架构设计（驱动层-中间层-应用层）。涵盖 GPIO 控制、中断定时器、编码器运动控制、ADC+DMA 数据采集、串口通信、I2C/SPI 总线、实时时钟、低功耗管理、看门狗保护与内部 FLASH 操作。",
    valueToPower:
      "ADC+DMA 多通道同步采样与看门狗保护可直接迁移到电厂振动温度监测装置与 SCADA 前端采集，MTBF>1000h 的工业级稳定性契合电厂连续运行要求。",
    stack: ["STM32 / STM32CubeIDE", "EXTI / TIM / ADC / DMA", "USART / I2C / SPI", "MPU6050 / W25Q64 / RTC", "IWDG / WWDG / PWR 低功耗"],
    achievements: [
      "整合 20+ 种外设模块，模块复用率 > 85%，累计编写代码 8000+ 行",
      "ADC + DMA 多通道同步采样，采样间隔 < 1μs，CPU 占用率降低 80%",
      "待机模式系统功耗低至 3μA，续航时间延长 3-5 倍",
      "工业级系统稳定性：连续运行 168 小时无故障，MTBF > 1000 小时",
    ],
    tags: ["STM32", "DMA", "I2C", "低功耗", "看门狗"],
  },

  /* ====== 第二部分 | AI 特种技术 ====== */
  {
    id: "p05",
    index: "05",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "Altezhong 智能眼镜系统",
    category: "AI Hardware / Embedded",
    year: "2025.04 — 2026.05",
    cover: smartGlassesImg,
    coverFit: "contain",
    keywords: ["智能眼镜", "ESP32-S3", "BLE 音频", "视觉特征提取", "Flutter", "FastAPI"],
    summary:
      "基于「轻眼镜 + 重后端」架构的智能眼镜系统，实现眼镜-手机-PC-云的多条链路。包含 ESP32-S3 固件（BLE 音频 / 视觉特征提取）、Flutter 移动应用、FastAPI 后端和 PC 中继服务，支持断点续传与 OTA 升级。",
    valueToPower:
      "眼镜端第一视角采集+云端 VLM 识别架构经防爆工业改造可成为电厂 AI 巡检神器，实时识别仪表读数与跑冒滴漏并支持专家沉浸式远程指导。",
    stack: ["ESP32-S3 / C/C++", "TFLite Micro / RNNoise", "Flutter / Dart / BLE", "FastAPI / WebSocket", "TypeScript / Node.js"],
    achievements: [
      "音频传输延迟 < 100ms，BLE 通过率门禁测试",
      "特征提取耗时 < 50ms，RAM 占用 < 2MB（int8 量化 800KB→200KB）",
      "信噪比提升 15dB，RAM 增量 8%，OTA 成功率 > 95%",
      "断点续传成功率 > 99%，数据完整性 100%（CRC32 校验）",
    ],
    tags: ["ESP32-S3", "Flutter", "FastAPI", "BLE 音频", "OTA"],
  },
  {
    id: "p06",
    index: "06",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "知心 AI — 情感与规划助手",
    category: "AI Agent / RAG / MCP",
    year: "2025.12 — 2026.03",
    cover: IMG("abstract AI neural network visualization, dark background with glowing cyan nodes and connections, data flowing, minimal premium tech aesthetic, depth of field", "landscape_16_9"),
    keywords: ["Spring AI", "智能体", "RAG", "PGvector", "MCP 协议", "ReAct 模式"],
    summary:
      "基于 Spring AI 框架构建 AI 智能体应用，实现多轮情感咨询与自主规划两大核心功能。支持知识库问答、动态工具调用、任务自主分解执行，完成从用户指令到行动交付的完整闭环。",
    valueToPower:
      "RAG 混合检索+Cross-Encoder 重排序能力可构建电厂专属智能问答助手，将规程、缺陷台账、历史工单向量化，让现场一问即得标准处置方案。",
    stack: ["Spring Boot 3 / Spring AI", "PGvector 向量数据库", "RAG / Tool Calling / MCP", "ReAct 模式 / 分层智能体", "Redis / CompletableFuture"],
    achievements: [
      "支持 10 轮以上连续对话，上下文准确率 > 95%",
      "检索准确率从 75% 提升至 92%（混合检索 + Cross-Encoder 重排序）",
      "工具调用准确率 > 90%，平均调用耗时 < 2s",
      "响应时间降低 60%，QPS 提升至 200+",
    ],
    tags: ["Spring AI", "RAG", "MCP", "ReAct", "PGvector"],
  },
  {
    id: "p07",
    index: "07",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "书生·浦语大模型实战营",
    category: "LLM Fine-tuning",
    year: "2024",
    cover: internlmImg,
    coverFit: "contain",
    keywords: ["InternLM", "大模型微调", "A100", "LoRA", "DeepSpeed"],
    summary:
      "完成书生·浦语大模型实战营项目，在 A100 上训练基于 InternLM 的 8B 微调角色模型，掌握大模型微调基本流程与技巧，包括数据准备、LoRA 微调、分布式训练与模型评估。",
    valueToPower:
      "LoRA 参数高效微调经验可基于电厂历史工单与缺陷记录训练专属领域大模型，提升故障诊断与规程问答准确率，支撑电厂知识资产沉淀与传承。",
    stack: ["InternLM-8B", "NVIDIA A100 GPU", "PyTorch / DeepSpeed", "LoRA 参数高效微调"],
    achievements: [
      "使用 LoRA 进行参数高效微调（lr=2e-4, batch=16, epochs=3）",
      "角色对话质量提升 40%",
      "猪八戒微调模型指令跟随能力提升 80%",
      "掌握分布式训练与大模型评估方法",
    ],
    tags: ["InternLM", "LoRA", "A100", "DeepSpeed"],
  },
  {
    id: "p08",
    index: "08",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "AI 前沿热点追踪与自动化分析系统",
    category: "MCP / Agent Skills / 自动化 Pipeline",
    year: "2026.03 — 2026.04",
    cover: IMG("dark dashboard interface with data streams flowing, automated pipeline visualization, cyan glowing nodes connecting, premium tech UI, minimal", "landscape_16_9"),
    keywords: ["MCP 协议", "Agent Skills", "自动化 Pipeline", "飞书 API", "知识库"],
    summary:
      "面向 AI 前沿动态的自动化监控与分析 Pipeline。通过自定义 Skills 与 MCP 组件构建智能体追踪框架，实现多源热点数据的自动采集、LLM 结构化分析及飞书文档的实时同步，打造 7×24 小时无人值守的 AI 情报中枢。",
    valueToPower:
      "MCP 自动化情报 Pipeline 可 7×24 小时追踪设备诊断算法、CFD 优化方案与双碳政策碳交易行情，自动推送至技术科飞书文档，赋能前沿研判与碳资产管理。",
    stack: ["Python", "MCP (Model Context Protocol)", "Agent Skills", "飞书开放平台 API", "LLM Prompt 工程（Few-shot / CoT）"],
    achievements: [
      "从零设计「AI 的混乱空间」追踪框架，编写多源数据抓取与解析 Skills",
      "构建「采集→清洗→LLM 提炼→标签分类」自动化工作流",
      "打通飞书 API，实现分析结果 Markdown 自动排版与实时推送",
      "信息检索与前沿研判效率提升 300%",
    ],
    tags: ["MCP", "Agent Skills", "飞书 API", "自动化"],
  },
  {
    id: "p09",
    index: "09",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "云原生部署与 DevOps 工程化实践",
    category: "Cloud / DevOps / CI-CD",
    year: "2024 — 2026",
    cover: IMG("dark server room with glowing server racks, docker containers visualization, CI/CD pipeline flow, cyan accent lights, premium tech aesthetic", "landscape_16_9"),
    keywords: ["阿里云 ECS", "Docker", "Nginx", "CI/CD", "GitHub Actions", "HTTPS"],
    summary:
      "具备完整的产品工程化交付能力。熟练依托阿里云 ECS 与 Linux 系统搭建高可用后端服务，掌握从环境配置、容器化编排到域名解析、HTTPS 加密的全链路 Web 部署方案；打通 GitHub Actions 自动化流水线，实现多端应用的自动构建与上架发布。",
    valueToPower:
      "Docker 容器化+Nginx 反向代理+CI/CD 能力可将班组减负工具（缺陷台账统计、两票审查）快速部署到电厂 Linux 服务器，实现 SaaS 化交付。",
    stack: ["阿里云 ECS / Linux 运维", "Docker / Docker-Compose", "Nginx 反向代理 / 负载均衡", "Let's Encrypt HTTPS", "GitHub Actions CI/CD"],
    achievements: [
      "独立管理阿里云 ECS 实例，完成系统初始化与安全组策略配置",
      "FastAPI / Spring Boot 容器化部署 + Nginx 反向代理 + HTTPS 加密",
      "GitHub Actions 实现自动测试、多平台构建（Win/macOS/Linux）与签名",
      "构建产物自动发布至 GitHub Release，产品从「本地 Demo」到「SaaS 化」",
    ],
    tags: ["阿里云", "Docker", "Nginx", "CI/CD"],
  },
  {
    id: "p10",
    index: "10",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "AIGC 应用全链路",
    category: "AIGC / 数字人 / AI 绘画",
    year: "2024 — 2026",
    cover: IMG("dark abstract creative AI art generation, multiple media types floating - digital human face, music notes, painting brush, video frames, cyan glow, premium", "landscape_16_9"),
    keywords: ["数字人", "语音克隆", "AI 音乐", "Midjourney", "Stable Diffusion", "AI 视频"],
    summary:
      "熟悉数字人技术、语音克隆、多语种复制、AI 音乐及 Midjourney、Stable Diffusion 等AI 绘画技术，能独立完成从创意到成品的全流程。涵盖数字人视频制作、多语种配音、背景音乐创作、概念设计与插画创作。",
    valueToPower:
      "数字人+语音克隆+AI 视频能力可将枯燥安规与事故通报做成沉浸式 3D 还原短片与 AI 数字人安全宣讲，重塑电厂安全培训与科技雇主品牌宣传。",
    stack: ["数字人: D-ID / HeyGen / SadTalker", "语音克隆: ElevenLabs / So-VITS-SVC / RVC", "AI 音乐: Suno AI / Udio", "AI 绘画: Midjourney / Stable Diffusion / ControlNet"],
    achievements: [
      "数字人视频：制作教学视频、产品介绍、虚拟主播",
      "语音克隆：多语种配音、角色语音合成",
      "AI 音乐：生成背景音乐、主题曲创作",
      "AI 绘画：概念设计、插画创作、海报设计",
    ],
    tags: ["数字人", "语音克隆", "AI 绘画", "AI 音乐"],
  },
  {
    id: "p11",
    index: "11",
    part: "AI 特种技术",
    partEn: "AI Special Forces",
    title: "AI 提示工程与智能体开发",
    category: "Prompt 工程 / Agent 架构 / 工作流",
    year: "2024 — 2026",
    cover: IMG("dark abstract prompt engineering concept, flowing text fragments transforming into structured data, cyan glow on black, minimal premium tech aesthetic", "landscape_16_9"),
    keywords: ["Prompt 工程", "思路链", "Few-shot", "Agent 架构", "ComfyUI", "n8n"],
    summary:
      "精通 Prompt 工程师技能，熟练运用思路链提示、小样本学习、系统提示等多种框架；具备 Agent 架构师能力，能搭建各类 Agent 智能体；熟悉 ComfyUI 及 n8n 工作流，会编写对应的 Skills 及 MCP。",
    valueToPower:
      "n8n 自动化工作流+Agent 编排能力可定制电厂缺陷台账自动统计、两票合规性 AI 审查插件，把班组每天 1 小时填表时间压缩到 5 分钟。",
    stack: ["Prompt: CoT / Few-shot / System Prompt / Self-Consistency", "Agent: 单 Agent / 多 Agent 协作 / 分层 Agent", "ComfyUI: 可视化 AI 工作流", "n8n: 自动化工作流", "Skills / MCP 开发"],
    achievements: [
      "设计图像生成 Pipeline（提示词→SDXL→后处理）",
      "n8n 实现定时抓取→LLM 分析→邮件通知全流程",
      "编写天气查询、股票查询、新闻摘要等 Skills",
      "实现工具注册与发现机制，MCP 服务标准化封装",
    ],
    tags: ["Prompt", "Agent", "ComfyUI", "n8n", "MCP"],
  },

  /* ====== 第三部分 | Vibe Coding 产品 ====== */
  {
    id: "p12",
    index: "12",
    part: "Vibe Coding 产品",
    partEn: "Vibe Coding Products",
    title: "OmniScraper Pro — 视频抓取工具",
    category: "AI Tool / Desktop",
    year: "2026.03 — 2026.05",
    cover: IMG("dark data visualization concept, video frames grid flowing into analysis pipeline, matrix style cyan glow on black, minimal tech interface, premium", "landscape_16_9"),
    keywords: ["视频抓取", "抖音分析", "Whisper ASR", "yt-dlp", "Electron", "MediaCrawler"],
    summary:
      "从 0 开始手搓视频抓取工具，后基于 MediaCrawler 和 omi 项目进行 AI 能力扩展。实现「采集 → 下载 → ASR 转写 → LLM 分析 → 导出」完整链路，支持抖音等多平台，包含 Electron 桌面端与自动化测试。",
    valueToPower:
      "OmniScraper 抓取+Whisper 转写+LLM 提炼链路可将抖音检修视频批量沉淀为故障排查 SOP 库；代理池监控能力可 7×24h 追踪备件价格与停产情报。",
    stack: ["MediaCrawler 爬虫框架", "yt-dlp 下载 / Whisper ASR", "LiteLLM 多模型", "Electron / TypeScript / React", "Jest / Pytest / GitHub Actions"],
    achievements: [
      "MVP 闭环：抓取→下载→转写→输出→清理",
      "Desktop 端 53 个测试文件，167 个测试全部通过",
      "MediaCrawler 46 个测试通过，测试覆盖率 > 85%",
      "代理可用率从 60% 提升至 90%，打包体积压缩至 150MB",
    ],
    tags: ["Electron", "Whisper", "MediaCrawler", "CI/CD"],
  },

  /* ====== 第四部分 | 自媒体特种技术 ====== */
  {
    id: "p13",
    index: "13",
    part: "自媒体特种技术",
    partEn: "Content Creation",
    title: "《钢铁是怎样炼成的》4K 修复",
    category: "Video Restoration / AIGC",
    year: "2025.04 — 2025.05",
    cover: baoer4kImg,
    coverFit: "contain",
    keywords: ["视频修复", "4K", "AI 增强", "保尔·柯察金", "内容发布"],
    summary:
      "独立完成经典影片《钢铁是怎样炼成的》4K 修复与发布，使用 AI 技术进行画质增强、分辨率提升、色彩校正。作品在 B 站与抖音形成「长视频修复 + 短视频切片」的传播矩阵，引发全网对保尔·柯察金精神的学习与讨论热潮。",
    valueToPower:
      "AI 超分+RIFE 插帧+色彩校正能力可用于修复电厂历史事故影像与老旧培训资料，提升安全文化宣传与事故案例教学的传播力与说服力。",
    stack: ["Topaz Video AI（超分 / 去噪）", "剪映（色彩校正）", "RIFE 插帧 / 光流法（25→60fps）"],
    achievements: [
      "B 站播放 200 万+，抖音切片 1500 万+",
      "带动话题量 10 亿+",
      "《钢铁是怎样炼成的》话题热度峰值突破 25 万，均值 2.9 万",
      "「保尔柯察金」话题热度峰值近 50 万，角色 IP 爆发力强",
    ],
    tags: ["4K 修复", "AI 超分", "色彩校正", "60fps 插帧"],
  },
  {
    id: "p14",
    index: "14",
    part: "自媒体特种技术",
    partEn: "Content Creation",
    title: "小红书新媒体「青草计划」",
    category: "新媒体运营 / 内容创作",
    year: "2025.06",
    cover: "/awards/xhs-qingcao-plan.jpg",
    coverFit: "contain",
    keywords: ["小红书运营", "内容创作", "青草计划", "新媒体技能"],
    summary:
      "参加小红书新媒体优秀人才职业技能大赛「青草计划」项目实践，学习并实践了小红书平台的内容创作、运营策略、数据分析等技能。",
    valueToPower:
      "标题优化+封面设计+数据分析能力可服务于智慧电厂科普内容策划与企业科技雇主品牌宣传，以数据驱动优化电厂对外形象传播。",
    stack: ["小红书平台", "图文 / 视频笔记", "标题优化 / 封面设计", "数据分析 / 社群互动"],
    achievements: [
      "确定内容方向（技术分享 / AI 应用）",
      "制作图文 / 视频笔记（AI 工具使用教程、技术干货）",
      "学习标题优化、封面设计、话题选择",
      "分析阅读量、点赞、收藏、转化数据",
    ],
    tags: ["小红书", "新媒体", "内容创作", "数据分析"],
  },
  {
    id: "p15",
    index: "15",
    part: "自媒体特种技术",
    partEn: "Content Creation",
    title: "自媒体品牌矩阵",
    category: "Brand / Content Operation",
    year: "2024 — 2026",
    cover: bilibiliSpaceImg,
    coverFit: "contain",
    keywords: ["B 站 UP 主", "抖音创作者", "小红书博主", "内容运营", "10 亿+ 话题"],
    summary:
      "全网粉丝 2.1 万+ 的科技与泛文化创作者。以「AI 技术赋能」为核心驱动力，构建涵盖前沿科技测评、红色经典数字化修复、泛艺术视听创作的内容矩阵。曾打造 10 亿+ 话题量的现象级正能量爆款。",
    valueToPower:
      "10 亿+ 话题量爆款策划网感可把枯燥安规做成沉浸式培训短片，并对外打造智慧风电/绿色火电科普短视频，构建电厂科技雇主品牌内容矩阵。",
    stack: ["B 站 / 抖音 / 小红书 / 公众号", "剪映 / AE / PR", "Photoshop / Audition", "内容运营策略"],
    achievements: [
      "哔哩哔哩 12,000+ 粉丝",
      "抖音 4,900+ 粉丝",
      "小红书 4,600+ 粉丝",
      "代表作《钢铁是怎样炼成的》4K 修复 200 万+ 播放，全网撬动 10 亿+ 话题",
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
      { month: "01", title: "自媒体创号", desc: "小红书首月斩获 1000+ 粉丝", image: xhsHomeImg },
      { month: "03", title: "百度网盘校园大使", desc: "同时担任小红书宣传大使", image: baiduCampusAmbassadorImg },
      { month: "05", title: "InternLM 学习", desc: "About-InternLM-study 笔记", image: internlmImg },
      { month: "10", title: "英语视频制作比赛", desc: "校级二等奖", image: baiduContentCertImg },
      { month: "—", title: "全年自媒体", desc: "抖音 1600+ / 小红书 3000+ / B 站 800+" },
    ],
  },
  {
    year: "2025",
    color: "volt",
    events: [
      { month: "02", title: "市场调查大赛", desc: "《LLM 市场应用》校级二等奖" },
      { month: "03", title: "4K 修复项目", desc: "《钢铁是怎样炼成的》4K 修复启动", image: baoer4kImg },
      { month: "06", title: "风电场运维实习", desc: "山西粤电盂县粤鑫风电场" },
      { month: "06", title: "青草计划", desc: "小红书新媒体职业技能大赛", image: xhsQingcaoImg },
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
      { month: "04", title: "智能眼镜 v0.1", desc: "Altezhong-yanjing MVP", image: smartGlassesImg },
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
    image: baiduContentCertImg,
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
  { id: "c03", icon: "Languages", title: "大学英语四级证书", desc: "CET-4，英语读写能力", image: cet4Img },
  { id: "c04", icon: "Car", title: "机动车驾驶证", desc: "C1，便于工程现场调研", image: driverLicenseImg },
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
    company: "大同市能源局",
    role: "能源政策助理实习生",
    period: "2026.07（待办）",
    keywords: ["能源政策", "行业调研", "政策分析"],
    summary:
      "即将赴大同市能源局开展能源政策助理实习，深度参与地方能源政策调研与分析工作。",
    points: [
      "协助开展地方能源政策调研与分析",
      "参与新能源产业发展相关课题研究",
      "学习能源行政管理体系与政策制定流程",
    ],
  },
  {
    id: "i03",
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
      "从大一开始，我就明确自己的职业定位是**应用型工程技术人才**，而非纯学术研究型人才。因此，我采取了一套**以终为始的差异化学习策略**。",
      "**第一，确保专业核心底座扎实。** 对于《工程热力学》《流体力学》《汽轮机原理》等核心课程，我始终保持高标准掌握，能熟练运用 **ANSYS Fluent** 进行多物理场耦合仿真，独立完成换热器三维建模与装配设计，以及使用红外测温仪、振动传感器等仪表进行设备状态检测。",
      "**第二，主动把课堂延伸到工厂车间和实验室。** 掌握离心泵和汽轮机的拆装检修、车床铣床精加工操作、热工仪表现场标定与数据采集，以及 **PLC 控制系统编程调试**，从梯形图、结构化文本编程到现场接线与信号联调，都能上手。",
      "**第三，把目光投向行业的下一个十年。** 电力行业已完成电气化，下一波浪潮必然是**智能化、AI 化**。从 PLC 底层控制学起，向上延伸到 51/STM32 嵌入式开发，再向上延伸到 Python 数据分析与 LLM、VLM 智能体应用，这条「现场级→系统级→智能级」的技术链路正好对应智慧电厂、智能运维、预测性维护等真实工业场景。",
      "**第四，更关注能力的含金量而非名次。** 班里 40 人中我大约排在 10 多名，但我选择了一条以**工程实战 + 技术融合**为导向的差异化路线，比同龄人更早接触工业控制、嵌入式开发、AI 智能体、数据分析、自媒体运营等多领域技能。",
      "既懂热力系统、又懂 PLC 底层控制、还能用 AI 做数据分析的**跨界人才是稀缺的**。如果贵单位需要的是能够快速融入现场、理解工艺与控制、并能推动智能化转型的工程师，我的实干经历和跨界视野会更有**长期价值**。",
    ],
  },
  {
    id: "q2",
    question: "你做这些互联网爬虫和 AI 工具，对我们电厂 / 传统能源企业有什么用？",
    paragraphs: [
      "电厂目前最大的资产流失，其实是**隐性经验的流失**。我在简历中写的这些工具，对电厂的价值主要体现在三个方面。",
      "**第一，把闭源平台上的一线实操经验变成电厂的数字资产。** 电厂很多老专家、老技师处理风机异响、排查变压器缺陷的土办法和实操手感，往往没有写进标准规程里。我的 **OmniScraper Pro** 工具可以批量抓取抖音、小红书等平台的检修视频，通过 **Whisper 转写**成文字，再用大模型提炼成标准的**故障排查 SOP**，相当于用 AI 给电厂自动建立一个活的师傅经验库。",
      "**第二，把开源社区的前沿算法与电厂的现场缺陷结合。** 我的 **MCP 热点追踪系统**可以 7×24 小时抓取 GitHub、知网、电力论坛的最新设备故障诊断模型和 CFD 仿真优化方案，自动推送到技术科的飞书文档，让技术人员永远站在**全网技术的最前沿**。",
      "**第三，构建电厂专属的多模态 RAG 智能问答助手。** 把开源理论论文、闭源实操视频以及电厂内部的历史缺陷台账全部向量化后，新员工在现场遇到设备报警，只需要用智能眼镜或手机问一句「2 号风机齿轮箱温度异常怎么处理？」系统不仅能调出规程，还能直接调出实操视频片段，用**全网数据赋能一线生产**。",
      "我做的不仅仅是几个爬虫或 AI 玩具，而是**全网多源异构数据的自动化采集与知识沉淀底座**。",
    ],
  },
  {
    id: "q3",
    question: "你这些额外的能力，能给我们电厂带来什么？",
    paragraphs: [
      "我的跨界能力可以从**基层减负、安全宣传、技术翻译、团队赋能、智能巡检、抢发电量、备件情报、碳资产管理**等八个维度，为电厂创造差异化价值。",
    ],
    scenarios: [
      {
        title: "价值一：用「Vibe Coding」为基层班组减负",
        pain: "大型系统往往不接地气，基层班组每天还要花大量时间手工统计缺陷台账、整理「两票」、盘点备品备件。",
        value: "利用 **Vibe Coding（AI 辅助编程）**和全栈开发能力，我能在几天内用 Python + AI 帮班组定制缺陷台账自动统计小工具或两票合规性 AI 审查插件，直接部署到阿里云或科室 Linux 服务器，把**每天 1 小时的填表时间压缩到 5 分钟**。",
      },
      {
        title: "价值二：用「爆款自媒体思维」重塑安全培训与企业宣传",
        pain: "传统安规培训、事故通报极其枯燥，员工往往是「应付考试」，难以入脑入心；同时传统电厂对外形象刻板。",
        value: "我有全网 **2.1 万粉丝**的自媒体经验和策划过 **10 亿+ 播放量爆款**的网感。我能把枯燥的安规考试变成生动的 AI 数字人安全宣讲，用 AI 视频技术把事故通报做成沉浸式 3D 还原短片；对外策划智慧风电、绿色火电科普短视频，打造企业的**科技雇主品牌**。",
      },
      {
        title: "价值三：充当「业务」与「IT」的超级翻译官",
        pain: "外包互联网公司不懂「汽轮机轴振」「风机偏航」，做出来的 AI 模型没法用；厂里的老专家又不懂「大模型、向量数据库」，提不出准确需求。",
        value: "我既懂热力学、去过风电场实习、看得懂 SCADA 数据，又精通 **Spring AI、RAG 和 Agent 编排**，知道 AI 的边界在哪。我能把现场真痛点准确转化为 IT 能听懂的 AI 需求，帮厂里把控技术方向，**避免被外包公司忽悠**。",
      },
      {
        title: "价值四：引入「AI 协作」新范式，打造效能型科室",
        pain: "传统能源企业工作氛围相对固化，员工写材料、做 PPT、处理海量运行数据耗费大量精力。",
        value: "作为 ENTJ 和 AI Native，我能把如何用大模型写公文、用 Python 一键清洗百个 Excel 运行报表、用 AI 做数据可视化汇报沉淀成 **SOP**，在科室里做分享，**带动整个班组效能提升**。",
      },
      {
        title: "场景五：把智能眼镜改造成 AI 安全与巡检神器",
        pain: "传统巡检靠「眼观耳听 + 手工填表」，容易漏检、造假；遇到疑难杂症，现场工人搞不定，等专家赶来黄花菜都凉了。",
        value: "简历里的 **Altezhong 智能眼镜系统**经过防爆和工业级改造后，巡检员戴上即可实时采集第一视角画面，云端 **VLM 识别**仪表盘读数并判断是否超限，AI 自动框选跑冒滴漏；遇到设备异响，后方专家可通过眼镜画面 + 空间音频进行沉浸式远程指导，**把事后维修变成实时干预**。",
      },
      {
        title: "场景六：用「CFD 仿真 + SCADA 数据」给风机调姿势",
        pain: "风机之间存在「尾流效应」，前排风机挡风导致后排风机吃不饱，全场发电量受损。",
        value: "我懂 **ANSYS Fluent 三维 CFD 风场仿真**，又懂 Python 处理 SCADA 数据。可以把风电场地形、气象数据和机组历史运行数据结合起来建立尾流模型，通过 AI 算法动态计算并调整每台风机在不同风向下的偏航角，牺牲前排一点点电量让后排多吃风，**帮风电场整体提升 1%-3% 发电量**。",
      },
      {
        title: "场景七：用「全网爬虫」打一场备件采购情报战",
        pain: "备品备件买多了资金压在仓库生锈，买少了关键设备一坏停机损失惨重。",
        value: "用 **OmniScraper** 7×24 小时盯着淘宝工业品、京东、厂家官网和行业论坛，抓取特定型号备件的价格波动、交货周期、停产公告和替代型号；结合 SCADA 故障频率用 **LSTM 预测**未来半年需求，AI 智能体自动生成《备件采购情报与优化建议》，**盘活库存资金**。",
      },
      {
        title: "场景八：碳资产管理，把「双碳政策」变成真金白银",
        pain: "火电 / 新能源企业面临严苛的「双碳」考核和碳交易，但政策天天变，碳配额怎么算、CCER 怎么开发是一笔糊涂账。",
        value: "用 **MCP 热点追踪框架**每天自动抓取国家生态环境部、各省发改委最新碳排放政策和绿电绿证交易行情，结合 SCADA 能耗数据自动核算实时碳排放量与配额盈亏；再用工程经济学 **ROI/NPV** 评估技改项目，帮电厂把政策压力转化为**资产管理动力**。",
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
