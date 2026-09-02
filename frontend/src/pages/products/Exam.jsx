import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Focus,
  Eye,
  Waves,
  Palette,
  ScanEye,
  Move,
  CircleDot,
  User,
  Headset,
  Stethoscope,
  Users,
  Truck,
  Building2,
} from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { usePageMeta } from "@/lib/usePageMeta";

const DEVICE_BULLETS = [
  "No dedicated lane or darkened room required",
  "No manual transfer of refraction values between instruments",
  "One device to maintain, update, and support",
  "Works in a practice, on a retail floor, in a mobile unit, or in a community setting",
];

const TESTS = [
  ["Wavefront Optimized Refraction", Focus],
  ["Visual Acuity", Eye],
  ["Wavefront Aberrometry", Waves],
  ["Color Vision", Palette],
  ["Visual Field (10-2, 24-2, 24-2C, 30-2)", ScanEye],
  ["Extraocular Motility", Move],
  ["Pupillometry", CircleDot],
];

const FUTURE_TESTS = [
  "Accommodation", "Keratometry", "Confrontation", "Esterman Binocular",
  "Binocular Vision", "Convergence", "Contrast Sensitivity", "Visual Reaction Time",
  "Eye Tracking Accuracy", "Fixation Stability", "Tear Film", "AI Pattern Recognition",
];

const WORKFLOW = [
  { mode: "Self-administered", who: "The patient follows on-screen prompts", role: "ECP reviews and confirms", icon: User },
  { mode: "Technician-guided", who: "A technician assists the workflow", role: "ECP reviews and confirms", icon: Headset },
  { mode: "ECP-directed", who: "The practitioner conducts exams, reviews, and confirms in real time or asynchronously, from anywhere.", role: null, icon: Stethoscope },
];

const REMOTE_EXAMPLES = [
  ["A technician runs the exam at a rural community clinic. The supervising ECP reviews and confirms every result from the practice, or from anywhere else.", Users],
  ["A mobile unit can serve a county with no ophthalmic practice at all, with a practitioner confirming results the same day, remotely.", Truck],
  ["A school, an employer program, or an assisted living facility can host the exam without a practitioner on site, and still get a practitioner-confirmed result.", Building2],
];

const SPECS = [
  "Objective and subjective refraction in one device",
  "Visual field patterns 10-2, 24-2, 24-2C, 30-2",
  "Pupillometry and biometric tracking",
  "Real-time eye tracking",
  "Wavefront-based imaging",
  "Xenon Ophthalmics patented Liquid Lens optical system",
  "Live and asynchronous remote exam over an encrypted connection",
  "Cloud SaaS data platform, HIPAA-compliant",
  "Comfort-optimized wearable design",
  "Wireless connectivity",
  "12-hour rechargeable battery",
];


const FAQS = [
  {
    q: "Can an eye exam be performed without a phoropter?",
    a: "Yes. xoExam performs objective and subjective refraction in a single device, using Xenon Ophthalmics' patented Liquid Lens optical system in place of a mechanical phoropter head. From the patient's side the subjective portion works exactly the way they expect: they compare options and respond. What changes is on the practice's side, where the objective starting point is already in the device when the subjective refinement begins, so nothing is read off one screen and entered into another.",
  },
  {
    q: "Does xoExam replace a comprehensive eye exam?",
    a: "No. xoExam covers the refraction and functional vision testing portion of the exam. It does not screen for or diagnose eye disease. Anterior segment examination, tonometry, and retinal health assessment remain part of the comprehensive exam, and so does the clinical judgment that completes it. xoExam is used by a licensed practitioner, on that practitioner's patient, as part of care the practitioner directs.",
  },
  {
    q: "Who confirms the results?",
    a: "The ECP, in every configuration. Whether the test is run by the patient, a technician, or the practitioner, the ECP reviews and confirms the results, and access is governed by role so that clinical authority stays with the practitioner.",
  },
  {
    q: "How does a remote exam work?",
    a: "Two ways. The ECP can direct the exam in real time from anywhere, or a technician can administer it on site while the ECP reviews and confirms the result remotely, either as the exam happens or afterward, over an encrypted connection. Either way, the result gets the same practitioner review it would in the exam room.",
  },
  {
    q: "Who can use it?",
    a: "Patients ages 10 and older. The fit is adjustable across that range, and the interaction is patient-paced, so a patient who needs more time simply takes it.",
  },
  {
    q: "What happens to the results after the exam?",
    a: "They move with the patient. Because xoExam is part of the XO Vision Care System, the prescription and test results are already present in xoFit when the patient reaches the dispensary, and already in the lab specification when the order goes to xoLab or an outside lab. Nothing is re-entered along the way.",
  },
];

