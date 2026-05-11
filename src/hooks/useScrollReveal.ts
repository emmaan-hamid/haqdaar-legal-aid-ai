import { useEffect } from "react";

/**
 * Adds reveal-on-scroll animations to common card elements within a scope.
 * Tags elements with `.lp-rev` and toggles `.in` based on scroll direction
 * so cards animate both when scrolling down and back up.
 */
export const useScrollReveal = (scopeRef: React.RefObject<HTMLElement>, dep: any = null) => {
  useEffect(() => {
    const root = scopeRef.current;
    if (!root) return;
    const selectors = ".lp-card, .lp-kpi, .lp-case-card, .lp-welcome, .lp-row-hover";
    const els = Array.from(root.querySelectorAll<HTMLElement>(selectors));
    let lastY = window.scrollY;
    els.forEach((el, i) => {
      el.classList.add("lp-rev");
      // alternate direction for visual richness
      if (i % 3 === 1) el.classList.add("dir-left");
      else if (i % 3 === 2) el.classList.add("dir-right");
      el.style.transitionDelay = `${Math.min(i, 8) * 40}ms`;
    });
    const io = new IntersectionObserver(
      (entries) => {
        const goingDown = window.scrollY >= lastY;
        lastY = window.scrollY;
        entries.forEach((e) => {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            el.classList.remove("dir-up");
            if (goingDown) {
              el.classList.remove("dir-left", "dir-right");
            } else {
              el.classList.add("dir-up");
            }
            el.classList.add("in");
          } else {
            el.classList.remove("in");
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep]);
};
