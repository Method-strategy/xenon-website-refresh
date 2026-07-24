import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// Sticky left sidebar anchors that track scroll position.
// sections: [{ id, label }]
export default function SectionAnchors({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const go = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) window.__lenis.scrollTo(el, { offset: -100 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      data-testid="section-anchors"
      className="sticky top-32 hidden lg:block"
    >
      <ul className="space-y-4 border-l border-fg/10 pl-6">
        {sections.map((s, i) => (
          <li key={s.id}>
            <button
              data-testid={`anchor-${s.id}`}
              onClick={() => go(s.id)}
              className={cn(
                "group flex items-center gap-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-300",
                active === s.id ? "text-xo-blue" : "text-fg/35 hover:text-fg/70",
              )}
            >
              <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span
                className={cn(
                  "h-px transition-all duration-300",
                  active === s.id ? "w-8 bg-xo-blue" : "w-4 bg-fg/20 group-hover:w-6",
                )}
              />
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
