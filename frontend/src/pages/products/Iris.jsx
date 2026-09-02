import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MessageCircle,
  Headset,
  Languages,
  ArrowLeftRight,
  Zap,
  EyeOff,
  Lock,
  FileClock,
  KeyRound,
  UserCog,
  Globe,
  ClipboardCheck,
  ScanLine,
  BookUser,
  ShieldCheck,
} from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { IMAGES } from "@/data/site";
import { usePageMeta } from "@/lib/usePageMeta";

const SPECS = [
  "Cloud-based, high-availability deployment",
  "HIPAA-compliant cloud architecture",
  "No local software or on-site servers",
  "macOS, Windows, iOS, Android, and web browser",
  "Standards-based integration with EHR and practice systems",
  "Role-based access control",
  "Encrypted patient data transmission",
  "Auditable communication and scheduling logs",
  "Multi-factor authentication with passkeys or authenticator app",
  "Protected health information masked by default, with logged reveals",
];

const FILLING_THE_DAY = [
  ["AI-managed scheduling", "Booking, confirmation, and rescheduling handled without staff time."],
  ["Up to three confirmation notifications", "Sent automatically ahead of each appointment."],
  ["Departure timing and directions", "Confirmed patients receive an estimated departure time based on local traffic, along with driving directions."],
  ["Arrival estimates for the practice", "The front desk sees when each patient is expected."],
  ["Automatic waitlist fill", "If a patient does not confirm, xoIris offers the slot to someone who can take it."],
  ["Bulk cancellation and rescheduling", "Move an entire day at once when the practice has an emergency."],
  ["Live activity notifications", "New bookings, cancellations, and escalations as they happen."],
];

const PATIENT_COMMUNICATION = [
  ["Live AI conversation", "Patients get an answer immediately rather than waiting for a callback.", MessageCircle],
  ["Staff override at any time", "Any conversation can be taken over directly by a doctor or staff member.", Headset],
  ["Six languages", "English, Spanish, French, Simplified Chinese, Haitian Creole, and Vietnamese.", Languages],
  ["Two-way translation", "xoIris converses with the patient in their language and translates to the practice's preferred language, and back again.", ArrowLeftRight],
  ["Nothing for patients to download", "No app, no account setup. Conversation happens over text.", Zap],
  ["Confidential by default", "Patient conversations stay private.", EyeOff],
];

const INTAKE_RECORDS = [
  ["Digital onboarding", "Demographics and insurance collected before the visit.", ClipboardCheck],
  ["Card capture", "Data extracted from photographs of ID and insurance cards.", ScanLine],
  ["Complete patient record", "Demographics, contacts, insurance, medical history, allergies and medications, visit history, and clinical imaging in one place.", BookUser],
  ["Protected health information masked by default", "Records stay hidden until intentionally revealed, and every reveal is logged.", ShieldCheck],
];

const SECURITY_ACCESS = [
  ["Full encryption", "Data encrypted in transit and at rest.", Lock],
  ["Complete audit logs", "Who did what, and when.", FileClock],
  ["Multi-factor authentication", "Passkeys or an authenticator app.", KeyRound],
  ["Role-based access control", "Permissions matched to the role.", UserCog],
  ["Browser-based", "A web interface for the practice, with nothing to install.", Globe],
];

const FAQS = [
  {
    q: "How does xoIris fill a cancelled appointment?",
    a: "Two ways, in sequence. It checks the waitlist for a patient who can take the slot. If the waitlist does not produce one, it looks at the patient base for patients nearby who are already due for care, and reaches them by text with the specific opening. The practice is not waiting for someone to call.",
  },
  {
    q: "What is the average no-show rate in optometry?",
    a: "Roughly 25 percent across U.S. optometric practices, rising past 38 percent for appointments booked six months in advance. Appointment time is perishable. Once a slot passes unfilled, that capacity is gone.",
  },
  {
    q: "Does it work with our EHR?",
    a: "Yes. xoIris connects through the standards electronic health record systems already use, including FHIR, HL7, and Direct Secure Messaging. Your EHR stays in place and the practice does not change how it charts.",
  },
  {
    q: "What languages does it support?",
    a: "Six: English, Spanish, French, Simplified Chinese, Haitian Creole, and Vietnamese. The patient converses in their language while the practice reads and responds in its own.",
  },
  {
    q: "Do patients need to download anything?",
    a: "No. Conversation happens over text. There is no app and no account for the patient to set up.",
  },
  {
    q: "Who can see patient information?",
    a: "Access is governed by role. Protected health information stays masked by default and is not visible until a staff member intentionally reveals it. Every reveal is logged against the person who made it.",
  },
];

