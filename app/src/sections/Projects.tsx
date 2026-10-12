import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { projects, type Project } from "../data/portfolio";

function Card({
  project,
  i,
  total,
  progress,
}: {
  project: Project;
  i: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const targetScale = 1 - (total - 1 - i) * 0.045;
  const scale = useTransform(progress, [i / total, 1], [1, targetScale]);
  const blur = useTransform(progress, [i / total, 1], [0, (total - 1 - i) * 2.2]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  return (
    <div
      className="sticky"
      style={{ top: `calc(5.5rem + ${i * 2.2}rem)` }}
    >
      <motion.article
        style={{ scale, filter }}
        className="relative mx-auto mb-[8vh] flex min-h-[62vh] w-full max-w-6xl flex-col justify-between overflow-hidden border border-[rgba(242,240,235,0.14)] bg-[#0b0b0c] p-6 md:p-12"
      >
        {/* accent edge */}
        <span className="absolute left-0 top-0 h-full w-[3px]" style={{ background: project.accent }} />
        {/* ghost index */}
        <span
          aria-hidden
          className="tabular pointer-events-none absolute -right-4 -top-10 select-none text-[11rem] font-bold leading-none tracking-tighter opacity-[0.06] md:text-[20rem]"
        >
          {project.index}
        </span>

        <header className="flex items-start justify-between gap-6">
          <div>
            <span className="font-mono-tech text-[11px] uppercase tracking-[0.22em]" style={{ color: project.accent }}>
              ■ {project.index} / {project.year}
            </span>
            <h3 className="mt-4 text-[clamp(2.6rem,7vw,6rem)] font-bold uppercase leading-[0.9] tracking-tighter">
              {project.title}
            </h3>
          </div>
          <a
            href={project.link}
            data-cursor="Open"
            aria-label={`Open ${project.title}`}
            className="group hidden h-16 w-16 shrink-0 items-center justify-center border border-[rgba(242,240,235,0.25)] transition-colors duration-300 hover:bg-[#f2f0eb] md:flex"
          >
            <span className="text-2xl transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-black">
              ↗
            </span>
          </a>
        </header>

        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <p className="max-w-xl text-base leading-relaxed text-[#9d9b96] md:col-span-7 md:text-lg">
            {project.description}
          </p>
          <div className="md:col-span-5">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span
                  key={t}
                  className="font-mono-tech border border-[rgba(242,240,235,0.2)] px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-[#f2f0eb]"
                >
                  {t}
                </span>
              ))}
            </div>
            <a
              href={project.link}
              data-cursor="Open"
              className="font-mono-tech mt-6 inline-flex min-h-[48px] items-center gap-3 text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 md:hidden"
              style={{ color: project.accent }}
            >
              View project <span>↗</span>
            </a>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <section id="work" className="relative px-5 py-28 md:px-10 md:py-36">
      <div className="font-mono-tech mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-[#9d9b96]">
        <span className="text-[#00C853]">■</span> 02 — Selected work
      </div>
      <h2 className="mb-16 text-[clamp(2.6rem,8vw,7rem)] font-bold uppercase leading-[0.9] tracking-tighter">
        Things I've <span className="text-outline-blue">built</span>
      </h2>

      <div ref={ref} className="relative">
        {projects.map((p, i) => (
          <Card key={p.title} project={p} i={i} total={projects.length} progress={scrollYProgress} />
        ))}
      </div>
    </section>
  );
}
