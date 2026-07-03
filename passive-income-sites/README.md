# Passive Income Sites

**→ Deploy `soloworks/` — it's the recommended umbrella site** that merges all three products
under one brand and one domain (stronger SEO than three separate domains). It contains:
landing page, `/rates/` (calculator + invoice generator), `/templates/` (store), `/tools/`
(directory), `/blog/` (3 SEO articles), plus `sitemap.xml` and `robots.txt`.

Before going live: find-and-replace `yourdomain.com` with your real domain (canonical tags,
sitemap, robots), and optionally rename the placeholder brand "SoloWorks" (plain
find-and-replace across the HTML files).

The three standalone sites below are kept in case you prefer separate brands/domains.

Three self-contained static websites in one niche (freelancing) that cross-promote each other.
Each site is a single `index.html` — no build step, no server, no database. They run on any
static host and cost nothing to operate.

| Site | Folder | What it is | How it makes money |
|------|--------|-----------|--------------------|
| **RateKit** | `ratekit/` | Free freelance rate calculator + invoice generator | Affiliate links (FreshBooks, Bonsai), display ads once traffic grows |
| **ClientKit** | `clientkit/` | Digital template store for freelancers | One-time template sales via Gumroad / Lemon Squeezy |
| **FreelanceStack** | `freelancestack/` | Curated directory of freelancer tools | Affiliate links + paid "Featured" sponsor slots |

## Deploy (pick one, ~5 minutes)

- **Netlify Drop**: go to https://app.netlify.com/drop and drag a site folder onto the page. Done.
- **Vercel**: `npx vercel` inside a site folder.
- **Railway**: serve the folder with any static file server (e.g. `npx serve`) or a one-line
  Caddy/nginx Dockerfile; each site is just static files.
- **GitHub Pages**: enable Pages on this repo and point it at the folder (or copy each site to
  its own repo).

Each site should eventually live on its own domain (e.g. `ratekit.io`-style) — search traffic
is the whole game for these, and a real domain is what makes them rankable.

## Before they can earn (owner TODO)

1. **ClientKit**: create the template products on Gumroad or Lemon Squeezy, then paste each
   checkout URL into `CHECKOUT_URLS` at the bottom of `clientkit/index.html`. Buttons show a
   friendly "launching soon" notice until you do. Also: actually create the template documents
   (Google Docs / Notion) that the packs describe.
2. **RateKit + FreelanceStack**: join affiliate programs (FreshBooks, Bonsai, and the tools in
   `TOOLS` in `freelancestack/index.html`), then replace the plain/`#` URLs marked with
   `data-affiliate` / the `TOOLS` array entries with your affiliate links.
3. **FreelanceStack**: replace `hello@example.com` in the "Submit your tool" button with a real
   email address.
4. Cross-links: the footer links marked `data-crosslink` should point at the other two sites'
   real domains once deployed.

## What "passive" really means here

These sites have zero running costs and no maintenance burden, but they earn nothing without
traffic. The realistic path: publish on real domains, submit to Google Search Console, and let
search traffic compound for 3–6 months. The calculator and directory are the traffic magnets;
the template store is the monetization endpoint they feed.
