import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { IMAGES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const TESTS = [
  "Wavefront Refraction", "Visual Acuity", "Wavefront Aberrometry", "Color Vision",
  "Visual Field", "Extraocular Motility", "Pupillometry", "Accommodation",
  "Keratometry", "Confrontation", "Esterman Binocular", "Binocular Vision",
  "Convergence", "Contrast Sensitivity", "Visual Reaction Time", "Eye Tracking Accuracy",
  "Fixation Stability", "Tear Film", "AI Pattern Recognition",
];

const DELEGATION = [
  { title: "Patient-guided", body: "Patient follows on-screen prompts.", cert: "Doctor certifies every result." },
  { title: "Technician-run", body: "Technician assists the workflow.", cert: "Doctor certifies every result." },
  { title: "Doctor-directed", body: "Doctor monitors in real time.", cert: "Doctor certifies every result." },
];

const CHANGES = [
  "No dedicated lane or darkroom required",
  "No manual transfer of refraction values between instruments",
  "One device to maintain, update, and support",
  "Deployable in a practice, retail floor, mobile unit, or community setting",
];

const SPECS = [
  "Objective & subjective refraction in one device",
  "Retinal imaging capability",
  "Pupillometry & biometric tracking",
  "Real-time eye tracking",
  "Wavefront-based imaging",
  "Liquid lens optical system",
  "Comfort-optimized wearable design",
  "Wireless connectivity",
  "12-hour rechargeable battery",
];

const FAQS = [
  {
    q: "Can an eye exam be performed without a phoropter?",
    a: "Yes. xoExam performs both objective and subjective refraction within one wearable device, in a single continuous workflow, removing the need for a separate autorefractor and phoropter.",
  },
  {
    q: "Does xoExam replace a comprehensive eye exam?",
    a: "No. xoExam does not screen for or diagnose eye disease and does not replace the comprehensive eye examination, or the clinical judgment that completes one. It is used by a licensed practitioner, on that practitioner's patient, as part of care the practitioner directs.",
  },
  {
    q: "Who is responsible for the results?",
    a: "The eye care practitioner. No result leaves the device until the ECP certifies it, whether the test was run by the patient, a technician, or the doctor directly.",
  },
];

export default function Exam() {
  usePageMeta({
    title: "xoExam: Wearable Eye Exam",
    description:
      "xoExam brings 19 doctor-led vision tests into a single wearable device. Run by the patient, a technician or the doctor, certified by the doctor in every case.",
  });
  return (
    <div className="acc-exam">
      <ProductHero
        eyebrow="xoExam™ · Exam"
        logo="/logos/xoexam-dark.svg"
        logoWidth={154}
        logoHeight={24}
        role="Exam"
        headlineLines={["The exam lane,", "in one", "wearable device."]}
        subhead="A medical-grade eye exam platform bringing 19 doctor-led vision tests into a single unit, administered in minutes, from virtually anywhere."
        image="/hero/xoexam-arm.webp"
        imageSrcSet="/hero/xoexam-arm-1200.webp 1200w, /hero/xoexam-arm.webp 2000w"
        imageAlt="xoExam wearable eye exam device on articulated arm"
      />

      {/* Instrument, not an alternative */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Your patient. Your exam. Your judgment.</div>
            </Reveal>
            <MaskTextInView
              lines={["An instrument,", "not an alternative."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                xoExam is sold to the practice, operated in the practice, and used on
                the doctor's own patient. Nineteen tests, not one. A controlled
                optical environment rather than a phone held at arm's length.
                Objective and subjective refraction both, in the same workflow. And
                no result leaves the device until the ECP certifies it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-fg/45">
                What changes is how much of the doctor's day the exam consumes. Not
                who is responsible for it.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 rounded-md border border-fg/10 bg-surface p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-acc">
                  Boundary statement
                </div>
                <p className="mt-3 text-[14px] leading-relaxed text-fg/60">
                  xoExam does not screen for or diagnose eye disease. It does not
                  replace the comprehensive eye examination, or the clinical judgment
                  that completes one. It is used by a licensed practitioner, on that
                  practitioner's patient, as part of care the practitioner directs.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* One device, not a lane */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <MaskTextInView
            lines={["Count the boxes", "in your exam room."]}
            as="span"
            className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              A conventional refraction workflow runs across several instruments (an
              autorefractor, a phoropter, a chart projector, a lensmeter), each its
              own purchase, space, and line on the capital plan. xoExam is one unit.
              Objective and subjective refraction happen in the same device, in the
              same workflow, with no transcription step between them.
            </p>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10 sm:grid-cols-2">
            {CHANGES.map((c, i) => (
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

      {/* 19-test suite grid */}
      <section className="relative overflow-hidden border-t border-fg/10 bg-bg py-24 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
        <div className="xo-container relative">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Reveal>
                <div className="eyebrow mb-6">The test suite</div>
              </Reveal>
              <MaskTextInView
                lines={["19 doctor-led tests.", "One device."]}
                as="span"
                className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
              />
            </div>
            <div className="font-display text-8xl font-semibold leading-none text-fg/5">19</div>
          </div>

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
        </div>
      </section>

      {/* Delegation */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">Who runs it</div>
          </Reveal>
          <MaskTextInView
            lines={["Delegated three ways.", "Certified one way."]}
            as="span"
            className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {DELEGATION.map((d, i) => (
              <Reveal key={d.title} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-md border border-fg/10 bg-bg p-8 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-acc/40">
                  <div className="font-mono text-xs text-acc">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className="mt-4 font-display text-2xl text-fg">{d.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-fg/50">{d.body}</p>
                  <div className="mt-auto pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/70">
                    {d.cert}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Where it goes + Specs */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <div className="eyebrow mb-6">Where it goes</div>
            </Reveal>
            <MaskTextInView
              lines={["Care that isn't", "anchored to a building."]}
              as="span"
              className="font-display text-3xl font-medium leading-[1.06] tracking-tight text-fg sm:text-4xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-fg/55">
                A portable, doctor-led exam platform can operate in a workplace, a
                school, an assisted living facility, a community health center, or a
                mobile unit serving a rural county. Designed for patients ages 10 and
                older, with an adjustable wearable fit and guided, patient-paced
                interaction.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <Link
                to="/xo-vision-care-system"
                data-testid="exam-journey-link"
                className="group mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-acc"
              >
                See the full patient journey
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
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

      <FAQ items={FAQS} title="The exam, answered." />
      <DemoCTA
        eyebrow="Request a demo"
        headline="Put the lane on the doctor's terms."
        body="A thirty-minute walkthrough of xoExam inside the full XO Vision Care System."
      />
    </div>
  );
}
