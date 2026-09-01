import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, PlayCircle } from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/usePageMeta";
import { loadTintWidget } from "@/lib/tintVto";

const TINT_PUBLISHABLE_KEY = process.env.REACT_APP_TINT_PUBLISHABLE_KEY;
const TINT_VARIANT_ID = process.env.REACT_APP_TINT_VARIANT_ID;

const FORM_FACTORS = [
  {
    key: "core",
    tab: "xoFit Core",
    kind: "Stand / wall-mounted",
    intro: {
      subhead: "One shot. Every measurement.",
      body: "xoFit Core is a wall-mounted station built for the dispensary that sees the most volume. A six-camera array captures facial and frame geometry in a single shot, so the patient holds one position instead of several, and the measurement is calculated the moment the shot is taken, ready for the lab before the patient has left the chair.",
    },
    deviceImage: "/products/xofit/device.webp",
    deviceWidth: 814,
    deviceHeight: 1934,
    deviceAlt: "xoFit wall-mounted precision frame fitting device",
    deviceLabel: "xoFit Core · Stand / Wall-mounted",
    tiles: [
      ["One capture, not an estimate", "The six-camera array measures pupillary distance, segment height, and frame geometry in a single shot, so the number that reaches the lab is what was actually measured, not what a ruler approximated."],
      ["The patient holds one position", "On-screen guidance keeps posture and gaze aligned for the one shot the measurement needs, so a patient who fidgets doesn't turn into a remake."],
      ["The fit is confirmed before it's cut", "Real-time visualization lets the patient and the optician agree on how a frame sits before the order goes anywhere, catching a bad fit before it becomes a returned pair."],
      ["The output is already a spec", "Measurements export in the format the lab, or xoLab, already expects, so nobody retypes a number from one system into another."],
      ["The same measurement, whoever runs it", "Because the capture is automated rather than judged by eye, the numbers don't shift with which optician is on shift or how many patients came in that day."],
      ["It mounts on a wall, not a room", "A wall-mounted footprint fits into the dispensary you already have, with no dedicated fitting bay required."],
    ],
    howItWorks: {
      subhead: "From the patient stepping into position to a lab-ready number, with nothing written down by hand in between.",
      screens: [
        { src: "/products/xofit/screen-1.webp", label: "Start", width: 832, height: 1248 },
        { src: "/products/xofit/screen-2.webp", label: "Check", width: 832, height: 1248 },
        { src: "/products/xofit/screen-3.webp", label: "Results", width: 832, height: 1248 },
      ],
      steps: [
        "Patient stands in front of the wall-mounted xoFit unit at the guided distance",
        "Facial position and posture are aligned using on-screen guidance",
        "Optical imaging captures facial geometry and frame position",
        "Digital centration and measurement data are calculated automatically",
      ],
    },
    featureList: [
      "Wall or stand mounted, vertical measurement system",
      "Multi-camera optical imaging",
      "Automated digital centration",
      "Facial geometry and frame position analysis",
      "Tablet-controlled user interface",
      "Guided patient alignment workflow",
      "Lab-ready measurement reports",
      "Designed for retail and clinical environments",
    ],
    retailImage: "/products/xofit/retail.webp",
    retailWidth: 1200,
    retailHeight: 1464,
    retailAlt: "Optician using xoFit device in a retail eyewear environment",
  },
  {
    key: "mobile",
    tab: "xoFit Mobile",
    kind: "iPad-based / portable",
    intro: {
      subhead: "Precision measurements. Anywhere fitting happens.",
      body: "xoFit Mobile is the same measurement, unbolted from the wall. An iPad-based unit with a wearable alignment module and 4x optical zoom, it goes wherever the frame conversation is already happening, so the optician isn't walking the patient to a fixed station to get an accurate number.",
    },
    deviceImage: "/products/xofit/mobile-device.webp",
    deviceWidth: 1200,
    deviceHeight: 1262,
    deviceAlt: "xoFit mobile handheld digital centration device",
    deviceLabel: "xoFit Mobile · iPad-based / portable",
    tiles: [
      ["Fitting happens wherever the frame is", "There's no wall unit to walk the patient to. xoFit Mobile goes to whichever chair, table, or corner of the floor the frame conversation is already happening in."],
      ["The conversation doesn't stop for the measurement", "The optician stays face to face with the patient through the capture, instead of stepping behind a fixed station to take it."],
      ["Accuracy travels with the device", "The same on-screen guidance that keeps posture and alignment correct on a fixed station runs on the handheld unit, so portability doesn't cost precision."],
      ["Every mode ends the same way", "Whichever workflow the optician chooses (easy, advanced, or expert) the result lands in the same lab-ready format, ready for xoLab or an outside lab."],
      ["Three modes, one for every staff member", "A newer optician can run the easy workflow. A senior optician can go to expert for a complex prescription. The device adjusts to the person using it, not the other way around."],
      ["Nothing to install", "It's a handheld unit with an optional dock, not a fixture. A practice can start using it the day it arrives."],
    ],
    howItWorks: {
      subhead: "Simple, fast, and accurate frame fitting in just a few easy steps.",
      screens: [
        { src: "/products/xofit/mobile-screen-1.webp", label: "Start", width: 900, height: 724 },
        { src: "/products/xofit/mobile-screen-2.webp", label: "Modes", width: 841, height: 646 },
        { src: "/products/xofit/mobile-screen-3.webp", label: "Results", width: 900, height: 724 },
      ],
      steps: [
        "The patient's selected frame is clipped into the All-in-One Measurement Tool",
        "The patient wears the measurement tool, establishing precise optical targets and stable frame positioning",
        "The optician positions the xoFit mobile device at eye level in front of the patient",
        "Software guides positioning using on-screen markers and visual feedback",
        "Front and profile images are captured digitally",
        "Measurements are calculated automatically based on the selected workflow",
        "Final results are reviewed and exported for lab use",
      ],
    },
    featureList: [
      "iPad-based mobile centration workflow",
      "3 operating modes: easy, advanced, expert",
      "Wearable optical alignment module",
      "Tablet-mounted optical capture system",
      "4x optical zoom with German precision optics",
      "Instant digital measurement results",
      "PDF export or optional print mode",
      "Compact, portable configuration",
      "Optional monopod support dock",
    ],
    retailImage: "/products/xofit/mobile-retail.webp",
    retailWidth: 640,
    retailHeight: 640,
    retailAlt: "Optician using xoFit Mobile handheld device to measure a patient in a retail eyewear environment",
  },
  {
    key: "frame",
    tab: "xoFrame",
    kind: "Virtual try-on",
    intro: {
      subhead: "Every frame, tried on instantly.",
      body: "xoFrame brings virtual try-on directly into the frame selection conversation, showing patients exactly how they look in any frame in the collection without pulling a single pair from the shelf. New frames join the virtual catalog in moments, and the instant a patient decides, that selection carries forward with the fitting record, straight through to xoLab for same-day finishing.",
    },
    deviceImage: "/products/xofit/frame-tryon.webp",
    deviceImageSrcSet: "/products/xofit/frame-tryon-900.webp 900w, /products/xofit/frame-tryon.webp 1600w",
    deviceWidth: 1600,
    deviceHeight: 800,
    deviceAlt: "Split comparison of a patient's face wearing two different eyewear frames side by side, rendered through xoFrame virtual try-on",
    deviceLabel: "xoFrame · Virtual Try-On",
    deviceImageWide: true,
    tiles: [
      ["Every frame, without leaving the chair", "A patient can see themselves in a frame that isn't in the case that day, or isn't in the case at all, cutting the back-and-forth of physically trying on option after option."],
      ["The catalog keeps up with inventory", "A new frame joins the virtual collection in moments, so the try-on catalog never lags behind what's actually on the floor."],
      ["The selection doesn't end at try-on", "The instant a patient decides, that choice carries into the fitting record and on to xoLab, so same-day finishing starts before the patient leaves the chair."],
    ],
    vto: true,
    featureList: [
      "Photorealistic, real-time virtual try-on",
      "Full catalog available for instant try-on",
      "Side-by-side frame comparison",
      "Selection captured with the fitting record",
      "Shareable link for at-home decisions",
    ],
  },
];

