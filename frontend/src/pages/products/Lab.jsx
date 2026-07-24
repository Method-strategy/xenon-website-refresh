import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { IMAGES } from "@/data/site";

const EQUIPMENT = [
  { n: "01", name: "xoLab Trace", desc: "High-precision frame tracing system." },
  { n: "02", name: "xoLab Block", desc: "Precision blocking control system." },
  { n: "03", name: "xoLab Edge", desc: "High-precision vertical edging system." },
];

const FAQS = [
  {
    q: "Is in-office lens edging worth it?",
    a: "In-office finishing changes the unit economics of every single-vision job. Industry reporting places typical savings at $5–$15 per job on edging, with additional recovery on tinting and drilling, against a one-time equipment investment rather than a per-job charge — plus same-day turnaround.",
  },
  {
    q: "What can and cannot be finished in office?",
    a: "xoLab is an edging operation, not a surfacing lab. Single-vision work — the volume category in most practices — can be finished on site the same day. Progressives and anything requiring surfacing still route to your contracted lab, going out as a complete specification generated from the record.",
  },
];

export default function Lab() {
  return (
    <>
      <ProductHero
        eyebrow="xoLab™ · Finish"
        headlineLines={["The last step", "is where", "the margin goes."]}
        subhead="Frame tracing, blocking, and edging in a footprint sized for a practice — with finished eyewear on site, as fast as same day."
        image={IMAGES.lab}
        imageAlt="In-office lens finishing lab equipment"
      />

      {/* Overview */}
      <section className="border-t border-white/10 bg-xo-obsidian py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Overview</div>
            </Reveal>
            <MaskTextInView
              lines={["Finishing is the one step", "most practices give away."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-white/60">
                Every other stage of care happens in the building — the exam, the
                frame selection, the fitting, the sale. Then the job leaves, and a
                portion of the value leaves with it.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-white/45">
                xoLab brings tracing, blocking, and edging in-house in a compact,
                scalable configuration, designed to be operated by existing staff
                rather than a dedicated lab technician.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Economics */}
      <section className="border-t border-white/10 bg-xo-void py-24 md:py-32">
        <div className="xo-container">
          <MaskTextInView
            lines={["The lab bill is a recurring cost", "with a fixed alternative."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-md border border-xo-blue/30 bg-gradient-to-br from-xo-navy-deep/40 to-xo-void p-10">
                <div className="font-display text-6xl font-semibold text-white">
                  $5–$15
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  typical savings per job on edging
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-white/55">
                  With additional recovery on tinting and drilling, against a
                  one-time equipment investment rather than a per-job charge.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="h-full rounded-md border border-white/10 bg-xo-obsidian p-10">
                <div className="font-display text-6xl font-semibold text-xo-teal">
                  Same day
                </div>
                <div className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/40">
                  the second return is time
                </div>
                <p className="mt-6 text-[15px] leading-relaxed text-white/55">
                  A job that does not leave the building is not waiting on a courier,
                  a lab queue, or a return shipment. Same-day delivery becomes
                  possible for work that currently takes days.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="relative overflow-hidden border-t border-white/10 bg-xo-obsidian py-24 md:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <img src={IMAGES.microscope} alt="" className="h-full w-full object-cover opacity-10" />
          <div className="absolute inset-0 bg-xo-obsidian/85" />
        </div>
        <div className="xo-container relative">
          <Reveal>
            <div className="eyebrow mb-6">The equipment</div>
          </Reveal>
          <MaskTextInView
            lines={["Three machines.", "One in-office lab."]}
            as="span"
            className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl"
          />
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {EQUIPMENT.map((e, i) => (
              <Reveal key={e.name} delay={i * 0.08}>
                <div className="flex h-full flex-col rounded-md border border-white/10 bg-xo-void/70 p-8 backdrop-blur-sm transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-xo-teal/40">
                  <div className="font-mono text-sm text-xo-teal">{e.n}</div>
                  <h3 className="mt-6 font-display text-2xl text-white">{e.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/50">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What stays / goes out */}
      <section className="border-t border-white/10 bg-xo-void py-24 md:py-32">
        <div className="xo-container">
          <MaskTextInView
            lines={["What stays in the building,", "and what doesn't."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-white sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/55">
              xoLab is an edging operation, not a surfacing lab. Single-vision work —
              the volume category in most practices — can be finished on site the same
              day. Progressives and anything requiring surfacing still route to your
              contracted lab. The difference is what leaves with them: a job that goes
              out from the XO system goes out as a complete specification generated
              from the record, not an order form rebuilt by hand from a chart.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10">
              <div className="eyebrow mb-3">In the system — where the visit closes</div>
              <p className="max-w-2xl text-lg leading-relaxed text-white/70">
                The visit that began with a phone call ends with a finished pair of
                glasses. Sometimes the same day, in the same building, without a single
                step in between where the patient had to wait on the practice.
              </p>
              <Link
                to="/xo-vision-care-system"
                data-testid="lab-journey-link"
                className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-xo-teal"
              >
                See the full patient journey
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FAQ items={FAQS} title="Finishing, answered." />
      <DemoCTA
        eyebrow="Request a demo"
        headline="Keep the last step — and its margin — inside the building."
        body="A thirty-minute walkthrough of xoLab inside the full XO Vision Care System."
      />
    </>
  );
}
