import { Link } from "react-router-dom";
import { MaskText } from "@/components/common/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";

export default function NotFound() {
  usePageMeta({ title: "Page not found" });
  return (
    <section className="grain relative flex min-h-screen items-center justify-center overflow-hidden bg-bg">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
      <div className="xo-container relative text-center">
        <div className="font-mono text-sm uppercase tracking-[0.3em] text-xo-blue">404</div>
        <MaskText
          lines={["This page isn't", "on the schedule."]}
          as="span"
          className="mt-6 font-display text-4xl font-medium leading-[0.97] tracking-tight text-fg lg:text-6xl"
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
