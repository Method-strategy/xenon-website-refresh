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

Diagnosed 2026-07-31, **re-verified live in this session (fork, current date)**. Our click-to-load implementation works correctly end to end (verified via live network trace + `testing_agent_v4` on two separate iterations, `iteration_9.json` and `iteration_10.json`): button click → script injects → `tint-vto` custom element registers → widget overlay opens (~1s). The overlay then hangs on its own internal spinner because **Tint/Banuba's own CDN is serving the core WebAssembly engine file with the wrong `Content-Type` header**:
- `https://tintvto.com/xenonophthalmics/assets/BanubaSDK.simd-d6b22068.wasm` (11.9 MB) returns `Content-Type: application/x-www-form-urlencoded` instead of `application/wasm`. Re-confirmed via fresh `curl -I` in this session — still reproducing, same header, same CloudFront cache.
- This disables the browser's fast `WebAssembly.instantiateStreaming()` path (which strictly requires `application/wasm`), forcing a fallback to downloading the full 11.9 MB into memory then compiling non-streamed — measurably slower, especially on weaker devices/connections. This explains why the widget shows zero console errors and zero failed (4xx/5xx) requests, yet can still take a very long time (or feel like an infinite spin) to finish initializing.
- Client action: raise this with the Tint/Banuba account rep, referencing the exact asset URL and the wrong Content-Type header above, and ask them to serve `.wasm` assets with `Content-Type: application/wasm`.
- This is entirely outside our codebase/control.

**Mitigation shipped in this session (since we can't fix the vendor's CDN):** `Fit.jsx` now arms a 20s "stuck" timer (`VTO_STUCK_TIMEOUT_MS`) every time `.open()` is called, cleared only by the vendor's own `analysisFinished` custom event (the one reliable "the internal pipeline actually finished" signal — `widget.open()`'s own promise resolves as soon as the overlay is mounted, not when it's actually ready, which was the flaw in an earlier attempt this session that didn't fix anything). If 20s pass with no `analysisFinished` event, a toast tells the user it's taking longer than usual and to close/retry via the widget's own X. Verified via `testing_agent_v4` (`iteration_10.json`): toast fires reliably at ~20s across 3 runs, re-arms correctly on repeat clicks, zero regressions across 7 tab switches.

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

## CLS / LCP performance audit (this session, current date)

Full site audit targeting CLS < 0.1 and LCP < 2.5s, tested via `testing_agent_v4` (`iteration_12.json`, 100% pass, zero regressions) across Home, System, and all 4 product pages.

**Shifts found + fixes applied:**
1. **Hero entrance animations delayed LCP the most.** Home hero image faded in over 2.2s (`opacity:0→1, scale:1.08→1`); the hero headline (word-by-word stagger reveal), subhead, and CTA buttons all faded in 0.6-1.4s after mount, on both the Home hero and `ProductHero.jsx` (shared by all 4 product pages). Fixed: removed all mount-triggered `initial`/`animate` motion props from both heroes — everything above the fold now paints immediately and statically. Scroll-linked parallax (unrelated to initial paint) was kept. The line-by-line mask-reveal treatment is preserved everywhere else on the site (triggers on scroll-into-view, so it never delays LCP).
2. **Unsized images caused shift on load.** The xoFrame wide device image and Core/Mobile interface screenshots in `Fit.jsx` had no width/height/aspect-ratio, so their containers collapsed to 0 height until the image loaded, then jumped. Fixed with explicit `width`/`height` attributes (+ CSS `aspect-ratio` on the xoFrame container) sourced from each image's real pixel dimensions.
3. **~40 logo `<img>` tags site-wide** (Navbar, Footer, Home product cards, System steps, ProductHero, EyeCare4Kids partner logo) used `h-X w-auto` with zero width/height attributes, so each logo's width only resolved after its SVG loaded, nudging neighboring text/elements. Fixed by adding width/height attributes (using each SVG's real viewBox ratio) to every instance.
4. **Font-swap risk + 2 dead external requests.** Fonts were loaded from Google Fonts + Fontshare CDN (extra DNS/connection hop before text could paint), and Fontshare's "Clash Display" family was being loaded but never used anywhere in the app. Fixed: self-hosted the 3 real families (Manrope, Zalando Sans SemiExpanded, JetBrains Mono — one variable-font file each, ~95KB total) in `/public/fonts/`, declared via `@font-face` with `font-display: swap` in `/public/fonts/fonts.css`, preloaded in `index.html` (all 3 are used above the fold on every hero). Removed the Google Fonts + Fontshare `<link>` tags entirely.
5. **Oversized PNGs.** `xolab-edge.png` was a 2.1MB PNG (worst offender) plus 6 others (400-430KB each) — `frame-tryon`, `mobile-screen-1/2/3`, `xolab-block`, `xolab-trace`. Converted all to WebP (alpha preserved): combined ~4.2MB → ~330KB. Added a mobile-sized (750-900px) WebP variant + `srcSet` for the two largest (`xolab-edge`, `frame-tryon`).
6. **Hotlinked Unsplash/Pexels decorative images** were served at full original resolution with no format/size hints. Added each provider's own resize+format query params (`auto=format`/`auto=compress`, width caps) directly in `site.js`'s `IMAGES` object.

