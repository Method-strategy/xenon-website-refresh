import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { usePageMeta } from "@/lib/usePageMeta";

const MEASUREMENTS = [
  "Pupillary distance, monocular and binocular",
  "Near pupillary distance",
  "Optical center height",
  "Segment height",
  "Vertex distance",
  "Pantoscopic tilt",
  "Wrap angle",
  "Frame A and B dimensions",
  "Distance between lenses",
  "Head tilt compensation",
];

const FORM_FACTOR_LINKS = [
  {
    name: "xoFit Core",
    kind: "Stand / wall-mounted",
    body: "A wall-mounted station for the dispensary that sees the most volume. One shot, every measurement.",
    to: "/xofit-core",
  },
  {
    name: "xoFit Mobile",
    kind: "iPad-based / portable",
    body: "The same measurement, unbolted from the wall. It goes wherever the frame conversation is already happening.",
    to: "/xofit-mobile",
  },
  {
    name: "xoFit VTO",
    kind: "Virtual try-on",
    body: "Every frame in the collection, tried on instantly, before a single pair leaves the shelf.",
    to: "/xofit-vto",
  },
];

const FAQS = [
  {
    q: "What is digital centration?",
    a: "The measurement of where a lens needs to sit relative to the eye, including pupillary distance, optical center height, segment height, vertex distance, pantoscopic tilt, and wrap angle. xoFit captures it digitally instead of by hand with a ruler.",
  },
  {
    q: "Why does pupillary distance accuracy matter?",
    a: "Premium lens designs assume the position they will occupy in front of the eye. A ruler averages roughly 3mm of variance between opticians. A 2mm centration error costs the patient up to 25 percent of their binocular field of view. The design falls back on assumed values, and the patient pays for performance they never receive.",
  },
  {
    q: "What is the difference between xoFit Core and xoFit Mobile?",
    a: "Core is wall-mounted, built for the dispensary that sees the most volume. Mobile is the same measurement, unbolted from the wall, so it goes wherever the frame conversation is already happening. Both capture the same measurement set to the same standard.",
  },
  {
    q: "How does xoFit VTO relate to Core and Mobile?",
    a: "VTO handles frame selection. It lets a patient try on any frame in the collection before a decision is made. Core and Mobile handle the measurement once a frame is chosen. Together they cover the visit from selection to a lab-ready specification.",
  },
];

