import { ArrowUpRight } from "lucide-react";
import { MaskText, MaskTextInView, Reveal } from "@/components/common/Reveal";
import DemoCTA from "@/components/common/DemoCTA";
import { BLOG, IMAGES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

export default function Blog() {
  usePageMeta({
    title: "Blog: Analysis & Insight",
    description:
      "Long-form analysis on eye care delivery, practice capacity and access from Xenon Ophthalmics. Home of The New Space Race series.",
  });

  const series = BLOG.filter((n) => n.series === "The New Space Race");
  const feature = series[0];

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex min-h-[55vh] items-end overflow-hidden bg-bg pb-16 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="xo-container relative">
          <div className="eyebrow mb-8">Blog · Analysis & Insight</div>
          <MaskText
            lines={["A slower read", "on the delivery of care."]}
            as="span"
            className="font-display text-[9vw] font-medium leading-[0.97] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg/60">
            Long-form thinking on capacity, access, and the mechanics of the modern
            eye care practice. Company announcements live over on{" "}
            <a href="/news" className="text-xo-blue underline-offset-4 hover:underline">
              News
            </a>
            .
          </p>
        </div>
      </section>

      {/* Pillar series feature */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-8">Pillar Series</div>
          </Reveal>
          <a
            href="#series"
            data-testid="blog-feature"
            className="group relative block overflow-hidden rounded-md border border-fg/10"
          >
            <div className="absolute inset-0">
              <img
                src={IMAGES.abstract}
                alt=""
                className="h-full w-full object-cover opacity-25 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
            </div>
            <div className="relative flex min-h-[420px] flex-col justify-end p-10 md:p-16">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-xo-blue">
                The New Space Race · 5-part series
              </div>
              <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-5xl">
                {feature.title}
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fg/60">
                {feature.dek}
              </p>
              <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fg">
                Read the series
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* Series list */}
      <section id="series" className="scroll-mt-32 border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <MaskTextInView
            lines={["The New Space Race"]}
            as="span"
            className="font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-12 overflow-hidden rounded-md border border-fg/10">
            {series.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.04}>
                <a
                  href="#"
                  data-testid={`series-article-${i}`}
                  className="group grid grid-cols-12 items-center gap-4 border-b border-fg/5 px-6 py-7 transition-colors duration-300 hover:bg-fg/[0.02] last:border-0 md:px-10"
                >
                  <div className="col-span-2 font-mono text-xs text-xo-blue md:col-span-1">
                    {a.seriesLabel.replace("Part ", "").replace(" of 5", "/5")}
                  </div>
                  <div className="col-span-10 md:col-span-8">
                    <h3 className="font-display text-xl text-fg transition-colors group-hover:text-xo-blue md:text-2xl">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-fg/45">{a.dek}</p>
                  </div>
                  <div className="col-span-12 flex items-center justify-between md:col-span-3 md:justify-end md:gap-6">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-fg/30">
                      {a.readTime}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-fg/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-xo-blue" />
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
