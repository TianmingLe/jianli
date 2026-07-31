import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import BottomBar from "@/components/BottomBar";
import ClickSpark from "@/components/ClickSpark";

// 路由级 code splitting：各页面拆为独立 chunk，首屏只加载当前路由
const Home = lazy(() => import("@/pages/Home"));
const Projects = lazy(() => import("@/pages/Projects"));
const QA = lazy(() => import("@/pages/QA"));

/** 路由切换时回到页面顶部，避免新页面停留在上一次的滚动位置 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/** 路由级骨架屏：替代原 null fallback，避免切换瞬间整页空白闪烁 */
function PageSkeleton() {
  return (
    <main className="relative min-h-screen w-full bg-ink-950">
      {/* 顶部导航占位 */}
      <div className="h-16 md:h-20" />
      {/* 首屏占位块 */}
      <div className="shell animate-pulse">
        <div className="mt-24 space-y-6">
          <div className="h-4 w-32 bg-ink-800" />
          <div className="h-24 w-2/3 bg-ink-800" />
          <div className="h-24 w-1/2 bg-ink-800" />
          <div className="h-px w-full bg-ink-800" />
          <div className="grid grid-cols-2 gap-px border border-ink-800 bg-ink-800 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-ink-900" />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ClickSpark
        sparkColor="#7DD3FC"
        sparkSize={15}
        sparkRadius={25}
        sparkCount={8}
        duration={500}
      >
        <Suspense fallback={<PageSkeleton />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/qa" element={<QA />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <BottomBar />
      </ClickSpark>
    </BrowserRouter>
  );
}