Not done (flagged, not applied): per-font `size-adjust` metric-matching for zero-shift font swap (diminishing returns given preload already makes the swap window very short); `mobile-device.webp` (348KB) left as-is since it was already WebP, just not re-compressed.

Netlify deploy-cancellation and VTO-hang investigation both closed out this session (see below). Remaining backlog:
- SSG/prerendering choice pending from user: (a) `react-snap` (lightweight, prerenders existing CRA app, low risk) vs (b) full Astro migration (bigger rewrite, better long-term SEO/perf).
- Ask client to raise the WASM `Content-Type` misconfiguration with their Tint/Banuba rep (see blocker note above) — this is the actual fix for the VTO hang; our toast is only a UX safety net. Status per client (this session, current date): still waiting on Banuba to ship the fix.

## Six Outcomes messaging framework (this session, current date) — DONE

User supplied a sales methodology PDF ("Xenon Practice Optimization Selling System") requiring the Homepage and System overview page to incorporate the sales team's "Six Outcomes" framework (Time, Profitability, Control, Patient Experience, Clinical Quality, Practice Growth) plus the objective statement, and to use a newly supplied XO Vision Care System brand logo lockup (light-bg + dark-bg PNG, converted to WebP) wherever the System is first introduced.

Evaluated Emmy's initial generic prompt (flat 3x2 grid + floating quote) and instead placed content for narrative cohesion, confirmed with user before building:

