import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShieldCheck, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const STORAGE_KEY = "xo_consent_v1";
const OPEN_EVENT = "xo:cookie-preferences";

const CATEGORIES = [
  {
    id: "necessary",
    label: "Strictly necessary",
    required: true,
    body: "Required for the site to function: security, load balancing, and remembering your cookie choice. Always on.",
  },
  {
    id: "analytics",
    label: "Analytics & performance",
    body: "Aggregate, anonymized usage data so we can understand what's working. Off unless you switch it on.",
  },
  {
    id: "marketing",
    label: "Marketing & advertising",
    body: "May involve a \"sale\" or \"sharing\" of information under some US state laws. Off unless you switch it on.",
  },
  {
    id: "translation",
    label: "Translation",
    body: "Loads third-party page translation. Off unless you switch it on.",
  },
];

const defaultState = { necessary: true, analytics: false, marketing: false, translation: false };

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeStored(prefs) {
  const payload = { ...prefs, necessary: true, timestamp: new Date().toISOString() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // ignore
  }
  return payload;
}

export function openCookiePreferences() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

export default function CookieConsent() {
  const [decided, setDecided] = useState(true); // start optimistic to avoid FOUC
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState(defaultState);

  // Load on mount
  useEffect(() => {
    const stored = readStored();
    if (stored) {
      setPrefs({ ...defaultState, ...stored, necessary: true });
      setDecided(true);
    } else {
      setDecided(false);
    }
  }, []);

  // Listen for external "open preferences" events
  useEffect(() => {
    const handler = () => setShowPrefs(true);
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  const acceptAll = () => {
    const next = { necessary: true, analytics: true, marketing: true, translation: true };
    writeStored(next);
    setPrefs(next);
    setDecided(true);
    setShowPrefs(false);
  };

  const declineAll = () => {
    const next = { ...defaultState };
    writeStored(next);
    setPrefs(next);
    setDecided(true);
    setShowPrefs(false);
  };

  const savePrefs = () => {
    writeStored(prefs);
    setDecided(true);
    setShowPrefs(false);
  };

  const togglePref = (id) => {
    setPrefs((p) => ({ ...p, [id]: !p[id] }));
  };

  return (
    <>
      {/* First-visit banner — full-bleed strip, matches site aesthetic */}
      <AnimatePresence>
        {!decided && !showPrefs && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 120, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[70] border-t border-fg/10 bg-bg/85 backdrop-blur-2xl"
            role="dialog"
            aria-label="Cookie consent"
            data-testid="cookie-banner"
          >
            {/* Hairline highlight on top edge for depth */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-fg/15 to-transparent"
            />
            <div className="xo-container py-6 md:py-7">
              <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center md:gap-12">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-xo-blue">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Your choice, your controls
                  </div>
                  <p className="mt-3 max-w-3xl text-[13.5px] leading-relaxed text-fg/70">
                    We use cookies and similar technologies. Except for those
                    strictly necessary to run the site, none are active until
                    you consent; the default is off. You can accept all,
                    decline all, or choose which categories run, and you can
                    change or withdraw your choice at any time. Details are in
                    our{" "}
                    <Link
                      to="/privacy-policy"
                      className="text-fg underline decoration-fg/25 underline-offset-4 transition-colors hover:text-xo-blue"
                    >
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5 md:flex-nowrap md:justify-end">
                  <button
                    type="button"
                    onClick={() => setShowPrefs(true)}
                    data-testid="cookie-preferences-btn"
                    className="rounded-full border border-fg/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/80 transition-colors duration-300 hover:border-fg/50 hover:text-fg"
                  >
                    Preferences
                  </button>
                  <button
                    type="button"
                    onClick={declineAll}
                    data-testid="cookie-decline-btn"
                    className="rounded-full border border-fg/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/80 transition-colors duration-300 hover:border-fg/50 hover:text-fg"
                  >
                    Decline all
                  </button>
                  <button
                    type="button"
                    onClick={acceptAll}
                    data-testid="cookie-accept-btn"
                    className="rounded-full border border-fg/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/80 transition-colors duration-300 hover:border-fg/50 hover:text-fg"
                  >
                    Accept all
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Preferences modal */}
      <AnimatePresence>
        {showPrefs && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto p-4 md:p-8"
            role="dialog"
            aria-modal="true"
            aria-label="Cookie preferences"
            data-testid="cookie-modal"
          >
            <div
              className="absolute inset-0 bg-bg/70 backdrop-blur-md"
              onClick={() => decided && setShowPrefs(false)}
            />
            <motion.div
              initial={{ scale: 0.96, y: 24, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.96, y: 24, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-fg/10 bg-bg shadow-2xl ring-1 ring-fg/5"
            >
              <div className="flex items-center justify-between border-b border-fg/10 px-8 py-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-xo-blue">
                    Cookie preferences
                  </div>
                  <h2 className="mt-2 font-display text-2xl text-fg">
                    Choose what runs.
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => decided && setShowPrefs(false)}
                  aria-label="Close"
                  data-testid="cookie-modal-close"
                  className="rounded-full p-2 text-fg/50 transition-colors hover:bg-fg/5 hover:text-fg"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto px-8 py-6">
                <p className="text-[13.5px] leading-relaxed text-fg/60">
                  Nothing in a category loads until you turn it on. Withdraw
                  consent at any time and the category's cookies are deleted
                  from your browser immediately.
                </p>

                <div className="mt-6 space-y-4">
                  {CATEGORIES.map((cat) => {
                    const on = !!prefs[cat.id];
                    return (
                      <div
                        key={cat.id}
                        data-testid={`cookie-cat-${cat.id}`}
                        className="rounded-lg border border-fg/10 bg-surface/60 p-5"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <div className="font-display text-base text-fg">
                              {cat.label}
                              {cat.required && (
                                <span className="ml-2 rounded-full bg-xo-blue/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-xo-blue">
                                  Always on
                                </span>
                              )}
                            </div>
                            <p className="mt-2 text-[13px] leading-relaxed text-fg/55">
                              {cat.body}
                            </p>
                          </div>
                          <button
                            type="button"
                            role="switch"
                            aria-checked={on}
                            aria-label={cat.label}
                            disabled={cat.required}
                            onClick={() => !cat.required && togglePref(cat.id)}
                            data-testid={`cookie-toggle-${cat.id}`}
                            className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
                              on ? "bg-xo-blue" : "bg-fg/20"
                            } ${cat.required ? "opacity-60" : "cursor-pointer"}`}
                          >
                            <span
                              className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-300 ${
                                on ? "translate-x-5" : "translate-x-0"
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <p className="mt-6 text-[12px] leading-relaxed text-fg/45">
                  Your choice is stored locally in your browser (key{" "}
                  <code className="font-mono text-fg/60">xo_consent_v1</code>)
                  and is never sent to our servers. See our{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-fg underline decoration-fg/25 underline-offset-4 hover:text-xo-blue"
                  >
                    Privacy Policy
                  </Link>{" "}
                  for the full detail.
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2.5 border-t border-fg/10 px-8 py-5">
                <button
                  type="button"
                  onClick={declineAll}
                  data-testid="cookie-modal-decline"
                  className="rounded-full border border-fg/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/80 transition-colors duration-300 hover:border-fg/50 hover:text-fg"
                >
                  Decline all
                </button>
                <button
                  type="button"
                  onClick={savePrefs}
                  data-testid="cookie-modal-save"
                  className="rounded-full border border-fg/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/80 transition-colors duration-300 hover:border-fg/50 hover:text-fg"
                >
                  Save preferences
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  data-testid="cookie-modal-accept"
                  className="rounded-full border border-fg/20 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.15em] text-fg/80 transition-colors duration-300 hover:border-fg/50 hover:text-fg"
                >
                  Accept all
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
