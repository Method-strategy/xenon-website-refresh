import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { LANGUAGES, applyLanguage } from "@/lib/googleTranslate";
import { getConsent, setConsentCategory } from "@/components/common/CookieConsent";

const LANG_STORAGE_KEY = "xo_language";

export function LanguageSwitcher({ light }) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState("en");
  const ref = useRef(null);

  // Restore a previously chosen language on return visits, but only if
  // Translation consent is already on (matches our own Cookie Policy: the
  // translation cookie only exists once that category has been switched on).
  useEffect(() => {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved && saved !== "en" && getConsent().translation) {
      setCurrent(saved);
      applyLanguage(saved);
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const choose = (code) => {
    setCurrent(code);
    setOpen(false);
    localStorage.setItem(LANG_STORAGE_KEY, code);
    // Picking a language is itself the consent action for this category —
    // the same behavior the legacy site's own Translate control had.
    if (code !== "en" && !getConsent().translation) {
      setConsentCategory("translation", true);
    }
    applyLanguage(code);
  };

  const activeLanguage = LANGUAGES.find((l) => l.code === current) || LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        data-testid="language-switcher-toggle"
        aria-label="Choose language"
        aria-expanded={open}
        className={cn(
          "notranslate flex h-8 items-center gap-1.5 rounded-full border px-2.5 transition-[color,border-color,background-color] duration-300 hover:border-xo-blue",
          light
            ? "border-white/20 text-white/70 hover:text-white"
            : "border-fg/15 text-fg/70 hover:text-xo-blue",
        )}
      >
        <Globe className="h-3.5 w-3.5" />
        <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
          {activeLanguage.code === "en" ? "EN" : activeLanguage.code.split("-")[0].toUpperCase()}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="notranslate absolute right-0 top-full z-50 w-52 pt-3"
          >
            <div className="overflow-hidden rounded-xl border border-fg/10 bg-bg/95 shadow-2xl ring-1 ring-fg/5 backdrop-blur-2xl">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => choose(l.code)}
                  data-testid={`language-option-${l.code}`}
                  className="flex w-full items-center justify-between gap-3 border-b border-fg/5 px-4 py-3 text-left transition-colors duration-300 hover:bg-fg/5 last:border-0"
                >
                  <span className="font-display text-[14px] text-fg">
                    {l.native}
                    {l.code === "en" && (
                      <span className="ml-1.5 font-mono text-[9px] uppercase tracking-widest text-fg/35">
                        default
                      </span>
                    )}
                  </span>
                  {current === l.code && <Check className="h-3.5 w-3.5 shrink-0 text-xo-blue" />}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
