# Passive Income Sites — agent guide

## What this is
Static websites for a freelancer-niche passive-income project. No build step, no framework,
no server: every page is a self-contained `index.html` (inline CSS + vanilla JS). They must
stay deployable by dragging a folder onto any static host (Netlify Drop, Vercel, GitHub Pages).

## Layout
- `soloworks/` — **the primary site** (umbrella brand, deploy this one):
  - `index.html` landing page
  - `rates/` freelance rate calculator + invoice generator (all client-side; invoice data
    must never leave the browser — localStorage only)
  - `templates/` digital template store; checkout links live in the `CHECKOUT_URLS` map at
    the bottom of its `index.html` (empty string = shows "launching soon" notice)
  - `tools/` curated tool directory; listings are the `TOOLS` array in its `index.html`
    (plain URLs to be replaced with affiliate links; `featured: true` pins a card)
  - `blog/` SEO articles; each article is a standalone HTML file linked from `blog/index.html`,
    the landing page, and `sitemap.xml`
  - `sitemap.xml`, `robots.txt` — contain the placeholder `https://yourdomain.com`, to be
    find-and-replaced with the real domain before Search Console submission
- `ratekit/`, `clientkit/`, `freelancestack/` — legacy standalone versions of the three
  sections, kept in case separate brands/domains are preferred. Prefer editing `soloworks/`.

## Conventions & constraints
- Brand "SoloWorks" is a placeholder pending domain purchase; keep it consistent so a global
  find-and-replace can rename it.
- Keep pages self-contained: no external fonts, CDNs, or network requests.
- Preserve SEO plumbing when editing: per-page `<title>`/meta description, canonical link,
  JSON-LD (FAQPage on rates, Article on blog posts, WebSite on landing), and internal links
  between articles ↔ tools.
- Affiliate/sponsor links use `rel="nofollow sponsored"`.
- New blog articles: copy the CSS/header/footer pattern of an existing article, add the page
  to `blog/index.html`, the landing page post grid, and `sitemap.xml`.

## Testing
Browser-test after changes (Playwright + Chromium): load each page from `file://`, assert no
console/page errors, verify internal links resolve to files, and spot-check the calculator
(`#r-hour` updates when `#income` changes) and invoice totals. A reference harness exists in
the original session but is not committed; replicating those checks is ~50 lines.

## Related assets (not in this repo)
Sellable template-pack content and the launch/marketing docs live in the owner's Google Drive
folder "ClientKit Products". The Gumroad products, affiliate accounts, domain, and hosting are
owned by the repo owner — code here should never embed private tokens or account details.
