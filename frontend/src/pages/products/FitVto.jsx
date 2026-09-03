import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, PlayCircle } from "lucide-react";
import ProductHero from "@/components/common/ProductHero";
import { MaskTextInView, Reveal } from "@/components/common/Reveal";
import DemoCTA from "@/components/common/DemoCTA";
import { loadTintWidget } from "@/lib/tintVto";
import { usePageMeta } from "@/lib/usePageMeta";

const TINT_PUBLISHABLE_KEY = process.env.REACT_APP_TINT_PUBLISHABLE_KEY;
const TINT_VARIANT_ID = process.env.REACT_APP_TINT_VARIANT_ID;

const FEATURES = [
  "Real-time virtual try-on in any browser, on any device, with no app to download",
  "The practice's own inventory, plus an expanded catalog of frames the practice can order but does not need to inventory",
  "Patients save the frames they like, and those selections reach the practice before the visit",
  "Precise face tracking with true color, texture, and lighting",
  "Pupillary distance measured from the camera",
  "Sent to the patient from xoIris at the time of booking",
  "The patient's selection carries into the fitting record and on to finishing",
];

const DELIVERS = [
  ["Capture Rate", "A patient who has already chosen frames from the practice's own catalog is far less likely to leave with only a prescription."],
  ["Inventory Reach", "Offer the full range you can order rather than the range you can display."],
  ["Stronger Dispensary Encounter", "The optician begins with the patient's own selections rather than an introduction."],
  ["More Room to Sell", "With the frame conversation already underway, the optician has the opening to discuss lens options, coatings and add-ons, and a second pair such as prescription sunglasses."],
];

