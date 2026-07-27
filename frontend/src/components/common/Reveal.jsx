import { Fragment } from "react";
import { motion } from "framer-motion";
import { EASE, viewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

// Word-level reveal that wraps NATURALLY at every breakpoint (text-wrap: balance)
// and never clips descenders (no overflow:hidden). Accepts either `lines`
// (array — joined into flowing text) or `text` (string) for backwards-compat.

const container = (delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: 0.035, delayChildren: delay } },
});

const word = {
  hidden: { opacity: 0, y: "0.45em" },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
};

function toWords(lines, text) {
  const str =
    text != null ? text : Array.isArray(lines) ? lines.join(" ") : lines || "";
  return String(str).split(/\s+/).filter(Boolean);
}

function WordReveal({ lines, text, className, delay = 0, trigger }) {
  const words = toWords(lines, text);
  const anim =
    trigger === "view"
      ? { initial: "hidden", whileInView: "show", viewport }
      : { initial: "hidden", animate: "show" };

  return (
    <span className={cn("block [text-wrap:balance]", className)}>
      <motion.span variants={container(delay)} {...anim} className="inline">
        {words.map((w, i) => (
          <Fragment key={i}>
            <motion.span
              variants={word}
              className="inline-block will-change-[transform,opacity]"
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </motion.span>
    </span>
  );
}

// Animate on mount (hero headlines).
export function MaskText({ lines, text, className, delay = 0 }) {
  return (
    <WordReveal lines={lines} text={text} className={className} delay={delay} trigger="mount" />
  );
}

// Animate when scrolled into view (section headlines).
export function MaskTextInView({ lines, text, className }) {
  return <WordReveal lines={lines} text={text} className={className} trigger="view" />;
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
          transition: { duration: 0.8, ease: EASE, delay },
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
