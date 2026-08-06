// Google Translate "Website Translator" widget — the free, no-API-key
// script Google offers for site-wide translation. Loaded lazily and only
// after the user picks a language (which also flips the site's own
// Translation consent category on, mirroring the legacy site's behavior).

export const LANGUAGES = [
  { code: "en", label: "English", native: "English" },
  { code: "zh-CN", label: "Chinese", native: "中文" },
  { code: "fr", label: "French", native: "Français" },
  { code: "de", label: "German", native: "Deutsch" },
  { code: "hi", label: "Hindi", native: "हिन्दी" },
  { code: "id", label: "Indonesian", native: "Bahasa Indonesia" },
  { code: "it", label: "Italian", native: "Italiano" },
  { code: "es", label: "Spanish", native: "Español" },
  { code: "ur", label: "Urdu", native: "اردو" },
];

const WIDGET_ID = "google_translate_element";

function ensureHost() {
  let host = document.getElementById(WIDGET_ID);
  if (!host) {
    host = document.createElement("div");
    host.id = WIDGET_ID;
    document.body.appendChild(host);
  }
  return host;
}

let loadingPromise = null;

export function loadGoogleTranslate() {
  if (window.google?.translate?.TranslateElement) return Promise.resolve();
  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    window.googleTranslateElementInit = () => resolve();
    const script = document.createElement("script");
    script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.onerror = () => reject(new Error("Google Translate failed to load"));
    document.head.appendChild(script);
  });
  return loadingPromise;
}

export function mountWidget() {
  const host = ensureHost();
  if (host.dataset.mounted === "true" || !window.google?.translate?.TranslateElement) return;
  host.dataset.mounted = "true"; // set before construction to close the race window
  // eslint-disable-next-line no-new
  new window.google.translate.TranslateElement(
    {
      pageLanguage: "en",
      includedLanguages: LANGUAGES.filter((l) => l.code !== "en")
        .map((l) => l.code)
        .join(","),
      autoDisplay: false,
    },
    WIDGET_ID,
  );
}

export function selectLanguage(code) {
  const combo = document.querySelector(".goog-te-combo");
  if (!combo) return false;
  combo.value = code === "en" ? "" : code;
  combo.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

// Google reads this cookie itself on (re)init and auto-applies the target
// language before we ever get a chance to drive the hidden <select> — far
// more reliable than the select+event trick alone, especially right after
// a page reload when the widget is constructing itself from scratch.
function setGoogTransCookie(code) {
  const value = code === "en" ? "" : `/en/${code}`;
  const host = window.location.hostname;
  document.cookie = `googtrans=${value}; path=/`;
  if (host && host !== "localhost") {
    document.cookie = `googtrans=${value}; path=/; domain=.${host.replace(/^www\./, "")}`;
  }
}

// Serializes calls so two near-simultaneous invocations (e.g. React
// StrictMode's dev-only double effect invoke) never construct the widget
// twice or dispatch selections against a half-initialized combo.
let queue = Promise.resolve();

export function applyLanguage(code) {
  queue = queue.then(() => runApplyLanguage(code)).catch(() => {});
  return queue;
}

async function runApplyLanguage(code) {
  const alreadyMounted = document.getElementById(WIDGET_ID)?.dataset.mounted === "true";
  if (code === "en" && !alreadyMounted) return; // nothing was ever loaded, nothing to reset

  setGoogTransCookie(code);

  if (!alreadyMounted) {
    await loadGoogleTranslate();
    mountWidget();
    // Give the iframe/combo a moment to finish attaching before driving it.
    await new Promise((r) => setTimeout(r, 500));
  }

  for (let attempt = 0; attempt < 25; attempt++) {
    const combo = document.querySelector(".goog-te-combo");
    const target = code === "en" ? "" : code;
    if (combo && combo.value !== target) {
      selectLanguage(code);
    }
    await new Promise((r) => setTimeout(r, 250));
  }
}
