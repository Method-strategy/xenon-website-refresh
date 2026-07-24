import { Link } from "react-router-dom";
import { PRODUCTS } from "@/data/site";

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Team", to: "/team" },
  { label: "News & Insights", to: "/news" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/10 bg-gradient-to-b from-xo-navy to-xo-obsidian"
    >
      <div className="xo-container py-20">
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-4">
              <img
                src="/logos/xenon-corp-dark.svg"
                alt="Xenon Ophthalmics"
                className="h-12 w-auto md:h-14"
              />
              <span className="border-l border-white/15 pl-4 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] text-white/55">
                Building the future
                <br />
                of vision care
              </span>
            </div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
              Founded in 2019, Xenon Ophthalmics builds technology to make eye
              care deliverable anywhere — one system, from appointment to
              finished eyewear.
            </p>
            <div className="mt-8 font-mono text-xs leading-relaxed text-white/40">
              525 Washington Blvd, Suite 300
              <br />
              Jersey City, NJ 07310
              <br />
              <a
                href="mailto:info@xophthalmics.com"
                data-testid="footer-email"
                className="mt-2 inline-block text-xo-blue transition-colors hover:text-white"
              >
                info@xophthalmics.com
              </a>
            </div>
          </div>

          <div className="md:col-span-4">
            <div className="eyebrow mb-6">The XO System</div>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/xo-vision-care-system"
                  className="font-display text-lg text-white/80 transition-colors hover:text-xo-blue"
                >
                  Overview
                </Link>
              </li>
              {PRODUCTS.map((p) => (
                <li key={p.key}>
                  <Link
                    to={p.to}
                    data-testid={`footer-link-${p.key}`}
                    className="group flex items-baseline gap-3 font-display text-lg text-white/80 transition-colors hover:text-xo-blue"
                  >
                    {p.name}
                    <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                      {p.role}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-6">Company</div>
            <ul className="space-y-4">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    data-testid={`footer-link-${l.label.split(" ")[0].toLowerCase()}`}
                    className="font-display text-lg text-white/80 transition-colors hover:text-xo-blue"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            © 2022–2026 Xenon Ophthalmics Inc. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30">
            XO™ Vision Care System
          </p>
        </div>
      </div>
    </footer>
  );
}
