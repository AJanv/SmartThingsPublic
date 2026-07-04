# Project status & decision log

_Last updated: 2026-07-04. This file is the shared memory between work sessions and agents
(Claude, Codex, humans). Update it when state changes._

## Current state: LAUNCHED

The umbrella site is live on Netlify at https://soloworks-hq.netlify.app. It is still
pre-revenue until checkout and affiliate URLs are wired.

## What exists

| Asset | Where | State |
|---|---|---|
| Umbrella site (landing, /rates/, /templates/, /tools/, /blog/ with 5 articles, privacy/disclosure page, 404, OG share image, sitemap/robots) | `soloworks/` | Done, tested (12 pages, no JS errors, no broken links) |
| Legacy standalone versions of the 3 sections | `ratekit/`, `clientkit/`, `freelancestack/` | Done, tested; superseded by `soloworks/` |
| 5 sellable template packs (Proposal, Invoice & Payment, Onboarding, Contract, Rate-Raise) | Owner's Google Drive, folder "ClientKit Products" | Written, ready to export as PDFs for Gumroad |
| Launch checklist + marketing scripts (Reddit/newsletter/sponsor pitches) | Same Drive folder | Written |
| Public site | https://soloworks-hq.netlify.app | Live on Netlify |

## Key decisions and why

1. **One umbrella site over three separate sites** — concentrates SEO authority on one
   domain; sections cross-feed traffic. The three standalone folders are kept as fallback.
2. **"SoloWorks" is a PLACEHOLDER brand** — no domain purchased yet. Original names had
   collisions found via web search: ratekit.com (jQuery plugin), ClientKit (two active SaaS
   products: getclientkit.com, clientkit.app), FreelanceStack (freelance-stack.io, same niche).
   Rename = global find-and-replace; also replace `yourdomain.com` in canonicals/sitemap/robots.
3. **Pure static, self-contained pages** — zero hosting cost, zero maintenance, deployable by
   drag-and-drop; this is a hard constraint (see AGENTS.md).
4. **Monetization** = Gumroad one-time sales (templates) + affiliate links (FreshBooks,
   Bonsai, directory tools) + paid featured slots in the directory (likely first revenue).

## Blocked / pending — OWNER ONLY

- [ ] Buy domain (~$11; Porkbun/Cloudflare). Unblocks brand rename + SEO submission.
- [ ] Gumroad: create 6 products (descriptions pre-written in Drive "LAUNCH CHECKLIST" doc),
      then paste checkout URLs into `CHECKOUT_URLS` in `soloworks/templates/index.html`.
- [ ] Affiliate programs: FreshBooks + Bonsai first; swap `data-affiliate` hrefs in
      `soloworks/rates/index.html` and URLs in the `TOOLS` array in `soloworks/tools/index.html`.
      (The privacy/disclosure page these programs require now exists at /privacy.html.)
- [ ] Confirm Netlify redeploys on git push (if the site was deployed via CLI/drag, commits
      after 6ddc9f9 are NOT live until redeployed or the site is Git-connected).
- [ ] Google Search Console submission (after domain).
- [ ] Launch-week posts (scripts in Drive "MARKETING SCRIPTS" doc).

## For any agent picking this up

Read `AGENTS.md` in this directory for conventions and testing. Do not rebuild what's listed
above as done; the highest-value contributions now are: more blog articles (one/week cadence;
next topics listed in the marketing doc), wiring in real URLs once the owner provides them,
and the brand rename once a domain exists.
