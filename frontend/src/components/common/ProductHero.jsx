import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { MaskText } from "@/components/common/Reveal";

// Reusable product-page hero with parallax image.
export default function ProductHero({
  eyebrow,
  headlineLines,
  subhead,
  image,
  imageAlt = "",
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      ref={ref}
      data-testid="product-hero"
      className="relative grain flex min-h-[92vh] items-end overflow-hidden bg-xo-obsidian pb-16 pt-40 md:pb-24"
    >
      {/* Parallax image */}
      <motion.div
        style={{ y, scale }}
        aria-hidden
        className="pointer-events-none absolute inset-0"
      >
        <img
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover opacity-30"
        />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-xo-obsidian via-xo-obsidian/70 to-xo-obsidian/30"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />

      <div className="xo-container relative">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow mb-8"
        >
          {eyebrow}
        </motion.div>
        <MaskText
          lines={headlineLines}
          as="span"
          className="max-w-5xl font-display text-[13vw] font-medium leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
        />
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 max-w-xl text-lg leading-relaxed text-white/60"
        >
          {subhead}
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <Link
            to="/request-a-demo"
            data-testid="product-hero-cta"
            className="btn-primary mt-10"
          >
            Request a Demo
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