export default function Exam() {
  usePageMeta({
    title: "xoExam: Wearable Eye Exam",
    description:
      "A medical-grade platform bringing practitioner-led vision testing into a single unit, administered in minutes, from virtually anywhere.",
  });
  return (
    <div className="acc-exam">
      <ProductHero
        eyebrow="xoExam™ · Exam"
        logo="/logos/xoexam-dark.svg"
        logoWidth={154}
        logoHeight={24}
        role="Exam"
        headlineLines={["Refraction and", "functional testing,", "in one wearable instrument."]}
        subhead="A medical-grade platform bringing practitioner-led vision testing into a single unit, administered in minutes, from virtually anywhere."
        image="/hero/xoexam-wearing.webp"
        imageSrcSet="/hero/xoexam-wearing-1200.webp 1200w, /hero/xoexam-wearing.webp 2000w"
        imageAlt="Woman seated and wearing the xoExam device, its adjustable arm extended to the side"
      />

      {/* The Device */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">The Device</div>
          </Reveal>
          <MaskTextInView
            lines={["One device where a", "typical exam lane requires more."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              A conventional refraction workflow runs across an autorefractor, a
              phoropter, and an acuity chart. Practices that also perform wavefront
              aberrometry or visual field testing add those as separate instruments,
              each with its own purchase price, its own maintenance, and its own
              place in the room. Every instrument added is another footprint to
              house and another handoff to manage. xoExam is one instrument. Objective and
              subjective refraction happen in the same device and the same workflow,
              which means the objective starting point is already there when the
              subjective portion begins. Nobody reads a number off one screen and
              types it into another, and there is no step in between where a value
              can be transposed or lost.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10 sm:grid-cols-2">
            {DEVICE_BULLETS.map((c, i) => (
              <Reveal key={c} delay={i * 0.05} className="bg-surface">
                <div className="flex items-center gap-4 p-8">
                  <span className="font-mono text-xs text-acc">→</span>
                  <span className="text-[15px] text-fg/70">{c}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* The Exam — test suite */}
      <section className="relative overflow-hidden border-t border-fg/10 bg-surface py-24 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
        <div className="xo-container relative">
          <Reveal>
            <div className="eyebrow mb-6">The Exam</div>
          </Reveal>
          <MaskTextInView
            lines={["Refraction and functional", "testing in a single session."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              xoExam performs objective and subjective refraction, wavefront
              aberrometry, visual field, color vision, extraocular motility, and
              pupillometry. Wavefront aberrometry
              and visual field testing typically require dedicated instruments that
              many practices either refer out or go without, so for a lot of offices
              this is added capability rather than consolidated capability.
              Extraocular motility is still done by hand in most practices, with a
              penlight and the practitioner's own time, which xoExam gives back.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <div className="grid grid-cols-1 overflow-hidden rounded-md border border-fg/10 sm:grid-cols-2 lg:grid-cols-3">
              {TESTS.map(([t, Icon], i) => (
                <div
                  key={t}
                  data-testid={`test-${i + 1}`}
                  className="group flex items-center gap-4 border-b border-r border-fg/10 px-6 py-6 transition-colors duration-300 hover:bg-fg/[0.03]"
                >
                  <Icon className="h-[16px] w-[16px] shrink-0 text-acc" strokeWidth={1.5} />
                  <span className="text-[15px] text-fg/75 transition-colors group-hover:text-fg">
                    {t}
                  </span>
                </div>
              ))}
              <div className="hidden border-b border-r border-fg/10 lg:block" />
              <div className="hidden border-b border-r border-fg/10 lg:block" />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="mt-14">
            <div className="eyebrow mb-4 text-fg/40">Also in development</div>
            <p className="max-w-2xl text-[15px] leading-relaxed text-fg/55">
              Additional tests arrive through software on the same unit, with no new
              hardware and no replacement cycle. A practice that buys xoExam today
              gains capability over time rather than watching a fixed instrument age.
            </p>
            <div data-testid="future-tests-list" className="mt-6 flex max-w-3xl flex-wrap gap-2.5">
              {FUTURE_TESTS.map((t) => (
                <span
                  key={t}
                  className="border border-fg/10 bg-fg/[0.02] px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide text-fg/45 transition-colors duration-300 hover:border-fg/25 hover:text-fg/70"
                >
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Workflow */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">The Workflow</div>
          </Reveal>
          <MaskTextInView
            lines={["Run it three ways."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <MaskTextInView
            lines={["The practitioner confirms every result."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              xoExam adapts to how the practice is staffed on any given day. The
              patient can run the test themselves, following on-screen prompts at
              their own pace. A technician can run it as part of the pre-test
              workflow. Or the ECP can direct it in real time, the way a refraction
              has always been done. What does not change is who owns the outcome. In
              all three configurations, the ECP reviews and confirms the results,
              and access is governed by role, so what a technician can do and what a
              practitioner can do are not the same. Delegation changes who
              administers the test. It does not change who is clinically accountable
              for it.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {WORKFLOW.map((d, i) => (
              <Reveal key={d.mode} delay={i * 0.08}>
                <div
                  data-testid={`workflow-mode-${i}`}
                  className="flex h-full flex-col rounded-md border border-fg/10 bg-surface p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-acc/40"
                >
                  <d.icon className="h-5 w-5 text-acc" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-2xl text-fg">{d.mode}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg/50">{d.who}</p>
                  {d.role && (
                    <div className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/70">
                      {d.role}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="mt-12 max-w-2xl text-[15px] leading-relaxed text-fg/45">
              Because objective and subjective refraction run in the same device and
              the same workflow every time, the standard of capture holds regardless
              of who administers the test. The practice gets consistency across
              staff, across locations, and across patient volume, which matters most
              when the least experienced technician is the one running the workup.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Remote Exams */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Remote Exams</div>
            </Reveal>
            <MaskTextInView
              lines={["The practitioner does not", "have to be in the room."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                Remote capability in ophthalmic diagnostics usually means one of
                two things: asynchronous data review, where images and
                measurements are uploaded for a practitioner to look at later,
                or remote refraction alone, where a single test is graded off
                site. xoExam does something different. It supports a full
                remote exam, with the ECP participating in the complete
                diagnostic session rather than reviewing a file after the fact.
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="mt-5 text-lg leading-relaxed text-fg/60">
                That works two ways. The ECP can direct the exam in real time
                from anywhere, or a technician can administer it on site while
                the ECP reviews and confirms the results from anywhere else,
                either as the exam happens or afterward, over an encrypted
                connection. Either way, the clinical judgment stays with the
                practitioner, wherever they are.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-5 text-lg leading-relaxed text-fg/60">
                This is the direction the field is moving. Pre-testing is no
                longer confined to a single room. It is becoming a flexible
                function that can move through the practice or beyond it, with
                components of the exam conducted remotely or by staff who are
                not clinicians.
              </p>
            </Reveal>
            <div className="mt-8 space-y-0">
              {REMOTE_EXAMPLES.map(([ex, Icon], i) => (
                <Reveal key={ex} delay={0.05 + i * 0.05}>
                  <div
                    data-testid={`remote-example-${i}`}
                    className="flex items-start gap-4 border-t border-fg/10 py-5 first:border-t-0 first:pt-0"
                  >
                    <Icon className="mt-0.5 h-[15px] w-[15px] shrink-0 text-acc" strokeWidth={1.5} />
                    <span className="text-[15px] leading-relaxed text-fg/65">{ex}</span>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <p className="mt-8 leading-relaxed text-fg/45">
                The data platform behind it is cloud-based and HIPAA-compliant, so
                results are available wherever the practitioner is working.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* In the System */}
      <section className="border-t border-fg/10 bg-bg py-20">
        <div className="xo-container">
          <div className="eyebrow mb-4">In the System</div>
          <MaskTextInView
            lines={["The exam is one step in", "the integrated patient journey."]}
            as="span"
            className="max-w-3xl font-display text-3xl font-medium leading-[1.06] tracking-tight text-fg sm:text-4xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/60">
              xoExam is a component of the XO™ Vision Care System, which covers the
              patient's visit from the appointment through the finished eyewear. The
              prescription and test results do not stop when the exam ends. They are
              already in xoFit when the patient reaches the dispensary, and already
              in the lab specification when the order heads to xoLab or your outside
              lab. That is what changes about the patient's appointment. Not just a
              faster exam, but a visit that integrates every step, from the moment
              they book to the moment they pick up their eyewear.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <Link
              to="/xo-vision-care-system"
              data-testid="exam-journey-link"
              className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-acc"
            >
              See the full patient journey
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* The Setting + Specifications */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="eyebrow mb-6">The Setting</div>
            </Reveal>
            <MaskTextInView
              lines={["Care that isn't", "anchored to a building."]}
              as="span"
              className="max-w-3xl font-display text-3xl font-medium leading-[1.06] tracking-tight text-fg sm:text-4xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/55">
                Because xoExam does not require a fixed lane, a darkened room, or a
                bank of separate instruments, it goes where the exam is needed
                rather than requiring the patient to come to it.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/55">
                That opens settings a conventional lane cannot serve. A
                Federally Qualified Health Center or rural clinic can offer
                refraction and visual field testing without building an exam
                room. A mobile unit can cover a county where the nearest
                practice is an hour away. A practice with multiple locations
                can run exams at a satellite office on a day the practitioner
                is somewhere else. An employer can host a vision benefit day
                on site. A school can run exams for students without
                transporting them anywhere. A retail optical location can add
                exam capacity without adding a lane.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fg/55">
                The device is designed for patients ages 10 and older, with an
                adjustable fit and a guided, patient-paced interaction that
                does not assume familiarity with clinical equipment.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <div className="eyebrow mb-6">Specifications</div>
            </Reveal>
            <div className="overflow-hidden rounded-md border border-fg/10">
              {SPECS.map((s, i) => (
                <Reveal key={s} delay={i * 0.03}>
                  <div className="flex items-center gap-4 border-b border-fg/5 px-6 py-4 text-[14px] text-fg/70 last:border-0">
                    <span aria-hidden="true" className="h-px w-3 shrink-0 bg-acc/60" />
                    {s}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ items={FAQS} title="Common questions." />
      <DemoCTA
        eyebrow="Request a demo"
        headline="Put the lane on the doctor's terms."
        body="A thirty-minute walkthrough of xoExam inside the full XO Vision Care System."
      />
    </div>
  );
}
