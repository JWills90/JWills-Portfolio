import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/** Character-by-character reveal, clipped per line.
 *  Pass `active` to control externally; otherwise a single IntersectionObserver
 *  on the container triggers all characters together. */
export default function SplitReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.028,
  active,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  active?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (active !== undefined) return; // externally controlled
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [active]);

  const on = active !== undefined ? active : inView;
  const chars = text.split("");

  return (
    <span ref={ref} className={`inline-block overflow-hidden align-bottom ${className}`} aria-label={text}>
      {chars.map((c, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block will-change-transform"
          initial={false}
          animate={{ y: on ? "0%" : "115%", rotate: on ? 0 : 4 }}
          transition={{
            duration: 0.7,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {c === " " ? "\u00A0" : c}
        </motion.span>
      ))}
    </span>
  );
}
