import { Link } from "react-router-dom";
import { Linkedin, Facebook, Instagram, MapPin, Mail } from "lucide-react";
import { PRODUCTS } from "@/data/site";
import { openCookiePreferences } from "@/components/common/CookieConsent";

const companyLinks = [
  { label: "About Us", to: "/about" },
  { label: "Our Team", to: "/team" },
  { label: "Blog", to: "/blog" },
  { label: "News", to: "/news" },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/xopthalmics/",
    Icon: Linkedin,
  },
  {
    label: "X",
    href: "https://x.com/XOphthalmics",
    // Custom X wordmark since lucide's Twitter icon still uses the bird
    Icon: (props) => (
      <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M18.244 2H21l-6.522 7.455L22 22h-6.797l-5.324-6.98L3.8 22H1.043l6.98-7.98L2 2h6.914l4.803 6.35L18.244 2Zm-2.383 18.4h1.874L7.24 3.5H5.23L15.86 20.4Z" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/XOphalmics",
    Icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/xophthalmics/",
    Icon: Instagram,
  },
];

export default function Footer() {
  return (
    <footer
      data-testid="site-footer"
      className="relative border-t border-white/10 bg-gradient-to-b from-xo-navy-deep to-xo-navy-deeper"
    >
      <div className="xo-container py-20">
        {/* Top row: brand column + Products + Company + Contact */}
        <div className="grid grid-cols-1 gap-14 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <img
              src="/logos/xenon-corp-dark.svg"
              alt="Xenon Ophthalmics"
              width={225}
              height={77}
              className="h-14 w-auto"
            />
            <p className="mt-6 text-[15px] leading-relaxed text-white/70">
              Building the future of vision care.
            </p>

            {/* Socials */}
            <div className="mt-10 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  data-testid={`footer-social-${label.toLowerCase()}`}
                  className="group flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 ring-1 ring-white/10 transition-all duration-300 hover:bg-white/10 hover:text-white hover:ring-white/25"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="md:col-span-2">
            <div className="eyebrow mb-6 text-white/80">Products</div>
            <ul className="space-y-4">
              {PRODUCTS.map((p) => (
                <li key={p.key}>
                  <Link
                    to={p.to}
                    data-testid={`footer-link-${p.key}`}
                    className="font-display text-[17px] text-white/80 transition-colors hover:text-xo-blue"
                  >
                    {p.name}
                    <sup className="ml-0.5 text-[0.55em] top-[-0.6em] relative">™</sup>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-3">
            <div className="eyebrow mb-6 text-white/80">Company</div>
            <ul className="space-y-4">
              {companyLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    data-testid={`footer-link-${l.label.replace(/\s+/g, "-").toLowerCase()}`}
                    className="font-display text-[17px] text-white/80 transition-colors hover:text-xo-blue"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <div className="eyebrow mb-6 text-white/80">Contact</div>
            <div className="space-y-4 text-[15px] leading-relaxed text-white/70">
              <div className="flex gap-3">
                <MapPin className="mt-1 h-4 w-4 shrink-0 text-white/40" />
                <span>
                  525 Washington Blvd, Suite 300
                  <br />
                  Jersey City, NJ 07310
                  <br />
                  United States
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-white/40" />
                <a
                  href="mailto:info@xophthalmics.com"
                  data-testid="footer-email"
                  className="text-white/80 underline-offset-4 transition-colors hover:text-xo-blue hover:underline"
                >
                  info@xophthalmics.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom row: copyright | utility links */}
        <div className="mt-20 flex flex-col gap-4 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="whitespace-nowrap font-mono text-[10.5px] uppercase tracking-[0.1em] text-white/40">
            © 2022–2026 Xenon Ophthalmics Inc. All rights reserved.
          </p>
          <ul className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[10.5px] uppercase tracking-[0.06em] text-white/50">
            <li>
              <button
                type="button"
                onClick={openCookiePreferences}
                data-testid="footer-cookie-preferences"
                className="transition-colors hover:text-white"
              >
                COOKIE PREFERENCES
              </button>
            </li>
            <li aria-hidden className="text-white/20">·</li>
            <li>
              <Link
                to="/privacy-policy"
                data-testid="footer-privacy"
                className="transition-colors hover:text-white"
              >
                PRIVACY POLICY
              </Link>
            </li>
            <li aria-hidden className="text-white/20">·</li>
            <li>
              <Link
                to="/cookie-policy"
                data-testid="footer-cookie-policy"
                className="transition-colors hover:text-white"
              >
                COOKIE POLICY
              </Link>
            </li>
            <li aria-hidden className="text-white/20">·</li>
            <li>
              <Link
                to="/terms-and-conditions"
                data-testid="footer-terms"
                className="transition-colors hover:text-white"
              >
                TERMS OF SERVICE
              </Link>
            </li>
            <li aria-hidden className="text-white/20">·</li>
            <li>
              <a
                href="mailto:support@xophthalmics.com?subject=Support%20Request"
                data-testid="footer-support"
                className="transition-colors hover:text-white"
              >
                SUPPORT
              </a>
            </li>
            <li aria-hidden className="text-white/20">·</li>
            <li>
              <a
                href="https://methodmarketinggroup.com/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="footer-method"
                className="transition-colors hover:text-white"
              >
                POWERED BY METHOD
              </a>
            </li>
          </ul>
        </div>

        {/* Final line: Do Not Sell */}
        <div className="mt-6">
          <button
            type="button"
            onClick={openCookiePreferences}
            data-testid="footer-do-not-sell"
            className="font-mono text-[10.5px] uppercase tracking-[0.06em] text-white/40 transition-colors hover:text-white/80"
          >
            DO NOT SELL OR SHARE MY PERSONAL INFORMATION
          </button>
        </div>
      </div>
    </footer>
  );
}
