# Xenon Ophthalmics — Pre-Launch Checklist

Held in memory across sessions. Do not deploy without addressing these.

Last reviewed: 2026-07-28

---

## P0 — Blocking for production launch

### 1. Static build / prerender
- **Problem:** Site is a client-rendered CRA React SPA. All meta tags injected via `usePageMeta` after mount. Crawlers that don't run JS see one generic `<title>` for every URL. AI crawlers (Perplexity, ChatGPT retrieval, Google AI Overviews) execute JS inconsistently.
- **Fix options (in order of impact/effort):**
  - **A. Astro migration** — best long-term result. Port pages to `.astro`, keep React components as islands for interactive bits (Framer Motion, CookieConsent, forms). ~1–2 focused days.
  - **B. Next.js with `output: 'export'`** — less refactor. Slightly heavier.
  - **C. `react-snap` prerendering** — cheapest. Keep CRA, generate static HTML at build. 80% of the benefit for a few hours of work.
- **Recommendation:** Astro. This is the architecture Claude described to the client.

### 2. SEO scaffolding
- No `sitemap.xml`
- No `robots.txt`
- No JSON-LD structured data (`Organization`, `Product`, `BreadcrumbList`, `FAQPage`, `isPartOf` hierarchy per product)
- No Open Graph tags (only via `usePageMeta`, need static in `<head>`)
- No `llms.txt` for AI retrieval
- Reference: `XENON_SEO_PLAYBOOK.md` in job artifacts.

### 3. Contact form is mocked
- `/contact` and `/request-a-demo` submit nowhere. No backend endpoint wired.
- Need: FastAPI endpoint that stores submissions + emails the team (Resend integration, per the SEO playbook / privacy policy language that says forms email to team).

### 4. Consent-gated analytics have nothing to gate
- Cookie consent UI is compliant and works, but the `analytics`, `marketing`, `translation` categories don't actually gate any scripts because none are loaded.
- Wire at minimum: PostHog or Plausible for analytics (only loads if `analytics: true`), HubSpot for marketing (only loads if `marketing: true`), Google Translate widget for translation.

---

## P1 — Should fix before launch

### 5. Duplicate patterns across product pages
- Each product page (`Iris`, `Exam`, `Fit`, `Lab`) has its own local FAQ arrays, spec tables, hero blocks with the same shape.
- **Fix:** Extract product-page data to `data/site.js` as a `PRODUCT_DETAILS` structure. Build a single `ProductPage` template that consumes it. Adding a 5th product becomes a data change, not a copy-paste.

### 6. Real xoExam product photography
- Currently uses `xoexam-arm.webp` (device on articulated arm) as both homepage hero AND ghosted background on the xoExam page.
- User has said additional xoExam imagery is coming. Wire when received.

### 7. News page has one story
- `News.jsx` currently shows only the Nelson Mandela Children's Hospital launch. Need more real press / company news items.

### 8. Blog is placeholder
- The "New Space Race" 5-part series is titled but has no article bodies. Either write them or remove the CTA from the Blog page.

### 9. Placeholder team member photos
- `TEAM_BOARD` and `TEAM_ADVISORY` in `data/site.js` use Pexels stock. Need real headshots.

### 10. Stock imagery still in use
- Home hero background section behind copy: Unsplash placeholders (`IMAGES.professional`, etc. in `data/site.js`).
- News feature card background: `IMAGES.clinic` (Pexels)
- Blog feature card background: `IMAGES.abstract` (Unsplash)
- About page section imagery: some Pexels lab/clinic stock
- Contact page — mostly clean, but any imagery there should be checked.

---

## P2 — Nice to have

### 11. Error boundary + 404 tracking
- Add `ErrorBoundary` component around Routes to catch React runtime errors gracefully.
- Track 404s once analytics is wired.

### 12. Test coverage
- Zero unit tests, zero E2E, zero visual regression.
- Minimum before launch: Playwright E2E for critical flows (nav, cookie consent, contact form, theme toggle).

### 13. Bundle size audit
- Framer Motion on every page = ~200KB+ gzipped. Fine for marketing, but measure on 3G/mobile.
- Consider dynamic imports for below-the-fold animation-heavy sections.

### 14. Lint noise
- 18 pre-existing warnings (mostly unescaped apostrophes in copy, one shadcn `calendar/command` issue). Run `--fix` or clean by hand.

### 15. Design QA pass
- Full sweep across all pages × Light/Dark × Mobile/Tablet/Desktop.
- Watch for the same class of bugs already fixed: missing anchors on absolute elements, theme-aware image swaps that weren't wired, contrast issues in either theme.

### 16. Social URLs verified
- **X:** `https://x.com/XOphthalmics` (confirmed by user 2026-07-28)
- **LinkedIn:** `https://www.linkedin.com/company/xopthalmics/` — note "xopthalmics" (missing 'h'). User-provided, likely their actual handle.
- **Facebook:** `https://www.facebook.com/XOphalmics` — also missing 'h'. User-provided.
- **Instagram:** `https://www.instagram.com/xophthalmics/` (correct spelling)

### 17. Support endpoint
- Currently `mailto:support@xophthalmics.com` — confirmed by user 2026-07-28. Verify the mailbox actually exists before launch.

---

## Signals that the site is ready

- [ ] Static HTML at every URL (view-source shows real content, not `<div id="root">`)
- [ ] Sitemap discoverable at `/sitemap.xml`
- [ ] JSON-LD present on all product / company pages
- [ ] Contact form submissions land somewhere real (email, DB, or both)
- [ ] Consent categories actually gate real scripts
- [ ] Real product photography on all product pages
- [ ] Blog + News have real content (or Blog is removed from nav)
- [ ] Playwright E2E passing on critical user flows
- [ ] Lighthouse 95+ on Performance, Accessibility, SEO, Best Practices
- [ ] Client sign-off on all copy, imagery, legal pages
