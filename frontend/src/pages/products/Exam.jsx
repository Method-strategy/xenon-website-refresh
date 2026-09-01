import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
  "Wavefront Optimized Refraction",
  "Visual Acuity",
  "Wavefront Aberrometry",
  "Color Vision",
  "Visual Field (10-2, 24-2, 24-2C, 30-2)",
  "Extraocular Motility",
  "Pupillometry",
];

const FUTURE_TESTS = [
  "Accommodation", "Keratometry", "Confrontation", "Esterman Binocular",
  "Binocular Vision", "Convergence", "Contrast Sensitivity", "Visual Reaction Time",
  "Eye Tracking Accuracy", "Fixation Stability", "Tear Film", "AI Pattern Recognition",
];

const WORKFLOW = [
  { mode: "Patient-guided", who: "The patient follows on-screen prompts", role: "Reviews and confirms" },
  { mode: "Technician-run", who: "A technician assists the workflow", role: "Reviews and confirms" },
  { mode: "ECP-directed", who: "The ECP monitors in real time", role: "Reviews and confirms" },
];

const REMOTE_EXAMPLES = [
  "A second location can run exams without a practitioner on site that day.",
  "A mobile unit can operate in a rural county while the supervising ECP stays at the practice.",
  "A community health center, a school, or an employer program can deliver a practitioner-supervised exam without a practitioner present.",
];

const SPECS = [
  "Objective and subjective refraction in one device",
  "Visual field patterns 10-2, 24-2, 24-2C, 30-2",
  "Retinal imaging capability",
  "Pupillometry and biometric tracking",
  "Real-time eye tracking",
  "Wavefront-based imaging",
  "Xenon Ophthalmics patented Liquid Lens optical system",
  "Live remote exam with encrypted connection",
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
    a: "No. xoExam covers the refraction and functional vision testing portion of the exam. Anterior segment examination, tonometry, and retinal health assessment remain part of the comprehensive exam, and so does the clinical judgment that completes it. The device is an instrument the practitioner uses, in the same sense that an autorefractor or a perimeter is.",
  },
  {
    q: "Who confirms the results?",
    a: "The ECP, in every configuration. Whether the test is run by the patient, a technician, or the practitioner, the ECP reviews and confirms the results, and access is governed by role so that clinical authority stays with the practitioner.",
  },
  {
    q: "How does a remote exam work?",
    a: "A technician administers the test at the patient's location while the supervising ECP participates in real time from wherever they are, over an encrypted connection. The practitioner reviews and confirms results as the exam proceeds, the same way they would in the room.",
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
        headlineLines={["Refraction and", "functional testing,", "in one wearable device."]}
        subhead="A medical-grade platform bringing practitioner-led vision testing into a single unit, administered in minutes, from virtually anywhere."
        image="/hero/xoexam-arm.webp"
        imageSrcSet="/hero/xoexam-arm-1200.webp 1200w, /hero/xoexam-arm.webp 2000w"
        imageAlt="xoExam wearable eye exam device on articulated arm"
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
              place in the room. The lane gets built one instrument at a time, and it
              grows in the only direction it can. xoExam is one unit. Objective and
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
              pupillometry. Two of those are worth pausing on. Wavefront aberrometry
              and visual field testing typically require dedicated instruments that
              many practices either refer out or go without, so for a lot of offices
              this is added capability rather than consolidated capability. And
              extraocular motility is still done by hand in most practices, with a
              penlight and the practitioner's own time, which xoExam gives back.
            </p>
          </Reveal>

          <Reveal className="mt-14">
            <div className="grid grid-cols-1 overflow-hidden rounded-md border border-fg/10 sm:grid-cols-2 lg:grid-cols-3">
              {TESTS.map((t, i) => (
                <div
                  key={t}
                  data-testid={`test-${i + 1}`}
                  className="group flex items-center gap-4 border-b border-r border-fg/10 px-6 py-6 transition-colors duration-300 hover:bg-fg/[0.03]"
                >
                  <span className="font-mono text-xs text-acc tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
            <p data-testid="future-tests-list" className="mt-6 max-w-3xl text-[13.5px] leading-relaxed text-fg/35">
              {FUTURE_TESTS.join(" · ")}
            </p>
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
            lines={["Run it three ways.", "The practitioner confirms every result."]}
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
                  <div className="font-mono text-xs text-acc">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-4 font-display text-2xl text-fg">{d.mode}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg/50">{d.who}</p>
                  <div className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/70">
                    {d.role}
                  </div>
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
                xoExam supports live remote exams. A technician can administer the
                test at one location while the ECP supervises in real time from
                another, over an encrypted connection, with the practitioner
                reviewing and confirming results as the exam proceeds. That changes
                what a practice can cover.
              </p>
            </Reveal>
            <div className="mt-8 space-y-0">
              {REMOTE_EXAMPLES.map((ex, i) => (
                <Reveal key={ex} delay={0.05 + i * 0.05}>
                  <div
                    data-testid={`remote-example-${i}`}
                    className="flex items-start gap-4 border-t border-fg/10 py-5 first:border-t-0 first:pt-0"
                  >
                    <span className="mt-0.5 font-mono text-[11px] text-acc tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
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
                bank of separate instruments, it can operate wherever the
                practitioner needs it to. That includes a workplace running a vision
                benefit day, a school, an assisted living facility, a community
                health center, or a mobile unit serving a rural county where the
                nearest practice is an hour away. The device is designed for
                patients ages 10 and older, with an adjustable fit and a guided,
                patient-paced interaction that does not assume familiarity with
                clinical equipment.
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
                    <span className="font-mono text-xs text-fg/30 tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Scope */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">Scope</div>
          </Reveal>
          <MaskTextInView
            lines={["Where xoExam fits", "in the exam."]}
            as="span"
            className="max-w-3xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <div data-testid="scope-statement" className="mt-10 max-w-2xl rounded-md border border-fg/10 bg-surface p-8">
              <p className="text-[15px] leading-relaxed text-fg/60">
                xoExam covers the refraction and functional vision testing portion
                of the eye exam. It does not screen for or diagnose eye disease, and
                it does not replace anterior segment examination, tonometry, or
                retinal health assessment. It is used by a licensed practitioner, on
                that practitioner's patient, as part of care the practitioner
                directs.
              </p>
            </div>
          </Reveal>
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
