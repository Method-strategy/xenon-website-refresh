import { MaskText, Reveal } from "@/components/common/Reveal";
import { RichText } from "@/components/common/RichText";
import { usePageMeta } from "@/lib/usePageMeta";

const SECTIONS = [
  {
    id: "coverage",
    heading: "1. What this policy covers",
    body: [
      'This Cookie Policy explains how Xenon Ophthalmics, Inc. uses cookies, pixels, tags, software development kits, session-replay tools, and similar technologies ("cookies") on xophthalmics.com. It supplements our Privacy Policy.',
    ],
  },
  {
    id: "consent",
    heading: "2. Your consent and control",
    body: [
      {
        rich: [
          'With the exception of strictly necessary cookies, we do not place or activate cookies until you consent. You provide consent through our banner or Preferences Center, where all non-essential categories are off by default. You may change or withdraw your choices at any time via the "Cookie Preferences" link in our footer. We honor recognized browser opt-out signals, including Global Privacy Control (GPC).',
        ],
      },
      "How that works in practice on this site: the code for every non-essential category is withheld from your browser entirely until you turn that category on, so there is nothing to opt out of before you choose. When your browser sends a GPC signal, we detect it, we tell you so in the Preferences Center, and nothing in Marketing/Advertising runs unless you turn it on yourself. When you turn a category off, that provider's cookies are deleted from your browser immediately.",
    ],
  },
];

const COOKIE_TABLE = [
  {
    category: "Strictly Necessary",
    provider: "Xenon Ophthalmics",
    names: "xo_consent_v1",
    party: "First",
    purpose: "Runs the site and remembers your cookie choice",
    type: "Browser local storage",
    duration: "12 months",
    policy: { label: "Privacy Policy", to: "/privacy-policy" },
  },
  {
    category: "Strictly Necessary",
    provider: "Cloudflare",
    names: "__cf_bm",
    party: "Third",
    purpose: "Distinguishes humans from bots to protect the site",
    type: "HTTP",
    duration: "About 30 minutes",
    policy: { label: "cloudflare.com/privacypolicy", href: "https://www.cloudflare.com/privacypolicy/" },
  },
  {
    category: "Strictly Necessary",
    provider: "Square (order pages only)",
    names: "—",
    party: "Third",
    purpose: "Payment security and fraud prevention during checkout",
    type: "HTTP",
    duration: "Set by Square",
    policy: { label: "squareup.com/legal/privacy", href: "https://squareup.com/legal/privacy" },
  },
  {
    category: "Analytics/Performance",
    provider: "Google (Google Analytics)",
    names: "_ga, _ga_4XF4J9Z8MC",
    party: "Third",
    purpose: "Measures how the site is used, in aggregate",
    type: "HTTP",
    duration: "Up to 2 years",
    policy: { label: "policies.google.com/privacy", href: "https://policies.google.com/privacy" },
  },
  {
    category: "Translation",
    provider: "Google (Google Translate)",
    names: "googtrans",
    party: "First",
    purpose: "Translates pages into other languages and remembers the language you chose",
    type: "HTTP",
    duration: "Until you close your browser",
    policy: { label: "policies.google.com/privacy", href: "https://policies.google.com/privacy" },
  },
  {
    category: "Marketing/Advertising",
    provider: "HubSpot",
    names: "hubspotutk",
    party: "Third",
    purpose: "Identifies your browser to HubSpot",
    type: "HTTP",
    duration: "About 6 months",
    policy: { label: "legal.hubspot.com/privacy-policy", href: "https://legal.hubspot.com/privacy-policy" },
  },
  {
    category: "Marketing/Advertising",
    provider: "HubSpot",
    names: "__hstc",
    party: "Third",
    purpose: "Records visit history for our account",
    type: "HTTP",
    duration: "About 6 months",
    policy: { label: "legal.hubspot.com/privacy-policy", href: "https://legal.hubspot.com/privacy-policy" },
  },
  {
    category: "Marketing/Advertising",
    provider: "HubSpot",
    names: "__hssc",
    party: "Third",
    purpose: "Tracks the current session",
    type: "HTTP",
    duration: "About 30 minutes",
    policy: { label: "legal.hubspot.com/privacy-policy", href: "https://legal.hubspot.com/privacy-policy" },
  },
  {
    category: "Marketing/Advertising",
    provider: "HubSpot",
    names: "__hssrc",
    party: "Third",
    purpose: "Marks the start of a session",
    type: "HTTP",
    duration: "Until you close your browser",
    policy: { label: "legal.hubspot.com/privacy-policy", href: "https://legal.hubspot.com/privacy-policy" },
  },
];

