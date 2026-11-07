# Little Fern Coffee (showcase site)

Demo website for a fictional neighborhood coffee bar. Used as a sales showcase for local-business websites. Proprietary (see LICENSE), owner Miloš Milinkov.

## Stack

- Plain static site: `site/index.html`, `site/styles.css`, `site/main.js`. No framework, no build step.
- Fonts from Google Fonts: Bricolage Grotesque (all UI/body), Caveat (chalkboard menu and handwritten bits only).
- Hosting: Cloudflare Workers static assets (`wrangler.jsonc`, assets dir `./site`, `404-page` handling).
- Live: https://little-fern-coffee.milos300399.workers.dev
- Repo: https://github.com/MiloshMilinkov/little-fern-coffee

## Commands

```bash
npm install        # only dependency is wrangler
npm run dev        # wrangler dev on http://127.0.0.1:8790 (also .claude/launch.json "site")
npm run deploy     # wrangler deploy (wrangler is already logged in on this machine)
```

No tests, lint or typecheck. Verify changes in the browser at desktop and 375px mobile width (no horizontal scroll).

## Layout

```
site/
  index.html   all sections: hero, menu board (#menu), story, events (#happening), visit
  styles.css   design tokens on :root, then sections in page order, responsive at the end
  main.js      open-now badge + today's hours row (Europe/Belgrade), menu tabs (ARIA tablist)
  404.html     not-found page
  favicon.svg
```

## Rules and gotchas

- Opening hours live only in the hours table in `index.html` (`data-days`, `data-open`, `data-close` on each row); `main.js` reads them for the open-now badge. Update the visible text in the same row too.
- Event dates are hard-coded for November 2026; refresh them if the demo is shown much later.
- Keep the demo notice bar and footer credit: they link prospective clients to the portfolio (milos-milinkov.milos300399.workers.dev).
- Design choices: sage paper background, espresso ink, fern green, marigold accent. Avoid cream + terracotta, all-caps eyebrows and numbered 01/02/03 markers.
- The only motion is the hero steam and the map pin drop; both respect `prefers-reduced-motion`.
- After CSS edits the browser pane may serve a cached stylesheet; reload with a cache-busting query.
- Copyright header goes only in `index.html`, `styles.css`, `main.js`.
