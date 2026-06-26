import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import BottomBar from "@/components/BottomBar";

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

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/qa" element={<QA />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <BottomBar />
    </BrowserRouter>
  );
}
