import { useEffect, useState } from "react";

export const Cursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [role=button], input, textarea, .pill, .nav-link"));
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div
        aria-hidden
        className="pointer-events-none fixed z-[100] rounded-full bg-gold transition-[width,height,opacity] duration-200"
        style={{
          left: pos.x, top: pos.y,
          width: hover ? 14 : 12, height: hover ? 14 : 12,
          transform: "translate(-50%,-50%)",
          boxShadow: "0 0 12px hsl(43 53% 54% / 0.7)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed z-[100] rounded-full border border-gold/70 transition-[width,height,opacity] duration-200"
        style={{
          left: pos.x, top: pos.y,
          width: hover ? 56 : 36, height: hover ? 56 : 36,
          transform: "translate(-50%,-50%)",
          opacity: hover ? 1 : 0.55,
        }}
      />
    </>
  );
};
