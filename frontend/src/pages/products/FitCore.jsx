import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Aperture, UserCheck, CheckCircle2, FileCheck, Repeat, PanelTop } from "lucide-react";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import DemoCTA from "@/components/common/DemoCTA";
import { usePageMeta } from "@/lib/usePageMeta";

const INTRO = {
  subhead: "One shot. Every measurement.",
  body: "xoFit Core is a wall-mounted station built for the dispensary that sees the most volume. A six-camera array captures facial and frame geometry in a single shot, so the patient holds one position instead of several, and the measurement is calculated the moment the shot is taken, ready for the lab before the patient has left the chair.",
};

const TILES = [
  ["One capture, not an estimate", "The six-camera array measures pupillary distance, segment height, and frame geometry in a single shot, so the number that reaches the lab is what was actually measured, not what a ruler approximated.", Aperture],
  ["The patient holds one position", "On-screen guidance keeps posture and gaze aligned for the one shot the measurement needs, so a patient who fidgets doesn't turn into a remake.", UserCheck],
  ["The fit is confirmed before it's cut", "Real-time visualization lets the patient and the optician agree on how a frame sits before the order goes anywhere, catching a bad fit before it becomes a returned pair.", CheckCircle2],
  ["The output is already a spec", "Measurements export in the format the lab, or xoLab, already expects, so nobody retypes a number from one system into another.", FileCheck],
  ["The same measurement, whoever runs it", "Because the capture is automated rather than judged by eye, the numbers don't shift with which optician is on shift or how many patients came in that day.", Repeat],
  ["It mounts on a wall, not a room", "A wall-mounted footprint fits into the dispensary you already have, with no dedicated fitting bay required.", PanelTop],
];

const SCREENS = [
  { src: "/products/xofit/screen-1.webp", label: "Start", width: 832, height: 1248 },
  { src: "/products/xofit/screen-2.webp", label: "Check", width: 832, height: 1248 },
  { src: "/products/xofit/screen-3.webp", label: "Results", width: 832, height: 1248 },
];

const STEPS = [
  "Patient stands in front of the wall-mounted xoFit unit at the guided distance",
  "Facial position and posture are aligned using on-screen guidance",
  "Optical imaging captures facial geometry and frame position",
  "Digital centration and measurement data are calculated automatically",
];

const FEATURES = [
  "Wall or stand mounted, vertical measurement system",
  "Multi-camera optical imaging",
  "Automated digital centration",
  "Facial geometry and frame position analysis",
  "Tablet-controlled user interface",
  "Guided patient alignment workflow",
  "Lab-ready measurement reports",
  "Designed for retail and clinical environments",
];

export default function FitCore() {
  usePageMeta({
    title: "xoFit Core: Wall-Mounted Digital Centration",
    description:
      "xoFit Core captures pupillary distance, segment height, and frame geometry in a single shot, wall-mounted for the dispensary that sees the most volume.",
  });
  return (
    <div>
      <section className="relative overflow-hidden bg-bg pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="xo-container">
          <Reveal>
            <Link
              to="/xofit-frame-fitting"
              data-testid="breadcrumb-xofit"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-fg/40 transition-colors duration-300 hover:text-acc"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              xoFit
            </Link>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <Reveal delay={0.05}>
                <div className="eyebrow mb-6">xoFit Core™ · Stand / Wall-mounted</div>
              </Reveal>
              <MaskTextInView
                lines={[INTRO.subhead]}
                as="h1"
                className="block max-w-2xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg sm:text-5xl"
              />
              <Reveal delay={0.15}>
                <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg/60">{INTRO.body}</p>
              </Reveal>
              <Reveal delay={0.2}>
                <Link to="/request-a-demo" data-testid="core-hero-cta" className="btn-primary mt-10">
                  Request a Demo
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="relative mx-auto max-w-md">
                <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-acc/10 blur-3xl" />
                <img
                  src="/products/xofit/device.webp"
                  alt="xoFit wall-mounted precision frame fitting device"
                  width={814}
                  height={1934}
                  className="w-full"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The interface */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">The Interface</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            {SCREENS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="font-mono text-xs text-acc">
                  {String(i + 1).padStart(2, "0")} · {s.label}
                </div>
                <img
                  src={s.src}
                  alt={`xoFit Core interface: ${s.label}`}
                  width={s.width}
                  height={s.height}
                  className="mt-4 w-full border border-fg/10"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What xoFit Core delivers */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">What xoFit Core Delivers</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {TILES.map(([label, body, Icon], i) => (
              <Reveal key={label} delay={i * 0.04}>
                <div data-testid={`core-tile-${i}`} className="border-t border-fg/10 pt-6">
                  <Icon className="h-[18px] w-[18px] text-acc" strokeWidth={1.5} />
                  <h4 className="mt-4 font-display text-xl leading-snug text-fg">{label}</h4>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-fg/55">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">How xoFit Core Works</div>
          </Reveal>
          <div className="divide-y divide-fg/10 border-t border-fg/10">
            {STEPS.map((step, i) => (
              <Reveal key={step} delay={i * 0.04}>
                <div className="flex items-start gap-6 py-6">
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-acc">
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-[15px] leading-relaxed text-fg/70">{step}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features + retail photo */}
      <section className="relative overflow-hidden bg-gradient-to-br from-xo-navy-deep to-xo-navy-deeper py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <div className="font-mono text-xs uppercase tracking-[0.2em] text-acc">Features</div>
            <ul className="mt-8 space-y-0">
              {FEATURES.map((item, i) => (
                <Reveal key={item} delay={i * 0.04}>
                  <li className="flex items-baseline gap-6 border-t border-white/10 py-5 first:border-t-0 first:pt-0">
                    <span aria-hidden="true" className="h-px w-3 shrink-0 bg-acc/60" />
                    <span className="flex-1 text-[15.5px] leading-snug text-white/85">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <Reveal>
              <img
                src="/products/xofit/retail.webp"
                alt="Optician using xoFit device in a retail eyewear environment"
                width={1200}
                height={1464}
                className="w-full"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-fg/10 bg-bg py-16">
        <div className="xo-container">
          <Link
            to="/xofit-frame-fitting"
            data-testid="core-back-link"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-acc"
          >
            <ArrowUpRight className="h-4 w-4 rotate-[-135deg] transition-transform duration-300 group-hover:-translate-x-1" />
            Back to xoFit overview
          </Link>
        </div>
      </section>

      <DemoCTA
        eyebrow="Request a demo"
        headline="See xoFit Core on your own patients."
        body="A thirty-minute walkthrough of xoFit Core inside the full XO Vision Care System."
      />
    </div>
  );
}
