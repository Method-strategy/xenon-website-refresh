import { Link } from "react-router-dom";
import { ArrowUpRight, Check } from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { IMAGES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const CAPABILITIES = [
  "AI-powered, text-first appointment orchestration",
  "Intelligent waitlist management with auto-backfill",
  "Utilization optimization to reduce idle chair time",
  "Rapid booking & rescheduling in ~90 seconds",
  "Automated follow-up scheduling on practice rules",
  "Real-time dashboard: revenue, wait times, utilization",
];

const COMMS = [
  "Conversational SMS — no app to download",
  "Automated reminders, confirmations & rescheduling",
  "Routine question handling with staff escalation",
  "Recall & lapsed-patient outreach",
  "Professional, proactive patient communication",
];

const SPECS = [
  "Cloud-based, high-availability deployment",
  "HIPAA-compliant cloud architecture",
  "No local software or on-site servers",
  "macOS, Windows, iOS, Android & web browser",
  "API integration with EHR & practice systems",
  "Role-based access control (RBAC)",
  "Encrypted patient data transmission",
  "Auditable communication & scheduling logs",
];

const FAQS = [
  {
    q: "How do you fill a cancelled eye exam appointment?",
    a: "When a slot opens, xoIris identifies patients nearby who are already due for care and reaches them by text with the specific opening — filling the gap from your existing patient base rather than waiting for someone to call.",
  },
  {
    q: "What is the average no-show rate in optometry?",
    a: "No-shows in U.S. optometric practices average roughly 25 percent, and research shows the rate climbing past 38 percent when appointments are booked six months out.",
  },
  {
    q: "Does xoIris replace my front desk?",
    a: "No. xoIris handles the predictable, repetitive exchanges — confirmations, reminders, routine questions, rescheduling — and escalates to staff the moment a conversation needs a person.",
  },
];

export default function Iris() {
  usePageMeta({
    title: "xoIris — Scheduling",
    description:
      "xoIris manages booking, reminders and patient communication, predicts no-shows and fills openings from patients already due — so the day starts full and stays full.",
  });
  return (
    <div className="acc-iris">
      <ProductHero
        eyebrow="xoIris™ · Schedule"
        logo="/logos/xoiris-dark.svg"
        role="Schedule"
        headlineLines={["Every empty slot", "was capacity.", "Until it wasn't."]}
        subhead="xoIris manages booking, communication, and recall — and starts the visit that carries through the rest of the day."
        image={IMAGES.abstract}
        imageAlt="Abstract scheduling network"
      />

      {/* Definitional overview */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Overview</div>
            </Reveal>
            <MaskTextInView
              lines={["Where the patient", "journey begins."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                xoIris is the scheduling and patient communication component of the
                XO Vision Care System. It automates appointment booking, reminders,
                and recall outreach for eye care practices, and can fill cancelled
                appointments by identifying nearby patients due for care and
                contacting them by text.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-fg/45">
                Every appointment slot is finite and perishable. Once it passes
                unfilled, that capacity cannot be recovered. xoIris works the
                schedule continuously rather than waiting on it — and it is where the
                visit begins. What xoIris captures is what the exam, the fitting, and
                the finished pair are built on.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Filling the schedule */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <MaskTextInView
            lines={["A cancellation is a hole in the day.", "It doesn't have to be."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              Most scheduling tools respond to a cancellation by notifying a
              waitlist. xoIris works from the patient base: when a slot opens, it can
              identify patients nearby already due for care and reach them by text
              with the specific opening. The practice isn't waiting for someone to
              call — it's filling the gap from patients it already has.
            </p>
          </Reveal>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <div className="eyebrow mb-6">Core platform features</div>
              <ul className="space-y-4">
                {CAPABILITIES.map((c, i) => (
                  <Reveal key={c} delay={i * 0.05}>
                    <li className="flex items-start gap-4 border-b border-fg/10 pb-4 text-[15px] text-fg/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-acc" />
                      {c}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
            <div>
              <div className="eyebrow mb-6">Patient communication</div>
              <ul className="space-y-4">
                {COMMS.map((c, i) => (
                  <Reveal key={c} delay={i * 0.05}>
                    <li className="flex items-start gap-4 border-b border-fg/10 pb-4 text-[15px] text-fg/70">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-acc" />
                      {c}
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Platform & specifications */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Platform</div>
            </Reveal>
            <MaskTextInView
              lines={["Cloud-based.", "Nothing to install."]}
              as="span"
              className="font-display text-3xl font-medium leading-[1.06] tracking-tight text-fg sm:text-4xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-md text-lg leading-relaxed text-fg/55">
                xoIris runs in a HIPAA-compliant cloud and reaches patients over
                conversational SMS — no app to download, no on-site servers to
                maintain. Staff work from any browser or device.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
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

      {/* In the system */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">In the system</div>
          </Reveal>
          <MaskTextInView
            lines={["What the exam room", "already knows."]}
            as="span"
            className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/55">
              Who the patient is, why they came, and what happened last time — all
              present the moment the exam begins. The visit starts where the booking
              left off instead of starting over.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <Link
                to="/xo-vision-care-system"
                data-testid="iris-journey-link"
                className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-acc"
              >
                See the full patient journey
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg/30">
                HIPAA compliant · 99.9% uptime target
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ items={FAQS} title="Scheduling, answered." />
      <DemoCTA
        eyebrow="Request a demo"
        headline="Fill the schedule you already have."
        body="A thirty-minute walkthrough of xoIris inside the full XO Vision Care System."
      />
    </div>
  );
}
