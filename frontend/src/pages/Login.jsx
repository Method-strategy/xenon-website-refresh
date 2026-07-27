import { Link } from "react-router-dom";
import { MaskText, Reveal } from "@/components/common/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";

export default function Login() {
  usePageMeta({
    title: "User Login",
    description: "Sign in to the XO Vision Care System.",
  });

  return (
    <section className="grain relative flex min-h-screen items-center overflow-hidden bg-bg pt-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
      <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
      <div className="xo-container relative">
        <div className="mx-auto max-w-md">
          <div className="eyebrow mb-6">User Login</div>
          <MaskText
            lines={["Sign in."]}
            as="span"
            className="font-display text-5xl font-medium leading-[0.97] tracking-tight text-fg sm:text-6xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-fg/55">
              Access to the XO Vision Care System is currently reserved for
              enrolled practices and program partners. Sign-in is coming soon.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 rounded-md border border-fg/10 bg-surface/60 p-8 backdrop-blur-sm">
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-xo-blue">
                Not yet enrolled?
              </div>
              <p className="mt-3 text-[15px] leading-relaxed text-fg/60">
                Request a demo to see the full patient journey and get provisioned
                for access.
              </p>
              <Link
                to="/request-a-demo"
                data-testid="login-demo-link"
                className="btn-primary mt-6 inline-flex"
              >
                Request a Demo
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