const MEASUREMENTS = [
  "Pupillary distance (PD)",
  "Centration distance",
  "Eye point height",
  "Segment (fitting) height",
  "Boxing dimensions (A & B)",
  "Distance between lenses",
  "Back vertex distance",
  "Pantoscopic angle",
  "Frame face-form angle",
  "Head rotation correction",
  "VarioInset (near PD)",
];

const FAQS = [
  {
    q: "What is digital centration?",
    a: "Digital centration is the precise measurement of where a lens sits in front of the eye (pupillary distance, segment height, vertical optical center, and frame geometry), captured digitally rather than with a ruler, so premium lens designs perform as intended.",
  },
  {
    q: "Why does pupillary distance accuracy matter?",
    a: "Premium lens designs assume a specific position in front of the eye. Ruler measurements vary by up to ~3mm between opticians, versus 0.09–0.24mm for digital systems. A 2mm centration error can reduce binocular field of view by roughly 25 percent.",
  },
  {
    q: "What's the difference between xoFit Core and xoFit Mobile?",
    a: "Both meet one precision standard. xoFit Core is a stand (optional accessory) or wall-mounted 6-camera station with single-shot 3D capture, built for high-throughput dispensaries. xoFit Mobile is an iPad-based unit with a wearable alignment module and 4x German optics, for practices that need a more portable solution.",
  },
];

