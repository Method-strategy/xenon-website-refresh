import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTheme } from "@/lib/theme";

// Reusable product-page hero. Follows the site theme: airy/light in light mode
// (matching the brand datasheets), brooding brand-navy in dark mode.
export default function ProductHero({
  eyebrow,
  logo,
  logoWidth = 120,
  logoHeight = 28,
  role,
  headlineLines,
  subhead,
  image,
  imageAlt = "",
  imageSrcSet,
  imageSizes = "(max-width: 1024px) 100vw, 70vw",
}) {
  const ref = useRef(null);
  const { theme } = useTheme();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Product logo lockups: '-dark' variants are light-colored (for dark bg).
  const logoSrc = logo
    ? theme === "dark"
      ? logo
      : logo.replace("-dark", "")
    : null;

  return (
    <section
      ref={ref}
      data-testid="product-hero"
      className="relative grain flex min-h-[92vh] items-end overflow-hidden bg-bg pb-16 pt-40 md:pb-24"
    >
      {/* Ghosted product image, right-anchored to match the homepage hero layout. */}
      <motion.div
        style={{ y, scale }}
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-full lg:w-[70%]"
      >
        <img
          src={image}
          srcSet={imageSrcSet}
          sizes={imageSrcSet ? imageSizes : undefined}
          alt={imageAlt}
          fetchPriority="high"
          decoding="async"
          className="h-full w-full object-cover object-center opacity-[0.32] dark:opacity-30"
        />
        {/* Left fade so headline stays clean */}
        <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/85 to-transparent lg:via-bg/60" />
        {/* Right edge dissolve */}
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-bg to-transparent" />
      </motion.div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg via-transparent to-bg/40"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 spotlight" />

      <div className="xo-container relative">
        {logoSrc ? (
          <div className="mb-8 flex items-center gap-4">
            <img src={logoSrc} alt={eyebrow} width={logoWidth} height={logoHeight} className="h-9 w-auto md:h-11" />
            {role && (
              <span className="border-l border-fg/20 pl-4 font-mono text-xs uppercase tracking-[0.25em] text-acc">
                {role}
              </span>
            )}
          </div>
        ) : (
          <div className="mb-8 font-mono text-xs uppercase tracking-[0.25em] text-acc">
            {eyebrow}
          </div>
        )}
        <span className="mask-line block max-w-5xl font-display text-[10vw] font-medium leading-[0.96] tracking-tight text-fg [text-wrap:balance] sm:text-5xl lg:text-6xl xl:text-7xl">
          {headlineLines?.join(" ")}
        </span>
        <p className="mt-10 max-w-xl text-lg leading-relaxed text-fg/60">
          {subhead}
        </p>
        <div>
          <Link to="/request-a-demo" data-testid="product-hero-cta" className="btn-primary mt-10">
            Request a Demo
          </Link>
        </div>
      </div>
    </section>
  );
}
