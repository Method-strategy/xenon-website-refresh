import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import SectionAnchors from "@/components/common/SectionAnchors";
import DemoCTA from "@/components/common/DemoCTA";
import { PRODUCTS, IMAGES, SIX_OUTCOMES, SYSTEM_GOAL_STATEMENT } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const ANCHORS = [
  { id: "capacity", label: "Where capacity goes" },
  { id: "one-visit", label: "One visit" },
  { id: "components", label: "The components" },
  { id: "outcomes", label: "The six outcomes" },
  { id: "proof", label: "Where it proves out" },
  { id: "demo", label: "See it work" },
];

const HIDDEN_SPACES = [
  {
    n: "01",
    title: "Schedule space",
    body: "The gap between the appointments you could hold and the ones you actually keep. No-shows in U.S. optometric practices average roughly 25 percent, climbing past 38 percent when booked six months out. Once a slot passes, that capacity is gone.",
  },
  {
    n: "02",
    title: "Workflow space",
    body: "The friction between the steps of care. Check-in to pre-test to lane to exam to the dispensary. Five extra minutes per patient across thirty patients is two and a half hours, before counting the schedule compression that follows.",
  },
  {
    n: "03",
    title: "Information space",
    body: "The gap between the data you generate and the decisions it should drive. Physicians average 36 minutes in the record for every 30-minute visit. Scheduling, clinical, and optical systems rarely share what they know.",
  },
  {
    n: "04",
    title: "Office space",
    body: "The gap between what your infrastructure was built to do and what it is actually used for. Outfitting a new practice runs $200,000 to $500,000, with exam lane equipment alone $100,000 to $250,000. That cost does not scale down when utilization does.",
  },
];

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const imgRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      ref={ref}
      data-testid="hero"
      className="hero-dark grain relative flex min-h-screen items-center overflow-hidden bg-bg pt-32"
    >
      {/* Cinematic hero stage: layered parallax image, ambient blue glow,
          drifting light scan, subtle rotation on scroll. */}
      <motion.div
        style={{ y: imgY, scale: imgScale, rotate: imgRotate }}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[70%]"
      >
        <img
          src="/hero/xoexam-arm.webp"
          srcSet="/hero/xoexam-arm-1200.webp 1200w, /hero/xoexam-arm.webp 2000w"
          sizes="(max-width: 1024px) 100vw, 70vw"
          width={2000}
          height={1123}
          fetchPriority="high"
          decoding="async"
          alt=""
          className="h-full w-full object-cover object-center opacity-90 lg:opacity-100"
        />
        {/* Deep left fade so headline stays legible */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent lg:via-bg/60" />
        {/* Top / bottom vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/60 via-transparent to-bg/70" />
        {/* Right edge fade so device dissolves into the frame */}
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-bg to-transparent" />
      </motion.div>

      {/* Ambient blue radial glow behind the device */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-[8%] top-[38%] h-[46vh] w-[46vh] -translate-y-1/2 rounded-full bg-xo-blue/25 blur-[120px]"
      />
      {/* Secondary teal/blue ambient */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="pointer-events-none absolute right-[22%] top-[72%] h-[30vh] w-[30vh] -translate-y-1/2 rounded-full bg-xo-teal/20 blur-[100px]"
      />
      {/* Anamorphic light scan — thin horizontal streak that drifts slowly */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, x: "-30%" }}
        animate={{ opacity: [0, 0.5, 0], x: "30%" }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        className="pointer-events-none absolute right-0 top-[52%] h-px w-[70%] bg-gradient-to-r from-transparent via-xo-blue/60 to-transparent"
      />

      {/* Overall spotlight + soft grain vignette (existing) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgb(var(--bg))_100%)] opacity-70" />

      <motion.div style={{ y: textY }} className="xo-container relative">
        <img
          src="/logos/xo-vision-care-system-dark.webp"
          alt="The XO Vision Care System"
          width={956}
          height={344}
          className="mb-8 h-12 w-auto md:h-14"
        />

        <span className="mask-line block max-w-[15ch] font-display text-[10vw] font-medium leading-[0.94] tracking-tight text-fg [text-wrap:balance] sm:text-5xl lg:text-7xl">
          One system. From appointment to finished eyewear.
        </span>

        <p className="mt-10 max-w-xl text-lg leading-relaxed text-fg/60">
          One doctor-led system integrating scheduling, examination, fitting,
          and finishing. Greater efficiency means more patients seen and more
          revenue kept in your practice.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/xo-vision-care-system" data-testid="hero-how-it-works" className="btn-primary">
            See How It Works
          </Link>
          <Link to="/request-a-demo" data-testid="hero-demo" className="btn-ghost">
            Request a Demo
          </Link>
        </div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ArrowDown className="h-5 w-5 animate-bounce text-fg/40" />
      </div>
    </section>
  );
}

export default function Home() {
  usePageMeta({
    title: "Xenon Ophthalmics: The XO Vision Care System",
    description:
      "Xenon Ophthalmics builds the XO Vision Care System: one system for eye care, from appointment to finished eyewear. Scheduling, exams, frame fitting and in-office finishing, designed to work as one.",
    raw: true,
  });
  return (
    <>
      <Hero />

      {/* MACRO THESIS — the "why", mirroring the launch film's opening */}
      <section className="relative overflow-hidden border-b border-fg/10 bg-surface py-24 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div className="xo-container relative grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="eyebrow mb-6">The problem</div>
            </Reveal>
            <MaskTextInView
              lines={["Demand for eye care", "is rising. Delivery", "capacity is not."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-lg text-lg leading-relaxed text-fg/55">
                More than a billion people live with vision impairment that is
                preventable or unaddressed, and the gap keeps widening, not because
                the science is missing, but because care is assembled from
                disconnected tools, fixed to buildings most of the world will never
                walk into.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-lg font-display text-2xl leading-snug text-fg/85">
                This isn't a doctor shortage. It's a system-design problem.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:pl-10">
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10">
              {[
                ["1B+", "people with preventable or unaddressed vision impairment"],
                ["Rising", "global demand for eye care, year over year"],
                ["Flat", "delivery capacity under the conventional, building-bound model"],
              ].map(([stat, label], i) => (
                <Reveal key={label} delay={i * 0.06} className="bg-bg">
                  <div className="p-8 md:p-10">
                    <div className="font-display text-4xl font-semibold text-xo-blue md:text-5xl">
                      {stat}
                    </div>
                    <div className="mt-3 text-[15px] leading-relaxed text-fg/55">{label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Layout: sticky anchors + content */}
      <div className="bg-bg">
        <div className="xo-container grid grid-cols-1 gap-16 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-3">
            <SectionAnchors sections={ANCHORS} />
          </div>

          <div className="lg:col-span-9">
            {/* SECTION 1 — Capacity */}
            <section id="capacity" className="scroll-mt-32">
              <Reveal>
                <div className="eyebrow mb-6">01 · Where your capacity goes</div>
              </Reveal>
              <MaskTextInView
                lines={["Some of the most expensive", "space in a practice isn't", "on the floor plan."]}
                as="span"
                className="max-w-4xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                  Eye care has always measured growth in physical terms. More
                  patients meant more lanes; more lanes meant more square footage,
                  capital, and overhead. But the largest constraints on what a
                  practice can deliver aren't physical at all. They sit in the gaps
                  between activity, hiding in plain sight. There are four of them.
                </p>
              </Reveal>

              <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10 md:grid-cols-2">
                {HIDDEN_SPACES.map((s, i) => (
                  <Reveal key={s.n} delay={i * 0.05} className="bg-surface">
                    <div className="group h-full p-8 transition-colors duration-500 hover:bg-fg/[0.02] md:p-10">
                      <div className="font-mono text-sm text-xo-blue">{s.n}</div>
                      <h3 className="mt-4 font-display text-2xl text-fg">{s.title}</h3>
                      <p className="mt-4 text-[15px] leading-relaxed text-fg/50">{s.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* recovered time stat */}
              <Reveal className="mt-16">
                <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-xo-navy-deep to-xo-navy-deeper p-10 md:p-14">
                  <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
                  <div className="relative grid grid-cols-1 items-center gap-10 md:grid-cols-12">
                    <div className="md:col-span-4">
                      <div className="font-display text-6xl font-semibold text-white md:text-7xl">
                        ~11<span className="text-xo-blue">h</span>
                      </div>
                      <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/50">
                        recovered per week
                      </div>
                    </div>
                    <div className="md:col-span-8">
                      <p className="text-lg leading-relaxed text-white/75">
                        Optometrists who delegate effectively recapture about 11
                        hours a week, room for roughly{" "}
                        <span className="text-white">12 additional patients</span>.
                        No new lane. No additional square footage.
                      </p>
                      <p className="mt-4 font-mono text-xs text-white/45">
                        Source: American Optometric Association, 2023
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <p className="mt-10 max-w-2xl font-display text-2xl leading-snug text-fg/80">
                  Efficiency is not a cost argument in eye care. It is the only
                  growth available without building anything.
                </p>
              </Reveal>
            </section>

            {/* SECTION 2 — One visit */}
            <section id="one-visit" className="mt-40 scroll-mt-32">
              <Reveal>
                <div className="eyebrow mb-6">02 · One visit, start to finish</div>
              </Reveal>
              <MaskTextInView
                lines={["The visit doesn't stop", "between the steps."]}
                as="span"
                className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                  Care begins before the patient walks through the door, and then
                  the waiting starts. Waiting for a lane. Waiting while the
                  prescription makes its way to the dispensary. Waiting while an
                  order is rebuilt from a chart. Those gaps are the day, and
                  fewer handoffs means fewer places for the schedule to slip.
                  The XO Vision Care System closes them: four steps designed as
                  one system rather than assembled from four purchases. A day
                  that holds its shape has room in it.
                </p>
              </Reveal>

              <div className="mt-14 space-y-px overflow-hidden rounded-md border border-fg/10 bg-fg/10">
                {[
                  ["Before they arrive", "Care begins at booking, not at check-in. xoIris manages scheduling, reminders, and chair utilization, aligning demand with capacity and filling openings from patients already due, so the day starts full instead of catching up. It's the foundation everything after it is built on."],
                  ["The exam experience", "One wearable device instead of a lane built from separate instruments. Objective and subjective refraction in the same workflow, with no stop between."],
                  ["At the fitting", "The optician opens xoFit and the prescription is already loaded, along with the patient's history. Nothing to chase, nothing to re-ask."],
                  ["At the finish", "The lab specification is complete the moment the sale closes, whether the job stays in the building or goes out."],
                ].map(([t, b], i) => (
                  <Reveal key={t} delay={i * 0.04} className="bg-surface">
                    <div className="grid grid-cols-1 gap-4 p-8 transition-colors duration-500 hover:bg-fg/[0.02] md:grid-cols-12 md:p-10">
                      <div className="font-display text-xl text-fg md:col-span-4">{t}</div>
                      <p className="text-[15px] leading-relaxed text-fg/50 md:col-span-8">{b}</p>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1} className="mt-12">
                <p className="max-w-2xl font-display text-2xl leading-snug text-fg/85 md:text-3xl">
                  One system. From appointment to finished eyewear. Not four
                  products that work together. A visit that never has to stop.
                </p>
              </Reveal>

              <Reveal className="mt-10">
                <Link
                  to="/xo-vision-care-system"
                  data-testid="home-system-link"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-xo-blue"
                >
                  See how the system works
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </Reveal>
            </section>
          </div>
        </div>

        {/* SECTION 3 — Components (full width) */}
        <section id="components" className="scroll-mt-32 border-t border-fg/10 bg-surface py-24 md:py-32">
          <div className="xo-container">
            <Reveal>
              <div className="eyebrow mb-6">03 · The components</div>
            </Reveal>
            <MaskTextInView
              lines={["Four points of contact.", "One patient journey."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
            />

            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2">
              {PRODUCTS.map((p, i) => (
                <Reveal key={p.key} delay={i * 0.06}>
                  <Link
                    to={p.to}
                    data-testid={`home-component-${p.key}`}
                    className="group relative flex h-full flex-col justify-between overflow-hidden rounded-md border border-fg/10 bg-bg p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-xo-blue/40 md:p-10"
                  >
                    <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-xo-blue/10 blur-3xl transition-opacity duration-500 group-hover:opacity-100 opacity-0" />
                    <div className="relative">
                      <div className="flex items-baseline gap-3">
                        <img
                          src={p.logo.replace("-dark.svg", ".svg")}
                          alt={p.name}
                          width={p.logoWidth}
                          height={p.logoHeight}
                          className="block h-6 w-auto dark:hidden"
                        />
                        <img
                          src={p.logo}
                          alt=""
                          aria-hidden="true"
                          width={p.logoWidth}
                          height={p.logoHeight}
                          className="hidden h-6 w-auto dark:block"
                        />
                        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
                          {p.role}
                        </span>
                      </div>
                      <p className="mt-6 max-w-md text-[15px] leading-relaxed text-fg/55">
                        {p.blurb}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-xo-blue">
                      Explore {p.name}
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-16">
              <p className="font-display text-3xl font-medium leading-snug tracking-tight text-fg md:text-4xl">
                The system is the advantage.
              </p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg/55">
                Any one component earns its place. Together they compound, each step
                handing the next a head start, so capacity builds across the whole
                visit instead of leaking between the parts.
              </p>
            </Reveal>
          </div>
        </section>

        {/* SECTION 4 — Six outcomes */}
        <section id="outcomes" className="scroll-mt-32 border-t border-fg/10 bg-bg py-24 md:py-32">
          <div className="xo-container">
            <Reveal>
              <div className="eyebrow mb-6">04 · The six outcomes</div>
            </Reveal>
            <MaskTextInView
              lines={["Every recommendation ties back", "to six measurable results."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                This is what the components above are for. Not features on a spec
                sheet: outcomes a practice can measure, one visit at a time.
              </p>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-3">
              {SIX_OUTCOMES.map((o, i) => (
                <Reveal key={o.key} delay={i * 0.05} className="bg-surface">
                  <div className="group h-full p-8 transition-colors duration-500 hover:bg-fg/[0.02] md:p-10">
                    <div className="font-mono text-sm text-xo-blue">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="mt-4 font-display text-2xl text-fg">{o.title}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-fg/50">{o.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — Proof */}
        <section id="proof" className="scroll-mt-32 relative overflow-hidden border-t border-fg/10 py-24 md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img src={IMAGES.clinic} alt="" className="h-full w-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-bg/80" />
          </div>
          <div className="xo-container relative grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="eyebrow mb-6">05 · Where it proves out</div>
              </Reveal>
              <MaskTextInView
                lines={["If it works where", "there is no clinic,", "it works in yours."]}
                as="span"
                className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-lg text-lg leading-relaxed text-fg/55">
                  Most eye care technology assumes a building: a lane, a darkroom, a
                  licensed practitioner down the hall. That assumption holds in a
                  suburban practice. It does not hold in most of the world. The
                  global eye care workforce isn't evenly distributed. It's
                  concentrated.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-10 rounded-md border border-fg/10 bg-surface/60 p-8 backdrop-blur-sm">
                  <a
                    href="https://eyecare4kids.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="eyecare4kids-logo-link"
                    aria-label="EyeCare4Kids"
                    className="mb-6 inline-block transition-transform duration-300 hover:scale-[1.02]"
                  >
                    <img
                      src="/partners/eyecare4kids-light.svg"
                      alt="EyeCare4Kids"
                      width={648}
                      height={195}
                      className="block h-12 w-auto md:h-14 dark:hidden"
                    />
                    <img
                      src="/partners/eyecare4kids-dark.svg"
                      alt="EyeCare4Kids"
                      aria-hidden="true"
                      width={648}
                      height={195}
                      className="hidden h-12 w-auto md:h-14 dark:block"
                    />
                  </a>
                  <p className="text-[15px] leading-relaxed text-fg/70">
                    This is why{" "}
                    <a
                      href="https://eyecare4kids.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="eyecare4kids-text-link"
                      className="text-fg underline decoration-fg/20 underline-offset-4 transition-colors hover:text-xo-blue hover:decoration-xo-blue/60"
                    >
                      EyeCare4Kids<sup className="ml-0.5 text-[0.55em] top-[-0.6em] relative">®</sup>
                    </a>{" "}
                    partners with Xenon to help with its mission: our eye care
                    delivery model lets them reach children a legacy system
                    never could. In July 2026, Xenon introduced xoExam, our
                    exam component of the XO Vision Care System, at Nelson
                    Mandela Children's Hospital in South Africa with{" "}
                    <a
                      href="https://eyecare4kids.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-fg underline decoration-fg/20 underline-offset-4 transition-colors hover:text-xo-blue hover:decoration-xo-blue/60"
                    >
                      EyeCare4Kids
                    </a>
                    .
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-6 lg:pl-10">
              <div className="space-y-px overflow-hidden rounded-md border border-fg/10 bg-fg/10">
                {[
                  ["6", "countries hold half the world's ophthalmologists"],
                  ["20", "countries report no optometrists at all"],
                  ["141 vs 20", "optometrists per million: high-income vs Sub-Saharan Africa"],
                ].map(([stat, label], i) => (
                  <Reveal key={label} delay={i * 0.06} className="bg-surface">
                    <div className="flex items-baseline gap-6 p-8 md:p-10">
                      <div className="font-display text-5xl font-semibold text-xo-blue md:text-6xl">
                        {stat}
                      </div>
                      <div className="text-[15px] leading-relaxed text-fg/55">{label}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
              <p className="mt-6 font-mono text-xs text-fg/30">Source: AJO International, 2026</p>
            </div>
          </div>

          {/* Scale ladder — integration -> capacity -> access */}
          <div className="xo-container relative mt-20">
            <Reveal>
              <p className="max-w-3xl font-display text-2xl leading-snug tracking-tight text-fg md:text-3xl">
                The structure stays the same. The scale changes. Integration
                increases capacity, and capacity expands access.
              </p>
            </Reveal>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10 md:grid-cols-4">
              {["Single practice", "Multi-location", "National", "Global"].map((s, i) => (
                <Reveal key={s} delay={i * 0.06} className="bg-bg">
                  <div className="group flex h-full flex-col justify-between p-6 md:p-8">
                    <div className="font-mono text-xs text-xo-blue">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="mt-8 font-display text-lg text-fg md:text-xl">{s}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Featured objective statement */}
      <section className="relative overflow-hidden border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="relative overflow-hidden rounded-md bg-gradient-to-br from-xo-navy-deep to-xo-navy-deeper p-10 md:p-16">
              <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
              <div className="relative">
                <div className="font-mono text-xs uppercase tracking-[0.2em] text-white/50">Our goal</div>
                <p
                  data-testid="home-goal-statement"
                  className="mt-6 max-w-3xl font-display text-3xl font-medium leading-snug tracking-tight text-white sm:text-4xl lg:text-5xl"
                >
                  {SYSTEM_GOAL_STATEMENT}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div id="demo" className="scroll-mt-32">
        <DemoCTA />
      </div>
    </>
  );
}
