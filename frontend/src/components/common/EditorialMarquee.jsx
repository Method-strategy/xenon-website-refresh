import Marquee from "react-fast-marquee";

// Slow editorial marquee. `items` array of strings.
export default function EditorialMarquee({ items, className = "" }) {
  return (
    <div
      data-testid="editorial-marquee"
      className={`relative overflow-hidden border-y border-white/10 py-8 ${className}`}
    >
      <Marquee speed={38} gradient={false} autoFill>
        {items.map((item, i) => (
          <span key={i} className="mx-10 inline-flex items-center gap-10">
            <span className="font-display text-3xl uppercase tracking-tight text-white/70 md:text-5xl">
              {item}
            </span>
            <span className="text-xo-teal">✦</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
