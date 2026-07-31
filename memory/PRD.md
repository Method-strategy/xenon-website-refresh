# Xenon Ophthalmics — Product Requirements & Session State

Last handoff: 2026-07-28 (xoFit page tab redesign session)

---

## The site in one sentence

Editorial marketing site for Xenon Ophthalmics — the XO Vision Care System (xoIris, xoExam, xoFit, xoLab). Full React SPA prototype for design review; will be migrated to a static build (Astro recommended) before production launch on Cloudflare Pages.

## Design language (DO NOT VIOLATE)

- **NO card / rounded-box wrappers** around content sections. Editorial, not WordPress.
- Content flow is driven by **hairline `border-t`/`border-b` separators**, generous whitespace, Reveal-paced sections, and numbered mono-uppercase eyebrows (e.g. `01 · START`, `STEP 01`).
- Product images **float** with radial glows, they don't sit inside boxes.
- Dark mode uses brand navy `#0E2F5E`, not pure black.
- Global display font: **Zalando Sans SemiExpanded**.
- Per-product accent colors via `--acc` CSS variable (teal for xoFit).
- **NO em-dashes anywhere in copy** (all replaced with commas / colons / periods / parens).
- **NO white boxes behind graphics** unless explicitly authorized.

## Site pages (routes wired in `App.js`)

- `/` — Home (hero uses `xoexam-arm.webp`, 4 numbered sections, EyeCare4Kids partnership block)
- `/xo-vision-care-system` — Overview
- `/xoiris-scheduling` — xoIris (Scheduling)
- `/xoexam-eye-exam` — xoExam (uses ghosted xoexam-arm.webp hero, opacity 0.32 light / 0.30 dark)
- `/xofit-frame-fitting` — xoFit (3 tabs: Core / Mobile / Frame — see status below)
- `/xolab-eyewear-finishing` — xoLab
- `/about`, `/team`, `/blog`, `/news`, `/contact`, `/request-a-demo`
- `/privacy-policy`, `/terms-and-conditions`, `/terms-of-service`

## xoFit tab page — current state (2026-07-31)

Three form-factor tabs powered by `FORM_FACTORS` array in `/app/frontend/src/pages/products/Fit.jsx`.

**Tab labels (pill style, mono uppercase) — unchanged, do not edit without explicit user request:**
- `XOFIT CORE · STAND / WALL-MOUNTED`
- `XOFIT MOBILE · IPAD-BASED / PORTABLE`
- `XOFRAME · VIRTUAL TRY-ON`

**Per-tab sub-sections (editorial, no boxes):**
1. Intro strip — subhead + body on left, big device image on right, `deviceLabel` caption below in mono teal. Supports `deviceImageWide: true` flag (used by xoFrame) for landscape hero images that use a shorter, centered container instead of the tall bottom-aligned device-render treatment.
2. Interface strip — three tablet screens on same baseline (Core/Mobile only)
3. Six-tile editorial grid — "What xoFit delivers" — hairline separators, numbered
3a. Virtual try-on trigger (xoFrame only, `f.vto: true`) — "Try xoFrame Demo" button + live `<tint-vto>` widget
4. How xoFit works — numbered STEP paragraphs (Core/Mobile only)
5. Full-bleed features section — navy gradient background, feature list on right (retail photo optional via `retailImage`)

**Status by tab:**
- ✅ xoFit Core — fully complete with all copy + images
- ✅ xoFit Mobile — fully complete with all copy + images. ALL transparency issues resolved via chroma-key on 2026-07-28.
- ✅ xoFrame — fully built 2026-07-31. Copy adapted/improved from the client's old WordPress site (same substance, no features dropped) into editorial voice. Hero image is the split-face try-on comparison shot with background removed via `rembg` (was fully opaque before, now true alpha transparency, floats on the same radial-glow treatment as Core/Mobile — no white box). 3 tiles: Try On Any Frame / Effortless Catalog Growth / Same-Day Eyewear via xoLab. Feature list in the full-bleed navy section (no retail photo supplied for this tab, text-only, which is fine editorially).

### xoFrame virtual try-on widget (Tint VTO / Banuba)

