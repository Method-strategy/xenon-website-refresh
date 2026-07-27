import { ArrowUpRight } from "lucide-react";
import { MaskText, MaskTextInView, Reveal } from "@/components/common/Reveal";
import DemoCTA from "@/components/common/DemoCTA";
import { NEWS, IMAGES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

function fmtDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function News() {
  usePageMeta({
    title: "News",
    description:
      "Company news and program updates from Xenon Ophthalmics: deployments of the XO Vision Care System, partnerships, and press.",
  });

  const feature = NEWS[0];
  const rest = NEWS.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex min-h-[55vh] items-end overflow-hidden bg-bg pb-16 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="xo-container relative">
          <div className="eyebrow mb-8">Company News</div>
          <MaskText
            lines={["What's happening", "at Xenon."]}
            as="span"
            className="font-display text-[9vw] font-medium leading-[0.97] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg/60">
            Deployments of the XO Vision Care System, partnerships and program
            launches. Longer-form thinking lives on the{" "}
            <a href="/blog" className="text-xo-blue underline-offset-4 hover:underline">
              blog
            </a>
            .
          </p>
        </div>
      </section>

      {/* Feature story */}
      {feature && (
        <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
          <div className="xo-container">
            <Reveal>
              <div className="eyebrow mb-8">Latest</div>
            </Reveal>
            <a
              href="#"
              data-testid="news-feature"
              className="group relative block overflow-hidden rounded-md border border-fg/10"
            >
              <div className="absolute inset-0">
                <img
                  src={IMAGES.clinic}
                  alt=""
                  className="h-full w-full object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/30" />
              </div>
              <div className="relative flex min-h-[420px] flex-col justify-end p-10 md:p-16">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-xo-blue">
                  {feature.category} · {fmtDate(feature.date)}
                </div>
                <h2 className="mt-6 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-5xl">
                  {feature.title}
                </h2>
                <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-fg/60">
                  {feature.dek}
                </p>
                <span className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fg">
                  Read the story
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </span>
              </div>
            </a>
          </div>
        </section>
      )}

      {/* Rest */}
      {rest.length > 0 ? (
        <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
          <div className="xo-container">
            <MaskTextInView
              lines={["More from Xenon"]}
              as="span"
              className="font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl"
            />
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {rest.map((a, i) => (
                <Reveal key={a.slug} delay={i * 0.06}>
                  <a
                    href="#"
                    data-testid={`news-card-${i}`}
                    className="group flex h-full flex-col rounded-md border border-fg/10 bg-bg p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-xo-blue/40"
                  >
                    <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-xo-blue">
                      {a.category}
                      <span className="text-fg/25">·</span>
                      <span className="text-fg/40">{fmtDate(a.date)}</span>
                    </div>
                    <h3 className="mt-5 flex-1 font-display text-xl leading-snug text-fg transition-colors group-hover:text-xo-blue">
                      {a.title}
                    </h3>
                    <p className="mt-4 text-[14px] leading-relaxed text-fg/45">{a.dek}</p>
                    <div className="mt-6 font-mono text-[11px] uppercase tracking-widest text-fg/30">
                      {a.readTime}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
          <div className="xo-container max-w-3xl">
            <Reveal>
              <div className="eyebrow mb-6">More coming</div>
            </Reveal>
            <p className="text-lg leading-relaxed text-fg/55">
              We share program milestones, deployments and partnership news as
              they land. For long-form analysis on eye care delivery and
              capacity, visit the{" "}
              <a href="/blog" className="text-xo-blue underline-offset-4 hover:underline">
                blog
              </a>
              .
            </p>
          </div>
        </section>
      )}

      <DemoCTA />
    </>
  );
}
