import { MaskText, Reveal } from "@/components/common/Reveal";
import { usePageMeta } from "@/lib/usePageMeta";

const SECTIONS = [
  {
    heading: "Who we are",
    body: [
      "Xenon Ophthalmics Inc.",
      "525 Washington Blvd, Suite 300",
      "Jersey City, NJ 07310, United States",
      { email: "privacy@xophthalmics.com" },
    ],
  },
  {
    heading: "The short version",
    body: [
      "We collect what you type into our forms, and standard server logs that keep the site secure.",
      "Nothing that tracks you runs unless you switch it on. Analytics, HubSpot, and page translation are all off by default and each has its own toggle in our cookie preferences.",
      'We do not run ads on this site. If you turn on Marketing/Advertising, that category may involve a "sale" or "sharing" under some US state laws, and you can turn it back off at any time. Card payments go straight to Square, never through our servers.',
    ],
  },
  {
    heading: "What we collect and why",
    subsections: [
      {
        heading: "Information you give us",
        intro:
          "Our forms are the main way we collect personal information, and you always see exactly what you are sending:",
        list: [
          ["Contact and demo requests.", "Name, email, phone, organization, and your message. We use these to answer you and to schedule what you asked for."],
          ["Media release form.", "The details on the form plus your drawn signature, captured in the browser. We use it to document your consent to be filmed or photographed."],
          ["Order and preorder forms.", "Contact and shipping details, your product choices, your signature where required, and payment through Square (see Payments below)."],
        ],
        body: [
          "Form submissions are stored on our website's server and sent to us by email. We keep them as long as we need them to handle your request and to meet business and legal record-keeping obligations. If you have turned on Marketing/Advertising, HubSpot also receives form submissions so we can follow up properly.",
        ],
      },
      {
        heading: "Server logs and security",
        body: [
          "Our site runs on WP Engine behind Cloudflare. Like nearly every website, both keep standard server logs: IP address, browser type, pages requested, and timestamps. We use them only for security, troubleshooting, and keeping the site online, and they rotate out on the hosts' standard schedules. Cloudflare also sets a short-lived cookie, __cf_bm (about 30 minutes), to tell humans from bots. That one is strictly necessary and is the only cookie that exists before you make any choices, apart from the one that stores those choices.",
        ],
      },
    ],
  },
  {
    heading: "Cookies and your consent",
    body: [
      "In short: when you first visit, nothing optional runs. A banner asks for your choice, with Accept all, Decline all, and Preferences carrying equal weight. Analytics/Performance, Marketing/Advertising, and Translation each have their own independent toggle, all off by default. Your choice is stored in your browser, not on our servers, and you can change it any time using the Cookie Preferences link in the footer of every page.",
    ],
    subsections: [
      {
        heading: "How your choice works",
        body: [
          "Your decision lives in your browser in a single small entry named xo_consent_v1. It records which categories you turned on and when, identifies no one, and is never sent anywhere, including to us. We ask again after 12 months, or sooner if we add a new category. Declining is one click and never degrades the parts of the site we control.",
          "Nothing in a category loads until you turn that category on. We do not load tracking code in a paused or limited state, and we do not send anonymous pings while you have not decided. Withdrawing consent is immediate: turn a toggle off and that category's cookies are deleted from your browser on the spot, and its code stops loading.",
          "We honor recognized browser opt-out signals, including Global Privacy Control. If your browser sends one, we detect it, we say so in the Preferences Center, and nothing in Marketing/Advertising runs unless you turn it on there yourself.",
        ],
      },
    ],
  },
  {
    heading: "Payments (Square)",
    body: [
      "Payments on our order pages are processed by Square. The card fields are hosted by Square inside secure frames on the page: what you type in them goes directly to Square and never touches our servers. Square sets its own cookies inside those frames for payment security and fraud prevention; they are part of making the payment work.",
    ],
  },
  {
    heading: "Embedded videos",
    body: [
      "Product videos hosted on our own server play with no third party involved. YouTube videos on our site are click-to-play: you see a preview image, and YouTube's player loads only when you press play, in YouTube's privacy-enhanced mode. Pressing play means YouTube (Google) learns your IP address and may set its own cookies on its own domain, governed by Google's privacy policy.",
    ],
  },
  {
    heading: "Virtual try-on (xoFit)",
    body: [
      "The frame try-on feature on our xoFit page is provided by TINT (built on Banuba technology). Nothing from TINT loads when the page opens. When you tap the try-on button, the feature loads from TINT's servers and your browser asks for camera permission, which you can refuse. Use of the feature is governed by TINT's own terms and privacy practices.",
    ],
  },
  {
    heading: "Fonts",
    body: [
      "Our typeface is delivered by Adobe Fonts from Adobe's servers, as Adobe's license requires. To deliver the font files, Adobe receives your IP address and counts the page view for licensing purposes. Adobe states it does not use advertising cookies for this service.",
    ],
  },
  {
    heading: "What we do not do",
    list: [
      ['We do not run advertising or ad trackers on this site today. If you turn on Marketing/Advertising, that category may involve a "sale" or "sharing" of information under some US state laws, which is why it is off unless you switch it on, and why you can switch it back off at any time.'],
      ["We do not profile you, and we make no automated decisions about you."],
      ["We do not knowingly collect information from children under 16. Our products and site are for eye care professionals and their institutions."],
    ],
  },
  {
    heading: "Your rights",
    body: [
      "If you are in the European Economic Area or the United Kingdom, the GDPR and UK GDPR give you the rights of access, rectification, erasure, restriction, portability, and objection, and the right to withdraw consent at any time (the footer's Cookie Preferences link does exactly that for cookies, instantly, no email needed). You also have the right to complain to your data protection authority, or in the UK, the ICO.",
      'If you are a California resident, the CCPA/CPRA gives you the rights to know, correct, and delete the personal information we hold about you, and the right to opt out of sale or sharing. Because the Marketing/Advertising category may involve a "sale" or "sharing" under those laws, you can opt out at any time using the Do Not Sell or Share My Personal Information control in the footer, which turns that category off and deletes its cookies immediately. We also honor Global Privacy Control signals, and everything optional stays off unless you switch it on.',
      "To exercise any of these rights, email privacy@xophthalmics.com. We will verify the request and answer within the legal deadline that applies to you. We never discriminate against you for exercising a privacy right.",
    ],
  },
  {
    heading: "International transfers",
    body: [
      "We are a United States company and our site is served from the United States. If you visit from the EEA or the UK, the providers named in this policy process data in the United States under recognized safeguards, such as the EU-US Data Privacy Framework and standard contractual clauses, per each provider's published terms.",
    ],
  },
  {
    heading: "Changes to this policy",
    body: [
      "When we change this policy, we change the date at the top and, for meaningful changes, we say so plainly on this page. We will never treat your continued use of the site as agreement to something you did not choose.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Xenon Ophthalmics Inc.",
      "525 Washington Blvd, Suite 300",
      "Jersey City, NJ 07310, United States",
      { email: "privacy@xophthalmics.com" },
    ],
  },
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
    if (item.email) {
      return (
        <p key={i} className="text-[15.5px] leading-relaxed">
          <a
            href={`mailto:${item.email}`}
            className="text-xo-blue underline-offset-4 hover:underline"
          >
            {item.email}
          </a>
        </p>
      );
    }
    return null;
  });
}

