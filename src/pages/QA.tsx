import { Suspense, lazy } from "react";
import PageHeader from "@/components/PageHeader";
import QandA from "@/components/QandA";
import ScrollParallaxBg from "@/components/ScrollParallaxBg";
import ErrorBoundary from "@/components/ErrorBoundary";

const Lanyard = lazy(() => import("@/components/Lanyard/Lanyard"));

const navItems = [
  { id: "qa-q1", label: "核心优势", cn: "核心竞争力" },
  { id: "qa-q2", label: "AI 工具价值", cn: "AI 工具价值" },
  { id: "qa-q3", label: "跨界能力", cn: "跨界能力" },
];

function LanyardSkeleton() {
  return (
    <div className="flex h-[55vh] min-h-[380px] w-full items-center justify-center md:min-h-[380px]">
      <div className="h-12 w-12 animate-pulse rounded-full bg-ink-700" />
    </div>
  );
}

export default function QA() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-ink-950 pb-20 pt-20 md:pt-24">
      {/* 滚动视差背景 —— 顶部对应长图顶部，底部对应长图底部 */}
      <ScrollParallaxBg image="/qa-bg.webp" className="opacity-25" />
      <div className="relative z-10">
        <PageHeader navItems={navItems} />
        <QandA>
          {/* 挂绳工牌 3D 互动 —— 正面正装照，背面默认纹理；置于底部「Work With YW」标语前 */}
          <ErrorBoundary>
            <Suspense fallback={<LanyardSkeleton />}>
              <Lanyard
                position={[0, 0, 20]}
                gravity={[0, -40, 0]}
                frontImage="/正面照2.webp"
                imageFit="cover"
                imageScale={0.55}
                lanyardWidth={0.55}
              />
            </Suspense>
          </ErrorBoundary>
        </QandA>
      </div>
    </main>
  );
}
