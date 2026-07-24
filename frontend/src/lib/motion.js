// Shared Framer Motion variants & easing for the Xenon site.
export const EASE = [0.22, 1, 0.36, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

export const stagger = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
});

// Masked line reveal: parent uses overflow-hidden wrapper (.mask-line)
export const lineParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

export const lineChild = {
  hidden: { y: "110%" },
  show: {
    y: "0%",
    transition: { duration: 0.9, ease: EASE },
  },
};

export const viewport = { once: true, amount: 0.25 };
