import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Magnetic from "./Magnetic";
import { profile } from "../data/portfolio";

const links = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

type NavProps = {
  flatView: boolean;
  onToggleView: () => void;
};

export default function Nav({ flatView, onToggleView }: NavProps) {
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setHidden(y > last && y > 140 && !open);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* scroll progress rail */}
      <motion.div
        className="fixed right-0 top-0 z-[120] h-full w-[3px] origin-top bg-[#2979FF]"
        style={{ scaleY: progress }}
      />

      <motion.header
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-[110] border-b border-[rgba(242,240,235,0.08)] bg-[rgba(5,5,5,0.55)] backdrop-blur-md"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex items-center justify-between px-5 py-4 md:px-10">
          <button
            type="button"
            aria-pressed={flatView}
            onClick={onToggleView}
            className="font-mono-tech min-h-[44px] border border-[rgba(242,240,235,0.25)] px-3 text-[10px] uppercase tracking-[0.16em] text-[#f2f0eb] transition-colors hover:border-[#2979FF] hover:text-[#2979FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2979FF]"
          >
            {flatView ? "Enable 3D view" : "View in 2D"}
          </button>

          <nav className="ml-auto hidden items-center gap-8 md:flex">
            {links.map((l, i) => (
              <a
                key={l.label}
                href={l.href}
                className="scrl-link font-mono-tech text-[11px] uppercase tracking-[0.18em] text-[#9d9b96] hover:text-[#f2f0eb]"
              >
                <span>
                  {l.label}
                  <br />
                  <span className="text-[#f2f0eb]">
                    <span className="text-[#2979FF]">0{i + 1}</span> {l.label}
                  </span>
                </span>
              </a>
            ))}
            <Magnetic strength={0.3}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Say hi"
                className="font-mono-tech inline-block border border-[#f2f0eb] px-5 py-2.5 text-[11px] uppercase tracking-[0.18em] transition-colors duration-300 hover:bg-[#f2f0eb] hover:text-black"
              >
                Hire me
              </a>
            </Magnetic>
          </nav>

          {/* mobile menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="ml-auto font-mono-tech flex min-h-[44px] min-w-[44px] items-center justify-end gap-2 text-[11px] uppercase tracking-[0.2em] md:hidden"
          >
            {open ? "Close" : "Menu"}
            <span className="relative block h-[10px] w-6">
              <span
                className={`absolute left-0 top-0 h-px w-full bg-[#f2f0eb] transition-transform duration-300 ${open ? "translate-y-[4.5px] rotate-45" : ""}`}
              />
              <span
                className={`absolute bottom-0 left-0 h-px w-full bg-[#f2f0eb] transition-transform duration-300 ${open ? "-translate-y-[4.5px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </motion.header>

      {/* mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[105] flex flex-col justify-center bg-[#0b0b0c] px-8"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="flex min-h-[56px] items-baseline gap-4 border-b border-[rgba(242,240,235,0.1)] py-4"
              >
                <span className="font-mono-tech text-xs text-[#2979FF]">0{i + 1}</span>
                <span className="text-4xl font-light tracking-tight">{l.label}</span>
              </motion.a>
            ))}
            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="font-mono-tech mt-10 inline-flex min-h-[48px] items-center justify-center border border-[#00C853] px-6 text-[12px] uppercase tracking-[0.2em] text-[#00C853]"
            >
              {profile.email}
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
