import { Link } from "react-router-dom";
import { MaskText } from "@/components/common/Reveal";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-xo-obsidian">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
      <div className="xo-container relative text-center">
        <div className="font-mono text-sm uppercase tracking-[0.3em] text-xo-teal">404</div>
        <MaskText
          lines={["This page isn't", "on the schedule."]}
          as="span"
          className="mt-6 font-display text-5xl font-medium leading-[0.95] tracking-tight text-white lg:text-7xl"
        />
        <div className="mt-12">
          <Link to="/" data-testid="notfound-home" className="btn-primary">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
