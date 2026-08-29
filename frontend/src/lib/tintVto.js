// Tint (Banuba) VTO widget — a web-component script the vendor asked us to
// embed. Loaded once via a module-scope promise singleton so switching
// between xoFit's form-factor tabs (which mount/unmount this section) never
// re-inserts the <script> tag.
const WIDGET_SRC = "https://tintvto.com/widget.js";
const ELEMENT_TAG = "tint-vto";

let loadPromise = null;

export function loadTintWidget() {
  if (window.customElements?.get(ELEMENT_TAG)) return Promise.resolve();
  if (loadPromise) return loadPromise;

  loadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${WIDGET_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", () => reject(new Error("Tint VTO script failed to load")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.type = "module";
    script.src = WIDGET_SRC;
    script.onload = resolve;
    script.onerror = () => reject(new Error("Tint VTO script failed to load"));
    document.head.appendChild(script);
  }).then(() => window.customElements.whenDefined(ELEMENT_TAG));

  return loadPromise;
}
