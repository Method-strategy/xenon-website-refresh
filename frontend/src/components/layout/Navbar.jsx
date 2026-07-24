import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import { NAV } from "@/data/site";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function ThemeToggle({ className }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      data-testid="theme-toggle"
      aria-label="Toggle color theme"
      className={cn(
        "flex h-10 w-10 items-center justify-center rounded-full border border-fg/15 text-fg/70 transition-[color,border-color,background-color] duration-300 hover:border-xo-blue hover:text-xo-blue",
        className,
      )}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null);
  const location = useLocation();
  const { theme } = useTheme();

  const logo = theme === "dark" ? "/logos/xenon-corp-dark.svg" : "/logos/xenon-corp.svg";

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
      <nav className="xo-container flex items-center justify-between">
        <Link to="/" data-testid="nav-logo" className="relative z-10 flex items-center">
          <img src={logo} alt="Xenon Ophthalmics" className="h-10 w-auto md:h-12" />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
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
                  className="flex items-center gap-1.5 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/70 transition-colors duration-300 hover:text-fg"
                >
                  {item.label}
                  <ChevronDown className="h-3 w-3" />
                </button>
              ) : (
                <Link
                  to={item.to}
                  data-testid={`nav-${item.label.replace(/\s+/g, "-").toLowerCase()}`}
                  className="block px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/70 transition-colors duration-300 hover:text-fg"
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
                    className="absolute left-0 top-full w-72 pt-3"
                  >
                    <div className="overflow-hidden rounded-md border border-fg/10 bg-bg/98 shadow-xl backdrop-blur-xl">
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

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <Link to="/request-a-demo" data-testid="nav-demo-cta" className="btn-primary">
            Request a Demo
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            data-testid="mobile-menu-toggle"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 flex h-10 w-10 items-center justify-center text-fg"
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
            className="overflow-hidden bg-bg/98 backdrop-blur-xl lg:hidden"
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