export default function PrivacyPolicy() {
  usePageMeta({
    title: "Privacy Policy",
    description:
      "How Xenon Ophthalmics collects, uses, and protects information on xophthalmics.com. Cookie choices, data rights, and contact details.",
  });

  return (
    <>
      {/* Hero */}
      <section className="grain relative flex min-h-[50vh] items-end overflow-hidden bg-bg pb-16 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-30" />
        <div className="xo-container relative">
          <div className="eyebrow mb-8">Legal · Privacy</div>
          <MaskText
            lines={["Privacy Policy"]}
            as="span"
            className="font-display text-5xl font-medium leading-[0.97] tracking-tight text-fg sm:text-6xl lg:text-7xl"
          />
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-fg/60">
              This policy explains what information Xenon Ophthalmics Inc.
              ("Xenon", "we", "us") collects on xophthalmics.com, why we
              collect it, and the choices you have. We wrote it to be read,
              not skimmed past. If anything is unclear, write to us at{" "}
              <a
                href="mailto:privacy@xophthalmics.com"
                className="text-fg underline decoration-fg/25 underline-offset-4 hover:text-xo-blue"
              >
                privacy@xophthalmics.com
              </a>{" "}
              and a person will answer.
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
                {SECTIONS.map((s) => (
                  <li key={s.heading}>
                    <a
                      href={`#${s.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                      className="hover:text-xo-blue"
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <article className="md:col-span-9">
            <div className="prose-legal space-y-14">
              {SECTIONS.map((section) => {
                const anchor = section.heading.toLowerCase().replace(/[^a-z0-9]+/g, "-");
                return (
                  <div key={section.heading} id={anchor} className="scroll-mt-32">
                    <h2 className="mb-6 font-display text-2xl font-medium text-fg md:text-3xl">
                      {section.heading}
                    </h2>
                    {section.body && (
                      <div className="space-y-5">
                        <Body items={section.body} />
                      </div>
                    )}
                    {section.list && (
                      <ul className="mt-4 space-y-3">
                        {section.list.map((entry, i) => (
                          <li
                            key={i}
                            className="flex gap-3 text-[15.5px] leading-relaxed text-fg/70"
                          >
                            <span className="mt-2 h-px w-4 shrink-0 bg-xo-blue" />
                            <span>
                              {entry.length > 1 && (
                                <strong className="text-fg">{entry[0]} </strong>
                              )}
                              {entry.length > 1 ? entry[1] : entry[0]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                    {section.subsections?.map((sub) => (
                      <div key={sub.heading} className="mt-10">
                        <h3 className="mb-4 font-display text-lg text-fg md:text-xl">
                          {sub.heading}
                        </h3>
                        {sub.intro && (
                          <p className="text-[15.5px] leading-relaxed text-fg/70">
                            {sub.intro}
                          </p>
                        )}
                        {sub.list && (
                          <ul className="mt-4 space-y-3">
                            {sub.list.map((entry, i) => (
                              <li
                                key={i}
                                className="flex gap-3 text-[15.5px] leading-relaxed text-fg/70"
                              >
                                <span className="mt-2 h-px w-4 shrink-0 bg-xo-blue" />
                                <span>
                                  <strong className="text-fg">{entry[0]} </strong>
                                  {entry[1]}
                                </span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {sub.body && (
                          <div className="mt-4 space-y-5">
                            <Body items={sub.body} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
