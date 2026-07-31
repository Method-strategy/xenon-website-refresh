import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2, PlayCircle } from "lucide-react";
import { toast } from "sonner";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import FAQ from "@/components/common/FAQ";
import DemoCTA from "@/components/common/DemoCTA";
import { cn } from "@/lib/utils";
import { usePageMeta } from "@/lib/usePageMeta";

const VTO_MERCHANT_ID = "f3339032-dafa-47fe-bb1e-79a965fd4118";
const VTO_WIDGET_SRC = "https://tintvto.com/xenonophthalmics/widget.js";
const VTO_OPEN_TIMEOUT_MS = 15000;

const FORM_FACTORS = [
  {
    key: "core",
    tab: "xoFit Core",
    kind: "Stand / wall-mounted",
    intro: {
      subhead: "Precision frame fitting. Digitally guided.",
      body: "xoFit is a digital centration and measurement system designed to support accurate, repeatable frame fitting. Using advanced optical imaging and intelligent analysis, xoFit captures critical facial and frame data to support confident frame selection and produce lab-ready measurements for precise eyewear fabrication in retail and clinical environments.",
    },
    deviceImage: "/products/xofit/device.webp",
    deviceAlt: "xoFit wall-mounted precision frame fitting device",
    deviceLabel: "xoFit Core · Stand / Wall-mounted",
    tiles: [
      ["Accurate Digital Measurements", "Captures essential facial and frame parameters with consistent precision to support correct lens positioning and fabrication."],
      ["Guided Patient Positioning", "Ensures natural posture and correct gaze alignment during measurement, reducing errors and remakes."],
      ["Confident Frame Selection", "Supports real-time frame visualization and verification to help patients and staff confirm fit before production."],
      ["Lab-Ready Output", "Generates complete, standardized measurement data compatible with downstream lab and finishing workflows."],
      ["Repeatable Results", "Delivers consistent outcomes across staff, locations, and patient volumes."],
      ["Space-Efficient Integration", "Wall-mounted design minimizes footprint while maintaining a clean, professional retail or clinical environment."],
    ],
    howItWorks: {
      subhead: "Simple, fast, and accurate frame fitting in just a few easy steps.",
      screens: [
        { src: "/products/xofit/screen-1.webp", label: "Start" },
        { src: "/products/xofit/screen-2.webp", label: "Check" },
        { src: "/products/xofit/screen-3.webp", label: "Results" },
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
    retailAlt: "Optician using xoFit device in a retail eyewear environment",
  },
  {
    key: "mobile",
    tab: "xoFit Mobile",
    kind: "iPad-based / portable",
    intro: {
      subhead: "Precision measurements. Anywhere fitting happens.",
      body: "xoFit mobile is a handheld digital centration and measurement system designed for flexible, on-the-floor use. Combining advanced optical imaging with intelligent software, xoFit mobile captures accurate facial and frame data wherever the fitting interaction occurs, supporting confident frame selection and producing lab-ready measurements without requiring fixed installation.",
    },
    deviceImage: "/products/xofit/mobile-device.webp",
    deviceAlt: "xoFit mobile handheld digital centration device",
    deviceLabel: "xoFit Mobile · iPad-based / portable",
    tiles: [
      ["Mobile Measurement Flexibility", "Enables precise frame fitting and measurement anywhere in the retail environment without dedicated wall space."],
      ["Natural Patient Interaction", "Supports face-to-face fitting conversations while capturing accurate digital measurements."],
      ["Guided Accuracy", "Software-guided positioning and visual feedback help ensure correct posture, alignment, and image capture."],
      ["Lab-Ready Results", "Generates complete centration and measurement data compatible with downstream lab and finishing workflows."],
      ["Multiple Measurement Modes", "Offers easy, advanced, and expert workflows to match staff experience and prescription complexity."],
      ["Minimal Setup", "Handheld design with optional dock stand allows fast deployment without permanent installation."],
    ],
    howItWorks: {
      subhead: "Simple, fast, and accurate frame fitting in just a few easy steps.",
      screens: [
        { src: "/products/xofit/mobile-screen-1.png", label: "Start" },
        { src: "/products/xofit/mobile-screen-2.png", label: "Modes" },
        { src: "/products/xofit/mobile-screen-3.png", label: "Results" },
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
    deviceImage: "/products/xofit/frame-tryon.png",
    deviceAlt: "Split comparison of a patient's face wearing two different eyewear frames side by side, rendered through xoFrame virtual try-on",
    deviceLabel: "xoFrame · Virtual Try-On",
    deviceImageWide: true,
    tiles: [
      ["Try On Any Frame", "Patients see themselves in every frame in the collection instantly, making selection faster and decisions more confident."],
      ["Effortless Catalog Growth", "New frames are added to the virtual collection in moments, keeping the try-on catalog current with inventory."],
      ["Same-Day Eyewear via xoLab", "Completed selections are sent directly to xoLab, with finished eyewear delivered the same day, in office."],
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
      "Digital centration and frame measurement in three form factors: wall-mounted station, handheld unit and a virtual try-on patients use themselves. Measurements pass straight to finishing.",
  });
  const [active, setActive] = useState("core");
  const [vtoLoading, setVtoLoading] = useState(false);

  // The vendor widget's `.open()` returns a promise that only resolves once
  // its internal iframe/config bridge finishes. That bridge occasionally
  // never settles (vendor CDN hiccup, slow network), which previously left
  // the widget's own overlay stuck on a permanent spinner with no feedback
  // to the user and no way for us to recover. This wraps `.open()` with a
  // hard timeout so a stuck bridge surfaces a toast instead of spinning
  // forever.
  const triggerVtoOpen = (widget) => {
    let settled = false;
    const stuckTimer = setTimeout(() => {
      if (!settled) {
        toast.error("The virtual try-on is taking longer than expected. Please try again in a moment.");
      }
    }, VTO_OPEN_TIMEOUT_MS);
    Promise.resolve(widget.open())
      .then(() => {
        settled = true;
        clearTimeout(stuckTimer);
      })
      .catch(() => {
        settled = true;
        clearTimeout(stuckTimer);
        toast.error("The virtual try-on widget couldn't open. Please try again in a moment.");
      });
  };

  const openVTO = () => {
    const widget = document.querySelector("tint-vto");
    if (!widget) return;
    if (window.customElements && customElements.get("tint-vto")) {
      triggerVtoOpen(widget);
      return;
    }
    if (vtoLoading) return;
    setVtoLoading(true);
    const script = document.createElement("script");
    script.type = "module";
    script.src = VTO_WIDGET_SRC;
    script.onerror = () => {
      setVtoLoading(false);
      toast.error("The virtual try-on widget couldn't load. Please try again in a moment.");
    };
    document.head.appendChild(script);
    const defineTimer = setTimeout(() => {
      setVtoLoading(false);
      toast.error("The virtual try-on widget couldn't load. Please try again in a moment.");
    }, VTO_OPEN_TIMEOUT_MS);
    customElements.whenDefined("tint-vto").then(() => {
      clearTimeout(defineTimer);
      setVtoLoading(false);
      triggerVtoOpen(widget);
    });
  };

  return (
    <div className="acc-fit">
      {/* Persistent, page-level element — must be created exactly once and never
          torn down across tab switches. The Tint/Banuba SDK attaches its .open()
          method via internal singleton state in the custom element's constructor;
          remounting a fresh <tint-vto> on every tab switch left later instances
          without a working .open() method ("e.open is not a function"). */}
      <tint-vto merchant-id={VTO_MERCHANT_ID}></tint-vto>
      <ProductHero
        eyebrow="xoFit™ · Fit"
        logo="/logos/xofit-dark.svg"
        role="Fit"
        headlineLines={["Measurements that", "arrive at the lab", "exactly as taken."]}
        subhead="Digital centration, frame measurement, and virtual try-on, captured in the same visit that produced the prescription."
        image="/hero/xofit-measure.webp"
        imageSrcSet="/hero/xofit-measure-1200.webp 1200w, /hero/xofit-measure.webp 1920w"
        imageAlt="Digital centration measurements — pupillary distance, frame geometry, segment height — overlaid on a patient's face"
        imageAlt="Optical fitting environment"
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
            className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
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
                          <h3 className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg md:text-5xl lg:text-6xl">
                            {f.intro.subhead}
                          </h3>
                        </Reveal>
                        <Reveal delay={0.1}>
                          <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg/60">
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
                          <div className="relative w-full">
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

                  {/* 3a. Virtual try-on trigger — xoFrame only. Widget script is deferred until click. */}
                  {f.vto && (
                    <div className="mt-28 border-t border-fg/10 pt-16 text-center">
                      <Reveal>
                        <div className="eyebrow mb-6">Try it yourself</div>
                      </Reveal>
                      <Reveal delay={0.05}>
                        <button
                          type="button"
                          id="vto-trigger"
                          data-testid="vto-trigger-button"
                          onClick={openVTO}
                          disabled={vtoLoading}
                          className="btn-primary mx-auto"
                        >
                          {vtoLoading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" /> Loading
                            </>
                          ) : (
                            <>
                              <PlayCircle className="h-4 w-4" /> Try xoFrame Demo
                            </>
                          )}
                        </button>
                      </Reveal>
                      <Reveal delay={0.1}>
                        <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-fg/40">
                          See a live sample of the virtual try-on technology
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
                        lines={["Simple. Fast. Accurate."]}
                        as="span"
                        className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg md:text-5xl"
                      />
                      <Reveal delay={0.1}>
                        <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg/55">
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
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
            <Reveal delay={0.1}>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-fg/55">
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
            className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
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
