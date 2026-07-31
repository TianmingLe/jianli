import { useEffect, useRef } from "react";

type ScrollParallaxBgProps = {
  image: string;
  className?: string;
  blur?: boolean;
};

/**
 * 全屏固定背景层：随页面滚动从长图顶部移动到底部。
 * 顶部 → 图片最上方，底部 → 图片最下方。
 */
export default function ScrollParallaxBg({
  image,
  className = "",
  blur = true,
}: ScrollParallaxBgProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const scrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
        el.style.backgroundPositionY = `${progress * 100}%`;
      });
    };

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`pointer-events-none fixed inset-0 z-0 bg-cover ${blur ? "blur-md" : ""} ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundPositionX: "center",
        backgroundPositionY: "0%",
      }}
    />
  );
}
