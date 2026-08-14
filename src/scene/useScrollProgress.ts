import { useEffect, useRef, type RefObject } from "react";

/**
 * Document scroll progress in the 0..1 range, kept in a ref so the value can be
 * read every animation frame without triggering a React render.
 */
export function useScrollProgress(): RefObject<number> {
  const progress = useRef(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return progress;
}
