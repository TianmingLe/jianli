# BorderGlow Q&A Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 为 `Q&A` 组件接入 React Bits 的 `BorderGlow`，并在主问题块与 Q3 场景卡片两层结构上应用克制的辉光交互。

**Architecture:** 保留现有 `QA` 页面背景和 `QandA` 的 `framer-motion` 进入动画，只新增一个可复用的 `BorderGlow` 组件及其 CSS，并在 `QandA` 内局部替换普通边框容器。外层主问题块与内层场景卡片使用不同参数，避免双层辉光过强。

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, CSS custom properties

---

### Task 1: 新增 BorderGlow 组件

**Files:**
- Create: `src/components/BorderGlow.tsx`
- Create: `src/components/BorderGlow.css`
- Modify: `src/vite-env.d.ts`

- [ ] **Step 1: 为静态资源和 CSS 导入补齐类型兼容**

```ts
/// <reference types="vite/client" />
```

预期：
- 维持 Vite 基础类型声明可用
- `BorderGlow.tsx` 可以直接导入 `./BorderGlow.css`

- [ ] **Step 2: 新建 `BorderGlow.tsx`，把 React Bits 源码改为 TypeScript 版本**

```tsx
import { CSSProperties, ReactNode, useCallback, useEffect, useRef } from "react";
import "./BorderGlow.css";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string;
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: string[];
  fillOpacity?: number;
};

type BorderGlowStyle = CSSProperties & Record<`--${string}`, string | number>;

export default function BorderGlow({ children, className = "" }: BorderGlowProps) {
  return <div className={`border-glow-card ${className}`}>{children}</div>;
}
```

实现要求：
- 补齐 `parseHSL`、`buildGlowVars`、`buildGradientVars`、`animateValue`
- `cardRef` 使用 `HTMLDivElement | null`
- `style` 使用带 CSS 自定义变量的类型
- 导出默认组件

- [ ] **Step 3: 新建 `BorderGlow.css` 并放入组件样式**

```css
.border-glow-card {
  --edge-proximity: 0;
  --cursor-angle: 45deg;
  position: relative;
}

.border-glow-inner {
  position: relative;
  z-index: 1;
}
```

实现要求：
- 收纳完整 CSS
- 保留伪元素、遮罩、外发光和 `.edge-light`
- 不做与本项目无关的样式改写

- [ ] **Step 4: 运行基础类型检查**

Run: `npm run check`

Expected:
- 如果依赖已安装，检查应通过或只暴露仓库既有问题
- 不应出现 `BorderGlow.tsx` 的新增语法错误

- [ ] **Step 5: Commit**

```bash
git add src/components/BorderGlow.tsx src/components/BorderGlow.css src/vite-env.d.ts
git commit -m "feat: add border glow component"
```

### Task 2: 在 Q&A 主问题块接入 BorderGlow

**Files:**
- Modify: `src/components/QandA.tsx`

- [ ] **Step 1: 在 `QandA.tsx` 引入 `BorderGlow`**

```tsx
import BorderGlow from "@/components/BorderGlow";
```

预期：
- 组件文件继续保持单文件实现
- 不改变 `qnaData` 渲染逻辑

- [ ] **Step 2: 用 `BorderGlow` 包裹每个主问题块内容**

```tsx
<motion.article ... className="group scroll-mt-24 pt-10">
  <BorderGlow
    className="overflow-hidden"
    edgeSensitivity={28}
    glowColor="265 85 78"
    backgroundColor="rgba(10, 12, 18, 0.82)"
    borderRadius={24}
    glowRadius={30}
    glowIntensity={0.65}
    coneSpread={20}
    animated={false}
    fillOpacity={0.18}
    colors={["#8b5cf6", "#ec4899", "#38bdf8"]}
  >
    <div className="px-6 py-8 md:px-8 md:py-10">
      {/* 原有问题标题、段落、场景卡片 */}
    </div>
  </BorderGlow>
</motion.article>
```

实现要求：
- 外层 `motion.article` 保留
- 原 `border-t border-ink-700` 去除，避免与辉光边框重复
- 内容间距放到 `BorderGlow` 内层容器

- [ ] **Step 3: 运行检查并人工确认结构未破坏**

Run: `npm run check`

Expected:
- `QandA.tsx` 不出现导入、JSX 闭合或属性类型错误

- [ ] **Step 4: Commit**

```bash
git add src/components/QandA.tsx
git commit -m "feat: wrap qna sections with border glow"
```

### Task 3: 在 Q3 场景卡片接入第二层 BorderGlow

**Files:**
- Modify: `src/components/QandA.tsx`

- [ ] **Step 1: 把每个场景卡片内容放进更克制的 `BorderGlow`**

```tsx
<motion.div ... className="relative">
  <BorderGlow
    className="h-full overflow-hidden"
    edgeSensitivity={34}
    glowColor="195 90 78"
    backgroundColor="rgba(12, 16, 24, 0.72)"
    borderRadius={18}
    glowRadius={22}
    glowIntensity={0.45}
    coneSpread={18}
    animated={false}
    fillOpacity={0.12}
    colors={["#6366f1", "#a855f7", "#22d3ee"]}
  >
    <div className="relative p-6 md:p-7">
      {/* 原有标题、痛点、价值 */}
    </div>
  </BorderGlow>
</motion.div>
```

实现要求：
- 保留场景卡片的进入动画
- 去除与新容器重复的普通边框和背景类
- 保留顶部高亮线条时，确认不会被新容器遮挡；如冲突则将其移入 `BorderGlow` 内部

- [ ] **Step 2: 校准双层辉光强度**

检查点：
- 外层主问题块更明显
- 内层场景卡片更克制
- 文本不被伪元素遮挡

- [ ] **Step 3: 运行检查**

Run: `npm run check`

Expected:
- 不新增 `QandA.tsx` 语法或类型问题

- [ ] **Step 4: Commit**

```bash
git add src/components/QandA.tsx
git commit -m "feat: add nested border glow to q3 cards"
```

### Task 4: 验证与收尾

**Files:**
- Modify: `src/components/BorderGlow.tsx`
- Modify: `src/components/BorderGlow.css`
- Modify: `src/components/QandA.tsx`
- Verify: `src/pages/QA.tsx`

- [ ] **Step 1: 运行诊断与构建检查**

Run: `npm run check`

Expected:
- 若仓库依赖完整，命令成功
- 若仓库仍存在历史问题，记录与本次改动无关的报错，并确认本次文件没有新增本地错误

- [ ] **Step 2: 逐项人工核对**

检查清单：
- 主问题块有边缘辉光跟随
- Q3 子卡片也有边缘辉光跟随
- `framer-motion` 进入动画仍在
- [QA.tsx](file:///workspace/src/pages/QA.tsx) 的背景滚动模糊逻辑未受影响
- 双层辉光不过度刺眼

- [ ] **Step 3: 输出结果摘要**

摘要应说明：
- 新增了哪些文件
- `Q&A` 两层辉光如何布置
- 是否存在环境性检查限制

- [ ] **Step 4: Commit**

```bash
git add src/components/BorderGlow.tsx src/components/BorderGlow.css src/components/QandA.tsx
git commit -m "feat: integrate border glow into qna"
```
