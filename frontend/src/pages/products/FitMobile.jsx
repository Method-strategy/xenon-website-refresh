import { Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, MapPin, MessageCircle, Gauge, FileCheck, Users, Zap } from "lucide-react";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import DemoCTA from "@/components/common/DemoCTA";
import { usePageMeta } from "@/lib/usePageMeta";

const INTRO = {
  subhead: "Precision measurements. Anywhere fitting happens.",
  body: "xoFit Mobile is the same measurement, unbolted from the wall. An iPad-based unit with a wearable alignment module and 4x optical zoom, it goes wherever the frame conversation is already happening, so the optician isn't walking the patient to a fixed station to get an accurate number.",
};

const TILES = [
  ["Fitting happens wherever the frame is", "There's no wall unit to walk the patient to. xoFit Mobile goes to whichever chair, table, or corner of the floor the frame conversation is already happening in.", MapPin],
  ["The conversation doesn't stop for the measurement", "The optician stays face to face with the patient through the capture, instead of stepping behind a fixed station to take it.", MessageCircle],
  ["Accuracy travels with the device", "The same on-screen guidance that keeps posture and alignment correct on a fixed station runs on the handheld unit, so portability doesn't cost precision.", Gauge],
  ["Every mode ends the same way", "Whichever workflow the optician chooses (easy, advanced, or expert) the result lands in the same lab-ready format, ready for xoLab or an outside lab.", FileCheck],
  ["Three modes, one for every staff member", "A newer optician can run the easy workflow. A senior optician can go to expert for a complex prescription. The device adjusts to the person using it, not the other way around.", Users],
  ["Nothing to install", "It's a handheld unit with an optional dock, not a fixture. A practice can start using it the day it arrives.", Zap],
];

const SCREENS = [
  { src: "/products/xofit/mobile-screen-1.webp", label: "Start", width: 900, height: 724 },
  { src: "/products/xofit/mobile-screen-2.webp", label: "Modes", width: 841, height: 646 },
  { src: "/products/xofit/mobile-screen-3.webp", label: "Results", width: 900, height: 724 },
];

const STEPS = [
  "The patient's selected frame is clipped into the All-in-One Measurement Tool",
  "The patient wears the measurement tool, establishing precise optical targets and stable frame positioning",
  "The optician positions the xoFit mobile device at eye level in front of the patient",
  "Software guides positioning using on-screen markers and visual feedback",
  "Front and profile images are captured digitally",
  "Measurements are calculated automatically based on the selected workflow",
  "Final results are reviewed and exported for lab use",
];

const FEATURES = [
  "iPad-based mobile centration workflow",
  "3 operating modes: easy, advanced, expert",
  "Wearable optical alignment module",
  "Tablet-mounted optical capture system",
  "4x optical zoom with German precision optics",
  "Instant digital measurement results",
  "PDF export or optional print mode",
  "Compact, portable configuration",
  "Optional monopod support dock",
];

export default function FitMobile() {
  usePageMeta({
    title: "xoFit Mobile: Portable Digital Centration",
    description:
      "xoFit Mobile is the same digital centration measurement as xoFit Core, unbolted from the wall, so it goes wherever the frame conversation is already happening.",
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
                <div className="eyebrow mb-6">xoFit Mobile™ · iPad-based / Portable</div>
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
                <Link to="/request-a-demo" data-testid="mobile-hero-cta" className="btn-primary mt-10">
                  Request a Demo
                </Link>
              </Reveal>
            </div>
            <Reveal delay={0.1} className="lg:col-span-6">
              <div className="relative mx-auto max-w-md">
                <div aria-hidden="true" className="absolute inset-0 -z-10 rounded-full bg-acc/10 blur-3xl" />
                <img
                  src="/products/xofit/mobile-device.webp"
                  alt="xoFit mobile handheld digital centration device"
                  width={1200}
                  height={1262}
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
                  alt={`xoFit Mobile interface: ${s.label}`}
                  width={s.width}
                  height={s.height}
                  className="mt-4 w-full border border-fg/10"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What xoFit Mobile delivers */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">What xoFit Mobile Delivers</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {TILES.map(([label, body, Icon], i) => (
              <Reveal key={label} delay={i * 0.04}>
                <div data-testid={`mobile-tile-${i}`} className="border-t border-fg/10 pt-6">
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
            <div className="eyebrow mb-10">How xoFit Mobile Works</div>
          </Reveal>
          <div className="divide-y divide-fg/10 border-t border-fg/10">
            {STEPS.map((step, i) => (
              <Reveal key={step} delay={i * 0.03}>
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
                src="/products/xofit/mobile-retail.webp"
                alt="Optician using xoFit Mobile handheld device to measure a patient in a retail eyewear environment"
                width={640}
                height={640}
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
            data-testid="mobile-back-link"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-acc"
          >
            <ArrowUpRight className="h-4 w-4 rotate-[-135deg] transition-transform duration-300 group-hover:-translate-x-1" />
            Back to xoFit overview
          </Link>
        </div>
      </section>

      <DemoCTA
        eyebrow="Request a demo"
        headline="See xoFit Mobile on your own floor."
        body="A thirty-minute walkthrough of xoFit Mobile inside the full XO Vision Care System."
      />
    </div>
  );
}
