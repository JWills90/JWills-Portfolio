import { motion, useScroll, useSpring } from "framer-motion";

const links = [
  { label: "Projects", href: "#work" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

type NavProps = {
  flatView: boolean;
  onToggleView: () => void;
};

export default function Nav({ flatView, onToggleView }: NavProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  return (
    <>
      <motion.div
        className="fixed right-0 top-0 z-[120] h-full w-[3px] origin-top bg-[#2979FF]"
        style={{ scaleY: progress }}
      />

      <header
        className="fixed inset-x-0 top-0 z-[110] border-b border-[rgba(242,240,235,0.08)] bg-[rgba(5,5,5,0.75)] backdrop-blur-md"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="flex min-h-[72px] items-center justify-between gap-3 px-3 sm:px-5 md:px-10">
          <button
            type="button"
            aria-pressed={flatView}
            onClick={onToggleView}
            className="font-mono-tech min-h-[44px] shrink-0 border border-[rgba(242,240,235,0.25)] px-2 text-[9px] uppercase tracking-[0.08em] text-[#f2f0eb] transition-colors hover:border-[#2979FF] hover:text-[#2979FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2979FF] sm:px-3 sm:text-[10px] sm:tracking-[0.16em]"
          >
            {flatView ? "Enable 3D" : "View in 2D"}
          </button>

          <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-5 md:gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-mono-tech min-h-[44px] flex items-center whitespace-nowrap text-[9px] uppercase tracking-[0.04em] text-[#f2f0eb] transition-colors hover:text-[#2979FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2979FF] sm:text-[11px] sm:tracking-[0.12em]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
