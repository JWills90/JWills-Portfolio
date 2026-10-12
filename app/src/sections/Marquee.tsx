import { marqueeItems } from "../data/portfolio";

export default function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div className="relative overflow-hidden border-y border-[rgba(242,240,235,0.12)] bg-[#0b0b0c] py-5">
      <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap pr-10" style={{ ["--marquee-dur" as string]: "26s" }}>
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="text-xl font-medium uppercase tracking-tight text-[#f2f0eb] md:text-2xl">
              {item}
            </span>
            <span className="text-[#2979FF]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
