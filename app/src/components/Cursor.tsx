import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    document.body.classList.add("cursor-on");
    const d = dot.current!;
    const r = ring.current!;
    let x = -100, y = -100, rx = -100, ry = -100;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = (e.target as HTMLElement).closest("[data-cursor]");
      if (t) {
        r.classList.add("is-active");
        const label = t.getAttribute("data-cursor") || "";
        (r.querySelector(".cursor-label") as HTMLElement).textContent = label;
      } else {
        r.classList.remove("is-active");
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      d.style.transform = `translate(${x - 4}px, ${y - 4}px)`;
      const half = r.classList.contains("is-active") ? 42 : 20;
      r.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      document.body.classList.remove("cursor-on");
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dot} />
      <div id="cursor-ring" ref={ring}>
        <span className="cursor-label" />
      </div>
    </>
  );
}