export default function Fit() {
  usePageMeta({
    title: "xoFit: Frame Fitting",
    description:
      "Digital centration, frame measurement, and virtual try-on, so the lens sits where the prescription requires and the frame is one the patient actually wants to wear.",
  });
  return (
    <div>
      <ProductHero
        eyebrow="xoFit™ · Fit"
        logo="/logos/xofit-dark.svg"
        logoWidth={102}
        logoHeight={25}
        role="Fit"
        headlineLines={["Eyewear has to", "fit twice."]}
        subhead="Digital centration, frame measurement, and virtual try-on, so the lens sits where the prescription requires and the frame is one the patient actually wants to wear."
        image="/hero/xofit-measure.webp"
        imageSrcSet="/hero/xofit-measure-1200.webp 1200w, /hero/xofit-measure.webp 1920w"
        imageAlt="Digital centration measurements, pupillary distance, frame geometry, segment height, overlaid on a patient's face"
      />

      {/* 01 Overview */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Overview</div>
            </Reveal>
            <MaskTextInView
              lines={["Eyewear has to", "fit twice."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                A prescription fits the eye. The frame has to fit the face, sit
                where the lens design assumes it will sit, and be a frame the
                patient actually wants to wear out of the practice. xoFit is
                the fitting software in the XO Vision Care System. It covers
                both halves: digital centration and frame measurement through
                xoFit Core and xoFit Mobile, and frame selection through xoFit
                VTO, so the specification that reaches the lab reflects what
                was actually measured, and the frame the patient leaves with
                is one they chose with confidence.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 When the fit is wrong */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">When the Fit is Wrong</div>
            </Reveal>
            <MaskTextInView
              lines={["When the fit is wrong,", "the prescription", "takes the blame."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                A patient who can't adjust to a new pair usually blames the
                prescription. Often the prescription was correct and the
                centration was not. A ruler-measured pupillary distance, a
                guessed vertex distance, or an unmeasured pantoscopic tilt
                puts the lens somewhere other than where the design assumed
                it would sit, and the patient pays for performance they were
                promised but never received. The remake that follows costs
                the practice a lens, a lab turnaround, and a second visit,
                and it costs the patient trust in a pair they already own.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 Three form factors */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">The Three Form Factors</div>
          </Reveal>
          <MaskTextInView
            lines={["One precision standard."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <MaskTextInView
            lines={["Three ways to work."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              xoFit Core and xoFit Mobile capture the same measurement set to
              the same standard, in whichever form factor matches how a
              dispensary works. xoFit VTO gives the patient the aesthetic
              decision, virtually trying on any frame in the collection
              before the measurement ever begins.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-fg/10 bg-fg/10 md:grid-cols-3">
            {FORM_FACTOR_LINKS.map((f, i) => (
              <Reveal key={f.name} delay={i * 0.06} className="bg-surface">
                <Link
                  to={f.to}
                  data-testid={`form-factor-link-${f.to.replace("/", "")}`}
                  className="group flex h-full flex-col justify-between p-8 transition-colors duration-300 hover:bg-fg/[0.02]"
                >
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-acc">{f.kind}</div>
                    <h3 className="mt-4 font-display text-2xl text-fg">{f.name}</h3>
                    <p className="mt-3 text-[14.5px] leading-relaxed text-fg/55">{f.body}</p>
                  </div>
                  <div className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fg/40 group-hover:text-acc">
                    See {f.name}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 04 Why measurement matters */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="eyebrow mb-6">Why Measurement Matters</div>
            </Reveal>
            <MaskTextInView
              lines={["The lens is only as good", "as where it sits."]}
              as="span"
              className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/55">
                Premium lens designs assume the position they will occupy in
                front of the eye. When that position is estimated rather than
                measured, the design falls back on assumed values and the
                patient pays for performance they never receive. This is a
                limitation of the ruler, not the optician.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <div className="space-y-px overflow-hidden border border-fg/10 bg-fg/10">
              {[
                ["~3mm", "average ruler variance among opticians"],
                ["0.09 to 0.24mm", "variance for digital systems"],
                ["~25%", "binocular field of view lost to a 2mm centration error"],
              ].map(([stat, label], i) => (
                <Reveal key={label} delay={i * 0.06} className="bg-bg">
                  <div className="flex items-baseline gap-6 p-8">
                    <div className="font-display text-4xl font-semibold text-acc md:text-5xl">
                      {stat}
                    </div>
                    <div className="text-[14px] leading-relaxed text-fg/55">{label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 font-mono text-xs text-fg/30">Source: Carl Zeiss Vision</p>
          </div>
        </div>
      </section>

      {/* 05 What it captures */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">What it Captures</div>
          </Reveal>
          <MaskTextInView
            lines={["Every measurement a", "lab-ready specification needs."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-3">
            {MEASUREMENTS.map((m, i) => (
              <Reveal key={m} delay={(i % 3) * 0.05} className="bg-surface">
                <div className="flex items-center gap-4 p-6">
                  <span aria-hidden="true" className="h-px w-3 shrink-0 bg-acc/60" />
                  <span className="text-[15px] text-fg/75">{m}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 06 What it delivers */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">What it Delivers</div>
          </Reveal>
          <MaskTextInView
            lines={["Three results a", "practice can measure."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-14 grid grid-cols-1 gap-16 md:grid-cols-3">
            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">
                Clinical Quality
              </span>
              <p className="mt-6 text-[15.5px] leading-relaxed text-fg/60">
                Every patient gets the same measurement standard regardless
                of which optician is on shift, because the capture is
                automated rather than judged by eye.
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">
                Patient Experience
              </span>
              <p className="mt-6 text-[15.5px] leading-relaxed text-fg/60">
                The optician opens the record and the prescription is already
                there. No chart to find, no history to re-ask, just the
                fitting.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">
                Time
              </span>
              <p className="mt-6 text-[15.5px] leading-relaxed text-fg/60">
                Digital centration in minutes replaces a measurement that
                used to mean a ruler, a second pass, and a remake when it
                didn't land.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 07 In the system */}
      <section className="border-t border-fg/10 bg-surface py-20">
        <div className="xo-container">
          <div className="eyebrow mb-4">In the system</div>
          <p className="max-w-2xl text-lg leading-relaxed text-fg/60">
            A complete lab-ready specification covering prescription,
            centration, and frame geometry, finished at the moment the sale
            is. Whether the job stays in the building or goes to your
            contracted lab, nobody rebuilds it.
          </p>
          <Link
            to="/xo-vision-care-system"
            data-testid="fit-journey-link"
            className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-acc"
          >
            See the full patient journey
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>

      <FAQ items={FAQS} title="Fit, answered." />
      <DemoCTA
        eyebrow="Request a demo"
        headline="Send the lab exactly what you measured."
        body="A thirty-minute walkthrough of xoFit inside the full XO Vision Care System."
      />
    </div>
  );
}
