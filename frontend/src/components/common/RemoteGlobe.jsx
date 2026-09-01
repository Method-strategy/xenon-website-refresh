import { motion } from "framer-motion";

// A minimal wireframe globe used to illustrate remote/telehealth exam
// capability: a slow, continuous meridian sweep suggests rotation, and a
// dashed line drawing between two points (revealed once, on scroll) shows
// a practitioner's review reaching a second location. Static line art only
// (no photography, no map data) to stay consistent with the site's
// understated, editorial visual language.
export function RemoteGlobe({ className = "" }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 200 200"
        className="h-full w-full text-fg/25"
        aria-hidden="true"
      >
        {/* static wireframe: silhouette + equator + two latitude chords */}
        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeWidth="1" />
        <line x1="12" y1="100" x2="188" y2="100" stroke="currentColor" strokeWidth="1" />
        <line x1="34" y1="55" x2="166" y2="55" stroke="currentColor" strokeWidth="1" />
        <line x1="34" y1="145" x2="166" y2="145" stroke="currentColor" strokeWidth="1" />

        {/* rotating meridians */}
        <g className="text-fg/15">
          {[0, 1, 2].map((i) => (
            <ellipse
              key={i}
              className="globe-meridian"
              cx="100"
              cy="100"
              rx="88"
              ry="88"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              style={{ animationDelay: `${(i * -14) / 3}s` }}
            />
          ))}
        </g>

        {/* reveal: origin dot, dashed connection, destination dot */}
        <g className="text-acc">
          <motion.circle
            cx="66"
            cy="140"
            r="4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ opacity: 0.55, scale: 1 }}
            animate={{ opacity: 0, scale: 3.2 }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.circle
            cx="66"
            cy="140"
            r="4"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <motion.path
            d="M66,140 Q118,96 152,58"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeDasharray="3 5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.85 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.1, delay: 0.35, ease: "easeInOut" }}
          />
          <motion.circle
            cx="152"
            cy="58"
            r="4"
            fill="currentColor"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.4, delay: 1.4 }}
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <motion.circle
            cx="152"
            cy="58"
            r="4.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: [0, 0.55, 0], scale: [1, 3.2, 3.2] }}
            transition={{ duration: 2.2, delay: 1.6, repeat: Infinity, ease: "easeOut" }}
          />
        </g>
      </svg>
    </div>
  );
}

export default RemoteGlobe;