- Third-party widget from `tintvto.com`, account slug `xenonophthalmics`, live/active per client confirmation (works correctly on old WP site).
- `merchant-id="f3339032-dafa-47fe-bb1e-79a965fd4118"` — do not change unless client provides a new one.
- **Lazy-load on click only** (privacy/perf: nothing from tintvto.com/Banuba loads until the visitor clicks "Try xoFrame Demo"), reimplemented as a React `openVTO()` handler in `Fit.jsx` (not the original WP vanilla-JS `DOMContentLoaded` binding, which doesn't fit SPA mount/unmount lifecycle).
- Button: `id="vto-trigger"` / `data-testid="vto-trigger-button"`. On click: if `customElements.get('tint-vto')` is already defined, calls `.open()` directly; otherwise injects `<script type="module" src="https://tintvto.com/xenonophthalmics/widget.js">`, shows a loading state, and calls `.open()` once `customElements.whenDefined('tint-vto')` resolves.
- Added `script.onerror` + `toast.error(...)` fallback (the original WP script had no error handling — a failed load left `loading` stuck `true` forever with no retry or user feedback; fixed here).
- `<tint-vto merchant-id="...">` custom element renders inside the xoFrame panel only, alongside the button.
- Verified end-to-end via screenshot tool: script only injects after click (confirmed via `document.querySelector('script[src=...]')` before/after), widget script successfully loads from the live tintvto.com CDN, no console errors. Did not verify the camera-permission overlay itself in headless testing (not testable without a real camera/browser context) — client should manually click "Try xoFrame Demo" on `/xofit-frame-fitting` to confirm the on-screen try-on UI opens as expected.
- Browser requirements per Banuba docs: HTTPS (satisfied), WebRTC, WebGL2 (or WebGL1 + texture-float extension), Custom Elements v1 + ES modules (all satisfied by target browsers).

## Cookie consent + legal

- `CookieConsent` component mounted globally in `App.js`
- Storage key: `xo_consent_v1` in localStorage
- Full-bleed bottom banner with 3 equal-weight pill buttons (no salesy blue)
- Preferences modal with 4 category toggles (Necessary always on)
- `/privacy-policy` and `/terms-and-conditions` pages built from old-site content, styled editorially
- Footer's `COOKIE PREFERENCES` and `DO NOT SELL OR SHARE MY PERSONAL INFORMATION` links reopen the modal via `openCookiePreferences()` export

## Footer

Structured per client's old-site reference with:
- Xenon logo + "Building the future of vision care." tagline
- 4 social icons: LinkedIn / X (custom SVG) / Facebook / Instagram — **no YouTube**
- Products / Company / Contact columns
- Bottom utility row: ALL CAPS with reduced tracking (0.06em) so everything fits one line
- "Powered by Method Marketing" shortened to "POWERED BY METHOD"

Social URLs (user-confirmed 2026-07-28):
- LinkedIn: `linkedin.com/company/xopthalmics/` (spelling as user provided — missing 'h')
- X: `x.com/XOphthalmics`
- Facebook: `facebook.com/XOphalmics` (spelling as user provided)
- Instagram: `instagram.com/xophthalmics/`

Support email: `support@xophthalmics.com`

## Image assets locations

- `/app/frontend/public/hero/` — xoexam-arm.webp + 1200w variant, xofit-measure.webp + 1200w variant
- `/app/frontend/public/products/xofit/` — Core device.webp + screens 1-3 + retail.webp; Mobile device.webp + screens 1-3 (PNG for alpha) + retail.webp
- `/app/frontend/public/partners/` — EyeCare4Kids logo (light + dark SVG)
- `/app/frontend/public/logos/` — full Xenon + product logo set (light + dark variants per product)

## Immediate next task (when user returns)

xoFrame tab is now complete (see above). Remaining known backlog:
- Contact form: awaiting HubSpot Portal ID / Form GUID / region / custom-field mapping from client to wire `Contact.jsx` directly to HubSpot Forms API (no backend). Playbook already researched; implementation blocked on these credentials.
- Manually click-test "Try xoFrame Demo" on a real browser/device to confirm the camera-permission overlay opens correctly (not testable headlessly).

## Pre-launch checklist

See `/app/memory/PRE_LAUNCH_CHECKLIST.md` — full punch list of what must happen before production deploy. P0 items: static build migration (Astro), SEO scaffolding, contact form wiring, consent-gated analytics.

## Netlify deployment (added 2026-02, this session)

Repo is wired for a permanent Netlify deploy while remaining fully iterable inside Emergent:
- `/netlify.toml` (repo root): `base = "frontend"`, `publish = "build"`, `command = "yarn build:netlify"`, SPA catch-all redirect (`/* -> /index.html` 200), pinned `NODE_VERSION = "20"`.
- `frontend/scripts/strip-emergent-scripts.js`: post-build step (chained via the new `build:netlify` script in `frontend/package.json`) that strips the Emergent bootstrap script (`assets.emergent.sh`) and Emergent's own PostHog analytics snippet (`ap.emergent.sh`) out of `build/index.html`.
- `frontend/public/index.html` source is untouched on purpose — Emergent's own dev/preview/visual-edits still work unchanged. Only the Netlify-bound production build is scrubbed.
- Existing `yarn build` (used by Emergent's own deploy path) is unchanged/unaffected.
- **User action required in Netlify dashboard:** set `REACT_APP_BACKEND_URL` env var to the production FastAPI backend's public URL (not committed to git, protected var). Netlify only hosts the frontend; the FastAPI backend in `/backend` needs its own host (Railway/Render/Fly/etc).
- Verified locally: `cd frontend && CI=false yarn build:netlify` completes clean, `build/index.html` has zero `emergent.sh`/`posthog` references post-strip, redirects/title/fonts/root div all intact.
