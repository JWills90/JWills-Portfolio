import { motion } from "framer-motion";
import SplitReveal from "../components/SplitReveal";
import Magnetic from "../components/Magnetic";
import { profile } from "../data/portfolio";

export default function Contact() {
  return (
    <footer id="contact" className="relative overflow-hidden pt-28 md:pt-40">
      <div className="px-5 md:px-10">
        <div className="font-mono-tech mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#9d9b96]">
          <span className="text-[#2979FF]">■</span> 05 — Contact
        </div>

        <h2 className="font-bold uppercase leading-[0.85] tracking-tighter">
          <span className="block text-[clamp(3rem,11vw,10rem)]">
            <SplitReveal text="LET'S BUILD" />
          </span>
          <span className="text-outline block text-[clamp(3rem,11vw,10rem)]">
            <SplitReveal text="SOMETHING" delay={0.25} />
          </span>
          <span className="block text-[clamp(3rem,11vw,10rem)] text-[#2979FF]">
            <SplitReveal text="SECURE." delay={0.5} />
          </span>
        </h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-[#9d9b96] md:text-lg">
            I am ready for my first Cloud Engineer or IT Support role. If you need a
            CompTIA Network+ certified engineer who builds reliable systems — my inbox is open.
          </p>
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="Send"
              className="font-mono-tech inline-flex min-h-[64px] items-center gap-4 bg-[#00C853] px-9 text-[13px] font-semibold uppercase tracking-[0.18em] text-black transition-colors duration-300 hover:bg-[#2979FF]"
            >
              {profile.email} <span>↗</span>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* Socials row */}
      <div className="mt-20 grid grid-cols-2 border-t border-[rgba(242,240,235,0.12)] md:grid-cols-4">
        {profile.socials.map((s, i) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            data-cursor="Open"
            className="group flex min-h-[64px] items-center justify-between border-b border-r border-[rgba(242,240,235,0.12)] px-5 py-5 transition-colors duration-300 hover:bg-[#f2f0eb] md:px-8"
          >
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.18em] group-hover:text-black">
              <span className="text-[#9d9b96] group-hover:text-black">0{i + 1} / </span>
              {s.label}
            </span>
            <span className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black">
              ↗
            </span>
          </a>
        ))}
      </div>

      {/* Four-color bookend strip */}
      <div className="grid grid-cols-4">
        {["#2979FF", "#00C853", "#2979FF", "#00C853"].map((c, i) => (
          <motion.div
            key={`${c}-${i}`}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="h-16 origin-bottom md:h-24"
            style={{ background: c }}
          />
        ))}
      </div>

      <div className="font-mono-tech flex flex-col gap-2 border-t border-[rgba(242,240,235,0.12)] px-5 py-6 text-[10px] uppercase tracking-[0.2em] text-[#9d9b96] md:flex-row md:items-center md:justify-between md:px-10">
        <span>© {new Date().getFullYear()} {profile.name} — All rights reserved</span>
        <span>
          Cloud Portfolio <span className="text-[#2979FF]">— AWS Hosted</span>
        </span>
        <span className="tabular">{profile.location}</span>
      </div>
    </footer>
  );
}