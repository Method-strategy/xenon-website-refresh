import { motion } from "framer-motion";
import { lineParent, lineChild, fadeUp, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Masked line-by-line reveal. `lines` is an array of strings (or nodes).
export function MaskText({ lines, className, as: Tag = "h1", delay = 0 }) {
  return (
    <motion.div
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.12, delayChildren: delay } },
      }}
      initial="hidden"
      animate="show"
      className={className}
    >
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span variants={lineChild} className="inline-block will-change-transform">
            <Tag className="inline">{line}</Tag>
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

// Same masked reveal but triggered on scroll into view.
export function MaskTextInView({ lines, className, as: Tag = "h2" }) {
  return (
    <motion.div
      variants={lineParent}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={className}
    >
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <motion.span variants={lineChild} className="inline-block will-change-transform">
            <Tag className="inline">{line}</Tag>
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

// Generic scroll-reveal fade-up wrapper.
export function Reveal({ children, className, delay = 0, y = 28 }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { fadeUp };