export default function Fit() {
  usePageMeta({
    title: "xoFit: Frame Fitting & Centration",
    description:
      "The optician opens xoFit and the prescription is already loaded. Digital centration and frame measurement in three form factors: a wall-mounted station, a handheld unit, and a virtual try-on patients use themselves.",
  });
  const [active, setActive] = useState("core");
  const vtoRef = useRef(null);
  const [vtoStatus, setVtoStatus] = useState("idle"); // idle | loading | ready | error

  const openVto = async () => {
    setVtoStatus("loading");
    try {
      await loadTintWidget();
      setVtoStatus("ready");
      // Guards against the script/open() call itself hanging (e.g. network
      // issues). Note: Tint's open() resolves even when its own internal
      // init fails (e.g. an unrecognized origin or variant), so this can't
      // catch every vendor-side failure — those surface inside the widget's
      // own overlay, outside our control.
      await Promise.race([
        vtoRef.current?.open(),
        new Promise((_, reject) => setTimeout(() => reject(new Error("Tint VTO timed out")), 10000)),
      ]);
    } catch (err) {
      console.error("Tint VTO failed to open", err);
      setVtoStatus("error");
    }
  };

  return (
    <div className="acc-fit">
      <ProductHero
        eyebrow="xoFit™ · Fit"
        logo="/logos/xofit-dark.svg"
        logoWidth={102}
        logoHeight={25}
        role="Fit"
        headlineLines={["Measurements that", "arrive at the lab", "exactly as taken."]}
        subhead="Digital centration, frame measurement, and virtual try-on, captured in the same visit that produced the prescription."
        image="/hero/xofit-measure.webp"
        imageSrcSet="/hero/xofit-measure-1200.webp 1200w, /hero/xofit-measure.webp 1920w"
        imageAlt="Digital centration measurements — pupillary distance, frame geometry, segment height — overlaid on a patient's face"
      />

      {/* Overview */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Overview</div>
            </Reveal>
            <MaskTextInView
              lines={["The measurement is", "the easy part.", "Getting it there is not."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                Digital centration is a mature technology. What is not standard is a
                measurement that lands in the same system that produced the
                prescription and will drive the edger, without an optician
                transcribing anything.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 leading-relaxed text-fg/45">
                The prescription is already loaded from the exam. xoFit adds
                pupillary distance, segment height, vertical optical center, and
                frame geometry, and the lab specification assembles itself.
              </p>
            </Reveal>
          </div>
        </div>
      </section>


      {/* Form factor tabs — expanded per-tab detail */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">The xoFit family · one precision standard</div>
          </Reveal>
          <MaskTextInView
            lines={["Precise measurements. Confident fit.", "Three flexible form factors to choose from."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />

          {/* Tab buttons */}
          <div
            role="tablist"
            aria-label="xoFit form factors"
            className="mt-12 flex flex-wrap gap-3"
          >
            {FORM_FACTORS.map((f) => (
              <button
                key={f.key}
                role="tab"
                aria-selected={active === f.key}
                data-testid={`fit-tab-${f.key}`}
                onClick={() => setActive(f.key)}
                className={cn(
                  "rounded-full border px-6 py-3 font-mono text-[11px] uppercase tracking-[0.15em] transition-[color,border-color,background-color] duration-300",
                  active === f.key
                    ? "border-acc bg-acc/10 text-acc"
                    : "border-fg/15 text-fg/50 hover:border-fg/40 hover:text-fg",
                )}
              >
                {f.tab}
                <span className="ml-2 text-fg/30">{f.kind}</span>
              </button>
            ))}
          </div>

          {/* Active panel */}
          <div className="mt-16">
            <AnimatePresence mode="wait">
              {FORM_FACTORS.filter((f) => f.key === active).map((f) => (
                <motion.div
                  key={f.key}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  data-testid={`fit-panel-${f.key}`}
                >
                  {/* 1. Intro — flowing copy on left, product moment on right, no wrapper */}
                  {f.intro && !f.deviceImageWide && (
                    <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-20">
                      <div className="lg:col-span-6 lg:col-start-1">
                        <Reveal>
                          <h3 className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg md:text-5xl lg:text-6xl">
                            {f.intro.subhead}
                          </h3>
                        </Reveal>
                        <Reveal delay={0.1}>
                          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/60">
                            {f.intro.body}
                          </p>
                        </Reveal>
                      </div>
                      {f.deviceImage && (
                        <Reveal delay={0.15} className="lg:col-span-6">
                          <div className="flex flex-col items-center">
                            <div className="relative flex min-h-[520px] w-full items-end justify-center md:min-h-[640px] lg:min-h-[760px]">
                              <div
                                aria-hidden
                                className="pointer-events-none absolute inset-0"
                                style={{
                                  background:
                                    "radial-gradient(55% 45% at 50% 60%, rgb(var(--acc) / 0.18), transparent 72%), radial-gradient(40% 50% at 50% 40%, rgb(var(--fg) / 0.06), transparent 78%)",
                                }}
                              />
                              <img
                                src={f.deviceImage}
                                width={f.deviceWidth}
                                height={f.deviceHeight}
                                decoding="async"
                                loading="lazy"
                                alt={f.deviceAlt}
                                className="relative h-full max-h-[520px] w-auto object-contain md:max-h-[640px] lg:max-h-[760px]"
                              />
                            </div>
                            {f.deviceLabel && (
                              <div className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-acc">
                                {f.deviceLabel}
                              </div>
                            )}
                          </div>
                        </Reveal>
                      )}
                    </div>
                  )}

                  {/* 1b. Intro, wide-image variant — large image stacked on top (xoFrame), headline + body below in two columns */}
                  {f.intro && f.deviceImageWide && (
                    <div>
                      {f.deviceImage && (
                        <Reveal className="mx-auto mb-16 flex max-w-[1080px] flex-col items-center md:mb-20">
                          <div className="relative w-full" style={{ aspectRatio: `${f.deviceWidth} / ${f.deviceHeight}` }}>
                            <div
                              aria-hidden
                              className="pointer-events-none absolute inset-0"
                              style={{
                                background:
                                  "radial-gradient(55% 55% at 50% 50%, rgb(var(--acc) / 0.18), transparent 72%), radial-gradient(40% 50% at 50% 40%, rgb(var(--fg) / 0.06), transparent 78%)",
                              }}
                            />
                            <img
                              src={f.deviceImage}
                              srcSet={f.deviceImageSrcSet}
                              sizes={f.deviceImageSrcSet ? "(max-width: 768px) 100vw, 1080px" : undefined}
                              width={f.deviceWidth}
                              height={f.deviceHeight}
                              decoding="async"
                              alt={f.deviceAlt}
                              className="relative h-auto w-full object-contain"
                            />
                          </div>
                          {f.deviceLabel && (
                            <div className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-acc">
                              {f.deviceLabel}
                            </div>
                          )}
                        </Reveal>
                      )}
                      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-20">
                        <div className="lg:col-span-6">
                          <Reveal>
                            <h3 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg md:text-5xl lg:text-6xl">
                              {f.intro.subhead}
                            </h3>
                          </Reveal>
                        </div>
                        <div className="lg:col-span-6">
                          <Reveal delay={0.1}>
                            <p className="text-lg leading-relaxed text-fg/60">
                              {f.intro.body}
                            </p>
                          </Reveal>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 2. The interface — tablets sit on same baseline with labels, associated with the product */}
                  {f.howItWorks?.screens && (
                    <div className="mt-28 border-t border-fg/10 pt-16">
                      <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-12 lg:gap-8">
                        <div className="lg:col-span-3">
                          <Reveal>
                            <div className="eyebrow mb-4">The interface</div>
                          </Reveal>
                          <Reveal delay={0.05}>
                            <p className="max-w-xs text-[14px] leading-relaxed text-fg/55">
                              A tablet is the control surface. Every step of the fit is guided from it, and the measurement lives with the record.
                            </p>
                          </Reveal>
                        </div>
                        {f.howItWorks.screens.map((screen, i) => (
                          <Reveal key={screen.src} delay={0.1 + i * 0.08} className="lg:col-span-3">
                            <div className="flex flex-col items-center">
                              <div className="relative">
                                <div
                                  aria-hidden
                                  className="pointer-events-none absolute inset-0"
                                  style={{
                                    background:
                                      "radial-gradient(50% 45% at 50% 55%, rgb(var(--acc) / 0.10), transparent 78%)",
                                  }}
                                />
                                <img
                                  src={screen.src}
                                  width={screen.width}
                                  height={screen.height}
                                  decoding="async"
                                  loading="lazy"
                                  alt={`xoFit ${screen.label} screen`}
                                  className="relative h-auto w-[200px] object-contain drop-shadow-2xl md:w-[220px]"
                                />
                              </div>
                              <div className="mt-6 font-mono text-[10.5px] uppercase tracking-[0.2em] text-acc">
                                {String(i + 1).padStart(2, "0")} · {screen.label}
                              </div>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3. Tiles reimagined as an editorial 3-column text grid with hairline rules */}
                  {f.tiles && (
                    <div className="mt-28 border-t border-fg/10 pt-16">
                      <Reveal>
                        <div className="eyebrow mb-10">What xoFit delivers</div>
                      </Reveal>
                      <div className="grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
                        {f.tiles.map(([label, body], i) => (
                          <Reveal key={label} delay={i * 0.04}>
                            <div
                              data-testid={`fit-tile-${i}`}
                              className="border-t border-fg/10 pt-6"
                            >
                              <div className="font-mono text-[10.5px] uppercase tracking-[0.15em] text-acc">
                                {String(i + 1).padStart(2, "0")}
                              </div>
                              <h4 className="mt-4 font-display text-xl leading-snug text-fg">
                                {label}
                              </h4>
                              <p className="mt-3 text-[14.5px] leading-relaxed text-fg/55">
                                {body}
                              </p>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 3a. Virtual try-on — xoFrame only. Live Tint (Banuba) VTO
                      widget, loaded on demand when the try-on button is pressed. */}
                  {f.vto && (
                    <div className="mt-28 border-t border-fg/10 pt-16 text-center">
                      <Reveal>
                        <div className="eyebrow mb-6">See it in action</div>
                      </Reveal>
                      {TINT_PUBLISHABLE_KEY && (
                        // eslint-disable-next-line react/no-unknown-property
                        <tint-vto
                          ref={vtoRef}
                          publishable-key={TINT_PUBLISHABLE_KEY}
                          variant-id={TINT_VARIANT_ID?.trim() || undefined}
                          style={{ display: "block", width: 0, height: 0, overflow: "hidden" }}
                        />
                      )}
                      <Reveal delay={0.05}>
                        <button
                          type="button"
                          onClick={openVto}
                          disabled={vtoStatus === "loading"}
                          data-testid="vto-trigger-button"
                          className="btn-primary mx-auto inline-flex disabled:opacity-60"
                        >
                          <PlayCircle className="h-4 w-4" />
                          {vtoStatus === "loading" ? "Loading…" : "Try xoFrame VTO"}
                        </button>
                      </Reveal>
                      {vtoStatus === "error" && (
                        <p
                          data-testid="vto-error-message"
                          className="mt-4 text-sm text-red-400"
                        >
                          Unable to open the virtual try-on right now. Please try again in a moment.
                        </p>
                      )}
                      <Reveal delay={0.1}>
                        <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-fg/40">
                          A live try-on window will open — look for the × in its corner to close it
                        </p>
                      </Reveal>
                    </div>
                  )}

                  {/* 4. How it works — pure typography, no floating tablets competing */}
                  {f.howItWorks && (
                    <div className="mt-28 border-t border-fg/10 pt-20">
                      <Reveal>
                        <div className="eyebrow mb-8">How xoFit works</div>
                      </Reveal>
                      <MaskTextInView
                        lines={["No ruler. No transcribing."]}
                        as="span"
                        className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg md:text-5xl"
                      />
                      <Reveal delay={0.1}>
                        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/55">
                          {f.howItWorks.subhead}
                        </p>
                      </Reveal>

                      <div className="mt-16 grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
                        {f.howItWorks.steps.map((step, i) => (
                          <Reveal key={i} delay={i * 0.05}>
                            <div>
                              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">
                                Step {String(i + 1).padStart(2, "0")}
                              </div>
                              <p className="mt-4 text-[15.5px] leading-relaxed text-fg/70">
                                {step}
                              </p>
                            </div>
                          </Reveal>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 4. Features + retail photo — full-bleed editorial section per active tab */}
      <AnimatePresence mode="wait">
        {FORM_FACTORS.filter((f) => f.key === active && f.featureList).map((f) => (
          <motion.section
            key={f.key}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden border-t border-fg/10 bg-gradient-to-br from-xo-navy-deep to-xo-navy-deeper"
            data-testid={`fit-features-${f.key}`}
          >
            <div className="grid grid-cols-1 items-stretch lg:grid-cols-2">
              {f.retailImage && (
                <div className="relative min-h-[520px] lg:min-h-[720px]">
                  <img
                    src={f.retailImage}
                    alt={f.retailAlt}
                    decoding="async"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-y-0 right-0 hidden w-2/5 bg-gradient-to-l from-xo-navy-deep via-xo-navy-deep/60 to-transparent lg:block" />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-xo-navy-deep/60 to-transparent lg:hidden" />
                </div>
              )}
              <div className="flex items-center px-6 py-20 md:px-14 md:py-24 lg:px-20 lg:py-28">
                <div className="w-full max-w-xl">
                  <Reveal>
                    <div className="eyebrow mb-10 text-acc">Features</div>
                  </Reveal>
                  <ul className="space-y-0">
                    {f.featureList.map((item, i) => (
                      <Reveal key={item} delay={i * 0.04}>
                        <li className="flex items-baseline gap-6 border-t border-white/10 py-5 first:border-t-0 first:pt-0">
                          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-[15.5px] leading-snug text-white/85">
                            {item}
                          </span>
                        </li>
                      </Reveal>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </AnimatePresence>
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <MaskTextInView
              lines={["The lens is only as good", "as where it sits."]}
              as="span"
              className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/55">
                Premium lens designs assume the position they will occupy in front of
                the eye. When that position is estimated rather than measured, the
                design falls back on assumed values and the patient pays for
                performance they never receive. This is a limitation of the ruler,
                not the optician.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <div className="space-y-px overflow-hidden rounded-md border border-fg/10 bg-fg/10">
              {[
                ["~3mm", "average ruler variance among opticians"],
                ["0.09–0.24mm", "variance for digital systems"],
                ["~25%", "binocular field of view lost to a 2mm centration error"],
              ].map(([stat, label], i) => (
                <Reveal key={label} delay={i * 0.06} className="bg-surface">
                  <div className="flex items-baseline gap-6 p-8">
                    <div className="font-display text-4xl font-semibold text-acc md:text-5xl">
                      {stat}
                    </div>
                    <div className="text-[14px] leading-relaxed text-fg/55">{label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 font-mono text-xs text-fg/30">Source: Carl Zeiss Vision</p>
          </div>
        </div>
      </section>

      {/* What it measures */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">What it captures</div>
          </Reveal>
          <MaskTextInView
            lines={["Every measurement", "a lab-ready spec needs."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-md border border-fg/10 bg-fg/10 sm:grid-cols-2 lg:grid-cols-3">
            {MEASUREMENTS.map((m, i) => (
              <Reveal key={m} delay={(i % 3) * 0.05} className="bg-surface">
                <div className="flex items-center gap-4 p-6">
                  <span className="font-mono text-xs text-acc tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[15px] text-fg/75">{m}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What it delivers */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">What it delivers</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
            <Reveal>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">
                Patient Experience
              </span>
              <p className="mt-6 font-display text-2xl leading-snug tracking-tight text-fg md:text-3xl">
                The optician opens the record and the prescription is already
                there. No chart to find, no history to re-ask, just the
                fitting.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">
                Time
              </span>
              <p className="mt-6 font-display text-2xl leading-snug tracking-tight text-fg md:text-3xl">
                Digital centration in minutes replaces a measurement that
                used to mean a ruler, a second pass, and a remake when it
                didn't land.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* In the system */}
      <section className="border-t border-fg/10 bg-surface py-20">
        <div className="xo-container">
          <div className="eyebrow mb-4">In the system</div>
          <p className="max-w-2xl text-lg leading-relaxed text-fg/60">
            A complete lab-ready specification covering prescription, centration, and
            frame geometry, finished at the moment the sale is. Whether the job stays
            in the building or goes to your contracted lab, nobody rebuilds it.
          </p>
          <Link
            to="/xo-vision-care-system"
            data-testid="fit-journey-link"
            className="group mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-acc"
          >
            See the full patient journey
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </section>

      <FAQ items={FAQS} title="Fit, answered." />
      <DemoCTA
        eyebrow="Request a demo"
        headline="Send the lab exactly what you measured."
        body="A thirty-minute walkthrough of xoFit inside the full XO Vision Care System."
      />
    </div>
  );
}
