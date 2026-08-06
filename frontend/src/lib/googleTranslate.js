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
  host.dataset.mounted = "true";
}

export function selectLanguage(code) {
  const combo = document.querySelector(".goog-te-combo");
  if (!combo) return false;
  combo.value = code === "en" ? "" : code;
  combo.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

// Loads the widget (if needed) and applies the chosen language, retrying
// briefly since Google renders the <select> asynchronously after init.
export async function applyLanguage(code) {
  if (code === "en" && !document.getElementById(WIDGET_ID)?.dataset.mounted) {
    return; // never loaded, nothing to reset
  }
  await loadGoogleTranslate();
  mountWidget();
  for (let attempt = 0; attempt < 20; attempt++) {
    if (selectLanguage(code)) return;
    await new Promise((r) => setTimeout(r, 150));
  }
}
