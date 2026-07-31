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
- ✅ xoFrame — fully built 2026-07-31. Copy adapted/improved from the client's old WordPress site (same substance, no features dropped) into editorial voice. Hero image is the split-face try-on comparison shot with background removed via `rembg` (was fully opaque before, now true alpha transparency, floats on the same radial-glow treatment as Core/Mobile — no white box). Uses a dedicated stacked intro layout (`f.deviceImageWide: true` branch in `Fit.jsx`, separate JSX block from Core/Mobile's side-by-side layout) so the image can render full-width up to 1080px instead of being capped at the ~596px half-column width — this was a real bug (Tailwind's `img{max-width:100%}` preflight rule silently overriding explicit width utilities nested inside the flex/grid chain) discovered and fixed 2026-07-31 after user reported the image looked too small. 3 tiles: Try On Any Frame / Effortless Catalog Growth / Same-Day Eyewear via xoLab. Feature list in the full-bleed navy section (no retail photo supplied for this tab, text-only, which is fine editorially).

### KNOWN EXTERNAL BLOCKER: Tint VTO widget stuck on loading spinner (not an app bug)

Diagnosed 2026-07-31. Our click-to-load implementation works correctly end to end (verified via live network trace): button click → script injects → `tint-vto` custom element registers → widget overlay opens. The overlay itself then hangs on a spinner forever because **Tint/Banuba's own CDN is serving the core WebAssembly engine file with the wrong `Content-Type` header**:
- `https://tintvto.com/xenonophthalmics/assets/BanubaSDK.simd-d6b22068.wasm` returns `Content-Type: application/x-www-form-urlencoded` (should be `application/wasm`), combined with `X-Content-Type-Options: nosniff`. Browsers refuse to compile/run a WASM module under that combination, so the AR engine never initializes.
- Confirmed via repeated `curl -I` (consistent across 3 requests, `x-cache: Hit from cloudfront`, `age: 35`) — this is a real, cached, reproducible misconfiguration on Tint/Banuba's hosting, not a fluke or something on our end.
- This is entirely outside our codebase/control. Client needs to raise this with their Tint/Banuba account rep, referencing the exact asset URL and the wrong Content-Type header above.

### xoFrame virtual try-on widget (Tint VTO / Banuba)

- Third-party widget from `tintvto.com`, account slug `xenonophthalmics`, live/active per client confirmation (works correctly on old WP site).
- `merchant-id="f3339032-dafa-47fe-bb1e-79a965fd4118"` — do not change unless client provides a new one.
- **Lazy-load on click only** (privacy/perf: nothing from tintvto.com/Banuba loads until the visitor clicks "Try xoFrame Demo"), reimplemented as a React `openVTO()` handler in `Fit.jsx`.
- Button: `id="vto-trigger"` / `data-testid="vto-trigger-button"`. On click: if `customElements.get('tint-vto')` is already defined, calls `.open()` directly; otherwise injects `<script type="module" src="https://tintvto.com/xenonophthalmics/widget.js">`, shows a loading state, and calls `.open()` once `customElements.whenDefined('tint-vto')` resolves.
- Added `script.onerror` + `toast.error(...)` fallback for genuine load failures.

**BUG FOUND & FIXED 2026-07-31: "e.open is not a function" on repeat visits to the tab.**
Root cause: `<tint-vto>` was rendered *inside* the xoFrame tab panel (conditionally mounted). Every time a user left and returned to the xoFrame tab, React unmounted and recreated the `<tint-vto>` DOM node. The Banuba SDK only wires up `.open()` (and other instance methods) correctly on first construction — it uses internal singleton/module-level state (same pattern seen in their own `gate.js`). A second instantiation left `.open` undefined, throwing `Uncaught TypeError: e.open is not a function` and leaving the widget stuck on an infinite loading spinner with the native camera-permission prompt never appearing (confirmed via `getUserMedia` monkey-patching that it was never invoked). WordPress never destroys this element (created once, forever, for a static page), so it never hit this.

**Fix:** moved `<tint-vto merchant-id={VTO_MERCHANT_ID}>` out of the per-tab panel into the page-level wrapper in `Fit.jsx` (rendered once, unconditionally, for the whole page visit, regardless of active tab). Verified independently via `testing_agent_v4_fork` (see `/app/test_reports/iteration_8.json`, 2026-07-31): 3 full tab-switch cycles (Core→Mobile→Frame) with repeated demo-button clicks, `tint-vto` count stayed at 1, `typeof .open === 'function'` held throughout, zero console errors, no regressions on Core/Mobile tabs or the xoFrame hero image size/transparency.

**Separate, unresolved, external issue (informational, not fixable in our code):** `fonts.css` and `theme.css` under the merchant's Tint/Banuba S3 CDN path (`cdn.tintvto.sdk.banuba.net/merchants/f3339032-dafa-47fe-bb1e-79a965fd4118/`) returned HTTP 403 `AccessDenied` when checked via curl (confirmed 3x), while `styles.css` for the same merchant returns 200 fine. This did NOT reproduce in the testing_agent's run (all 33 widget-related requests returned 200), suggesting it's intermittent on Tint's CDN/edge-cache side. If the user reports stylesheet load failures again, this is the lead to follow up on with Tint/Banuba support — not something fixable from our side.

**Still pending from user:** confirm on the real deployed Netlify site (after redeploy) that the widget now fully works end-to-end (camera prompt appears, live video feed opens) — no automated/headless tool in this environment has real camera hardware to verify that final step.

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
