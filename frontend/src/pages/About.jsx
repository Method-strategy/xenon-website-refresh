import { Link } from "react-router-dom";
import { MaskText, MaskTextInView, Reveal } from "@/components/common/Reveal";
import EditorialMarquee from "@/components/common/EditorialMarquee";
import DemoCTA from "@/components/common/DemoCTA";
import { IMAGES } from "@/data/site";

const GAP = [
  ["2.2B", "people worldwide live with vision impairment — 1 billion of those preventable or unaddressed."],
  ["$410B", "annual global productivity loss from vision impairment."],
  ["39", "optometrists per million globally, against a recommended minimum of 100 per million."],
];

const GOALS = [
  ["3.5M+", "Exams supported by 2027"],
  ["10+", "Countries"],
  ["50+", "Locations"],
];

export default function About() {
  return (
    <>
      {/* Hero */}
      <section className="hero-dark grain relative flex min-h-[80vh] items-center overflow-hidden bg-bg pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src={IMAGES.clinic} alt="" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/80 to-bg/40" />
        </div>
        <div className="xo-container relative">
          <div className="eyebrow mb-8">About Xenon Ophthalmics</div>
          <MaskText
            lines={["Vision care should", "not depend on where", "you happen to live."]}
            as="span"
            className="max-w-[18ch] font-display text-[8.5vw] font-medium leading-[0.97] tracking-tight text-fg sm:text-4xl lg:text-6xl"
          />
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-fg/60">
            Founded in 2019, Xenon Ophthalmics™ builds technology to make eye care
            deliverable anywhere.
          </p>
        </div>
      </section>

      {/* Why we exist */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Reveal>
              <div className="eyebrow mb-6">Why we exist</div>
            </Reveal>
            <MaskTextInView
              lines={["Our story"]}
              as="span"
              className="font-display text-4xl font-medium tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-xl leading-relaxed text-fg/70">
                What began as an idea to simplify and modernize the eye exam became a
                broader question: why is high-quality eye care available to some
                populations and structurally out of reach for others?
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-fg/50">
                The answer was not a shortage of expertise. It was the delivery model.
                Traditional ophthalmic diagnostics are expensive, fragmented, and
                geographically fixed, which means care can only reach patients who are
                able to come to it. A team of scientists, engineers, and eye care
                professionals came together around a specific goal: build a system
                that removes the fixed infrastructure requirement without removing the
                doctor.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <EditorialMarquee
        items={["Access", "Deliverable anywhere", "Doctor-led", "Since 2019"]}
        className="bg-surface"
      />

      {/* The access gap */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">The access gap</div>
          </Reveal>
          <MaskTextInView
            lines={["The need is enormous.", "The workforce is concentrated."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10 md:grid-cols-3">
            {GAP.map(([stat, label], i) => (
              <Reveal key={stat} delay={i * 0.08} className="bg-surface">
                <div className="h-full p-10">
                  <div className="font-display text-6xl font-semibold text-xo-blue md:text-7xl">
                    {stat}
                  </div>
                  <p className="mt-6 text-[15px] leading-relaxed text-fg/55">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">What we build</div>
          </Reveal>
          <MaskTextInView
            lines={["One system. From appointment", "to finished eyewear."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              The XO™ Vision Care System is a single system with four points of
              contact across a patient's visit: scheduling, examination, fitting, and
              finishing. Designed together rather than assembled, so the visit moves
              continuously from one to the next.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link to="/xo-vision-care-system" data-testid="about-system-link" className="btn-ghost mt-10">
              Explore the system
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Goals */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">Where we're headed</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {GOALS.map(([stat, label], i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div className="rounded-md border border-fg/10 bg-surface p-10 text-center">
                  <div className="font-display text-6xl font-semibold text-fg md:text-7xl">
                    {stat}
                  </div>
                  <div className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-xo-blue">
                    {label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <DemoCTA
        eyebrow="Talk to us"
        headline="Bring the system to your practice."
        body="See the whole journey — scheduling through finished eyewear — mapped against how your practice runs today."
      />
    </>
  );
}
