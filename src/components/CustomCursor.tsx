import { useEffect, useState } from "react";

export const CustomCursor = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<"default" | "hover" | "active">("default");
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) { setTouch(true); return; }
    const move = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    const down = () => setVariant("active");
    const up = () => setVariant((v) => (v === "active" ? "hover" : v));
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest("a,button,[role='button'],input,textarea,select,.cursor-hover")) setVariant("hover");
      else setVariant("default");
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (touch) return null;

  const size = variant === "hover" ? 40 : variant === "active" ? 32 : 18;
  const isHollow = variant !== "default";

  return (
    <div aria-hidden style={{
      position: "fixed", left: pos.x, top: pos.y, width: size, height: size,
      transform: "translate(-50%, -50%)", borderRadius: "9999px",
      background: isHollow ? "transparent" : "#C9A84C",
      border: isHollow ? `2px solid #C9A84C` : "none",
      pointerEvents: "none", zIndex: 9999,
      transition: "width 0.18s ease, height 0.18s ease, background 0.18s ease, border 0.18s ease",
      boxShadow: "0 0 12px rgba(201,168,76,0.55)",
    }} />
  );
};
