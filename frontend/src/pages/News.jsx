import { ArrowUpRight } from "lucide-react";
import { MaskText, MaskTextInView, Reveal } from "@/components/common/Reveal";
import DemoCTA from "@/components/common/DemoCTA";
import { NEWS, IMAGES } from "@/data/site";

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function News() {
  const series = NEWS.filter((n) => n.series === "The New Space Race");
  const others = NEWS.filter((n) => n.series !== "The New Space Race");
  const feature = series[0];

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex min-h-[55vh] items-end overflow-hidden bg-xo-obsidian pb-16 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="xo-container relative">
          <div className="eyebrow mb-8">News & Insights</div>
          <MaskText
            lines={["News and insights."]}
            as="span"
            className="font-display text-[12vw] font-medium leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl"
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            Analysis on eye care delivery, practice capacity and access — plus company
            news from Xenon Ophthalmics.
          </p>
        </div>
      </section>

      {/* Pillar series feature */}
      <section className="border-t border-white/10 bg-xo-obsidian py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-8">Pillar Series</div>
          </Reveal>
          <a
            href="#series"
            data-testid="news-feature"
            className="group relative block overflow-hidden rounded-md border border-white/10"
          >
            <div className="absolute inset-0">
              <img src={IMAGES.abstract} alt="" className="h-full w-full object-cover opacity-25 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-xo-obsidian via-xo-obsidian/70 to-xo-obsidian/30" />
            </div>
            <div className="relative flex min-h-[420px] flex-col justify-end p-10 md:p-16">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-xo-teal">
                The New Space Race · 5-part series
              </div>
              <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl">
                {feature.title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/60">
                {feature.dek}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-white">
                Read the series
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Series list */}
      <section id="series" className="scroll-mt-32 border-t border-white/10 bg-xo-void py-24 md:py-32">
        <div className="xo-container">
          <MaskTextInView
            lines={["The New Space Race"]}
            as="span"
            className="font-display text-4xl font-medium tracking-tight text-white sm:text-5xl"
          />
          <div className="mt-12 overflow-hidden rounded-md border border-white/10">
            {series.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.04}>
                <a
                  href="#"
                  data-testid={`series-article-${i}`}
                  className="group grid grid-cols-12 items-center gap-4 border-b border-white/5 px-6 py-7 transition-colors duration-300 hover:bg-white/[0.02] last:border-0 md:px-10"
                >
                  <div className="col-span-2 font-mono text-xs text-xo-teal md:col-span-1">
                    {a.seriesLabel.replace("Part ", "").replace(" of 5", "/5")}
                  </div>
                  <div className="col-span-10 md:col-span-8">
                    <h3 className="font-display text-xl text-white transition-colors group-hover:text-xo-teal md:text-2xl">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-white/45">{a.dek}</p>
                  </div>
                  <div className="col-span-12 flex items-center justify-between md:col-span-3 md:justify-end md:gap-6">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-white/30">
                      {a.readTime}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-xo-teal" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Company news / other */}
      <section className="border-t border-white/10 bg-xo-obsidian py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">Latest</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {others.concat(series.slice(1, 3)).map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.06}>
                <a
                  href="#"
                  data-testid={`news-card-${i}`}
                  className="group flex h-full flex-col rounded-md border border-white/10 bg-xo-void p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-xo-teal/40"
                >
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-xo-teal">
                    {a.category}
                    <span className="text-white/25">·</span>
                    <span className="text-white/40">{fmtDate(a.date)}</span>
                  </div>
                  <h3 className="mt-5 flex-1 font-display text-xl leading-snug text-white transition-colors group-hover:text-xo-teal">
                    {a.title}
                  </h3>
                  <p className="mt-4 text-[14px] leading-relaxed text-white/45">{a.dek}</p>
                  <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-white/30">
                    {a.readTime}
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DemoCTA />
    </>
  );
}