const SECTIONS_AFTER_TABLE = [
  {
    id: "sale-sharing",
    heading: "4. Sale/sharing and your state privacy rights",
    body: [
      {
        rich: [
          "Depending on your state of residence, you may have rights to opt out of sale/sharing and targeted advertising, and to access, correct, or delete your data. To exercise these rights, use our Do Not Sell or Share My Personal Information control, which turns the Marketing/Advertising category off and deletes its cookies immediately, or see our ",
          { to: "/privacy-policy", label: "Privacy Policy" },
          ".",
        ],
      },
    ],
  },
  {
    id: "sensitive-info",
    heading: "5. No sensitive information",
    body: [
      "This is a business-to-business site used for marketing. We do not seek or intentionally collect sensitive personal information through this site, and you should not submit it to us.",
    ],
  },
  {
    id: "manage",
    heading: "6. How to manage cookies",
    body: [
      "You can manage preferences through our Preferences Center and through your browser settings. Disabling some cookies may affect site functionality.",
    ],
  },
  {
    id: "changes-contact",
    heading: "7. Changes and contact",
    body: [
      {
        rich: [
          "We will update this policy as our practices or applicable law change and may re-request consent where required. Questions: ",
          { href: "mailto:privacy@xophthalmics.com", label: "privacy@xophthalmics.com" },
          ".",
        ],
      },
    ],
  },
];

const TOC = [
  { id: "coverage", label: "1. What this policy covers" },
  { id: "consent", label: "2. Your consent and control" },
  { id: "categories", label: "3. Categories of cookies we use" },
  { id: "sale-sharing", label: "4. Sale/sharing and your rights" },
  { id: "sensitive-info", label: "5. No sensitive information" },
  { id: "manage", label: "6. How to manage cookies" },
  { id: "changes-contact", label: "7. Changes and contact" },
];

function Body({ items }) {
  return items.map((item, i) => {
    if (typeof item === "string") {
      return (
        <p key={i} className="text-[15.5px] leading-relaxed text-fg/70">
          {item}
        </p>
      );
    }
    if (item.rich) {
      return (
        <p key={i} className="text-[15.5px] leading-relaxed text-fg/70">
          <RichText segments={item.rich} />
        </p>
      );
    }
    return null;
  });
}

