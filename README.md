# Marko Stokic, Portfolio (React)

A React rewrite of the original [CV-Portfolio](https://github.com/StokicMarko/CV-Portfolio) HTML/CSS site. It keeps the same content and purple/indigo palette, but is now a single scrolling page (like the structure of portfilo-livid.vercel.app) with two effects borrowed from v4.elejeune.me:

- **Background**: a canvas flocking simulation (boids), recolored to the site's purple accent, layered behind the hero.
- **Loading**: a one-time SVG intro that draws a route and fades in, shown once per session, skipped for `prefers-reduced-motion` users.

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

Everything text-based lives in one place: `src/data/site.js`. Update your name, tagline, projects, skills, education, experience, certifications, languages, and volunteer work there; the components just read from it.

## Structure

```
src/
  components/
    Loader.jsx / loader.css       intro animation
    BoidsBackground.jsx           canvas flocking background
    Nav.jsx / nav.css             sticky nav with scroll-spy
    Hero.jsx / hero.css           name, tagline, CTA buttons
    Projects.jsx / projects.css   project card grid
    About.jsx / about.css         about text
    Resume.jsx / resume.css       skills, education, experience, etc.
    Footer.jsx / footer.css       contact links
  data/
    site.js                       all content
  styles/
    global.css                    design tokens, gradient background, shared section styles
  App.jsx
  main.jsx
public/
  profile.jpeg                    your profile photo
```

## Notes

- Icons are from `lucide-react` (already installed) instead of the Font Awesome CDN script the original site used, so there's no external script dependency.
- The project cards link out to your GitHub repos; the torrent client card has no `url` set since the original had no public repo linked. Edit `src/data/site.js` if that changes.
- The boids canvas and loader are both self-contained components. Swap the `accent` prop on `<BoidsBackground />` in `Hero.jsx` if you want a different color.
