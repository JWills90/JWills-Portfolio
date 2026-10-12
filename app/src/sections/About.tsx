import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitReveal from "../components/SplitReveal";
import { stats } from "../data/portfolio";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);

  return (
    <section id="about" ref={ref} className="relative px-5 py-28 md:px-10 md:py-40">
      <div className="font-mono-tech mb-14 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#9d9b96]">
        <span className="text-[#2979FF]">■</span> 01 — About
      </div>

      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-7">
          <h2 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-medium leading-[1.02] tracking-tight">
            <span className="block">
              <SplitReveal text="Good tinfrastructure" />
            </span>
            <span className="block">
              <SplitReveal text="starts with" delay={0.12} />
            </span>
            <span className="block">
              <SplitReveal text="understanding" delay={0.24} />
            </span>
            <span className="block">
              <SplitReveal text="people's needs." delay={0.36} />
            </span>
            <span className="block text-[#2979FF]">
              <SplitReveal text="Built to work." delay={0.5} />
            </span>
            <span className="block text-[#2979FF]">
              <SplitReveal text="Built to last." delay={0.62} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-10 max-w-xl text-base leading-relaxed text-[#9d9b96] md:text-lg"
          >
            My background in computing coordination and technical support taught me to
            solve problems clearly and keep technology useful. As a CompTIA Network+
            certified aspiring cloud engineer, I am building hands-on experience across
            AWS, Linux, networking, and containers, with a focus on secure, dependable
            systems.
          </motion.p>
        </div>

        {/* stats block, asymmetric right column with parallax drift */}
        <motion.div style={{ x }} className="md:col-span-5">
          <div className="grid grid-cols-2 border-l border-t border-[rgba(242,240,235,0.12)]">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.55, delay: i * 0.08 }}
                className="group border-b border-r border-[rgba(242,240,235,0.12)] p-6 transition-colors duration-300 hover:bg-[#0b0b0c] md:p-8"
              >
                <div
                  className={`tabular font-light tracking-tight group-hover:text-[#2979FF] ${
                    s.value === "Network+" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"
                  }`}
                >
                  {s.value}
                </div>
                <div className="font-mono-tech mt-3 text-[10px] uppercase tracking-[0.2em] text-[#9d9b96]">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-mono-tech mt-6 text-[10px] uppercase tracking-[0.2em] text-[#9d9b96]"
          >
            ■ Numbers current as of {new Date().getFullYear()}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
