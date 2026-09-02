import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskText, MaskTextInView, Reveal } from "@/components/common/Reveal";
import SectionAnchors from "@/components/common/SectionAnchors";
import DemoCTA from "@/components/common/DemoCTA";
import { IMAGES, SIX_OUTCOMES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const ANCHORS = [
  { id: "whatitis", label: "What it is" },
  { id: "outcomes", label: "What it delivers" },
  { id: "schedule", label: "Schedule" },
  { id: "exam", label: "Exam" },
  { id: "fit", label: "Fit" },
  { id: "finish", label: "Finish" },
  { id: "replaces", label: "What it replaces" },
  { id: "deployment", label: "Deployment" },
  { id: "demo", label: "See it work" },
];

const COMPONENTS = [
  { name: "xoIris™", desc: "The software that runs scheduling, patient communication, and engagement." },
  { name: "xoExam™", desc: "The instrument that performs refraction and functional vision testing." },
  { name: "xoFit™", desc: "Captures digital centration and frame measurement, in three form factors." },
  { name: "xoLab™", desc: "Finishes eyewear on site." },
];

const SYSTEM_OUTCOMES = [
  {
    key: "time",
    title: "Time",
    body: "Hours returned to the practitioner and to staff. Less time lost to handoffs, re-entry, and waiting on the step before.",
  },
  {
    key: "profitability",
    title: "Profitability",
    body: "More revenue from the same footprint. Capacity filled, margin retained, capital not spent on instruments the system replaces.",
  },
  {
    key: "control",
    title: "Control",
    body: "Less dependence on perfect staffing, an available room, and everything running to plan. Delegation without loss of clinical authority.",
  },
  {
    key: "patient-experience",
    title: "Patient Experience",
    body: "A visit that moves. Less waiting between steps, fewer repeated questions, and eyewear that fits correctly the first time.",
  },
  {
    key: "clinical-quality",
    title: "Clinical Quality",
    body: "Consistent capture regardless of who administers a test, and measurements taken rather than estimated.",
  },
  {
    key: "practice-growth",
    title: "Practice Growth",
    body: "Capacity added without construction. More patients through the practice you already have, and services you previously referred out.",
  },
];

const STEPS = [
  {
    id: "schedule",
    logo: "/logos/xoiris-dark.svg",
    logoWidth: 104,
    logoHeight: 25,
    role: "Schedule · xoIris™",
    title: "A full schedule, and more patients through it.",
    body: "xoIris manages booking, reminders, and patient communication, and works continuously to keep clinical hours filled. When a cancellation opens a slot, it identifies patients nearby who are already due for care and reaches them by text, filling the opening from the patient base you already have. A full schedule means maximizing the revenue potential of the hours your practice is already staffing.",
    hand: "By the time the patient arrives: who they are, why they're here, and what happened last visit are already in front of the practice.",
    to: "/xoiris-scheduling",
    outcomes: ["time", "practice-growth"],
  },
  {
    id: "exam",
    logo: "/logos/xoexam-dark.svg",
    logoWidth: 154,
    logoHeight: 24,
    role: "Exam · xoExam™",
    title: "One instrument in place of a lane of them.",
    body: "xoExam brings refraction and functional vision testing into a single wearable instrument, consolidating the autorefractor, phoropter, and acuity chart, along with the wavefront aberrometer and visual field analyzer that many practices either refer out or go without. Tests can be run by the patient, a technician, or the ECP directly, in the practice or remotely, with the practitioner supervising live or confirming asynchronously. The ECP reviews and confirms every result. One instrument means less capital tied up in the exam room, less to maintain, and exam capacity that is not limited by how many lanes you can build.",
    hand: "By the time the patient reaches the dispensary: the prescription and full results are already loaded in xoFit.",
    to: "/xoexam-eye-exam",
    outcomes: ["clinical-quality", "control"],
  },
  {
    id: "fit",
    logo: "/logos/xofit-dark.svg",
    logoWidth: 102,
    logoHeight: 25,
    role: "Fit · xoFit™",
    title: "The right measurements the first time.",
    body: "Centration measured rather than estimated. xoFit captures pupillary distance, segment height, vertical optical center, and frame geometry digitally, which is what premium lens designs assume and what a ruler cannot reliably deliver. Three form factors cover the ways a practice actually works. Accurate measurements mean fewer remakes, fewer adaptation complaints, and lenses that perform the way the patient paid for them to.",
    hand: "By the time the job reaches finishing: the specification is already written.",
    to: "/xofit-frame-fitting",
    outcomes: ["patient-experience", "time"],
  },
  {
    id: "finish",
    logo: "/logos/xolab-dark.svg",
    logoWidth: 119,
    logoHeight: 24,
    role: "Finish · xoLab™",
    title: "Keep the lab bill in the building.",
    body: "xoLab handles frame tracing, blocking, and edging on site, in a footprint sized for a practice rather than a lab. Single-vision work can be finished the same day, in the building. Jobs requiring surfacing go out as a complete lab-ready order with nothing re-keyed. Finishing in house means the margin on every job you keep stays in the practice, and the patient waits days less for eyewear.",
    hand: "What the patient leaves with: a finished pair, and margin that would otherwise have left with the lab bill.",
    to: "/xolab-eyewear-finishing",
    outcomes: ["profitability", "practice-growth"],
  },
];

const REPLACES = [
  ["Scheduling", "Practice management software with no visibility into what happens after booking", "Scheduling that opens the visit and hands it forward"],
  ["Examination", "Autorefractor, phoropter, acuity chart, plus a wavefront aberrometer and visual field analyzer if the practice has them", "One wearable instrument"],
  ["Refraction workflow", "Objective values read off one screen and entered into another", "Objective and subjective refraction in one continuous workflow"],
  ["Remote capability", "Asynchronous data review, or remote refraction alone", "A full remote exam, live or asynchronous"],
  ["Fitting", "Ruler or a standalone centration device, measured separately from the exam", "Digital centration captured in the same visit, attached to the same record"],
  ["Finishing", "A lab order rebuilt at the end of the sale, and a lab bill on every job", "A specification already written, and single-vision work finished in the building"],
  ["Infrastructure", "A vendor relationship, service contract, and replacement cycle per instrument", "One integrated system, one relationship"],
];

const DEPLOYMENT_SCENARIOS = [
  "A single practice consolidates its instrument stack, fills its schedule, and keeps finishing work in the building.",
  "A multi-location group runs exams at satellite offices on days a practitioner is elsewhere, with the ECP reviewing and confirming results remotely.",
  "A retail optical location adds exam capacity without adding a lane, and finishes eyewear on site rather than sending it out.",
  "A mobile unit or community program delivers a practitioner-supervised exam where no clinic exists, with the practitioner participating live or reviewing afterward.",
];

export default function System() {
  usePageMeta({
    title: "XO Vision Care System: Overview",
    description:
      "One system for eye care: scheduling, examination, fitting and finishing. Four points of contact across a single visit, designed to work as one.",
  });
  return (
    <>
      {/* Hero */}
      <section className="grain relative flex min-h-[85vh] items-center overflow-hidden bg-bg pt-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
        <div className="xo-container relative">
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
          <MaskText
            lines={["One system.", "From appointment", "to finished eyewear."]}
            as="span"
            className="max-w-[16ch] font-display text-[10vw] font-medium leading-[0.94] tracking-tight text-fg sm:text-5xl lg:text-7xl"
          />
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/60">
            Four points of contact across a single visit: scheduling, examination,
            fitting, and finishing. Fully integrated, so the patient never waits
            for the practice to catch up.
          </p>
        </div>
      </section>

      <div className="bg-bg">
        <div className="xo-container grid grid-cols-1 gap-16 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-3">
            <SectionAnchors sections={ANCHORS} />
          </div>

          <div className="lg:col-span-9">
            {/* What it is */}
            <section id="whatitis" className="scroll-mt-32">
              <Reveal>
                <div className="eyebrow mb-6">01 · What it is</div>
              </Reveal>
              <MaskTextInView
                lines={["Four components of patient care."]}
                as="span"
                className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
              />
              <MaskTextInView
                lines={["One integrated system."]}
                as="span"
                className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                  Eye care practices are typically organized as a series of separate
                  rooms and functions, each optimized on its own. Scheduling
                  software with no visibility into the exam. Instruments that do
                  not speak to each other. A dispensary working from a printed
                  prescription. A lab order rebuilt by hand at the end of the sale.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/55">
                  The XO Vision Care System was built the other way around. It
                  covers the patient's visit from the moment they book to the
                  moment they collect their eyewear, through four fully integrated
                  components:
                </p>
              </Reveal>

              <div className="mt-10 divide-y divide-fg/10 border-t border-fg/10">
                {COMPONENTS.map((c, i) => (
                  <Reveal key={c.name} delay={0.05 * i}>
                    <div
                      data-testid={`system-component-row-${c.name.replace(/[™\s]/g, "").toLowerCase()}`}
                      className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:items-baseline"
                    >
                      <div className="sm:col-span-3 font-mono text-sm uppercase tracking-[0.15em] text-xo-blue">
                        {c.name}
                      </div>
                      <div className="sm:col-span-9 text-[15px] leading-relaxed text-fg/70">{c.desc}</div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.1}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                  That integration is where the time, the cost, and the errors go.
                  Every handoff a practice manages by hand is time it pays for.
                  Every re-entry is a chance for a number to be wrong. An
                  integrated system removes both by never breaking the chain.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/55">
                  A practice can adopt the whole system or start with a single
                  component. Whatever is in place runs as one integrated system
                  rather than as separate purchases.
                </p>
              </Reveal>

              <Reveal delay={0.2}>
                <blockquote className="mt-14 max-w-3xl border-l-2 border-xo-blue/60 pl-6 md:pl-8">
                  <p className="font-display text-2xl font-medium leading-snug tracking-tight text-fg md:text-3xl">
                    No other company in eye care builds all four. The XO Vision
                    Care System is the only platform where scheduling,
                    examination, fitting, and finishing are integrated by design
                    rather than connected after the fact.
                  </p>
                </blockquote>
              </Reveal>
            </section>

            {/* What it delivers */}
            <section id="outcomes" className="mt-24 scroll-mt-32">
              <Reveal>
                <div className="eyebrow mb-6">02 · What it delivers</div>
              </Reveal>
              <MaskTextInView
                lines={["Six results a practice can measure."]}
                as="span"
                className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                  The system exists to move six numbers. Every component
                  contributes to at least two of them, and the tags on each step
                  below show which.
                </p>
              </Reveal>

              <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-3">
                {SYSTEM_OUTCOMES.map((o, i) => (
                  <Reveal key={o.key} delay={i * 0.05} className="bg-surface">
                    <div data-testid={`system-outcome-tile-${o.key}`} className="flex h-full flex-col p-6 md:p-8">
                      <span className="font-mono text-xs text-xo-blue">{String(i + 1).padStart(2, "0")}</span>
                      <div className="mt-4 font-display text-lg text-fg">{o.title}</div>
                      <p className="mt-3 text-[14px] leading-relaxed text-fg/55">{o.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Numbered workflow */}
            <div className="mt-24 space-y-24">
              {STEPS.map((step) => {
                const stepNumber = ANCHORS.findIndex((a) => a.id === step.id) + 1;
                return (
                <section key={step.id} id={step.id} className="scroll-mt-32">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <div
                        data-testid={`step-number-${step.id}`}
                        className="font-display text-4xl font-semibold leading-none text-fg/10 md:text-7xl"
                      >
                        {String(stepNumber).padStart(2, "0")}
                      </div>
                      <img
                        src={step.logo.replace("-dark.svg", ".svg")}
                        alt={step.role}
                        width={step.logoWidth}
                        height={step.logoHeight}
                        className="mt-6 block h-6 w-auto dark:hidden"
                      />
                      <img
                        src={step.logo}
                        alt=""
                        aria-hidden="true"
                        width={step.logoWidth}
                        height={step.logoHeight}
                        className="mt-6 hidden h-6 w-auto dark:block"
                      />
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
                        {step.role}
                      </div>
                    </div>
                    <div className="lg:col-span-9">
                      <MaskTextInView
                        lines={[step.title]}
                        as="span"
                        className="max-w-3xl font-display text-3xl font-medium leading-tight tracking-tight text-fg md:text-4xl"
                      />
                      <Reveal delay={0.1}>
                        <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-fg/55">
                          {step.body}
                        </p>
                      </Reveal>
                      <Reveal delay={0.15}>
                        <div className="mt-8 border-l-2 border-xo-blue/60 pl-6">
                          <p className="text-[15px] leading-relaxed text-fg/70">{step.hand}</p>
                        </div>
                      </Reveal>
                      <Reveal delay={0.18}>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {step.outcomes.map((key) => {
                            const o = SIX_OUTCOMES.find((s) => s.key === key);
                            if (!o) return null;
                            return (
                              <span
                                key={key}
                                data-testid={`outcome-tag-${step.id}-${key}`}
                                className="rounded-full border border-xo-blue/30 bg-xo-blue/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-xo-blue"
                              >
                                {o.title}
                              </span>
                            );
                          })}
                        </div>
                      </Reveal>
                      <Reveal delay={0.2}>
                        <Link
                          to={step.to}
                          data-testid={`system-link-${step.id}`}
                          className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-xo-blue"
                        >
                          In detail
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                        </Link>
                      </Reveal>
                    </div>
                  </div>
                </section>
                );
              })}
            </div>
          </div>
        </div>

        {/* What it replaces */}
        <section id="replaces" className="scroll-mt-32 border-t border-fg/10 bg-surface py-24 md:py-32">
          <div className="xo-container grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="hidden lg:col-span-3 lg:block" aria-hidden="true" />
            <div className="lg:col-span-9">
              <Reveal>
                <div className="eyebrow mb-6">07 · What it replaces</div>
              </Reveal>
              <MaskTextInView
                lines={["Fewer instruments. Fewer vendors."]}
                as="span"
                className="max-w-5xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
              />
              <MaskTextInView
                lines={["Fewer places for the day to slow down."]}
                as="span"
                className="max-w-5xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                  A conventional practice builds its capability one purchase at a
                  time. Each instrument arrives with its own price, its own service
                  contract, its own footprint, and its own connection to maintain.
                  The XO Vision Care System replaces that accumulation with one
                  integrated platform.
                </p>
              </Reveal>

              <Reveal className="mt-14">
                <div className="overflow-hidden border border-fg/10">
                  <div className="grid grid-cols-12 border-b border-fg/10 bg-fg/[0.02] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40 md:px-8">
                    <div className="col-span-3 md:col-span-2">Step</div>
                    <div className="col-span-9 md:col-span-6">Conventional</div>
                    <div className="hidden md:col-span-4 md:block text-xo-blue">XO System</div>
                  </div>
                  {REPLACES.map(([step, conv, xo]) => (
                    <div
                      key={step}
                      data-testid={`replaces-row-${step.toLowerCase().replace(/\s+/g, "-")}`}
                      className="grid grid-cols-12 items-start gap-2 border-b border-fg/5 px-6 py-6 transition-colors duration-300 hover:bg-fg/[0.02] last:border-0 md:px-8"
                    >
                      <div className="col-span-12 mb-2 font-display text-lg text-fg md:col-span-2 md:mb-0">{step}</div>
                      <div className="col-span-12 text-[14px] leading-relaxed text-fg/40 md:col-span-6">{conv}</div>
                      <div className="col-span-12 text-[14px] leading-relaxed text-fg/80 md:col-span-4">
                        <span className="md:hidden font-mono text-[10px] uppercase tracking-widest text-xo-blue">XO: </span>
                        {xo}
                      </div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Deployment */}
        <section id="deployment" className="scroll-mt-32 relative overflow-hidden border-t border-fg/10 py-24 md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img src={IMAGES.lab} alt="" className="h-full w-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-bg/85" />
          </div>
          <div className="xo-container relative grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="hidden lg:col-span-3 lg:block" aria-hidden="true" />
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <Reveal>
                    <div className="eyebrow mb-6">08 · Deployment</div>
                  </Reveal>
                  <MaskTextInView
                    lines={["It goes where the practice needs it."]}
                    as="span"
                    className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
                  />
                  <Reveal delay={0.1}>
                    <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/55">
                      Because the system does not depend on a fixed exam lane, a
                      darkened room, or a bank of separate instruments, it can be
                      deployed in settings a conventional practice cannot serve, and
                      configured to the scale of the organization running it.
                    </p>
                  </Reveal>
                </div>
                <div className="lg:col-span-7 lg:pl-10">
                  <div className="divide-y divide-fg/10 border-t border-fg/10">
                    {DEPLOYMENT_SCENARIOS.map((scenario, i) => (
                      <Reveal key={scenario} delay={i * 0.05}>
                        <div data-testid={`deployment-scenario-${i + 1}`} className="flex items-start gap-4 py-6">
                          <span className="mt-1 font-mono text-xs text-xo-blue">{String(i + 1).padStart(2, "0")}</span>
                          <span className="text-[15px] leading-relaxed text-fg/75">{scenario}</span>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>
              <Reveal delay={0.1}>
                <p className="mt-16 max-w-2xl text-lg leading-relaxed text-fg/55">
                  The system is designed to work as a whole and to be adopted in
                  stages. However many components are in place, they run as one
                  integrated system rather than as separate purchases.
                </p>
              </Reveal>
            </div>
          </div>
        </section>
      </div>

      <div id="demo" className="scroll-mt-32">
        <DemoCTA
          eyebrow="09 · See it work"
          headline="See the whole journey in thirty minutes."
          body="No two practices lose capacity in the same place. We will walk the XO Vision Care System through your practice's actual workflow, from the appointment to the finished pair, and show you where yours is going."
        />
      </div>
    </>
  );
}
