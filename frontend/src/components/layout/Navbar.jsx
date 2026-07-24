import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import { NAV } from "@/data/site";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function ThemeToggle({ light }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      data-testid="theme-toggle"
      aria-label="Toggle color theme"
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full border transition-[color,border-color,background-color] duration-300 hover:border-xo-blue",
        light
          ? "border-white/20 text-white/70 hover:text-white"
          : "border-fg/15 text-fg/70 hover:text-xo-blue",
      )}
    >
      {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const location = useLocation();
  const { theme } = useTheme();

  // Every page opens with a dark hero. At the top the navbar floats over it,
  // so it must use light content. Once scrolled (glass), follow the theme.
  const light = !scrolled || theme === "dark";
  const logo = light ? "/logos/xenon-corp-dark.svg" : "/logos/xenon-corp.svg";
  const linkCls = light
    ? "text-white/70 hover:text-white"
    : "text-fg/70 hover:text-fg";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [location.pathname]);

  return (
    <header
      data-testid="site-navbar"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,padding] duration-500",
        scrolled ? "glass py-3" : "py-5 border-b border-transparent",
      )}
    >
      <nav className="xo-container flex items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <Link to="/" data-testid="nav-logo" className="relative z-10 flex items-center">
            <img src={logo} alt="Xenon Ophthalmics" className="h-12 w-auto md:h-14" />
          </Link>
          <span
            className={cn(
              "hidden border-l pl-4 font-mono text-[10px] uppercase leading-[1.5] tracking-[0.14em] xl:block",
              light ? "border-white/15 text-white/55" : "border-fg/15 text-fg/45",
            )}
          >
            Building the future
            <br />
            of vision care
          </span>
        </div>

        {/* Desktop nav — flush right */}
        <div className="hidden items-center gap-2 lg:flex">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenGroup(item.label)}
                onMouseLeave={() => item.children && setOpenGroup(null)}
              >
                {item.children ? (
                  <button
                    data-testid={`nav-${item.label.toLowerCase()}`}
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300",
                      linkCls,
                    )}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                ) : (
                  <Link
                    to={item.to}
                    data-testid={`nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                    className={cn(
                      "block px-3 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-colors duration-300",
                      linkCls,
                    )}
                  >
                    {item.label}
                  </Link>
                )}

                <AnimatePresence>
                  {item.children && openGroup === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 top-full w-72 pt-3"
                    >
                      <div className="overflow-hidden rounded-xl border border-fg/10 bg-bg shadow-2xl backdrop-blur-xl">
                        {item.children.map((c) => (
                          <Link
                            key={c.label}
                            to={c.to}
                            data-testid={`nav-child-${c.label.toLowerCase()}`}
                            className="group flex items-center justify-between border-b border-fg/5 px-5 py-4 transition-colors duration-300 hover:bg-fg/[0.03] last:border-0"
                          >
                            <div>
                              <div className="font-display text-base text-fg group-hover:text-xo-blue">
                                {c.label}
                              </div>
                              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40">
                                {c.sub}
                              </div>
                            </div>
                            <span className="text-fg/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-xo-blue">
                              →
                            </span>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

          <div className="ml-3 flex items-center gap-3">
            <ThemeToggle light={light} />
            <Link to="/request-a-demo" data-testid="nav-demo-cta" className="btn-primary">
              Request a Demo
            </Link>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle light={light} />
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className={cn("relative z-10 flex h-10 w-10 items-center justify-center", light ? "text-white" : "text-fg")}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-bg backdrop-blur-xl lg:hidden"
          >
            <div className="xo-container flex flex-col gap-1 py-6">
              {NAV.flatMap((item) =>
                item.children
                  ? [
                      <div
                        key={item.label}
                        className="mt-3 px-1 font-mono text-[10px] uppercase tracking-[0.25em] text-xo-blue"
                      >
                        {item.label}
                      </div>,
                      ...item.children.map((c) => (
                        <Link
                          key={c.label}
                          to={c.to}
                          data-testid={`mobile-nav-${c.label.toLowerCase()}`}
                          className="flex items-center justify-between border-b border-fg/5 py-3 text-fg/80"
                        >
                          <span className="font-display text-lg">{c.label}</span>
                          <span className="font-mono text-[10px] uppercase tracking-widest text-fg/40">
                            {c.sub}
                          </span>
                        </Link>
                      )),
                    ]
                  : [
                      <Link
                        key={item.label}
                        to={item.to}
                        data-testid={`mobile-nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                        className="border-b border-fg/5 py-3 font-display text-lg text-fg/90"
                      >
                        {item.label}
                      </Link>,
                    ],
              )}
              <Link
                to="/request-a-demo"
                data-testid="mobile-nav-demo-cta"
                className="btn-primary mt-6 w-full"
              >
                Request a Demo
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
