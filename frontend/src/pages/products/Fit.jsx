import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { cn } from "@/lib/utils";
import { IMAGES } from "@/data/site";

const FORM_FACTORS = [
  {
    key: "wall",
    tab: "xoFit",
    kind: "Wall-mounted",
    headline: "Precision frame fitting. Digitally guided.",
    body: "A wall-mounted station using multi-camera optical imaging to capture facial geometry and frame position in a single guided capture.",
  },
  {
    key: "mobile",
    tab: "xoFit mobile",
    kind: "Handheld",
    headline: "Precision measurements. Anywhere fitting happens.",
    body: "A handheld unit for practices without dedicated wall space, or opticians who prefer to stay with the patient on the floor.",
  },
  {
    key: "virtual",
    tab: "xoFrame",
    kind: "Virtual",
    headline: "Virtual try-on. Real confidence.",
    body: "Every frame, tried on instantly. xoFrame brings virtual try-on to the frame selection process, showing patients exactly how they look in any frame in your collection.",
  },
];

const FAQS = [
  {
    q: "What is digital centration?",
    a: "Digital centration is the precise measurement of where a lens sits in front of the eye — pupillary distance, segment height, vertical optical center, and frame geometry — captured digitally rather than with a ruler, so premium lens designs perform as intended.",
  },
  {
    q: "Why does pupillary distance accuracy matter?",
    a: "Premium lens designs assume a specific position in front of the eye. Ruler measurements vary by up to ~3mm between opticians, versus 0.09–0.24mm for digital systems. A 2mm centration error can reduce binocular field of view by roughly 25 percent.",
  },
];

export default function Fit() {
  const [active, setActive] = useState("wall");

  return (
    <div className="acc-fit">
      <ProductHero
        eyebrow="xoFit™ · Fit"
        logo="/logos/xofit-dark.svg"
        role="Fit"
        headlineLines={["Measurements that", "arrive at the lab", "exactly as taken."]}
        subhead="Digital centration and frame measurement in three form factors, captured in the same visit that produced the prescription."
        image={IMAGES.clinic}
        imageAlt="Optical fitting environment"
      />

      {/* Overview */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Overview</div>
            </Reveal>
            <MaskTextInView
              lines={["The measurement is", "the easy part.", "Getting it there is not."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                Digital centration is a mature technology. What is not standard is a
                measurement that lands in the same system that produced the
                prescription and will drive the edger, without an optician
                transcribing anything.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-fg/45">
                The prescription is already loaded from the exam. xoFit adds
                pupillary distance, segment height, vertical optical center, and
                frame geometry — and the lab specification assembles itself.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Form factor tabs */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">Choose your form factor</div>
          </Reveal>
          <MaskTextInView
            lines={["Three ways a practice", "actually works."]}
            as="span"
            className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />

          {/* Tab buttons */}
          <div
            role="tablist"
            aria-label="xoFit form factors"
            className="mt-12 flex flex-wrap gap-3"
          >
            {FORM_FACTORS.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={active === f.key}
                data-testid={`fit-tab-${f.key}`}
                onClick={() => setActive(f.key)}
                className={cn(
                  "rounded-full border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-[color,border-color,background-color] duration-300",
                  active === f.key
                    ? "border-acc bg-acc/10 text-acc"
                    : "border-fg/15 text-fg/50 hover:border-fg/40 hover:text-fg",
                )}
              >
                {f.tab}
                <span className="ml-2 text-fg/30">{f.kind}</span>
              </button>
            ))}
          </div>

          {/* Panels — all rendered in DOM; inactive hidden via CSS */}
          <div className="mt-10">
            {FORM_FACTORS.map((f) => (
              <div
                key={f.key}
                role="tabpanel"
                data-testid={`fit-panel-${f.key}`}
                className={active === f.key ? "block" : "hidden"}
              >
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 gap-8 overflow-hidden rounded-md border border-fg/10 bg-bg lg:grid-cols-12"
                >
                  <div className="p-10 lg:col-span-6 lg:p-14">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-acc">
                      {f.tab} · {f.kind}
                    </div>
                    <h3 className="mt-6 font-display text-3xl leading-tight text-fg md:text-4xl">
                      {f.headline}
                    </h3>
                    <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg/55">
                      {f.body}
                    </p>
                  </div>
                  <div className="relative min-h-[280px] lg:col-span-6">
                    <img
                      src={f.key === "virtual" ? IMAGES.professional : IMAGES.lab}
                      alt={f.headline}
                      className="h-full w-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-bg to-transparent" />
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why precision matters */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <MaskTextInView
              lines={["The lens is only as good", "as where it sits."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-fg/55">
                Premium lens designs assume the position they will occupy in front of
                the eye. When that position is estimated rather than measured, the
                design falls back on assumed values and the patient pays for
                performance they never receive. This is a limitation of the ruler,
                not the optician.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <div className="space-y-px overflow-hidden rounded-md border border-fg/10 bg-fg/10">
              {[
                ["~3mm", "average ruler variance among opticians"],
                ["0.09–0.24mm", "variance for digital systems"],
                ["~25%", "binocular field of view lost to a 2mm centration error"],
              ].map(([stat, label], i) => (
                <Reveal key={label} delay={i * 0.06} className="bg-surface">
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

      {/* In the system */}
      <section className="border-t border-fg/10 bg-surface py-20">
        <div className="xo-container">
          <div className="eyebrow mb-4">In the system</div>
          <p className="max-w-2xl text-lg leading-relaxed text-fg/60">
            A complete lab-ready specification covering prescription, centration, and
            frame geometry — finished at the moment the sale is. Whether the job stays
            in the building or goes to your contracted lab, nobody rebuilds it.
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