function CookieTable() {
  return (
    <div>
      {/* Desktop table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[900px] border-y border-fg/10 text-left text-[13px]">
          <thead>
            <tr className="border-b border-fg/10 font-mono text-[10px] uppercase tracking-[0.15em] text-fg/40">
              <th className="py-4 pr-4 font-normal">Category</th>
              <th className="py-4 pr-4 font-normal">Provider</th>
              <th className="py-4 pr-4 font-normal">Cookie names</th>
              <th className="py-4 pr-4 font-normal">Party</th>
              <th className="py-4 pr-4 font-normal">Purpose</th>
              <th className="py-4 pr-4 font-normal">Type</th>
              <th className="py-4 pr-4 font-normal">Duration</th>
              <th className="py-4 font-normal">Policy</th>
            </tr>
          </thead>
          <tbody>
            {COOKIE_TABLE.map((row, i) => (
              <tr key={i} className="border-b border-fg/5 align-top text-fg/70 last:border-0">
                <td className="py-4 pr-4 font-medium text-fg">{row.category}</td>
                <td className="py-4 pr-4">{row.provider}</td>
                <td className="py-4 pr-4 font-mono text-[12px] text-fg/60">{row.names}</td>
                <td className="py-4 pr-4">{row.party}</td>
                <td className="py-4 pr-4">{row.purpose}</td>
                <td className="py-4 pr-4">{row.type}</td>
                <td className="py-4 pr-4">{row.duration}</td>
                <td className="py-4">
                  <RichText segments={[row.policy]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards */}
      <div className="space-y-6 border-t border-fg/10 md:hidden">
        {COOKIE_TABLE.map((row, i) => (
          <div key={i} className="border-b border-fg/10 pb-6 pt-6 text-[13.5px]">
            <div className="font-mono text-[10px] uppercase tracking-[0.15em] text-xo-blue">
              {row.category}
            </div>
            <div className="mt-2 font-display text-base text-fg">{row.provider}</div>
            <dl className="mt-3 space-y-1.5 text-fg/60">
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-fg/40">Cookie(s)</dt>
                <dd className="font-mono text-[12px]">{row.names}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-fg/40">Party</dt>
                <dd>{row.party}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-fg/40">Purpose</dt>
                <dd>{row.purpose}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-fg/40">Type</dt>
                <dd>{row.type}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-fg/40">Duration</dt>
                <dd>{row.duration}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-24 shrink-0 text-fg/40">Policy</dt>
                <dd>
                  <RichText segments={[row.policy]} />
                </dd>
              </div>
            </dl>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CookiePolicy() {
  usePageMeta({
    title: "Cookie Policy",
    description:
      "How Xenon Ophthalmics uses cookies, pixels, and similar technologies on xophthalmics.com, by category, provider, and duration.",
  });

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex min-h-[50vh] items-end overflow-hidden bg-bg pb-16 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="xo-container relative">
          <div className="eyebrow mb-8">Legal · Cookies</div>
          <MaskText
            lines={["Cookie Policy"]}
            as="span"
            className="font-display text-5xl font-medium leading-[0.97] tracking-tight text-fg sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/60">
              Every cookie we use on xophthalmics.com, by category, provider,
              purpose, type, and how long it lasts. This supplements our{" "}
              <a
                href="/privacy-policy"
                className="text-fg underline decoration-fg/25 underline-offset-4 hover:text-xo-blue"
              >
                Privacy Policy
              </a>
              .
            </p>
          </Reveal>
          <div className="mt-10 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/40">
            Last updated: July 23, 2026
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="border-t border-fg/10 bg-bg py-20 md:py-28">
        <div className="xo-container grid gap-16 md:grid-cols-12">
          <aside className="hidden md:col-span-3 md:block">
            <div className="sticky top-32">
              <div className="eyebrow mb-4">Contents</div>
              <ul className="space-y-3 text-[13px] text-fg/50">
                {TOC.map((t) => (
                  <li key={t.id}>
                    <a href={`#${t.id}`} className="hover:text-xo-blue">
                      {t.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="md:col-span-9">
            <div className="prose-legal space-y-14">
              {SECTIONS.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="mb-6 font-display text-2xl font-medium text-fg md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-5">
                    <Body items={section.body} />
                  </div>
                </div>
              ))}

              {/* Categories of cookies (table) */}
              <div id="categories" className="scroll-mt-32">
                <h2 className="mb-6 font-display text-2xl font-medium text-fg md:text-3xl">
                  3. Categories of cookies we use
                </h2>
                <p className="text-[15.5px] leading-relaxed text-fg/70">
                  The cookie details table below lists each cookie by
                  category, including its provider, purpose, type, and
                  duration. Only strictly necessary cookies are active by
                  default; all other categories are off until you turn them
                  on. Marketing/Advertising may involve a "sale"/"sharing" or
                  "targeted advertising" under certain state laws.
                </p>
                <div className="mt-8">
                  <CookieTable />
                </div>
                <p className="mt-6 text-[14px] leading-relaxed text-fg/55">
                  Two things worth naming plainly. xo_consent_v1 is a browser
                  local storage entry rather than an HTTP cookie, which means
                  it is never transmitted to any server, including ours. The
                  Translation and Marketing cookies only ever exist after you
                  turn those categories on, and they are deleted from your
                  browser the moment you turn them back off.
                </p>
              </div>

              {SECTIONS_AFTER_TABLE.map((section) => (
                <div key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="mb-6 font-display text-2xl font-medium text-fg md:text-3xl">
                    {section.heading}
                  </h2>
                  <div className="space-y-5">
                    <Body items={section.body} />
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
