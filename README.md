# Marko Stokic, Portfolio (React)

A React rewrite of the original [CV-Portfolio](https://github.com/StokicMarko/CV-Portfolio) HTML/CSS site. It keeps the same content and purple/indigo palette, but is now a single scrolling page (like the structure of portfilo-livid.vercel.app) with two effects borrowed from v4.elejeune.me:

- **Background**: a canvas flocking simulation (boids), recolored to the site's purple accent, layered behind the hero.
- **Smooth scroll + projects**: [Lenis](https://lenis.dev/) drives smooth scrolling site-wide, and the projects section is a pinned stack of cards that slide in as you scroll (styled after the "Lenis brings the heat" section on lenis.dev). Reduced-motion users get a plain card grid instead.
- **Loading**: a one-time SVG intro that draws a route and fades in, shown once per session.

## Getting started

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Building for production

```bash
npm run build
npm run preview   # serve the built output locally to sanity-check it
```

The build output lands in `dist/`, ready to deploy anywhere static (Vercel, Netlify, GitHub Pages).

## Editing content

Everything text-based lives in one place: `src/data/site.js`. The components just read from it.

## Notes

- Icons are from `lucide-react` (already installed) instead of the Font Awesome CDN script the original site used, so there's no external script dependency.
