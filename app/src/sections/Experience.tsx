import { motion } from "framer-motion";
import { timeline } from "../data/portfolio";

export default function Experience() {
  return (
    <section id="journey" className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="font-mono-tech mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#9d9b96]">
        <span className="text-[#2979FF]">■</span> 04 — Journey
      </div>
      <h2 className="mb-16 text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase leading-[0.9] tracking-tighter">
        The road <span className="text-outline-blue">so far</span>
      </h2>

      <div className="border-t border-[rgba(242,240,235,0.12)]">
        {timeline.map((t, i) => (
          <motion.article
            key={t.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-8%" }}
            transition={{ duration: 0.6, delay: i * 0.06 }}
            className="group grid gap-3 border-b border-[rgba(242,240,235,0.12)] py-8 transition-colors duration-300 hover:bg-[#0b0b0c] md:grid-cols-12 md:gap-6 md:py-10"
            data-cursor="More"
          >
            <div className="font-mono-tech tabular text-[11px] uppercase tracking-[0.2em] text-[#9d9b96] md:col-span-3 md:pl-2">
              {t.period}
            </div>
            <div className="md:col-span-5">
              <h3 className="text-2xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-2 group-hover:text-[#2979FF] md:text-3xl">
                {t.title}
              </h3>
              <p className="font-mono-tech mt-2 text-[11px] uppercase tracking-[0.18em] text-[#2979FF]">
                {t.org}
              </p>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#9d9b96] md:col-span-4 md:text-base">
              {t.detail}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
