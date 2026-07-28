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

## xoFit tab page — current state (2026-07-28)

Three form-factor tabs powered by `FORM_FACTORS` array in `/app/frontend/src/pages/products/Fit.jsx`.

**Tab labels (pill style, mono uppercase):**
- `XOFIT CORE · STAND / WALL-MOUNTED`
- `XOFIT MOBILE · IPAD-BASED / PORTABLE`
- `XOFRAME · VIRTUAL TRY-ON`

**Per-tab sub-sections (editorial, no boxes):**
1. Intro strip — subhead + body on left, big device image on right, `deviceLabel` caption below in mono teal
2. Interface strip — three tablet screens on same baseline with `01 · START / 02 · MODES / 03 · RESULTS` labels
3. Six-tile editorial grid — "What xoFit delivers" — hairline separators, numbered
4. How xoFit works — pure typography, big headline "Simple. Fast. Accurate.", subhead, N numbered STEP paragraphs
5. Full-bleed features section — navy gradient background, retail lifestyle photo bleeds edge-to-edge on left, numbered features list on right

**Status by tab:**
- ✅ xoFit Core — fully complete with all copy + images
- ✅ xoFit Mobile — fully complete with all copy + images. ALL transparency issues resolved via chroma-key on 2026-07-28.
- ❌ xoFrame — placeholder copy only. Waiting on user's copy + assets. Use same skeleton, plug data in.

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

xoFrame tab content — waiting on user to provide:
- Product photo(s) with transparent background
- Copy: intro subhead + body paragraph
- Six-tile grid content
- Interface / how-it-works content (if applicable to xoFrame)
- Features list
- Retail/lifestyle photo

Use the same skeleton as Mobile. Data goes into `FORM_FACTORS[2]` in `Fit.jsx`.

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
