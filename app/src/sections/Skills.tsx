import { motion } from "framer-motion";
import { skills } from "../data/portfolio";

const accents = ["#2979FF", "#00C853", "#2979FF", "#00C853"];

export default function Skills() {
  return (
    <section id="stack" className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="font-mono-tech mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#9d9b96]">
        <span className="text-[#2979FF]">■</span> 03 — Stack
      </div>
      <h2 className="mb-16 text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase leading-[0.9] tracking-tighter">
        Tools of the <span className="text-outline">trade</span>
      </h2>

      <div className="grid border-l border-t border-[rgba(242,240,235,0.12)] sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((g, gi) => (
          <motion.div
            key={g.group}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: gi * 0.1 }}
            className="group relative overflow-hidden border-b border-r border-[rgba(242,240,235,0.12)] p-7 md:p-9"
          >
            {/* hover sweep */}
            <span
              className="sweep-ease absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 group-hover:scale-y-100"
              style={{ background: accents[gi] }}
            />
            <div className="relative">
              <div className="font-mono-tech flex items-baseline justify-between text-[11px] uppercase tracking-[0.2em]">
                <span style={{ color: accents[gi] }} className="transition-colors duration-300 group-hover:text-black">
                  ■ {g.group}
                </span>
                <span className="tabular text-[#9d9b96] transition-colors duration-300 group-hover:text-black">
                  0{gi + 1}
                </span>
              </div>
              <ul className="mt-8 space-y-3">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center justify-between border-b border-[rgba(242,240,235,0.08)] pb-3 text-lg font-medium tracking-tight transition-colors duration-300 group-hover:border-[rgba(0,0,0,0.2)] group-hover:text-black md:text-xl"
                  >
                    {item}
                    <span className="font-mono-tech text-[10px] text-[#9d9b96] transition-colors duration-300 group-hover:text-black">
                      ▸
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="font-mono-tech mt-8 text-[11px] uppercase tracking-[0.2em] text-[#9d9b96]">
        <span className="blink text-[#2979FF]">●</span> Currently learning: CompTIA Cloud+ · AWS Solutions Architect · Terraform
      </p>
    </section>
  );
}