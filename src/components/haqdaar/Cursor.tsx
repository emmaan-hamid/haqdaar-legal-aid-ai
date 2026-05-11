import { useEffect, useRef } from "react";

export const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const rafRef = useRef<number | null>(null);
  const pos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(hover: none)").matches) return;

    const apply = () => {
      rafRef.current = null;
      const { x, y } = pos.current;
      const h = hoverRef.current;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`;
        dotRef.current.style.width = dotRef.current.style.height = h ? "14px" : "12px";
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%,-50%)`;
        ringRef.current.style.width = ringRef.current.style.height = h ? "56px" : "36px";
        ringRef.current.style.opacity = h ? "1" : "0.55";
      }
    };

    const move = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      const t = e.target as HTMLElement;
      hoverRef.current = !!t.closest("a, button, [role=button], input, textarea, select, .pill, .nav-link");
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(apply);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full bg-gold transition-[width,height,opacity] duration-200"
        style={{
          width: 12, height: 12, willChange: "transform",
          boxShadow: "0 0 12px hsl(43 53% 54% / 0.7)",
        }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] rounded-full border border-gold/70 transition-[width,height,opacity] duration-200"
        style={{ width: 36, height: 36, opacity: 0.55, willChange: "transform" }}
      />
    </>
  );
};
