# Xenon Ophthalmics — Product Requirements & Session State

Last handoff: 2026-09-01 (sitewide voice audit)

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

## Sitewide width audit + xoFrame VTO removal (this session, current date) — DONE

**Width audit:** extended the headline-vs-lede width system (established on Home.jsx: headline `max-w-4xl`, lede `max-w-2xl`+`text-lg`) to `System.jsx`, all 4 product pages (`Iris.jsx`, `Exam.jsx`, `Fit.jsx`, `Lab.jsx`), and the shared `ProductHero.jsx` hero component (one fix cascades to all 4 product page heroes). Fixed ~15 outlier headlines (missing max-w entirely, which matters because `MaskTextInView` uses CSS `text-wrap:balance` — an unconstrained headline can collapse to one unbalanced line on ultra-wide desktops) and ~8 outlier ledes (`max-w-md`/`max-w-lg`/`max-w-xl` instead of the standard `max-w-2xl`). Deliberately left "split" two-column intro layouts (headline in one grid column, body in an adjacent column) untouched since their width already comes from the intentional grid split, not an arbitrary max-w. Secondary/smaller sub-headlines (text-3xl tier) got `max-w-3xl` instead of the primary `max-w-4xl`, proportional to their smaller scale.

**xoFrame VTO removal:** the Tint/Banuba VTO vendor is mid-platform-migration and their integration is deprecated. Removed all widget code from `Fit.jsx` (script-injection `useEffect`, `<tint-vto>` custom element + persistent container div, `VTO_MERCHANT_ID`/`VTO_WIDGET_SRC` constants, `openVTO()` handler) and the "Try xoFrame Demo" button. Replaced with a `Link` to `/request-a-demo` labeled "Request Demo" under a renamed "See it in action" eyebrow. `netlify.toml` COOP/COEP headers deliberately left in place per standing instructions (re-integration expected once vendor ships new SDK). Also fixed an unrelated pre-existing duplicate `imageAlt` prop on `Fit.jsx`'s `ProductHero` usage.

**Verified via `testing_agent_v4` (`iteration_16.json`, 100% pass):** zero `tint-vto` elements/references/network calls remain, new button navigates correctly to a working `/request-a-demo`, width consistency confirmed via screenshots at 2560px/1440px/390px across all 6 pages, no regressions on tabs/FAQ/links/DemoCTA.

**Follow-up (same session):** user asked to match the System page hero logo exactly to Home.jsx section 02's config — switched from the stacked lockup (956x344, `h-12 md:h-14`) to the horizontal lockup at the identical size used on Home (`width=1390 height=253`, `h-[52.8px] md:h-[66px]`). Deleted the now-fully-unused stacked `.webp` logo files. Verified via screenshot in both light and dark theme.

**Section 05 simplified (same session):** collapsed the "two stacked blocks" pattern into one clean block per user's new copy: eyebrow "05 · See it work", headline "See the whole journey in thirty minutes." (DemoCTA default, unchanged), lede "No two practices lose capacity in the same place. We'll walk the XO Vision Care System through your practice's actual workflow, from the appointment to the finished pair, and show you where yours is going.", button "Request a Demo" (DemoCTA default). Removed the now-redundant standalone intro block ("Built around how your practice runs...") from Home.jsx; `<DemoCTA/>` is called directly with `eyebrow`+`body` overrides, `topBorder` back to its default `true` since it's the section's only block now. Verified via screenshot.

## Homepage August 2026 revision + width system (this session, current date) — DONE

