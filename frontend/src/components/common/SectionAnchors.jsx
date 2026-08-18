import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

const TOP_OFFSET = 128; // matches top-32

// Floating left sidebar anchors that track scroll position across every
// tracked section, not just the first one. `position: sticky` alone only
// stays pinned while its immediate grid column is in view — since sections
// 2+ on these pages are full-width siblings outside that column (so their
// backgrounds can bleed edge to edge), the sidebar would "unstick" and
// scroll away after section 1. Instead we measure where the column would
// have sat and hold the nav there with `position: fixed` for as long as the
// scroll position is between the first and last tracked section.
// sections: [{ id, label }]
export default function SectionAnchors({ sections }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [pos, setPos] = useState(null);
  const wrapperRef = useRef(null);

  const measure = useCallback(() => {
    const wrapper = wrapperRef.current;
    const lastEl = document.getElementById(sections[sections.length - 1]?.id);
    if (!wrapper || !lastEl) return;
    const wrapperRect = wrapper.getBoundingClientRect();
    const lastRect = lastEl.getBoundingClientRect();
    const withinRange = wrapperRect.top <= TOP_OFFSET && lastRect.bottom > TOP_OFFSET;
    setPos(withinRange ? { left: wrapperRect.left, width: wrapperRect.width } : null);
  }, [sections]);

  useEffect(() => {
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

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
    <div ref={wrapperRef} className="hidden lg:block">
    <nav
      data-testid="section-anchors"
      style={pos ? { position: "fixed", left: pos.left, width: pos.width, top: TOP_OFFSET } : { visibility: "hidden" }}
      className="hidden lg:block"
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
    </div>
  );
}