function FeatureList({ items, bullet = false }) {
  return (
    <div className="mt-10 divide-y divide-fg/10 border-t border-fg/10">
      {items.map(([title, desc, Icon], i) => (
        <Reveal key={title} delay={i * 0.04}>
          <div data-testid="feature-list-item" className="grid grid-cols-1 gap-2 py-6 sm:grid-cols-12 sm:items-baseline">
            <div className="flex items-center gap-3 sm:col-span-4">
              {Icon ? (
                <Icon className="h-[15px] w-[15px] shrink-0 text-acc" strokeWidth={1.5} />
              ) : bullet ? (
                <span aria-hidden="true" className="h-px w-3 shrink-0 bg-acc/60" />
              ) : (
                <span className="font-mono text-[11px] text-acc tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              )}
              <span className="font-display text-base font-medium leading-snug text-fg">{title}</span>
            </div>
            <p className="text-[15px] leading-relaxed text-fg/60 sm:col-span-8">{desc}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export default function Iris() {
  usePageMeta({
    title: "xoIris: Scheduling",
    description:
      "xoIris handles scheduling, reminders, and recall, predicts no-shows, and fills a cancellation by reaching patients nearby who are already due. The day starts full instead of catching up.",
  });
  return (
    <div className="acc-iris">
      <ProductHero
        eyebrow="xoIris™ · Schedule"
        logo="/logos/xoiris-dark.svg"
        logoWidth={104}
        logoHeight={25}
        role="Schedule"
        headlineLines={["A full schedule, and", "more patients through it."]}
        subhead="xoIris manages booking, patient communication, and recall, working the schedule continuously so the clinical hours you already staff are the hours you actually bill."
        image={IMAGES.abstract}
        imageAlt="Abstract scheduling network"
      />

      {/* 01 Overview */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Overview</div>
            </Reveal>
            <MaskTextInView
              lines={["The schedule is the practice's", "most perishable asset."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                Every appointment slot is finite. Once it passes unfilled, that
                capacity cannot be recovered, carried forward, or sold to a
                future patient. Across U.S. optometric practices, roughly a
                quarter of booked appointments are not kept. xoIris is the
                scheduling and patient communication software in the XO
                Vision Care System. It automates booking, confirmation,
                reminders, and recall outreach, and it works the schedule
                continuously rather than waiting for someone at the front
                desk to notice a gap. A full schedule means maximizing the
                revenue potential of the hours your practice is already
                staffing. No new chair, no new room, no additional staff.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 02 Filling the day */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">Filling the Day</div>
          </Reveal>
          <MaskTextInView
            lines={["A cancellation does not have to", "become a hole in the day."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              When a patient does not confirm, xoIris does two things. It
              checks the waitlist for someone who can take the slot. And it
              looks at the patient base, identifying patients nearby who are
              already due for care, and reaches them by text with the
              specific opening. Most scheduling tools stop at the waitlist,
              which only helps when a waitlist exists. xoIris works from
              demand the practice already has on file, whether or not anyone
              raised their hand.
            </p>
          </Reveal>
          <FeatureList items={FILLING_THE_DAY} bullet />
        </div>
      </section>

      {/* 03 Patient communication */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">Patient Communication</div>
          </Reveal>
          <MaskTextInView
            lines={["Patients get an answer,", "not a callback."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              A significant share of front-desk time goes to exchanges that
              follow a predictable pattern: confirming an appointment,
              answering a question about hours or insurance, rescheduling,
              sending a reminder. xoIris handles these directly, in natural
              conversation, and hands off to staff the moment a conversation
              needs a person. It converses in six languages, and translates
              between them. A patient can book, confirm, and ask questions in
              Spanish, Haitian Creole, or Vietnamese while the practice reads
              and responds in English. For a practice serving a diverse
              patient population, that is the difference between a patient
              who books and a patient who does not.
            </p>
          </Reveal>
          <FeatureList items={PATIENT_COMMUNICATION} />
        </div>
      </section>

      {/* 04 Intake and records */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">Intake and Records</div>
          </Reveal>
          <MaskTextInView
            lines={["The paperwork is done", "before the patient sits down."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              Demographics and insurance are collected ahead of the visit
              rather than on a clipboard in the waiting room. Patients
              photograph their ID and insurance card, and xoIris extracts the
              data. The patient record holds demographics, contacts,
              insurance, medical history, allergies and medications, visit
              history, and clinical imaging. All of it stays masked by
              default. Protected health information is not visible until a
              staff member intentionally reveals it, and every reveal is
              logged against the person who made it.
            </p>
          </Reveal>
          <FeatureList items={INTAKE_RECORDS} />
        </div>
      </section>

      {/* 05 Working with your EHR */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Working with Your EHR</div>
            </Reveal>
            <MaskTextInView
              lines={["It works with the EHR", "you already run."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                Integration is where practice technology usually stalls.
                xoIris connects through the standards electronic health
                record systems already use, including FHIR, HL7, and Direct
                Secure Messaging, rather than requiring a custom integration
                built for your specific system. Your EHR stays where it is.
                Nothing is replaced, and the practice does not change how it
                charts.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 06 Security and access */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">Security and Access</div>
          </Reveal>
          <MaskTextInView
            lines={["Built for the data it holds."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              xoIris holds protected health information, and it is built
              accordingly. Data is encrypted in transit and at rest. Access
              is governed by role, so what a front-desk employee can see and
              what a practitioner can see are not the same. Every action is
              logged, including every reveal of masked information.
            </p>
          </Reveal>
          <FeatureList items={SECURITY_ACCESS} />
        </div>
      </section>

      {/* 07 What it delivers */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">What it delivers</div>
          </Reveal>
          <MaskTextInView
            lines={["Two results a practice", "can measure."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-14 divide-y divide-fg/10 border-y border-fg/10">
            <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:items-baseline">
              <div className="md:col-span-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">Time</span>
              </div>
              <p className="md:col-span-9 text-lg leading-relaxed text-fg/60">
                Every gap xoIris fills is time your team does not spend
                chasing a phone that never rings back. Recall, reminders, and
                routine patient questions run continuously, without a person
                watching them all day.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 py-10 md:grid-cols-12 md:items-baseline">
              <div className="md:col-span-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">Practice Growth</span>
              </div>
              <p className="md:col-span-9 text-lg leading-relaxed text-fg/60">
                A full day is capacity you already own. xoIris turns the
                schedule you have into the patient volume you are capable of,
                before you add a chair or a room.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 Platform & specifications */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Platform</div>
            </Reveal>
            <MaskTextInView
              lines={["Cloud-based.", "Nothing to install."]}
              as="span"
              className="max-w-3xl font-display text-3xl font-medium leading-[1.06] tracking-tight text-fg sm:text-4xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/55">
                xoIris runs in a HIPAA-compliant cloud and reaches patients
                over conversational text. No app for the patient to
                download, no servers on site, and no software for the
                practice to maintain. Staff work from any browser or device.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <div className="eyebrow mb-6">Specifications</div>
            </Reveal>
            <div className="overflow-hidden border border-fg/10">
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

      {/* 09 In the system */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">In the system</div>
          </Reveal>
          <MaskTextInView
            lines={["What the exam room", "already knows."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/55">
              Who the patient is, why they came, and what happened last time,
              all present the moment the exam begins. The visit starts where
              the booking left off rather than starting over. xoIris is the
              first of four components in the XO™ Vision Care System, which
              covers the patient's visit from the appointment through the
              finished eyewear.
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
        body="A thirty-minute walkthrough of xoIris inside the full XO Vision Care System, against how your practice books, confirms, and recalls today."
      />
    </div>
  );
}
