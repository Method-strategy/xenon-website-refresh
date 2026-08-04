import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import SectionAnchors from "@/components/common/SectionAnchors";
import DemoCTA from "@/components/common/DemoCTA";
import { PRODUCTS, IMAGES, SIX_OUTCOMES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const ANCHORS = [
  { id: "capacity", label: "Where capacity goes" },
  { id: "system", label: "The system" },
  { id: "delivers", label: "What it delivers" },
  { id: "proof", label: "Where it proves out" },
  { id: "demo", label: "See it work" },
];

const HIDDEN_SPACES = [
  {
    n: "01",
    title: "Schedule space",
    body: "The gap between the appointments you could hold and the ones you keep. No-shows in U.S. optometric practices average roughly 25 percent, climbing past 38 percent when booked six months out. Once a slot passes, that capacity is gone.",
  },
  {
    n: "02",
    title: "Workflow space",
    body: "The friction between steps. Check-in to pre-test to lane to exam to the dispensary. Five extra minutes per patient across thirty patients is two and a half hours, before the schedule compression that follows.",
  },
  {
    n: "03",
    title: "Information space",
    body: "The distance between what you record and what you can use. Physicians average 36 minutes in the chart for every 30-minute visit, and scheduling, clinical, and optical systems rarely share what they know.",
  },
  {
    n: "04",
    title: "Office space",
    body: "The gap between what your infrastructure was built for and what it does. A new practice runs $200,000 to $500,000 to outfit, with exam lane equipment alone $100,000 to $250,000. That cost doesn't shrink when utilization does.",
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
        <div className="eyebrow mb-8">The XO™ Vision Care System</div>

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
                <div className="eyebrow mb-6">01 · Where capacity goes</div>
              </Reveal>
              <MaskTextInView
                lines={["Some of the most expensive", "space in a practice isn't", "on the floor plan."]}
                as="span"
                className="max-w-4xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                  Growth in eye care has always meant more lanes, more square
                  footage, more capital. But the real limit on what a practice
                  can deliver isn't physical. It's the time that disappears
                  between the steps of care. There are four places it goes.
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
                  Efficiency isn't a cost argument in eye care. It's the only
                  growth available without building anything.
                </p>
              </Reveal>
            </section>
          </div>
        </div>

        {/* SECTION 2 — The system (full width, merges old "one visit" + "components") */}
        <section id="system" className="scroll-mt-32 border-t border-fg/10 bg-surface py-24 md:py-32">
          <div className="xo-container">
            <Reveal>
              <div className="eyebrow mb-6">02 · The system</div>
            </Reveal>
            <Reveal delay={0.02}>
              <img
                src="/logos/xo-vision-care-system-horiz.webp"
                alt="The XO Vision Care System"
                width={1390}
                height={253}
                className="mb-8 block h-[52.8px] w-auto md:h-[66px] dark:hidden"
              />
              <img
                src="/logos/xo-vision-care-system-horiz-dark.webp"
                alt=""
                aria-hidden="true"
                width={1390}
                height={253}
                className="mb-8 hidden h-[52.8px] w-auto md:h-[66px] dark:block"
              />
            </Reveal>
            <MaskTextInView
              lines={["Every step starts where", "the last one ended."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                Most practices run on tools bought separately and connected
                after the fact. Every seam between them costs time. The XO
                Vision Care System was designed as one system across the
                whole visit, so nothing waits on the step before it to catch
                up.
              </p>
            </Reveal>

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
              <p className="max-w-2xl text-lg leading-relaxed text-fg/55">
                Any one component earns its place. Together they compound, each
                step handing the next a head start, so capacity builds across
                the whole visit instead of leaking between the parts.
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
          </div>
        </section>

        {/* SECTION 3 — What it delivers */}
        <section id="delivers" className="scroll-mt-32 border-t border-fg/10 bg-bg py-24 md:py-32">
          <div className="xo-container">
            <Reveal>
              <div className="eyebrow mb-6">03 · What it delivers</div>
            </Reveal>
            <MaskTextInView
              lines={["Six results a practice", "can measure."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                Not a spec sheet. Outcomes you can see in the schedule, in the
                chart, and on the books.
              </p>
            </Reveal>

            <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-3">
              {SIX_OUTCOMES.map((o, i) => (
                <Reveal key={o.key} delay={i * 0.05} className="bg-surface">
                  <div className="group h-full p-8 transition-colors duration-500 hover:bg-fg/[0.02] md:p-10">
                    <h3 className="font-display text-2xl text-fg">{o.title}</h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-fg/50">{o.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4 — Proof */}
        <section id="proof" className="scroll-mt-32 relative overflow-hidden border-t border-fg/10 py-24 md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img src={IMAGES.clinic} alt="" className="h-full w-full object-cover opacity-15" />
            <div className="absolute inset-0 bg-bg/80" />
          </div>
          <div className="xo-container relative grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="eyebrow mb-6">04 · Where it proves out</div>
              </Reveal>
              <MaskTextInView
                lines={["If it works where", "there is no clinic,", "it works in yours."]}
                as="span"
                className="font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-lg text-lg leading-relaxed text-fg/55">
                  Most eye care technology assumes a building: a lane, a
                  darkroom, a licensed practitioner down the hall. That
                  assumption holds in a suburban practice. It doesn't hold in
                  most of the world, where the eye care workforce isn't spread
                  thin so much as concentrated in a handful of places.
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
                    <a
                      href="https://eyecare4kids.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="eyecare4kids-text-link"
                      className="text-fg underline decoration-fg/20 underline-offset-4 transition-colors hover:text-xo-blue hover:decoration-xo-blue/60"
                    >
                      EyeCare4Kids<sup className="ml-0.5 text-[0.55em] top-[-0.6em] relative">®</sup>
                    </a>{" "}
                    partners with Xenon because our delivery model reaches
                    children a building-bound system never could. In July
                    2026, Xenon introduced xoExam at Nelson Mandela
                    Children's Hospital in South Africa with{" "}
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
                The structure stays the same. Only the scale changes.
                Integration increases capacity, and capacity expands access.
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

      {/* SECTION 5 — See it work */}
      <div id="demo" className="scroll-mt-32">
        <section className="relative overflow-hidden border-t border-fg/10 bg-bg pb-4 pt-24 md:pt-32">
          <div className="xo-container">
            <Reveal>
              <div className="eyebrow mb-6">05 · See it work</div>
            </Reveal>
            <MaskTextInView
              lines={["Built around how", "your practice runs."]}
              as="span"
              className="max-w-3xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/55">
                No two practices lose capacity in the same place. The XO
                Vision Care System starts from the workflow you already have
                and closes the gaps in it.
              </p>
            </Reveal>
          </div>
        </section>

        <DemoCTA eyebrow="" topBorder={false} />
      </div>
    </>
  );
}
