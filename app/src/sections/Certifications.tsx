import { motion } from "framer-motion";

export default function Certifications() {
  return (
    <section id="certifications" className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="font-mono-tech mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#9d9b96]">
        <span className="text-[#00C853]">■</span> 03 — Certification
      </div>
      <h2 className="mb-12 text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase leading-[0.9] tracking-tighter">
        Proven <span className="text-outline-blue">knowledge</span>
      </h2>

      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-8%" }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-4 border-y border-[rgba(242,240,235,0.14)] py-8 md:flex-row md:items-center md:justify-between md:py-10"
      >
        <div>
          <p className="font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[#00C853]">
            CompTIA · Earned
          </p>
          <h3 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
            Network+
          </h3>
        </div>
        <p className="max-w-lg text-base leading-relaxed text-[#9d9b96] md:text-lg">
          Validated knowledge of networking concepts, infrastructure, operations, and security.
        </p>
      </motion.article>
    </section>
  );
}
