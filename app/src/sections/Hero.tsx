import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import SplitReveal from "../components/SplitReveal";
import Magnetic from "../components/Magnetic";
import { profile } from "../data/portfolio";

const HeroScene = lazy(() => import("../components/three/HeroScene"));

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

const shouldLoadScene = (() => {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;

  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  const slowConnection = ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");

  return (
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
    !connection?.saveData &&
    !slowConnection
  );
})();

function ScenePlaceholder() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute left-[58%] top-[38%] aspect-square w-[min(70vw,34rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(41,121,255,0.23)_0%,rgba(0,200,83,0.1)_35%,transparent_70%)] blur-xl" />
      <div className="absolute left-[58%] top-[38%] aspect-square w-[min(48vw,24rem)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(41,121,255,0.22)]" />
    </div>
  );
}

type HeroProps = {
  started: boolean;
  flatView: boolean;
};

export default function Hero({ started, flatView }: HeroProps) {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden">
      {/* 3D layer */}
      {!flatView && (
        <div className="absolute inset-0">
          {shouldLoadScene ? (
            <Suspense fallback={<ScenePlaceholder />}>
              <HeroScene />
            </Suspense>
          ) : (
            <ScenePlaceholder />
          )}
        </div>
      )}

      {/* Corner HUD labels */}
      <div className="font-mono-tech pointer-events-none absolute inset-x-5 top-24 z-10 flex justify-between text-[10px] uppercase tracking-[0.22em] text-[#9d9b96] md:inset-x-10">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: started ? 1 : 0 }}
          transition={{ delay: 1.05, duration: 0.8 }}
          className="ml-auto text-right"
        >
          {profile.location}
        </motion.span>
      </div>

      {/* Headline */}
      <div className="relative z-10 flex flex-1 flex-col justify-end px-5 pb-8 md:px-10 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: started ? 1 : 0, y: started ? 0 : 12 }}
          transition={{ delay: 1.1, duration: 0.7 }}
          className="mb-6 flex items-center gap-3"
        >
          <span className="blink inline-block h-2 w-2 bg-[#00C853]" />
          <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#00C853]">
            {profile.availability}
          </span>
        </motion.div>

        <h1 className="select-none font-bold uppercase leading-[0.82] tracking-tighter">
          <span className="block text-[clamp(4.2rem,17vw,15rem)]">
            <SplitReveal text={profile.firstName} delay={0.15} active={started} />
          </span>
          <span className="text-outline block text-[clamp(4.2rem,17vw,15rem)]">
            <SplitReveal text={profile.lastName} delay={0.4} active={started} />
          </span>
        </h1>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 16 }}
            transition={{ delay: 1.25, duration: 0.7 }}
            className="max-w-md text-base leading-relaxed text-[#9d9b96] md:text-lg"
          >
            {profile.tagline}{" "}
            <span className="text-[#f2f0eb]">
              Building secure, production-ready cloud systems.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: started ? 1 : 0, y: started ? 0 : 16 }}
            transition={{ delay: 1.4, duration: 0.7 }}
            className="flex flex-wrap items-center gap-4"
          >
            <Magnetic>
              <a
                href="#work"
                data-cursor="View"
                className="font-mono-tech inline-flex min-h-[48px] items-center bg-[#f2f0eb] px-7 text-[12px] font-semibold uppercase tracking-[0.18em] text-black transition-colors duration-300 hover:bg-[#2979FF] hover:text-white"
              >
                View work ↓
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="Say hi"
                className="font-mono-tech inline-flex min-h-[48px] items-center border border-[rgba(242,240,235,0.35)] px-7 text-[12px] uppercase tracking-[0.18em] transition-colors duration-300 hover:border-[#f2f0eb] hover:bg-[#f2f0eb] hover:text-black"
              >
                Get in touch
              </a>
            </Magnetic>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: started ? 1 : 0 }}
        transition={{ delay: 1.8 }}
        className="font-mono-tech pointer-events-none absolute bottom-8 right-5 z-10 hidden rotate-90 text-[10px] uppercase tracking-[0.3em] text-[#9d9b96] md:right-2 md:block"
        style={{ transformOrigin: "right bottom" }}
      >
        Scroll ———
      </motion.div>
    </section>
  );
}