export default function FitVto() {
  usePageMeta({
    title: "xoFit VTO: Virtual Try-On",
    description:
      "xoFit VTO puts the practice's own inventory in front of the patient wherever they are, before they ever walk in, so the optician already knows what they chose.",
  });

  const vtoRef = useRef(null);
  const vtoReadyPromiseRef = useRef(null);
  const [vtoStatus, setVtoStatus] = useState("idle"); // idle | loading | ready | error

  // Eagerly start loading the Tint script on mount, instead of waiting for
  // the button click, so the slow part (script fetch + widget init) happens
  // in the background while the patron reads the page.
  useEffect(() => {
    if (TINT_PUBLISHABLE_KEY) {
      loadTintWidget().catch(() => {});
    }
  }, []);

  // Tint's element fires a "ready" event once its own internal init is
  // actually done. Track it so openVto() never fires before the widget can
  // respond, which would otherwise silently no-op and require a second click.
  useEffect(() => {
    if (!vtoRef.current) return;
    const el = vtoRef.current;
    let resolveReady;
    vtoReadyPromiseRef.current = new Promise((resolve) => {
      resolveReady = resolve;
      el.addEventListener("ready", resolve, { once: true });
    });
    const onWidgetError = () => setVtoStatus("error");
    el.addEventListener("error", onWidgetError);
    return () => {
      el.removeEventListener("ready", resolveReady);
      el.removeEventListener("error", onWidgetError);
    };
  }, []);

  const openVto = async () => {
    setVtoStatus("loading");
    try {
      const minLoadingState = new Promise((resolve) => setTimeout(resolve, 250));
      await loadTintWidget();
      await Promise.race([
        vtoReadyPromiseRef.current ?? new Promise(() => {}),
        new Promise((resolve) => setTimeout(resolve, 4000)),
      ]);
      await minLoadingState;
      setVtoStatus("ready");
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
        eyebrow="xoFit VTO™ · Virtual Try-On"
        logo="/logos/xofit-dark.svg"
        logoWidth={102}
        logoHeight={25}
        role="VTO"
        headlineLines={["The dispensary starts", "before the patient arrives."]}
        backTo="/xofit-frame-fitting"
        backLabel="xoFit"
        image="/products/xofit/vto-hero.webp"
        imageAlt="A patient virtually trying on glasses with a real-time AR face mesh and frame selection card"
      />

      {/* Overview */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Overview</div>
            </Reveal>
            <MaskTextInView
              lines={["The frame selection starts", "before the visit does."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                Patients research eyewear the way they research everything
                else, and online eyewear retailers have spent a decade making
                that easy. The independent practice usually loses that
                comparison before it starts, because there is nothing for the
                patient to browse until they are standing at the frame board.
                xoFit VTO puts the practice's own inventory in front of the
                patient wherever they are. They try frames on in a browser,
                on any device, with no app to download. They save the frames
                they like. And when they arrive, the optician already knows
                what they chose.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How it changes the dispensary */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">How It Changes the Dispensary</div>
          </Reveal>
          <MaskTextInView
            lines={["The optician stops", "starting from zero."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-fg/55">
              The sequence is a familiar one in most practices. The patient
              finishes the exam, walks to the dispensary, looks around, and
              when the optician offers help, says they are just looking. The
              encounter begins with nothing, and a meaningful share of those
              patients leave with a prescription instead of eyewear. With
              xoFit VTO, the optician begins the conversation with the frames
              the patient already selected. The frames the patient saved at
              home are ready to try, along with comparable alternatives for
              any frame the practice does not have in stock that day. The
              conversation starts at selection rather than at introduction.
              That also changes what the optician's expertise looks like.
              When a prescription needs a deeper lens shape to support a
              progressive corridor, or a heavier frame to carry lens
              thickness, or a different temple length for the patient's face,
              the optician is refining a choice the patient already made
              rather than talking them out of one. The frame preference
              belongs to the patient. The fit judgment belongs to the
              optician. Both work better when the conversation does not
              begin from nothing.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Catalog without floor space */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">Catalog Without Floor Space</div>
            </Reveal>
            <MaskTextInView
              lines={["Show more than the", "frame board can hold."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                A frame board is limited by wall space and capital. The
                virtual catalog is not. A practice can offer the full range
                it can order, not only the range it can display, and add a
                new frame to the catalog in moments. That is the same
                argument the rest of the system makes. xoExam adds testing
                capability without adding a lane. xoLab adds finishing
                without adding a lab. xoFit VTO adds inventory without
                adding square footage.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* How the patient gets there */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="eyebrow mb-6">How the Patient Gets There</div>
            </Reveal>
            <MaskTextInView
              lines={["The link reaches the", "patient through xoIris."]}
              as="span"
              className="font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
            />
          </div>
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-lg leading-relaxed text-fg/60">
                When an appointment is booked, the practice can send an
                invitation to start choosing eyewear, with a link to its own
                catalog. The patient browses in the days before the visit
                rather than for the first time in the dispensary. The frames
                the patient saves come back to the practice the same way, so
                the optician has them before the patient arrives.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* The technology */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">The Technology</div>
          </Reveal>
          <MaskTextInView
            lines={["Accurate enough", "to decide from."]}
            as="span"
            className="max-w-4xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg sm:text-5xl"
          />
          <div className="mt-14 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            <Reveal delay={0.1} className="lg:col-span-6">
              <p className="max-w-xl text-lg leading-relaxed text-fg/55">
                Precise real-time face tracking keeps frames positioned
                correctly as the patient moves, and the rendering carries
                true color, texture, lighting, and the way a frame actually
                sits. Pupillary distance is measured from the camera alone,
                with no ruler or reference card, so what the patient sees on
                screen closely matches how the frame will look in person.
                Full centration measurement still happens at the fitting.
                xoFit Core and xoFit Mobile capture segment height, vertical
                optical center, and frame geometry, which is what a
                progressive requires and what a camera cannot deliver on its
                own. VTO decides the frame. The measurement that drives the
                lens happens in the practice, with xoFit Core or xoFit
                Mobile.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-6">
              <img
                src="/products/xofit/vto-technology-flow.webp"
                alt="Four-step xoFit VTO capture flow: face capture, face-mesh tracking, frame selection, and rendered result"
                width={2000}
                height={908}
                className="w-full border border-fg/10"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">Features</div>
          </Reveal>
          <div className="divide-y divide-fg/10 border-t border-fg/10">
            {FEATURES.map((item, i) => (
              <Reveal key={item} delay={i * 0.04}>
                <div className="flex items-start gap-4 py-5">
                  <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-acc/60" />
                  <span className="flex-1 text-[15px] leading-relaxed text-fg/70">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What it delivers */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">What it Delivers</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-x-14 gap-y-12 md:grid-cols-2">
            {DELIVERS.map(([label, body], i) => (
              <Reveal key={label} delay={i * 0.06}>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-acc">{label}</span>
                <p className="mt-4 text-[15.5px] leading-relaxed text-fg/60">{body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Try it now */}
      <section className="border-t border-fg/10 bg-surface py-24 text-center md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-6">See it in Action</div>
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
              {vtoStatus === "loading" ? "Loading..." : "Try xoFit VTO"}
            </button>
          </Reveal>
          {vtoStatus === "error" && (
            <p data-testid="vto-error-message" className="mt-4 text-sm text-red-400">
              Unable to open the virtual try-on right now. Please try again in a moment.
            </p>
          )}
          <Reveal delay={0.1}>
            <p className="mt-5 font-mono text-xs uppercase tracking-[0.15em] text-fg/40">
              A live try-on window will open. Look for the close control in its corner.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-fg/10 bg-bg py-16">
        <div className="xo-container">
          <Link
            to="/xofit-frame-fitting"
            data-testid="vto-back-link"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-acc"
          >
            <ArrowUpRight className="h-4 w-4 rotate-[-135deg] transition-transform duration-300 group-hover:-translate-x-1" />
            Back to xoFit overview
          </Link>
        </div>
      </section>

      <DemoCTA
        eyebrow="Request a demo"
        headline="See xoFit VTO with your own catalog."
        body="A thirty-minute walkthrough of xoFit VTO inside the full XO Vision Care System."
      />
    </div>
  );
}
