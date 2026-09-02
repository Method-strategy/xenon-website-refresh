import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { IMAGES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const EQUIPMENT = [
  {
    n: "01",
    name: "xoLab Trace",
    img: "/products/xolab-trace.webp",
    imgWidth: 800,
    imgHeight: 1200,
    scale: 0.86,
    desc: "High-precision frame & pattern tracer with a 7\" TFT display and VCA/RS-232C connectivity, with drop-failure prevention for reliable, repeatable traces.",
    specs: ["7\" TFT display", "Binocular & monocular tracing", "VCA / RS-232C connectivity", "Drop-failure prevention"],
  },
  {
    n: "02",
    name: "xoLab Block",
    img: "/products/xolab-block.webp",
    imgWidth: 600,
    imgHeight: 800,
    scale: 0.92,
    desc: "Precision blocking that positions the lens exactly to the traced spec before edging, protecting centration through the cut.",
    specs: ["Accurate axis & optical-center blocking", "Works from the shared job spec", "Compact benchtop footprint"],
  },
  {
    n: "03",
    name: "xoLab Edge",
    img: "/products/xolab-edge.webp",
    imgSrcSet: "/products/xolab-edge-750.webp 750w, /products/xolab-edge.webp 1500w",
    imgWidth: 1500,
    imgHeight: 1800,
    scale: 1,
    desc: "High-precision patternless edger with a conical grinding wheel for beveling, grooving, and polishing across materials.",
    specs: ["Conical grinding wheel", "Bevel, groove & polish", "Handles glass, plastic, poly & Trivex", "Drilling & safety-bevel ready"],
  },
];

const FAQS = [
  {
    q: "Is in-office lens edging worth it?",
    a: "In-office finishing changes the unit economics of every single-vision job. Industry reporting places typical savings at $5–$15 per job on edging, with additional recovery on tinting and drilling, against a one-time equipment investment rather than a per-job charge, plus same-day turnaround.",
  },
  {
    q: "What can and cannot be finished in office?",
    a: "xoLab is an edging operation, not a surfacing lab. Single-vision work (the volume category in most practices) can be finished on site the same day. Progressives and anything requiring surfacing still route to your contracted lab, going out as a complete specification generated from the record.",
  },
];

export default function Lab() {
  usePageMeta({
    title: "xoLab: In-Office Eyewear Finishing",
    description:
      "Frame tracing, blocking, and edging in a footprint sized for a practice. Finished eyewear on site, as fast as same day, with the margin that would otherwise leave with the lab bill.",
  });
  return (
    <div className="acc-lab">
      <ProductHero
        eyebrow="xoLab™ · Finish"
        logo="/logos/xolab-dark.svg"
        logoWidth={119}
        logoHeight={24}
        role="Finish"
        headlineLines={["The last step", "is where", "the margin goes."]}
        subhead="Frame tracing, blocking, and edging in a footprint sized for a practice, with finished eyewear on site, as fast as same day."
        image={IMAGES.lab}
        imageAlt="In-office lens finishing lab equipment"
      />

      {/* Overview */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Overview</div>
            </Reveal>
            <MaskTextInView
              lines={["Finishing is the one step", "most practices give away."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                Every other stage of care happens in the building: the exam, the
                frame selection, the fitting, the sale. Then the job leaves, and a
                portion of the value leaves with it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-fg/45">
                xoLab brings tracing, blocking, and edging in-house in a compact,
                scalable configuration, designed to be operated by existing staff
                rather than a dedicated lab technician.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Economics */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <MaskTextInView
            lines={["The lab bill is a recurring cost", "with a fixed alternative."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-md bg-gradient-to-br from-xo-navy-deep to-xo-navy-deeper p-10">
                <div className="font-display text-6xl font-semibold text-white">
                  $5–$15
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                  typical savings per job on edging
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-white/70">
                  With additional recovery on tinting and drilling, against a
                  one-time equipment investment rather than a per-job charge.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-md border border-fg/10 bg-surface p-10">
                <div className="font-display text-6xl font-semibold text-acc">
                  Same day
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-fg/40">
                  the second return is time
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-fg/55">
                  A job that does not leave the building is not waiting on a courier,
                  a lab queue, or a return shipment. Same-day delivery becomes
                  possible for work that currently takes days.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="relative overflow-hidden border-t border-fg/10 bg-bg py-24 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src={IMAGES.microscope} alt="" className="h-full w-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-bg/85" />
        </div>
        <div className="xo-container relative">
          <Reveal>
            <div className="eyebrow mb-6">The equipment</div>
          </Reveal>
          <MaskTextInView
            lines={["Three machines.", "One in-office lab."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {EQUIPMENT.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.08}>
                <div className="group flex h-full flex-col">
                  <div className="relative flex h-[30rem] items-end justify-center sm:h-[34rem] md:h-80 lg:h-[26rem]">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(70% 45% at 50% 88%, rgb(var(--fg) / 0.18), transparent 74%), radial-gradient(45% 55% at 50% 45%, rgb(var(--fg) / 0.08), transparent 78%)",
                      }}
                    />
                    <img
                      src={e.img}
                      srcSet={e.imgSrcSet}
                      sizes={e.imgSrcSet ? "(max-width: 768px) 50vw, 33vw" : undefined}
                      width={e.imgWidth}
                      height={e.imgHeight}
                      decoding="async"
                      alt={e.name}
                      style={{ height: `${e.scale * 100}%` }}
                      className="relative w-auto max-w-full object-contain object-bottom drop-shadow-2xl transition-transform duration-700 group-hover:-translate-y-1.5"
                    />
                  </div>
                  <div className="mt-8 flex flex-1 flex-col border-t border-fg/10 pt-6">
                    <div className="font-mono text-sm text-acc">{e.n}</div>
                    <h3 className="mt-4 font-display text-2xl text-fg">{e.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-fg/50">{e.desc}</p>
                    <ul className="mt-6 space-y-2">
                      {e.specs.map((s) => (
                        <li key={s} className="flex items-start gap-3 text-[13px] text-fg/60">
                          <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-acc/60" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What it delivers */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">What it delivers</div>
          </Reveal>
          <MaskTextInView
            lines={["The margin that used to", "leave with the lab bill."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-14 space-y-8">
            <Reveal>
              <div className="flex flex-col gap-2 border-t border-fg/10 pt-8 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="flex items-baseline gap-3 sm:w-64 sm:shrink-0">
                  <span className="font-mono text-sm text-acc">01</span>
                  <span className="font-display text-xl text-fg">Profitability</span>
                </div>
                <p className="text-[15px] leading-relaxed text-fg/55">
                  The margin on a finished pair used to leave with the lab
                  bill. Now it stays in the building on every single-vision
                  job that used to go out.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="flex flex-col gap-2 border-t border-fg/10 pt-8 sm:flex-row sm:items-baseline sm:gap-8">
                <div className="flex items-baseline gap-3 sm:w-64 sm:shrink-0">
                  <span className="font-mono text-sm text-acc">02</span>
                  <span className="font-display text-xl text-fg">Practice Growth</span>
                </div>
                <p className="text-[15px] leading-relaxed text-fg/55">
                  Same-day finishing is capacity you didn't have to build
                  for. The lab bay does more volume without a bigger
                  footprint or a second technician.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What stays / goes out */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <MaskTextInView
            lines={["What stays in the building,", "and what doesn't."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              xoLab is an edging operation, not a surfacing lab. Single-vision work
              (the volume category in most practices) can be finished on site the same
              day. Progressives and anything requiring surfacing still route to your
              contracted lab. The difference is what leaves with them: a job that goes
              out from the XO system goes out as a complete specification generated
              from the record, not an order form rebuilt by hand from a chart.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10">
              <div className="eyebrow mb-3">In the system · where the visit closes</div>
              <p className="max-w-2xl text-lg leading-relaxed text-fg/70">
                The visit that began with a phone call ends with a finished pair of
                glasses. Sometimes the same day, in the same building, without a single
                step in between where the patient had to wait on the practice.
              </p>
              <Link
                to="/xo-vision-care-system"
                data-testid="lab-journey-link"
                className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-acc"
              >
                See the full patient journey
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ items={FAQS} title="Finishing, answered." />
      <DemoCTA
        eyebrow="Request a demo"
        headline="Keep the last step (and its margin) inside the building."
        body="A thirty-minute walkthrough of xoLab inside the full XO Vision Care System."
      />
    </div>
  );
}
