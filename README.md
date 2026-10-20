# Marko Stokic, Portfolio (React)

A React rewrite of the original [CV-Portfolio](https://github.com/StokicMarko/CV-Portfolio) HTML/CSS site. It keeps the same content and purple/indigo palette, but is now a single scrolling page (like the structure of portfilo-livid.vercel.app) with effects borrowed from v4.elejeune.me and landonorris.com:

- **Background**: a full-screen WebGL shader draws a few slowly drifting, dark topographic contour lines over a static purple gradient (the cursor only nudges them very slightly), inspired by landonorris.com. It renders at 30 fps and pauses while the tab is hidden or once you have scrolled past the projects. It falls back to the plain gradient without WebGL2 and draws a still frame for reduced-motion users.
- **Smooth scroll + projects**: [Lenis](https://lenis.dev/) drives smooth scrolling site-wide, and the projects section is a pinned stack of cards that slide in as you scroll (styled after the "Lenis brings the heat" section on lenis.dev). Reduced-motion users get a plain card grid instead.
- **Loading**: a one-time intro (~1.4s), inspired by the lenis.dev intro. A purple flash fades to dark, MARKO rises and STOKIC drops into place to fill the screen, a bright slash is drawn between them, and then the first name slides off to the left and the surname to the right to reveal the page, while the hero text rises out of its masks and the photo fades up. Plays once per browser session (repeat views show the finished hero straight away), a click, key press or scroll skips it, and reduced-motion users never see it.
- **Project cards**: each card shows a stat block (stack, role, team, duration, difficulty pips) and, when a project has a `learned` text, flips on hover, on the "What I learned" button or on tap. Reduced-motion users see the back content below the front instead.
- **Terminal**: press `-` for a small overlay terminal with Tab completion (`help`, `whoami`, `ls projects`, `open <project>`, `cat cv`, `contact`, `clear`, `sudo hire marko`). It is lazy-loaded, so it is not part of the initial bundle.
- **Currently strip**: building, learning and playing, driven by `site.currently` in `src/data/site.js`. It renders nothing while the fields are empty.

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
