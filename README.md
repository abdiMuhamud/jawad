# Al Jawad — Butchery & Restaurant

Website for **Al Jawad**, a Lebanese butchery & charcoal grill in Pipeline, Kanifing, The Gambia.

- Full menu (103 dishes, 14 chapters) with photos, Arabic names and horizontal scrolling rows
- Order builder that sends the order to WhatsApp (+220 87 7711 717)
- Table reservations sent to WhatsApp
- TikTok reels, brand video, map and contact details

## Edit content

Everything on the menu — names, prices, descriptions, tags — lives in [`src/data.js`](src/data.js).
Opening hours: set `INFO.hours` in the same file (e.g. `'Daily · 8:00 – 00:00'`).
Dish photos are in `public/img/menu/<id>.webp` (card) and `<id>-lg.webp` (pop-up).

## Develop

```bash
npm install
npm run dev
```

## Deploy

Hosted on Vercel (Vite static build: `npm run build` → `dist/`).

Food photography: Al Jawad (TikTok) and Unsplash contributors — sources listed in `public/img/credits.json`.