- `data/site.js`: new `SIX_OUTCOMES` (6 items, key/title/body) and `SYSTEM_GOAL_STATEMENT` exports, shared by both pages.
- New logo assets: `/app/frontend/public/logos/xo-vision-care-system.webp` (light-bg, navy/blue text) and `xo-vision-care-system-dark.webp` (dark-bg, white text), both 956x344, explicit width/height everywhere used (no CLS).
- **Home.jsx**: hero eyebrow replaced with the dark-bg logo lockup (Home hero is permanently forced navy via `.hero-dark` CSS regardless of theme toggle, so only the dark variant is needed there). New full-width "The six outcomes" section (eyebrow "04 · The six outcomes") inserted between "Components" and "Proof" (renumbered "05 · Where it proves out"), same hairline-grid-tile visual pattern as the existing "Where your capacity goes" tiles. New anchor added to sidebar `ANCHORS`. Closing full-bleed navy-gradient "Our goal" banner (reusing the exact existing stat-callout gradient/spotlight pattern) added right before the final DemoCTA, `data-testid="home-goal-statement"`.
- **System.jsx**: hero eyebrow replaced with the logo lockup, swapping light/dark variants via `dark:hidden`/`dark:block` (this hero follows the global theme toggle, unlike Home's). Compact "six outcomes" legend (pill chips for all 6 names) inserted after "The problem this solves" and before the numbered workflow steps, with a new sidebar anchor — added per user's explicit choice (option "a": page should stand alone for a visitor who lands directly on it). Each of the 4 numbered steps (`STEPS` array) now has an `outcomes` field with 1-2 keys, rendered as small pill tags under the existing hand-off blockquote: Schedule → Time + Practice Growth, Exam → Clinical Quality + Control, Fit → Patient Experience + Time, Finish → Profitability + Practice Growth (grounded in each step's existing copy, not invented spin). Same closing navy "Our goal" banner before the final `<DemoCTA/>`, `data-testid="system-goal-statement"`.

**Verified via `testing_agent_v4` (`iteration_14.json`, 100% frontend pass, zero bugs):** both new sections/banners render correctly, exact outcome tag text confirmed per step, dark-theme logo swap on System hero confirmed, sidebar anchor scroll-to behavior confirmed on both pages, full regression sweep of pre-existing sections/links passed, Contact page HubSpot form smoke-check passed with no new test leads created.

**Correction after user review (same session):** user did not want the logo lockup in the Home hero at all — reverted hero back to the plain text eyebrow. User provided a new horizontal logo lockup variant (light-bg `xo-vision-care-system-horiz.webp` + dark-bg `xo-vision-care-system-horiz-dark.webp`, both 1390x253, saved to `/app/frontend/public/logos/`) and asked for it to appear instead in the "02 · One visit, start to finish" section, placed right before that section's closing punctuation line ("One system. From appointment to finished eyewear..."), swapped via `dark:hidden`/`dark:block` since that section follows the global theme toggle. System.jsx hero still uses the original stacked logo lockup (light/dark webp, 956x344) — user's feedback was Home-hero-specific only, System page unchanged. Verified via screenshot (light + dark hero states, section 02 logo placement).

`Contact.jsx` now submits directly to HubSpot's public unauthenticated Forms Submit API (`POST https://api.hsforms.com/submissions/v3/integration/submit/245698072/cf605cae-ee6b-4a84-9783-ae35dd05bae2`), no backend involved, fully custom-styled with the site's existing Input/Select/Textarea components (no iframe).

**Critical correction from user this session:** the previous session's mocked form had invented fields (Practice size, Preferred time, Preferred date) that don't exist on the client's real, live HubSpot form. User pushed back hard ("NOOOO Use the fields that are in the Hubspot form and our look and feel") and shared screenshots of the actual old-site embed. Fetched the live rendered HTML from `xophthalmics.com/contact/` to read the real field structure directly out of the HubSpot iframe's DOM, then used curl probes against the two candidate submit endpoints to confirm the exact internal property names (the `forms-next multipart` endpoint seen in the DOM explicitly returned `"Do not integrate against this resource"`, confirming the legacy `api.hsforms.com/submissions/v3/integration/submit/...` endpoint from the playbook is the correct one; iteratively sent test payloads and read HubSpot's own `REQUIRED_FIELD` error messages to converge on exact names).

**Confirmed real field set (do not add back the old invented fields):**
- First name → `firstname` (contact, objectTypeId `0-1`), required
- Last name → `lastname` (`0-1`), required
- Email → `email` (`0-1`), required
- Phone → `phone` (`0-1`), required
- Profession → `profession` (`0-1`), required, dropdown — options MUST exactly match HubSpot's configured values: `Optometrist, Ophthalmologist, Eye Care Professional, Academic Clinic, Mass Retailer, NGO, Other` (now in `PROFESSIONS` in `data/site.js`, replacing the old made-up list)
- Company name → `name` (company, objectTypeId `0-2`), required
- Company size → `numberofemployees` (`0-2`), optional, dropdown — options: `1-10 Employees, 11-25 Employees, 26-50 Employees, 50+ Employees` (new `COMPANY_SIZES` export in `data/site.js`). Note: internal property name for this one field is a best-guess (standard HubSpot company property) since it returns HTTP 200 either way (this HubSpot account's unauthenticated endpoint does not strictly reject unknown/extra field names — verified by sending a deliberately bogus field name and getting 200 back too). If the client reports Company Size isn't landing in the right CRM field, this is the one property to double check with them directly in HubSpot's property settings.
- Additional information → `comments` (`0-1`), optional textarea

Sends `context: { pageUri, pageName, hutk (if hubspotutk cookie exists) }` per the playbook. No HubSpot tracking script installed (would add a 3rd-party cookie/script outside the site's own consent system and is out of scope; `hutk` just won't be present, which is a graceful no-op per HubSpot's own docs).

Removed the now-dead backend `/api/demo-request` POST/GET endpoints, models, and `test_demo_request.py` (mocked local storage, fully superseded by the direct-to-HubSpot submission).

**Verified end-to-end (this session):** curl probes against the live HubSpot API (200 + real contact/company created), then a full real-browser Playwright run filling every field, submitting, and confirming the "Request received" success state + toast render correctly with the new field layout, matching site aesthetic (no iframe, no rounded-box regressions beyond what already existed).

**Action needed from user:** a handful of test contacts were created in the live HubSpot CRM while confirming field mappings (emails: `testagent-probe-donotuse@example.com`, `testagent-probe-donotuse2@example.com`, `testagent-probe-donotuse3@example.com`, `agentqa-smoketest-donotuse@example.com` / companies `ProbeCo`, `Probe Test Co`, `Probe Test Co 2`, `Probe Test Co 3`, `Agent QA Smoke Test Co`) — safe to delete from HubSpot Contacts/Companies.

## Netlify build-cancellation fix (this session, current date)

Root cause: Netlify's monorepo change-detection (`base = "frontend"`) only diffs inside that folder, and can misfire "no content change" even when new commits land (e.g. commits that only touch root-level files). Fixed by adding `ignore = "exit 1"` under `[build]` in `/netlify.toml` — Netlify's `ignore` command convention is inverted (exit 0 = skip build, exit 1 = proceed), so this forces a build on every push regardless of what changed. Verified `yarn build:netlify` still completes cleanly locally after the change (`Compiled successfully`, `[strip-emergent] Removed Emergent-specific scripts`).

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

## Lighthouse follow-up audit (this session, later same day)

Full Lighthouse run (desktop + mobile) on the live Netlify deploy after the CLS/LCP audit above: **CLS 0/0, Desktop LCP 0.9s, Performance 99/92, Accessibility 96/100, Best Practices 96/100, SEO 92/92**. Tested via `testing_agent_v4` (`iteration_13.json`, 100% pass).

- **Best Practices 96 (desktop) — not a real bug.** The 4 flagged console errors are the signature Chrome extension messaging error ("A listener indicated an asynchronous response..."), traced to the user's own installed browser extensions (Adobe Acrobat, Loom — visible elsewhere in the same report). Confirmed via the mobile run on the same deploy scoring a clean 100 with zero console errors. No code change needed/made.
- **SEO 92 — real bug, fixed.** No `robots.txt` existed, so Netlify's SPA catch-all redirect served `index.html` at that path, flagged as invalid syntax. Added a real `frontend/public/robots.txt`.
- **Agentic Browsing 2/3 — fixed.** No `llms.txt` existed. Added `frontend/public/llms.txt` with H1 + links to all 4 products and key pages.
- **CSP / X-Frame-Options / Trusted Types flags** — intentionally left alone (marked "Unscored", don't move the number; a CSP is one of the most common things that silently breaks third-party embeds, too risky given the VTO integration's history). Backlog only.
- **Mobile LCP was 3.3s (desktop 0.9s)** — bottleneck was JS bundle parse/execute time under throttling, not image loading. Fixed with route-based code-splitting in `App.js`: Home stays eagerly bundled, every other route is `React.lazy()` behind a single `<Suspense fallback={null}>` wrapping `<Outlet/>` inside `Layout` (Navbar/Footer/CookieConsent/Toaster are not lazy, never remount on navigation). Main bundle dropped ~245KB → ~167KB gzipped for Home.

**Standing instruction from user: do not ship changes that regress CLS/LCP/these Lighthouse scores in significant ways going forward** — current levels (CLS 0, Desktop LCP <1s, the SEO/Agentic fixes above) are the performance baseline for all future work on this site.
