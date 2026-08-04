import { Link } from "react-router-dom";
import { Reveal } from "@/components/common/Reveal";
import { cn } from "@/lib/utils";

// Reusable demo call-to-action band. When used as the second of two stacked
// blocks inside one section (e.g. Home.jsx section 05), pass eyebrow="" and
// topBorder={false} so it reads as one section rather than two.
export default function DemoCTA({
  eyebrow = "See it work",
  headline = "See the whole journey in thirty minutes.",
  body = "A working walkthrough of the XO Vision Care System, scheduling through finished eyewear, against your practice's actual workflow.",
  topBorder = true,
}) {
  return (
    <section
      data-testid="demo-cta"
      className={cn(
        "relative overflow-hidden bg-bg",
        topBorder ? "border-t border-fg/10 py-28 md:py-40" : "pb-28 pt-6 md:pb-40",
      )}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="xo-container relative">
        {eyebrow && (
          <Reveal>
            <div className="eyebrow mb-6">{eyebrow}</div>
          </Reveal>
        )}
        <Reveal delay={0.05}>
          <h2 className="max-w-4xl font-display text-4xl font-medium leading-[1.02] tracking-tight text-fg sm:text-5xl lg:text-6xl">
            {headline}
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-fg/55">
            {body}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <Link to="/request-a-demo" data-testid="demo-cta-button" className="btn-primary mt-10">
            Request a Demo
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
