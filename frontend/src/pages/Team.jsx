import { Linkedin, Mail } from "lucide-react";
import { MaskText, Reveal } from "@/components/common/Reveal";
import DemoCTA from "@/components/common/DemoCTA";
import { TEAM_BOARD, TEAM_ADVISORY } from "@/data/site";

function initials(name) {
  return name
    .replace(/,.*/, "")
    .split(" ")
    .filter((w) => !/^(Dr\.?|OD|MD|MBA|MPH)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
}

function MemberCard({ m, i, testid }) {
  return (
    <Reveal delay={(i % 4) * 0.05}>
      <div
        data-testid={testid}
        className="group flex h-full flex-col rounded-md border border-fg/10 bg-surface p-6 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-xo-blue/40"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-fg/10 bg-gradient-to-br from-xo-navy-deep/60 to-bg font-display text-lg text-xo-blue">
          {initials(m.name)}
        </div>
        <h3 className="mt-6 font-display text-xl text-fg">{m.name}</h3>
        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-fg/45">{m.title}</p>
        <div className="mt-5 flex items-center gap-3">
          {m.linkedin && (
            <a
              href={m.linkedin}
              aria-label={`${m.name} on LinkedIn`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-fg/10 text-fg/50 transition-colors hover:border-xo-blue hover:text-xo-blue"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
          {m.email && (
            <a
              href={m.email === "#" ? "mailto:info@xophthalmics.com" : m.email}
              aria-label={`Email ${m.name}`}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-fg/10 text-fg/50 transition-colors hover:border-xo-blue hover:text-xo-blue"
            >
              <Mail className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </Reveal>
  );
}

export default function Team() {
  return (
    <>
      {/* Hero */}
      <section className="hero-dark grain relative flex min-h-[60vh] items-end overflow-hidden bg-bg pb-16 pt-40">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
        <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />
        <div className="xo-container relative">
          <div className="eyebrow mb-8">Our Team</div>
          <MaskText
            lines={["The people building it."]}
            as="span"
            className="font-display text-[9vw] font-medium leading-[0.97] tracking-tight text-fg sm:text-5xl lg:text-6xl"
          />
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-fg/60">
            Founders, board, and advisors spanning engineering, medical technology,
            and clinical practice.
          </p>
        </div>
      </section>

      {/* Board & co-founders */}
      <section className="border-t border-fg/10 bg-bg py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">Board of Directors & Co-Founders</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_BOARD.map((m, i) => (
              <MemberCard key={m.name} m={m} i={i} testid={`board-member-${i}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Advisory */}
      <section className="border-t border-fg/10 bg-surface py-24 md:py-32">
        <div className="xo-container">
          <Reveal>
            <div className="eyebrow mb-10">Scientific & Business Strategy Advisory Team</div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {TEAM_ADVISORY.map((m, i) => (
              <MemberCard key={m.name} m={m} i={i} testid={`advisor-${i}`} />
            ))}
          </div>
        </div>
      </section>

      <DemoCTA
        eyebrow="Talk to Xenon"
        headline="Build the future of vision care with us."
        body="For partnership, investment, or practice inquiries, our team is one message away."
      />
    </>
  );
}
