import { Link } from "react-router-dom";

// Renders a paragraph built from plain strings mixed with inline links.
// Each segment is either a string, { to, label } for an internal route,
// or { href, label } for an external URL.
export function RichText({ segments }) {
  return segments.map((seg, i) => {
    if (typeof seg === "string") return <span key={i}>{seg}</span>;
    if (seg.to) {
      return (
        <Link
          key={i}
          to={seg.to}
          className="text-fg underline decoration-fg/25 underline-offset-4 transition-colors hover:text-xo-blue"
        >
          {seg.label}
        </Link>
      );
    }
    if (seg.href) {
      return (
        <a
          key={i}
          href={seg.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-fg underline decoration-fg/25 underline-offset-4 transition-colors hover:text-xo-blue"
        >
          {seg.label}
        </a>
      );
    }
    return null;
  });
}
