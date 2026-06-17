## 1. 架构设计

```mermaid
flowchart TB
    subgraph "前端层"
        "React 18 + Vite + TypeScript"
        "Tailwind CSS"
        "Framer Motion (动效)"
    end
    subgraph "资源层"
        "视频背景素材"
        "图片资源"
        "字体资源"
    end
    "前端层" --> "资源层"
```

纯前端单页应用，无后端服务。所有内容数据以 TypeScript 常量形式内置于代码中，便于后续替换为 CMS / API。

## 2. 技术栈说明
- **前端框架**：React 18 + TypeScript
- **构建工具**：Vite
- **样式方案**：Tailwind CSS 3
- **动效库**：Framer Motion（滚动入场、hover 微交互）
- **图标库**：lucide-react
- **路由**：单页锚点滚动，无需 react-router
- **状态管理**：无需（纯展示站点）
- **初始化工具**：vite-init（react-ts 模板）

## 3. 路由定义
| 路由 | 用途 |
|------|------|
| `/` | 单页作品集，通过锚点 `#hero` `#about` `#work` `#strength` `#contact` 滚动 |

## 4. 目录结构
```
src/
├── components/
│   ├── Navbar.tsx          # 顶部导航
│   ├── Hero.tsx            # 首页 Hero
│   ├── About.tsx           # 个人经历
│   ├── Work.tsx            # 精选项目
│   ├── Strengths.tsx       # 个人优势
│   ├── Contact.tsx         # 底部联系
│   └── ui/                 # 通用 UI 原子组件
├── data/
│   └── content.ts          # 所有文案/项目/能力数据
├── hooks/
│   └── useScrollReveal.ts  # 滚动入场动效
├── App.tsx
├── main.tsx
└── index.css
```

## 5. 数据模型
所有内容数据集中在 `src/data/content.ts`，类型定义如下：

```typescript
export const profile = {
  name: string;
  identity: string[];        // 身份标签
  tagline: string;           // 一句话定位
  bio: string;               // 个人简介
  avatar: string;            // 头像/人物图 URL
  contacts: {
    phone: string;
    email: string;
    github: string;
    bilibili: string;
    xiaohongshu: string;
    douyin: string;
  };
  stats: { label: string; value: string }[];
};

export const projects: {
  id: string;
  title: string;
  category: string;
  year: string;
  cover: string;
  description: string;
  tags: string[];
}[] = [];

export const strengths: {
  id: string;
  title: string;
  description: string;
  icon: string;              // lucide icon name
}[] = [];
```

## 6. 关键实现要点
- **视频背景**：使用 `<video>` 标签 + Tailwind object-cover，叠加渐变 div 遮罩
- **滚动动效**：Framer Motion `whileInView` + `staggerChildren`，触发阈值 `once: true`
- **导航锚点**：`scroll-behavior: smooth` + `scroll-margin-top` 处理固定导航偏移
- **版心**：`max-w-[1700px] mx-auto px-8`
- **字体加载**：通过 `index.html` 引入 Google Fonts（Syne + Manrope + Noto Sans SC）
- **图片资源**：使用 `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image` 生成项目封面与人物图
