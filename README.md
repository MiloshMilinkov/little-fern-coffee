# Little Fern Coffee

> **⚠️ View only — not open source.**
> This code is public for viewing only. Copying, modifying, deploying, redistributing or reusing any part of it (code, design, texts or branding), or using it to train AI models, is not allowed without written permission. See [LICENSE](LICENSE).

A showcase website for a made-up neighborhood coffee bar, built to show local businesses what their site could look like.

**Live:** https://little-fern-coffee.milos300399.workers.dev

## What's on the page

- Hero with a live "open now / closed" badge (Belgrade time)
- Chalkboard menu with tabs: coffee, not coffee, from the oven
- Story, "things our regulars know", events list
- Visit section: address, opening hours with today highlighted, illustrated map

Plain HTML, CSS and a small script, with no build step. Hosted as static assets on Cloudflare Workers.

## Run locally

```bash
npm install
npm run dev      # http://127.0.0.1:8790
```

## Deploy

```bash
npm run deploy   # wrangler deploy, needs `wrangler login`
```

## License

Copyright © 2026 Miloš Milinkov. All rights reserved.

This project is proprietary and **not** open source. No licence is granted to use, copy, modify, deploy or distribute it. See [LICENSE](LICENSE) for the full terms. For permission requests, contact milos300399@gmail.com.

Security issues: see [SECURITY.md](SECURITY.md).
