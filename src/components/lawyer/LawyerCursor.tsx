import { useEffect, useRef, useState } from "react";

export const LawyerCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hover, setHover] = useState(false);
  const ringRef = useRef({ x: -100, y: -100 });
  const [ring, setRing] = useState({ x: -100, y: -100 });

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a,button,[role=button],input,textarea,select,.lp-card-hover,.lp-nav-item,.lp-nav-sub,.lp-pie-slice,.lp-upload,.lp-check,.lp-radio,.lp-tab,.lp-page-link"));
    };
    window.addEventListener("mousemove", move);
    let raf: number;
    const tick = () => {
      ringRef.current.x += (pos.x - ringRef.current.x) * 0.2;
      ringRef.current.y += (pos.y - ringRef.current.y) * 0.2;
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, [pos.x, pos.y]);

  return (
    <>
      <div className={`lp-cursor-dot ${hover ? "lp-hover" : ""}`} style={{ left: pos.x, top: pos.y }} />
      <div className={`lp-cursor-ring ${hover ? "lp-hover" : ""}`} style={{ left: ring.x, top: ring.y }} />
    </>
  );
};
