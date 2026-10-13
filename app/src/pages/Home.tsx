import { useEffect, useState } from "react";
import Lenis from "lenis";
import Preloader from "../components/Preloader";
import Cursor from "../components/Cursor";
import Nav from "../components/Nav";
import Hero from "../sections/Hero";
import Marquee from "../sections/Marquee";
import About from "../sections/About";
import Projects from "../sections/Projects";
import Certifications from "../sections/Certifications";
import Skills from "../sections/Skills";
import Experience from "../sections/Experience";
import Contact from "../sections/Contact";

export default function Home() {
  const [started, setStarted] = useState(false);
  const [flatView, setFlatView] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ lerp: 0.09 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -70 });
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="grain relative">
      <Preloader onDone={() => setStarted(true)} />
      <Cursor />
      <Nav
        flatView={flatView}
        onToggleView={() => setFlatView((current) => !current)}
      />
      <main>
        <Hero
          started={started}
          flatView={flatView}
        />
        <Marquee />
        <About />
        <Projects />
        <Certifications />
        <Skills />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
