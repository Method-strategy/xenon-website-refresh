import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { MaskText, MaskTextInView, Reveal } from "@/components/common/Reveal";
import SectionAnchors from "@/components/common/SectionAnchors";
import DemoCTA from "@/components/common/DemoCTA";
import { IMAGES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const ANCHORS = [
  { id: "problem", label: "The problem" },
  { id: "schedule", label: "Schedule" },
  { id: "exam", label: "Exam" },
  { id: "fit", label: "Fit" },
  { id: "finish", label: "Finish" },
  { id: "replaces", label: "What it replaces" },
  { id: "deployment", label: "Deployment" },
];

const STEPS = [
  {
    id: "schedule",
    n: "01",
    logo: "/logos/xoiris-dark.svg",
    role: "Schedule · xoIris™",
    title: "The visit starts before the patient arrives.",
    body: "Booking is where the visit begins, not where it gets queued. xoIris manages booking, reminders, and patient communication, and works to keep the schedule full. When a cancellation opens a slot, it can identify patients nearby already due for care and reach them by text, filling the opening from your existing patient base.",
    hand: "By the time the patient arrives: who they are, why they're here, and what happened last visit are already in front of the practice.",
    to: "/xoiris-scheduling",
  },
  {
    id: "exam",
    n: "02",
    logo: "/logos/xoexam-dark.svg",
    role: "Exam · xoExam™",
    title: "One device, not a lane.",
    body: "xoExam brings 19 doctor-led vision tests into a single wearable device, replacing the autorefractor, phoropter, chart projector stack with one unit. Tests can be run by the patient, a technician, or under the doctor's guidance. It is a delegation choice, not a transfer of responsibility. No result leaves the device until the ECP certifies it.",
    hand: "By the time the patient reaches the dispensary: the prescription and full results are already loaded in xoFit.",
    to: "/xoexam-eye-exam",
  },
  {
    id: "fit",
    n: "03",
    logo: "/logos/xofit-dark.svg",
    role: "Fit · xoFit™",
    title: "The prescription is there before the patient is.",
    body: "Frame selection begins with the exam results already loaded. The optician isn't waiting on a chart or re-asking answered questions. xoFit captures pupillary distance, segment height, vertical optical center, and frame geometry, all attached to the same record, across three form factors.",
    hand: "By the time the job reaches finishing: the specification is already written.",
    to: "/xofit-frame-fitting",
  },
  {
    id: "finish",
    n: "04",
    logo: "/logos/xolab-dark.svg",
    role: "Finish · xoLab™",
    title: "The order is already written.",
    body: "Finishing receives a complete specification: nothing to assemble at the end of the sale. xoLab handles frame tracing, blocking, and edging on site, in a footprint sized for a practice. Single-vision work can be finished the same day, in the building. Jobs requiring surfacing go out as a complete lab-ready order with nothing re-keyed.",
    hand: "What the patient leaves with: a finished pair, and margin that would otherwise have left with the lab bill.",
    to: "/xolab-eyewear-finishing",
  },
];

const REPLACES = [
  ["Scheduling", "Software with no line of sight into the visit", "The visit begins at booking"],
  ["Exam", "Autorefractor, phoropter, chart projector & supporting instruments", "One wearable exam device"],
  ["Refraction", "A stop between objective and subjective refraction", "One continuous refraction workflow"],
  ["Fitting", "Ruler or a standalone centration device", "Measurement taken in the same visit, already attached"],
  ["Finishing", "A lab order rebuilt at the end of the sale", "A specification finished when the sale is"],
  ["Infrastructure", "A vendor relationship per instrument", "One system"],
];

const ENVIRONMENTS = [
  "Clinical practice & exam lane",
  "Optical retail floor",
  "Multi-location & enterprise",
  "Mobile & community deployment",
  "Schools & workplaces",
  "Community health settings",
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
          <div className="eyebrow mb-8">The XO™ Vision Care System</div>
          <MaskText
            lines={["One system.", "From appointment", "to finished eyewear."]}
            as="span"
            className="max-w-[16ch] font-display text-[10vw] font-medium leading-[0.94] tracking-tight text-fg sm:text-5xl lg:text-7xl"
          />
          <p className="mt-10 max-w-xl text-lg leading-relaxed text-fg/60">
            Four points of contact across a single visit: scheduling, examination,
            fitting, and finishing. Designed so the patient never waits for the
            practice to catch up.
          </p>
        </div>
      </section>

      <div className="bg-bg">
        <div className="xo-container grid grid-cols-1 gap-16 py-24 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-3">
            <SectionAnchors sections={ANCHORS} />
          </div>

          <div className="lg:col-span-9">
            {/* Problem */}
            <section id="problem" className="scroll-mt-32">
              <Reveal>
                <div className="eyebrow mb-6">The problem this solves</div>
              </Reveal>
              <MaskTextInView
                lines={["Eye care is delivered in steps.", "The waiting happens between them."]}
                as="span"
                className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
                  A patient books in one system. Pre-testing runs on one instrument,
                  refraction on another. The exam is charted somewhere else. Frame
                  selection happens with a ruler or a separate device. The order goes
                  to a lab in a different format again. Each transition is a stop.
                  Multiply it across every patient in a day and it is the difference
                  between the schedule you planned and the one you actually ran.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg/55">
                  This is not a failure of clinical skill. It is a structural property
                  of a care model assembled from separate tools, joined by connections
                  that pass job files between machines rather than carrying a patient
                  through a visit. The XO Vision Care System was built the other way
                  around.
                </p>
              </Reveal>
            </section>

            {/* Numbered workflow */}
            <div className="mt-24 space-y-24">
              {STEPS.map((step) => (
                <section key={step.id} id={step.id} className="scroll-mt-32">
                  <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                    <div className="lg:col-span-3">
                      <div className="font-display text-7xl font-semibold leading-none text-fg/10">
                        {step.n}
                      </div>
                      <img src={step.logo} alt={step.role} className="mt-6 h-6 w-auto" />
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
                        {step.role}
                      </div>
                    </div>
                    <div className="lg:col-span-9">
                      <MaskTextInView
                        lines={[step.title]}
                        as="span"
                        className="font-display text-3xl font-medium leading-tight tracking-tight text-fg md:text-4xl"
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
              ))}
            </div>
          </div>
        </div>

        {/* What it replaces */}
        <section id="replaces" className="scroll-mt-32 border-t border-fg/10 bg-surface py-24 md:py-32">
          <div className="xo-container">
            <Reveal>
              <div className="eyebrow mb-6">What it replaces</div>
            </Reveal>
            <MaskTextInView
              lines={["Fewer boxes. Fewer handoffs.", "Fewer places for the day to slow down."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />

            <Reveal className="mt-14">
              <div className="overflow-hidden rounded-md border border-fg/10">
                <div className="grid grid-cols-12 border-b border-fg/10 bg-fg/[0.02] px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40 md:px-8">
                  <div className="col-span-3 md:col-span-2">Step</div>
                  <div className="col-span-9 md:col-span-6">Conventional</div>
                  <div className="hidden md:col-span-4 md:block text-xo-blue">XO System</div>
                </div>
                {REPLACES.map(([step, conv, xo]) => (
                  <div
                    key={step}
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
        </section>

        {/* Deployment */}
        <section id="deployment" className="scroll-mt-32 relative overflow-hidden border-t border-fg/10 py-24 md:py-32">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <img src={IMAGES.lab} alt="" className="h-full w-full object-cover opacity-10" />
            <div className="absolute inset-0 bg-bg/85" />
          </div>
          <div className="xo-container relative grid grid-cols-1 gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="eyebrow mb-6">Deployment</div>
              </Reveal>
              <MaskTextInView
                lines={["Configured to the practice,", "not the other way around."]}
                as="span"
                className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
              />
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-md text-lg leading-relaxed text-fg/55">
                  The system is designed to work as a whole, and to be adopted in
                  stages. However many components are in place, they run as one system
                  rather than as separate purchases.
                </p>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:pl-10">
              <div className="grid grid-cols-1 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10 sm:grid-cols-2">
                {ENVIRONMENTS.map((env, i) => (
                  <Reveal key={env} delay={i * 0.04} className="bg-surface">
                    <div className="flex items-center gap-4 p-6 md:p-8">
                      <span className="font-mono text-xs text-xo-blue">{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-[15px] text-fg/75">{env}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <DemoCTA
        eyebrow="Request a demo"
        headline="See a full visit, start to finish."
        body="A thirty-minute walkthrough of the full journey, booking through finished eyewear, mapped against how your practice runs today."
      />
    </>
  );
}
