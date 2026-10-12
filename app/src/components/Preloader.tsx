import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.floor(Math.random() * 9) + 3;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(() => setGone(true), 450);
        setTimeout(onDone, 1250);
      }
      setPct(v);
    }, 70);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[150] flex flex-col justify-between bg-[#0b0b0c] p-6 md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="font-mono-tech flex justify-between text-[11px] uppercase tracking-[0.2em] text-[#9d9b96]">
            <span>Alex Chen — Portfolio</span>
            <span className="blink text-[#00C853]">■ Loading assets</span>
          </div>
          <div className="flex items-end justify-between">
            <p className="font-mono-tech max-w-[220px] text-[11px] uppercase leading-relaxed tracking-[0.2em] text-[#9d9b96]">
              Compiling shaders
              <br />
              Mounting geometry
              <br />
              Warming up the GPU
            </p>
            <span className="tabular text-[22vw] font-light leading-[0.8] tracking-tighter text-[#f2f0eb] md:text-[13rem]">
              {pct}
              <span className="text-[#2979FF]">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