**Copy revision** (per user's `Xenon_Homepage_01-02_Revision.docx`, 3 verbatim find/replace patches): Section 01 lede now reads "...isn't physical. It's the capacity that quietly disappears before, between, and around the care itself. There are four places it goes." Section 02 H2 changed from "Every step starts where the last one ended." to "Four gaps. One system built to close them." Section 02 lede changed to "All four have the same root cause: tools bought separately and connected after the fact. The XO Vision Care System was designed as one system across the whole visit, from the appointment to the finished pair, so capacity that used to disappear comes back to the practice." Everything else in both sections left untouched per the doc's instruction.

**Width system fix:** user flagged that lede-vs-headline column widths felt arbitrary across the page. Audited every section's `max-w-*` on both the H2 (rendered via `MaskTextInView`, which uses `text-wrap:balance` — so max-width directly controls how many lines the headline balances into, this is not just cosmetic) and the lede paragraph. Established one consistent rule applied to all 5 sections + Hero + `DemoCTA.jsx`: headline `max-w-4xl` (896px), lede `max-w-2xl` (672px) + `text-lg`. Fixed outliers: Section 02/03 headlines had no max-w at all (could render as 1 unbalanced line on ultra-wide desktops since `xo-container` caps at 1400px); Section 04's lede was `max-w-lg` (512px, narrower than every other lede); Section 05's headline was `max-w-3xl`; Hero's subhead was `max-w-xl`; `DemoCTA.jsx`'s body was `max-w-xl text-base`. `DemoCTA` change is global (used on News/Blog/About/product pages too) — verified it only widens/enlarges the reading measure, doesn't break any existing page. Verified via screenshot at 2560px (30" desktop) and 390px (mobile).

Audited all 4 product pages' hero copy, meta descriptions, and FAQ/CTA text against the homepage's restructured verbatim copy. Hero subheads were left as-is (intentionally distinct per-page marketing angles, not required to be verbatim-identical to the homepage's compact card blurbs). Tightened the SEO meta `description` in `usePageMeta` for all 4 pages (Iris/Exam/Fit/Lab) to match the new homepage `PRODUCTS[].blurb` phrasing exactly where it diverged (e.g. Lab's "compact in-office footprint" → "footprint sized for a practice", "same-day" → "same day" for consistency). No stale references to removed homepage sections/copy found elsewhere (checked "the six outcomes", "one visit", "our goal", "the components" — all clear). Verified via browser title/meta check across all 4 pages.

## Product page sync (this session, current date) — DONE

Added a tailored "What it delivers" section to each of the 4 product pages, deliberately varied in layout per user's instruction ("do not make it precisedly the same on each page"): xoIris uses stacked label/body rows (Time, Practice Growth); xoExam uses a 2-card bordered grid (Clinical Quality, Control); xoFit uses an editorial big-quote 2-column layout with no borders (Patient Experience, Time); xoLab uses numbered ledger-style rows matching its existing EQUIPMENT numbering convention (Profitability, Practice Growth). Copy is product-specific, not lifted verbatim from the Home.jsx six-outcome text. Fixed the two rendered em dashes in `CookieConsent.jsx` (replaced with a colon and semicolon respectively). Verified via screenshot across all 4 product pages + cookie banner.

## Homepage full restructure (this session, current date) — DONE

**System page brought in line with homepage (same session):** renamed "The six outcomes" → "What it delivers" (sidebar anchor + legend heading) to match the homepage's renamed section. Removed the closing "Our goal" navy banner (`SYSTEM_GOAL_STATEMENT`) since it no longer exists on the homepage after the restructure — page now flows Deployment → DemoCTA directly, mirroring Home.jsx. Removed the now-fully-unused `SYSTEM_GOAL_STATEMENT` export from `site.js`. Verified via screenshot.

User supplied two documents (an instruction spec `Emergent_Homepage_Prompt.md` + a verbatim copy file `Xenon_Homepage_Copy_v2.md`) requiring a full homepage restructure from "standalone Problem section + 6 anchored sections" down to **5 anchored sections, no standalone problem section**. Implemented verbatim (zero paraphrasing), with zero em/en dashes in any rendered text, preserving all existing visual system/dark-navy theme (content + structure change only, not a redesign).

**Removed entirely:** the standalone "The problem" section (headline "Demand for eye care is rising...", 1B+/Rising/Flat stat card), the old stage-list block ("Before they arrive / The exam experience / At the fitting / At the finish"), the old closing line "One system. From appointment to finished eyewear. Not four products...", and the "OUR GOAL" navy panel (removed from Home.jsx only — `SYSTEM_GOAL_STATEMENT` export kept in `site.js` since System.jsx still uses its own copy of this banner).

**New 5-section structure** (`ANCHORS` in `Home.jsx`): `01 capacity` (unchanged id, eyebrow/lede/closing line rewritten verbatim) → `02 system` (NEW, merges old "one-visit" + "components" into one full-width section: horizontal logo lockup, new headline "Every step starts where the last one ended.", 4 merged product cards each with wordmark + stage label + new verbatim body + Explore link, closing line, "See how the system works" button) → `03 delivers` (renamed from "outcomes", numbered 01-06 badges removed from tiles per spec, titles + new verbatim body copy) → `04 proof` (renumbered from 05, lede/EyeCare4Kids paragraph/closing statement all rewritten verbatim) → `05 demo` (NEW two-stacked-block section: intro block "Built around how your practice runs." + existing `<DemoCTA/>` component, whose default props already matched the new copy verbatim, so it needed no changes).

Updated shared `data/site.js`: `PRODUCTS[].blurb` (xoIris/xoExam/xoFit/xoLab) and `SIX_OUTCOMES[].body` rewritten to new verbatim copy (titles/roles unchanged).

**Verified via `testing_agent_v4` (`iteration_15.json`, 100% frontend pass):** all 5 sections' verbatim copy confirmed, old content confirmed fully removed (no leftover legacy phrases), number badges removed from delivers tiles, dark-theme logo swap in section 02 confirmed, all 4 product "Explore" links + system link navigation confirmed, zero em/en dashes and zero "screening" occurrences in rendered Home.jsx content, System.jsx page regression-checked as unaffected (out of scope, untouched). Only flagged item: pre-existing em dash in the unrelated global `CookieConsent.jsx` banner — out of scope for this task, noted for future cleanup if strict site-wide dash compliance is ever required.

## Six Outcomes messaging framework (this session, current date) — DONE

User supplied a sales methodology PDF ("Xenon Practice Optimization Selling System") requiring the Homepage and System overview page to incorporate the sales team's "Six Outcomes" framework (Time, Profitability, Control, Patient Experience, Clinical Quality, Practice Growth) plus the objective statement, and to use a newly supplied XO Vision Care System brand logo lockup (light-bg + dark-bg PNG, converted to WebP) wherever the System is first introduced.

Evaluated Emmy's initial generic prompt (flat 3x2 grid + floating quote) and instead placed content for narrative cohesion, confirmed with user before building:

- `data/site.js`: new `SIX_OUTCOMES` (6 items, key/title/body) and `SYSTEM_GOAL_STATEMENT` exports, shared by both pages.
- New logo assets: `/app/frontend/public/logos/xo-vision-care-system.webp` (light-bg, navy/blue text) and `xo-vision-care-system-dark.webp` (dark-bg, white text), both 956x344, explicit width/height everywhere used (no CLS).
- **Home.jsx**: hero eyebrow replaced with the dark-bg logo lockup (Home hero is permanently forced navy via `.hero-dark` CSS regardless of theme toggle, so only the dark variant is needed there). New full-width "The six outcomes" section (eyebrow "04 · The six outcomes") inserted between "Components" and "Proof" (renumbered "05 · Where it proves out"), same hairline-grid-tile visual pattern as the existing "Where your capacity goes" tiles. New anchor added to sidebar `ANCHORS`. Closing full-bleed navy-gradient "Our goal" banner (reusing the exact existing stat-callout gradient/spotlight pattern) added right before the final DemoCTA, `data-testid="home-goal-statement"`.
- **System.jsx**: hero eyebrow replaced with the logo lockup, swapping light/dark variants via `dark:hidden`/`dark:block` (this hero follows the global theme toggle, unlike Home's). Compact "six outcomes" legend (pill chips for all 6 names) inserted after "The problem this solves" and before the numbered workflow steps, with a new sidebar anchor — added per user's explicit choice (option "a": page should stand alone for a visitor who lands directly on it). Each of the 4 numbered steps (`STEPS` array) now has an `outcomes` field with 1-2 keys, rendered as small pill tags under the existing hand-off blockquote: Schedule → Time + Practice Growth, Exam → Clinical Quality + Control, Fit → Patient Experience + Time, Finish → Profitability + Practice Growth (grounded in each step's existing copy, not invented spin). Same closing navy "Our goal" banner before the final `<DemoCTA/>`, `data-testid="system-goal-statement"`.

**Verified via `testing_agent_v4` (`iteration_14.json`, 100% frontend pass, zero bugs):** both new sections/banners render correctly, exact outcome tag text confirmed per step, dark-theme logo swap on System hero confirmed, sidebar anchor scroll-to behavior confirmed on both pages, full regression sweep of pre-existing sections/links passed, Contact page HubSpot form smoke-check passed with no new test leads created.

**Correction after user review (same session):** user did not want the logo lockup in the Home hero at all — reverted hero back to the plain text eyebrow. User provided a new horizontal logo lockup variant (light-bg `xo-vision-care-system-horiz.webp` + dark-bg `xo-vision-care-system-horiz-dark.webp`, both 1390x253, saved to `/app/frontend/public/logos/`) and asked for it to appear instead in the "02 · One visit, start to finish" section, placed right before that section's closing punctuation line ("One system. From appointment to finished eyewear..."), swapped via `dark:hidden`/`dark:block` since that section follows the global theme toggle. **Second correction (same session):** user asked to move the horizontal logo again — now placed directly above the "02 · One visit, start to finish" headline ("The visit doesn't stop between the steps."), sized 65% larger (`h-[52.8px] md:h-[66px]`, up from `h-8 md:h-10`). Rationale given by user: the System itself is the core product Xenon sells; the xoExam headset in the Home hero represents the "diagnostic center" / wedge product of that system (context noted, no hero change required). Verified via screenshot.

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


## xoIris custom feature section (2026-02, this session)

Picked up from a forked session where the previous agent was interrupted mid-edit and had left `Iris.jsx` in a broken state (undefined references to `CAPABILITIES`, `COMMS`, and an unimported `Check` icon — a hard render-crashing bug on `/xoiris-scheduling`).

- Removed the broken checkbox-list markup entirely.
- Built a new `FeatureIndex` component (local to `Iris.jsx`) rendering the client's verbatim `FEATURE_GROUPS` data (from XO Iris Features.pdf/docx) as a numbered (01-04), single-open accordion: "Keeping the schedule full" (7 items), "Patient communication" (6 items), "Intake and records" (4 items), "Security and access" (4 items). Each row expands via Framer Motion height/opacity animation, a `Plus` icon rotates 45deg into an "x" when open, and expanded content shows a 2-column grid of mono-indexed feature title + description pairs. No checkboxes, no rounded corners — matches the site's existing "Specifications" numbered-list visual language. Section headline/lede uses the client's exact "site voice" copy from the re-uploaded docx: H2 "What xoIris does." / Lede "Scheduling, confirmation, patient communication, and intake, handled without pulling staff off the floor." (confirmed feature data was already word-for-word accurate on first pass; only the section intro copy needed correcting to match the doc verbatim).
- Mounted as `<FeatureIndex />` between the "A cancellation is a hole in the day" section and "What it delivers" on the xoIris page.
- Verified via `testing_agent_v4` (`iteration_17.json`): 100% frontend pass — zero console/runtime errors, correct default-open state, correct expand/collapse/switch-between-groups behavior, no checkboxes/rounded corners, no regressions elsewhere on the page.

**User explicitly deferred, do not pick up next without being asked again:**
1. SSG/Prerendering (react-snap)
2. Real imagery swap for News/Blog/Team pages
3. VTO re-integration (blocked on vendor SDK)
4. Font metric tuning
5. Shared product page component refactor (Iris/Exam/Fit/Lab)


## Privacy Policy / Cookie Policy text accuracy pass (2026-02, this session)

User provided `Xenon Privacy and Cookie Policies 08-06-2026.docx` (source of truth, dated "Last updated: July 23, 2026" internally) and asked to (1) reconcile our legal pages against it, and (2) match our cookie-consent banner/modal wording to the live legacy site `xophthalmics.com` (design untouched, text only).

- **New page:** `/cookie-policy` (`CookiePolicy.jsx`) — did not exist before. Full 7-section Cookie Policy + a 9-row cookie details table (desktop `<table>`, mobile stacked cards), covering Xenon/Cloudflare/Square (Strictly Necessary), Google Analytics (Analytics/Performance), Google Translate (Translation), and 4x HubSpot cookies (Marketing/Advertising).
- **`PrivacyPolicy.jsx` corrections** (diffed word-for-word against the docx, 6 gaps found and fixed): added a missing "Our Cookie Policy names what that involves" reference, a missing paragraph in "Cookies and your consent" pointing to the new Cookie Policy, a missing middle passage in "How your choice works" (page-reload-clean / provider-domain-cookie removal / retired-tool cleanup), a missing Square privacy-policy link, a missing "(Europa)" typeface name + missing Adobe privacy-policy link in "Fonts", and removed an extra "in the footer" phrase not present in the source doc.
- **New shared helper:** `components/common/RichText.jsx` — renders a paragraph built from plain strings + inline `{to}`/`{href}` link segments; used by `PrivacyPolicy.jsx`, `CookiePolicy.jsx`, and `CookieConsent.jsx` to keep rich inline links DRY.
- **`CookieConsent.jsx` text rewrite to match the live site verbatim:** banner copy now matches xophthalmics.com's exact wording (including the "By continuing to use this site, you agree to our Terms of Service..." sentence that was previously missing entirely) with working links to Cookie Policy/Privacy Policy/Terms. Modal intro copy, all 4 category labels (`Analytics/Performance`, `Marketing/Advertising` — previously used "&" instead of "/"), and category body text now match the live site's Preferences modal (per user-provided screenshots) with per-category Cookie Policy links. Modal's decline button renamed `Reject all` (banner's stays `Decline all`) to match the legacy site's own — slightly inconsistent — labeling between its banner and modal.
- **Intentional deviation (flagged to user, not silently done):** dropped the legacy site's trailing Translation-category sentence "Tapping the Translate control also offers to turn this on" — our site has no floating Google Translate button/control, so keeping that sentence would misrepresent this site's actual behavior.
- **Footer:** added a `COOKIE POLICY` link (between Privacy Policy and Terms of Service).
- Verified via `testing_agent_v4` (`iteration_18.json`): 100% pass, zero console errors, all new links/routes/table rows/toggle-persistence confirmed working, no regressions.


## Team name fix + Google Translate integration (2026-02, this session)

- Fixed a typo in `data/site.js`: advisor "David Metzler" corrected to "David Meltzer, OD, MBA" (Team page).
- **Implemented a real Google Translate widget** (`lib/googleTranslate.js` + `components/common/LanguageSwitcher.jsx`), the free script-based "Website Translator" (no API key), offering exactly: English (default), Chinese, French, German, Hindi, Indonesian, Italian, Spanish, Urdu — matching the legacy xophthalmics.com site's language list. Mounted as a globe+code pill button in the navbar next to the theme toggle (desktop + mobile).
- **Consent-integrated by design:** selecting any non-English language automatically flips the existing "Translation" cookie category on (via new `getConsent()`/`setConsentCategory()` exports added to `CookieConsent.jsx`, synced through a shared `xo:consent-updated` event so the Preferences modal's Translation toggle and the navbar switcher never drift out of sync) — this makes our own already-published Cookie Policy text about translation cookies being off-by-default actually true. Restored the "Tapping the language control also offers to turn this on" sentence in the Translation category copy now that a real control exists.
- Iterated through 2 rounds of `testing_agent_v4` (`iteration_19.json` found 3 bugs: stale CSS selector let Google's banner overlap the navbar, wrong language restored on reload, first-pick translation not rendering until reload; `iteration_20.json` confirmed all 3 fixed via a `googtrans` cookie pre-set + mount-race guard + call-serialization queue + persistent retry loop). One trivial self-tested cosmetic follow-up applied after: skip redundant re-dispatch in the retry loop once the value is already correct, to remove a ~1s flicker.
- Evaluated applying the Iris.jsx feature-accordion pattern to Exam/Fit/Lab per user's optional suggestion — none have the "wall of ungrouped features" problem it solves (Fit already uses a fitting numbered list, Lab uses compact in-card bullets, Exam has no comparable list), so left unchanged to avoid unnecessary complexity.
- Note: user confirmed an Astro migration is planned by their dev/deploy colleague — SSG/prerendering (react-snap) task removed from this app's backlog, not our responsibility going forward.


## Bug fix: floating section nav "locked to 01" (2026-02, this session)

User reported the floating side-nav on the homepage (01-05 numbered anchors) didn't remain available/update past the first section. Root cause: `SectionAnchors.jsx` used `position: sticky` scoped to a grid column that only spanned Section 1's height — sections 2-5 are full-width siblings outside that column (needed for edge-to-edge background bleed), so the sticky container ended after section 1 and the nav scrolled away for good. Same bug existed on `/xo-vision-care-system` (System.jsx), which reuses the same component.


## Follow-up fix: SectionAnchors z-index + background (2026-02, this session)

User caught a real gap in the prior fix (iteration_21): the nav was made `position: fixed` correctly, but never given a z-index or backing, so it had no defined stacking order against page content and no visual backing when floating over full-width sections with dark/varied backgrounds. Fixed: added `z-30` (below Navbar's z-50 and CookieConsent's z-70/80), and a soft gradient backdrop (`bg-gradient-to-r from-bg via-bg/90 to-transparent backdrop-blur-xl`, negative-z locally within the nav, fading on the right rather than a hard box) so the anchor list stays legible against any section behind it. Verified via `testing_agent` (`iteration_22.json`): 100% pass across all sections on both Home and System pages, dark backgrounds specifically checked, no regression to the scroll-tracking fix.

Fix: rewrote `SectionAnchors.jsx` to use JS-measured `position: fixed` (left/width read from a wrapper ref sitting in the original grid column, so horizontal alignment stays correct at any viewport width) with visibility gated by comparing the wrapper's top and the last tracked section's bottom against the fixed top offset — replicating what native sticky-within-a-tall-container would do, without restructuring the full-bleed section layouts. Verified via `testing_agent` (`iteration_21.json`): 100% pass on both Home and System pages, correct show/hide boundaries, no regressions.


## Global rename: "Terms of Service" → "Terms & Conditions" (2026-02, this session)

Renamed the last 2 remaining user-facing "Terms of Service" labels to "Terms & Conditions" for consistency with the Terms page itself (which already used "Terms & Conditions" as its title/heading): the footer link (`Footer.jsx`) and the cookie consent banner's inline link (`CookieConsent.jsx`). Confirmed via grep no other occurrences remain anywhere in `frontend/src`. Route paths (`/terms-and-conditions`, `/terms-of-service` alias) unchanged — only display text.


## Full-site responsive audit (2026-02, this session)

User asked to confirm the whole site is built responsively and fix any breaks found. Confirmed the desktop-only floating side-nav (SectionAnchors) correctly disappears below 1024px. Code review across all 14 pages found the site already follows mobile-first Tailwind conventions consistently (grid-cols-1 with md:/lg: overrides, flex-wrap tab lists, etc.) with only 2 minor gaps: Exam.jsx's decorative "19" watermark and System.jsx's step numbers weren't scaling down for mobile (both fixed — hidden below md / scaled via text-4xl md:text-7xl respectively).

`testing_agent` (iteration_23.json) then ran the real visual sweep (390px mobile + 768px tablet across all 14 routes) since the main agent's own screenshot tool wasn't respecting custom viewport sizes this session. It found and fixed a bigger site-wide bug: **Footer.jsx caused ~22-29px of clipped/overflowing content on every single page at both breakpoints** — a `whitespace-nowrap` copyright line, an unbreakable contact email string, and a `gap-14` too wide for the md breakpoint. Fixed with `min-w-0`/`break-all` on the email link and `md:gap-8 lg:gap-14`. Re-verified: 28/28 route×breakpoint checks pass with zero overflow. `body { overflow-x: hidden }` already existed in `index.css` as a safety net (masked the scrollbar but not the underlying clipped-content bug, which is why it went unnoticed visually until this audit).


## VTO re-integration: Tint (Banuba) widget (2026-02, this session)

User provided vendor code fragments (script tag + `<tint-vto>` custom element + `.open()` trigger) to re-integrate the VTO widget removed earlier this session (see "Completely removed deprecated Banuba/Tint VTO widget" entry above). Called `integration_expert` first per policy for the embedding approach (singleton script loader + `customElements.whenDefined` pattern).

- **Implemented:** `/app/frontend/src/lib/tintVto.js` (singleton script loader), wired into `Fit.jsx`'s xoFrame tab — the old "Request Demo" button in the "See it in action" block is now "Try xoFrame VTO" (`data-testid="vto-trigger-button"`), calling `loadTintWidget()` then `vtoRef.current.open()` with a 10s timeout race and error state. Publishable key (confirmed final by user) and variant ID stored in `frontend/.env` as `REACT_APP_TINT_PUBLISHABLE_KEY` / `REACT_APP_TINT_VARIANT_ID`.
- **`MERCHANT_VARIANT_ID` confirmed as a placeholder** (not a usable value) — via Tint's own docs (tintvto.com/docs/introduction.html), which describe merchant/variant identifiers as account-specific values obtained by contacting Banuba directly. **User still needs to get the real variant ID from their client.**
- `testing_agent` (iteration_24.json): our integration code is 100% correct (button gating per tab, singleton script load, no crashes, no regressions) — confirmed via DevTools network inspection. But **the vendor widget itself cannot initialize yet**: `POST api.tintvto.com/api/v1/public/resolve` returns `403 origin_denied` — **the preview/production domain is not allowlisted on Tint's side for this publishable key.** This blocks end-to-end testing regardless of variant-id and is an account-side fix only Banuba/Tint support can make (contact form on banuba.com or info@banuba.com).
- Fixed 3 issues found by the test: stale caption copy (now tells users how to close the vendor's modal, since Escape doesn't work — only their own × does), a ~150px cosmetic layout gap from the unstyled custom element (zeroed out via inline style), and added a defensive open() timeout (won't catch the specific origin-block case since Tint's `open()` resolves regardless of internal init success, but guards against genuine hangs).
- **Update:** Banuba/Tint allowlist confirmed fixed by user. Retested (`iteration_25.json`): `403 origin_denied` is gone — the SDK now fully bootstraps (Banuba WebAR 1.18.4, all 26 assets load) and gets one step further to `POST /public/resolve -> 404 product_not_found` with `variantId="MERCHANT_VARIANT_ID"`, behaviorally proving the placeholder variant-id is now the ONLY remaining blocker. Vendor's modal shows a blank infinite spinner on this failure (no error UI on their side); our own error state can't catch it either since their `open()` resolves regardless of internal init success (documented limitation, not a fixable gap on our end without a vendor-exposed ready/error event).
- **Next step for user:** get the real variant ID from the client, set it in `frontend/.env` as `REACT_APP_TINT_VARIANT_ID`, restart frontend, retest. That's the only remaining step — everything else (domain, code, publishable key) is confirmed working.

## VTO deployment to Netlify + LCP/performance follow-up (2026-02, this session)

- **Netlify deployment debugging:** Widget worked in preview but not on Netlify. Emergent Support diagnosed 3 possible causes; confirmed via repo inspection that #1 (env var not reaching Netlify build, since `.env` is git-ignored) and #3 (netlify.toml's COOP/COEP headers) both exist as described. Since `REACT_APP_TINT_PUBLISHABLE_KEY` is a *publishable* key (public by design, secured via Tint's domain-allowlist, not secrecy — same model as Stripe's publishable key), added it directly to `netlify.toml`'s `[build.environment]` block so it's committed to git and flows through Netlify's build automatically going forward, no manual dashboard step needed. Did NOT touch the COOP/COEP headers (Banuba's WebAR engine may need them for SharedArrayBuffer/WASM threading) — flagged as last-resort only if the other two fixes don't resolve it.
- **Variant-id breakthrough:** client asked whether we'd tried the widget with the `variant-id` attribute fully omitted (not just empty). Tested — **this works**: Tint falls back to default catalog mode (shows their full account catalog: Alexander McQueen, Fendi, Gucci, Saint Laurent) instead of erroring on an unmatched product ID. Code now uses `variant-id={TINT_VARIANT_ID?.trim() || undefined}` so React omits the attribute entirely when unset (`REACT_APP_TINT_VARIANT_ID` is currently empty in `.env`). Confirmed end-to-end via testing_agent: `resolve` returns 200, catalog picker renders, frame selection + try-on canvas all work.
- **LCP/performance audit:** user asked to confirm the VTO script is lazy-loaded only on click and the hero stays lightweight. Traced the code: this was already 100% true (script only loads inside the button's `onClick`, and the `<tint-vto>` element isn't even mounted in the DOM until the xoFrame tab is opened — verified empirically via testing_agent, zero Tint/Banuba network activity on any page's initial load). However the investigation surfaced two REAL unrelated performance issues, both fixed: (1) `index.html` had a static `<link rel=preload>` for the Home page's hero image applied globally via the shared SPA `index.html`, wasting bandwidth/priority on every other route — replaced with a tiny inline `<script>` in `<head>` that only injects the preload when `window.location.pathname === "/"`, keeping Home's LCP head-start (1309ms, no regression) while eliminating the waste elsewhere; (2) `/xofit-frame-fitting`'s default tab had several below-the-fold images (device/retail/screen photos, ~570KB combined) loading eagerly — added `loading="lazy"` to all of them, dropping the page's initial image payload to ~410KB. Verified via testing_agent (iteration_28.json): 100% pass, no regressions.
- **Remaining optional/low-priority idea (not implemented, not a bug):** on very wide desktop viewports, Chrome's own lazy-load heuristic still fetches device.webp + the 3 screen images shortly after LCP (its "near viewport" prefetch distance) — could be tightened further with a smaller responsive srcset for device.webp or an IntersectionObserver gate, if ever wanted.

## CLS/LCP duplicate-check on Fit.jsx + font metric matching (2026-08-30, this session) — DONE

- **User asked to re-verify Fit.jsx CLS/LCP wasn't a duplicate ask.** Confirmed via `Fit.jsx` code read (all images already have explicit `width`/`height`) and a fresh Playwright `PerformanceObserver` check on the live `/xofit-frame-fitting` route: CLS = 0 on load, after full scroll (triggers all lazy images), and after switching all 3 tabs. No code changes needed, duplicate confirmed to user.
- **Task 2 (font metric matching, P2) — implemented.** Generated metric-matched fallback `@font-face` declarations for all 3 brand fonts using `fonttools` (python) + `@capsizecss/metrics` (node, used only to compute static constants then removed, not a runtime dependency) to calculate `ascent-override`/`descent-override`/`line-gap-override`/`size-adjust` against Arial (Manrope, Zalando Sans SemiExpanded) and Courier New (JetBrains Mono). Added `"Manrope Fallback"`, `"Zalando Sans SemiExpanded Fallback"`, `"JetBrains Mono Fallback"` faces in `/app/frontend/public/fonts/fonts.css` (all `src: local(...)`, zero extra network requests) and wired them into the font stacks in `index.css` (body, `.font-display`, `.font-mono`, `.eyebrow`, `.btn-primary`, `.btn-ghost`) and `tailwind.config.js`'s `fontFamily`. This removes the text reflow a `font-display: swap` webfont swap would otherwise cause on slow connections, without a JS-measured shim — pure progressive-enhancement CSS (unsupported browsers just ignore the descriptors, same as before).
- Verified via screenshot + CLS re-check on Home post-change: CLS still 0, no visual regression.
- Remaining backlog (P2, deferred by user this session): Task 4 (refactor Iris/Exam/Fit/Lab into shared component), Task 5 (draft FDA Clearance Callout section). SSG/prerendering and remaining placeholder-image swap are explicitly **not** this app's responsibility (handled server-side/deploy-side by another team, confirmed by user 2026-08-30).

## Contact form: product-interest checkboxes (2026-09-01, this session) — DONE

- **Context:** user updated the live HubSpot form (portal `245698072`, form GUID `cf605cae-ee6b-4a84-9783-ae35dd05bae2`) to add a "which products are you interested in" checkbox field, and shared the raw embed snippet, asking whether the site already used it.
- **Important architectural note:** `Contact.jsx` does **not** use HubSpot's raw embed script/iframe — it's a fully custom-coded React form (matching the editorial design system) that POSTs fields directly to HubSpot's Forms Submit API (`https://api.hsforms.com/submissions/v3/integration/submit/{portalId}/{formGuid}`). Portal/form IDs already matched the user's snippet, but new fields added in HubSpot's form editor do **not** automatically appear on the site — each field must be manually added to the React form and wired to its HubSpot internal property name.
- Got the internal property name from user: `xenon_website_form_product_interest_choice` (Contact object, multiple checkboxes). Options/CRM values: `xoExam™`, `xoIris™`, `xoFit™`, `xoLab™`. Required field, HubSpot multi-checkbox values submitted as a `;`-joined string.
- Added `products_interested` array to form state, a `Checkbox`-based group (square, `rounded-none`, matches editorial no-rounded-corner rule) positioned above "Additional information" per user's request, with the exact copy "Please select the products you'd like to demo. Select all that apply.", and required-field validation (blocks submit if none selected).
- Verified: screenshot confirms checkboxes render/toggle correctly in the site's visual language; a live curl POST to the HubSpot Forms API with the new field returned `200 {"inlineMessage":""}`, confirming the property name is accepted.

## Netlify deploy fix: missing yarn.lock (2026-09-01, this session) — DONE

- **Symptom:** Netlify build failed on `Attempted import error: 'ExternalLink' is not exported from 'lucide-react'` (used in `CookieConsent.jsx`).
- **Root cause:** `frontend/yarn.lock` was never committed to git (untracked this whole project). Confirmed `lucide-react@0.516.0` genuinely exports `ExternalLink` and a local `yarn build` succeeds cleanly with the exact same deps — so this wasn't a real code bug, it was Netlify resolving/caching a non-deterministic (and apparently stale/corrupted) `node_modules` with no lockfile to hash for cache invalidation.
- **Fix:** `git add`ed `frontend/yarn.lock` so it's now tracked. User needs to push via "Save to GitHub" and run one "Clear cache and deploy" on Netlify to purge the stale cache.

## xoExam page full copy overhaul (2026-09-01, this session) — DONE

- User supplied 3 successive `.docx` drafts refining xoExam page copy ahead of launch (product moving closer to solidified clinical/regulatory details). Reviewed each draft, asked clarifying questions before touching code each time (per user's explicit request), and implemented only on the final approved draft.
- **Final structure (`Exam.jsx`), 9 sections + hero, in order:** Hero (restored "wearable device" language, confirmed by user) → The Device (lane-vs-one-unit comparison, 4-bullet grid) → The Exam (7 shipping tests in a numbered grid + "Also in development" inline mid-dot list of 12 future tests, replaces old "19 tests" claim entirely — test count now split shipping/future) → The Workflow (3-mode delegation cards: Patient-guided / Technician-run / ECP-directed, all "Reviews and confirms", role-based access control language) → **Remote Exams (brand new section)**: live remote/telehealth-style supervised exams, HIPAA-compliant cloud platform, 3 numbered use-case examples → In the System (new: xoFit/xoLab integration story + relocated "See the full patient journey" link) → The Setting + Specifications (paired two-column, specs expanded 9→12 items) → Scope (new: houses the old "boundary statement" callout, now its own section) → FAQ (expanded 3→6 questions, new remote-exam and "who can use it" questions).
- Terminology shift throughout: "doctor" → "ECP"/"practitioner", "certifies" → "confirms". Old standalone "Your patient/your exam/your judgment" intro section removed (content merged into new Scope section).
- Design system fully preserved as instructed ("not a redo"): same hairline `border-t` sections, `eyebrow` labels, `MaskTextInView` headlines, `rounded-md border-fg/10` card/grid treatment reused as-is for new Workflow/Remote Exams sections. New "In the System" section reuses the exact pattern already established at the bottom of `Fit.jsx`.
- Verified: `CI=true yarn build` compiles clean, full-page screenshot pass across all 9 sections confirms no layout breaks, test grid filler-cell math still closes correctly (7 items % 3 cols = same remainder as old 19-item grid). CTA row (hero button, DemoCTA) confirmed untouched throughout, per user instruction.
- Self-tested only (no backend/API involved, pure static content page) — no testing_agent run for this change.

## xoExam: headline wrap fix + new hero image (2026-09-01, this session) — DONE

- **Bad wrap fix:** on wide viewports (reproduced at 2560px, matching user's 30" monitor), the "The Workflow" section headline ("Run it three ways. The practitioner confirms every result.") was rendered as one `text-wrap:balance` flow, which pulled the word "The" up onto the first line ("Run it three ways. The" / "practitioner confirms every result."), splitting a sentence awkwardly. Root cause: the shared `MaskTextInView`/word-reveal always re-joins words with a plain breakable space regardless of source punctuation, so there's no way to "glue" words together within one call. Fix: split into two separate stacked `MaskTextInView` calls (one per sentence) so each sentence balances independently and can never merge onto the same line. Verified fixed at 2560px. Audited other headlines sitewide for the same two-sentence pattern — a few exist (About.jsx, Home.jsx, Iris.jsx, Lab.jsx, System.jsx) but weren't reported as broken, so left untouched per scope (not proactively rewritten).
- **New hero image:** user supplied a new hero photo for the xoExam page (woman seated wearing the device, arm extending off-frame). Optimized via PIL (quality 82, method 6): saved as `/hero/xoexam-wearing.webp` (2000×1123, 45KB) + `/hero/xoexam-wearing-1200.webp` (1200×674, 22.6KB) responsive variant — both smaller than the previous hero asset. Old `/hero/xoexam-arm.webp` left untouched since it's still used on `Home.jsx`. Wired into `Exam.jsx`'s `ProductHero` `image`/`imageSrcSet`/`imageAlt` props. Renders correctly with the existing ghosted/right-anchored hero treatment, no code changes needed to `ProductHero.jsx` itself.
- Verified via `CI=true yarn build` (clean) + screenshot at 2560px viewport.

## xoExam: future-tests chip list + hero zoom (2026-09-01, this session) — DONE

- **"Also in development" list redesign:** the 12-item future test list read as a run-together sentence (mid-dot separated inline text). Replaced with a `flex-wrap` grid of individually bordered tag chips (sharp corners, muted `text-fg/45` mono uppercase, hover state) — each test is now a clearly separated, scannable item, still visually secondary to the main 7-test bordered grid above it (smaller, lighter, no numbering) but no longer "run together."
- **Hero image zoom:** re-cropped the new xoExam hero photo ~20% tighter (centered on the device/face, source crop box computed via PIL then upscaled back to 2000×1123 via Lanczos) so the subject fills more of the frame at the default (pre-scroll) hero state. Regenerated both `/hero/xoexam-wearing.webp` (51KB) and `-1200.webp` (27KB) variants. No changes to `ProductHero.jsx`'s shared scroll-scale logic (kept scoped to this one image, not a sitewide zoom change).
- Verified via build + screenshot at 1920px: chip list renders cleanly wrapped, hero crop visibly tighter/closer.

## Home "Proof" section: new background photo (2026-09-01, this session) — DONE

- User supplied a custom photo (rural community eye-care setup, patients wearing xoExam devices under a shade structure) to use as the background for the "If it works where there is no clinic, it works in yours." row on the homepage.
- This row already had an established pattern for exactly this: a full-bleed absolute background `<img>` at `opacity-15` with a `bg-bg/80` overlay on top (previously a generic Pexels stock clinic photo, `IMAGES.clinic`). Simply replaced that image source — optimized the new photo to `/photos/proof-community-eyecare.webp` (1600w, 78 quality, ~128KB) and swapped `IMAGES.clinic` in `data/site.js` from the Pexels URL to this local asset. No JSX/layout changes needed since the hint-only treatment was already exactly right for this use case.
- Verified via build + screenshot: photo is visibly present but subtle, doesn't compete with text legibility.

## Wide-monitor headline wrap audit (2026-09-01, this session) — DONE

- Audited every two-sentence `MaskTextInView` headline sitewide (found via grep for `lines={[` items ending in a period followed by another item) at 2560px viewport, since that's the pattern that caused the Exam.jsx bug fixed earlier this session.
- **Confirmed broken (same "orphaned word" bug) and fixed:** `About.jsx` ("The need is enormous. The workforce is concentrated." — "The" was jumping to line 1), `System.jsx` ×2 ("Eye care is delivered in steps. The waiting happens between them." — "The" orphaned; "Fewer boxes. Fewer handoffs. Fewer places for the day to slow down." — 3rd "Fewer" orphaned). All fixed with the same technique: split into two independent stacked `MaskTextInView` calls so each sentence balances on its own.
- **Checked, not broken, left untouched:** `Home.jsx` ("Four gaps. One system built to close them." — wraps cleanly, sentence starter stays intact), `Iris.jsx` ×2 ("Cloud-based. Nothing to install." — fits without wrapping; "A cancellation is a hole in the day. It doesn't have to be." — wraps mid-phrase but not mid-sentence-starter, minor/acceptable), `Lab.jsx` ("Three machines. One in-office lab." — fits on one line), `Fit.jsx` ("Simple. Fast. Accurate." — fits on one line).
- Verified via build + screenshots at 2560px on all 3 fixed pages.

## Sitewide voice audit vs. xoExam (2026-09-01, this session) — DONE

- User asked whether the refined xoExam voice could be reapplied across the whole site (Home, About, System, Team, News, Blog, Contact, Iris, Fit, Lab) without changing narrative/content/intent. Legal pages (Privacy/Cookie/Terms) explicitly excluded.
- **Read every in-scope page closely before writing anything.** Finding: Home, About, System, Team, News, Blog, Contact, and Iris/Lab were **already** written in the same voice as the final xoExam draft (short declarative openers unpacked by a causal clause, concrete specificity, no hype adjectives, no em-dashes) — these were left untouched rather than force unnecessary rewrites of already-strong copy.
- **The one genuine outlier: `Fit.jsx`'s `FORM_FACTORS` data** (intro bodies, `tiles`, and the "How xoFit works" headline/subhead for Core/Mobile/Frame). This was written in a noticeably weaker generic-marketing register ("Accurate Digital Measurements", "Confident Frame Selection", "Simple, fast, and accurate frame fitting in just a few easy steps.") that stood out against the rest of the page's own narrative sections. Rewrote all 15 tiles (6 Core + 6 Mobile + 3 Frame), both Core/Mobile intro bodies, and the "Simple. Fast. Accurate." headline (→ "No ruler. No transcribing.") into the xoExam voice — same claims/facts per tile, reusing facts already established elsewhere on the same page (six-camera/single-shot capture, lab-ready export format) rather than inventing anything new. `featureList` spec arrays left untouched (already terse/factual, consistent with the sitewide Specifications-list pattern).
- **Found and fixed 2 stale factual references** left over from the earlier xoExam content revision (test count / terminology no longer matched the live xoExam page): `site.js` `PRODUCTS.xoexam` teaser blurb ("An entire suite... 19 tests... You certify" → aligned with current 7-tests/ECP language), and `System.jsx`'s exam workflow step body/REPLACES row (same "19 doctor-led tests"/"chart projector" staleness).
- Verified via build + screenshots across all 3 Fit.jsx tabs.
