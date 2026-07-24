# Xenon Ophthalmics — Website Rebuild PRD

## Problem Statement
Full website rebuild for Xenon Ophthalmics (medtech B2B). Award-worthy, Awwwards-level marketing site for the XO™ Vision Care System (scheduling, exam, fit, finish). Source copy, SEO metadata, brand logos (SVG) and team copy provided by user.

## User Choices
- Fresh premium medtech design; deepen real brand colors as complementary tones.
- Demo form: functional UI now; store-only backend (email/Cloudflare architecture deferred).
- Real team copy provided; placeholder news articles (incl. "The New Space Race" 5-part series).
- Motion-forward: framer-motion reveals + Lenis smooth scroll, kinetic masked hero, parallax, editorial marquee.

## Architecture
- Frontend: React 19 + React Router 7, Tailwind, shadcn/ui, framer-motion, lenis, react-fast-marquee.
- Design system: index.css tokens + tailwind `xo` palette (obsidian/navy/blue #1F8EFF/teal #05D3C8). Fonts: Clash Display (display), Manrope (body), JetBrains Mono (data). Mostly-dark "Clinical Void" aesthetic.
- Backend: FastAPI + Mongo. POST/GET /api/demo-request (collection demo_requests).
- Brand logos in /app/frontend/public/logos/ (corp, signature, vision-care, 4 product marks; light+dark variants).

## Implemented (2026-07-24)
- 11 routes: Home, /xo-vision-care-system, 4 product pages (xoIris/xoExam/xoFit/xoLab), About, Team, News, Contact + /request-a-demo, 404.
- Home: kinetic masked hero + parallax product, sticky section anchors, four-hidden-spaces data grid, recovered-time stat, one-visit narrative, 4-component bento, global-access proof, demo CTA, editorial marquee.
- System: numbered Schedule/Exam/Fit/Finish workflow, Conventional-vs-XO comparison, deployment environments.
- Products: definitional passages, capability lists, xoExam 19-test grid + delegation, xoFit 3 form-factor tabs (all in DOM), xoLab 3 equipment + economics, per-page FAQ accordions.
- About (access-gap stats, goals), Team (board + advisory cards from real copy), News (pillar series + cards).
- Contact: full demo form (calendar date picker, dropdowns, toast) → stores to backend; success state.
- Testing: backend 5/5, frontend 36/36 pass. No functional issues.

## Backlog / Next
- P1: Wire demo form to email (Emergent Resend) + admin view of submissions when out of design stage.
- P1: SEO build (per Xenon_SEO_Playbook): SSR/prerender, JSON-LD, sitemap, robots, llms.txt, 301 redirect map, canonical, OG cards — required for AI-crawler retrieval on Cloudflare.
- P2: Real product photography (current hero uses stock VR headset), individual news article pages, team member photos/headshots + LinkedIn URLs.
- P2: EmailStr validation + rate limiting/spam protection on public POST; migrate FastAPI on_event->lifespan.
