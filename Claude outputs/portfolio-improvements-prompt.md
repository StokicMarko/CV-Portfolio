# Portfolio improvements: task brief

You are working on my personal portfolio, a React 19 + Vite single-page site (deployed to GitHub Pages with `gh-pages`, `base: "/CV-Portfolio/"`). All text content lives in `src/data/site.js`; components only read from it. Smooth scroll is Lenis (`src/hooks/useLenis.js`), the background is a WebGL contour shader (`src/components/ContourBackground.jsx`), and there is a one-time intro loader (`src/components/Loader.jsx`).

A recruiter-and-designer review found the site visually strong in the hero and projects, but weak at telling a recruiter in 6 seconds who I am, what I want, and how to contact me. Please implement the changes below.

## Rules (follow strictly)

- Write code without comments. Names and structure must make the code self-explanatory. Remove any comments you touch.
- Never use the em dash character (U+2014) anywhere: code, copy, commit messages.
- Do not add yourself as a co-author or contributor anywhere (no `Co-Authored-By`, no "Generated with" lines in commits or PRs).
- Never commit or push the `.claude` folder. Make sure it is in `.gitignore`.
- Keep `prefers-reduced-motion` support working everywhere it already exists, and extend it to anything new.
- Keep all content in `src/data/site.js`. New content fields go there, and components render nothing for empty fields.
- Work phase by phase. After each phase run `npm run build` and `npm run lint`, then give me a short summary before moving on.
- **Before writing any content I have to supply, ask me for it.** Never invent facts, achievements, URLs or tools. The items marked **[ASK]** below need my input.

---

## Phase 1: Hero (highest priority)

Goal: a recruiter knows my role, my availability and how to reach me without scrolling.

1. Keep the MARKO / STOKIC heading exactly as it is (Anton, outlined surname, mask animation).
2. Replace the tagline "Student, Developer & Boardgames enthusiast" with a value line, styled the same way (Instrument Serif italic):
   `Full-stack developer (.NET · Angular · React), studying Software Engineering at VIA, with a growing focus on security.`
   Move the board games mention to About only.
3. Add an availability badge under the meta line: a small pill with a pulsing dot (static dot under reduced motion):
   `Open to student jobs (~10h/week) · Horsens / Aarhus`
   Put the text in `site.availability` so I can edit or remove it.
4. Add a CTA row with four actions, using the existing `.pill-button` / `.pill-button.ghost` styles:
   - **Download CV** (primary): links to `public/Marko_Stokic_CV.pdf`. **[ASK]** for the PDF; until I provide it, hide the button if the file is missing from `site.cvUrl`.
   - **LinkedIn**: **[ASK]** for my URL, store it in `site.linkedin`.
   - **GitHub**: `site.github`.
   - **Copy email**: copies `site.email` to the clipboard and shows a small toast "Copied, talk soon". Fall back to `mailto:` if the Clipboard API is unavailable. The toast must be announced to screen readers (`role="status"`).
5. The CTA row enters with the same mask/rise system as the other hero pieces (next delay step after the meta line).
6. Change the hand-drawn zigzag on the photo (second `<path>` in `.hero-scribble`). It reads like a stock chart. Replace it with a hand-drawn arrow pointing from the photo toward the CTA row (same stroke style, same draw animation). Keep the long vertical stroke.
7. Change the image alt to `Marko Stokic`.

## Phase 2: Performance, meta and sharing

1. `public/profile.JPG` is 4000×4000 and 2.9 MB, but it is shown at about 350×440. Generate `profile-800.webp` and `profile-800.jpg` (about 800px on the long side, quality around 80) and serve them through `<picture>` with explicit `width`/`height`. Keep `object-position` as it is. Delete the original from `public/` only after confirming with me.
2. In `index.html`:
   - `<title>`: `Marko Stokic · Full-stack Developer`
   - Meta description: role-focused, no board games.
   - Add a favicon (an SVG "MS" monogram in Anton style on `#8659c9`) plus an `apple-touch-icon`.
   - Add Open Graph and Twitter card tags (`og:title`, `og:description`, `og:image`, `og:url`, `twitter:card=summary_large_image`).
   - Create `public/og-image.png` (1200×630): my name in Anton, white plus outlined, on the purple/indigo gradient.
   - Add JSON-LD `Person` schema (name, jobTitle, alumniOf VIA University College, address Horsens DK, sameAs GitHub + LinkedIn).
3. Fonts:
   - Inter is referenced in `global.css` but never loaded, so the body falls back to Segoe UI or Arial. Load Inter (400, 500, 600, 700) in the Google Fonts link.
   - Remove Unbounded from the font request (see Phase 4).
4. WebGL background (`ContourBackground.jsx`):
   - Cap rendering at 30 fps.
   - Pause the rAF loop when the tab is hidden (`visibilitychange`).
   - Pause it when the user has scrolled past the projects section, using an IntersectionObserver on a sentinel or a scroll threshold.
5. The `.app-shell` 18s infinite gradient animation: stop it under reduced motion, and consider removing it, since the shader already provides movement.
6. `.stack-visual` uses `filter: blur(20px)` on `.stack-glow` and `drop-shadow` on 26rem icons. In software-rendered Chrome (no GPU) this made the whole desktop projects section render white. Make it cheaper:
   - Replace the blur filter with a pre-blurred `radial-gradient` (no `filter`).
   - Drop the `drop-shadow` on `.stack-bigicon`, or apply it only when `.is-active`.
   - Add `will-change` only where it is needed.
   - Verify by building and testing with `chrome --disable-gpu`.

## Phase 3: Projects section

1. Shorten the pinned scroll. `.projects-track` is `100svh + n × 60svh` (4.6 screens for 6 projects). Change it to `100svh + n × 40svh`.
2. Reorder `projects` in `site.js`:
   1. Forum-ish
   2. LLM Note Normalizer
   3. Kingdom Simulator
   4. Ruu
   5. Portfolio
   6. Chess Game, retitled "Chess Game (2018 throwback)"
3. **[ASK]** whether I can add **SEP3, DESMI Seaweed** (a semester project for a real company; stack Java, gRPC, C# .NET, Blazor). If yes, ask for the description, and put it in position 1 or 2.
4. Extend each project object with optional fields: `role`, `team`, `highlight` (one problem solved), `image` (screenshot path), `demo` (live URL). **[ASK]** me for these per project. Render them only when present.
5. Use the empty top half of each card (the area under `.stack-num`) for the project screenshot:
   - An `<img>` with `object-fit: cover`, a rounded corner and a subtle border, `loading="lazy"`.
   - When there is no image, keep the current look.
   - Screenshots go in `public/projects/`.
6. Add a "Live demo" link next to "View on GitHub" when `demo` exists.
7. Update the Portfolio project description. It still says "canvas flocking background, an SVG intro"; it should describe the WebGL contour shader, the pinned card stack and the intro loader.
8. Contrast: `.stack-index` (inactive) and `.projects-title span` ("BUILT") use white at 30% opacity, which is about 2.4:1 contrast. Raise both to at least 4.5:1 (around 60 to 65% opacity, or use `#94a3b8`).

## Phase 4: Typography and visual consistency

The hero and projects look like an award-site, while About and Resume look like a generic template. Carry one type system through the whole page.

1. Limit the site to three families:
   - **Anton**: display and numbers.
   - **Instrument Serif italic**: accent sublines.
   - **Inter**: body and UI.
   Replace every Unbounded usage (`--wide` in `projects.css`, `colophon.css`) with Anton (headings) or Inter uppercase with letter-spacing (small labels).
2. Create a shared section header pattern and use it in About, Resume and the footer: an Anton uppercase title plus an Instrument Serif italic subline. For example:
   - `ABOUT` / *a bit about me*
   - `EXPERIENCE` / *where I've worked*
   - `EDUCATION` / *where I've studied*
3. About: remove `text-align: justify` and use left alignment. Keep a max line length around 65 characters.

## Phase 5: Resume section redesign

1. Remove the duplicate "personal info" card (name, subtitle, phone, email, location). The hero and footer already cover contact. Remove the phone number from the site entirely, but keep `site.phone` in data in case I want it back.
2. Replace the stacked boxes with a timeline layout:
   - Two columns on desktop: **Experience** and **Education**. One column on mobile.
   - Each entry: the period on the left in Anton (reusing the 01/02 numbering feel of the project stack), then title, place and description on the right.
   - A thin accent line connects the entries.
3. **Skills**: render as chip groups instead of comma lists. **[ASK]** me to confirm these changes in `site.js`:
   - Add a **Frameworks/Libraries** entry for Blazor, EF Core, Node.js/Express, Electron and gRPC. These appear in my projects but not in my skills.
   - Replace "Unit and end-to-end testing" with the actual tool names I used.
   - Add a **Security** group: Google Cybersecurity Professional Certificate, TryHackMe / Hack The Box practice, OWASP Top 10 awareness.
4. **Certifications**: remove "Personal portfolio website" (it is not a certification). Retitle the section "Certifications & Achievements".
5. **Languages**: one compact row of chips. Change Danish to `A2 · actively learning`.
6. **Volunteer work**: render collapsed by default using a native `<details>`/`<summary>`, styled to match.
7. Folkæt experience: "on an as-needed basis" sounds weak. **[ASK]** me for my stack and one concrete thing I shipped there, then rewrite the description.

## Phase 6: Footer and Colophon

1. Turn the footer into a closing statement that mirrors the hero:
   - A large Anton line, e.g. `LET'S BUILD SOMETHING`.
   - Below it, the Instrument Serif italic line `Open to student jobs and 2027 internships.`
   - Then the CTA row: Copy email, LinkedIn, GitHub, Download CV (reuse the hero component).
2. `Colophon.jsx` exists but is not rendered in `App.jsx`. Render a compact version inside the footer (a "Built with" row only, small text), and keep the "Inspired by" list behind a `<details>` toggle.
3. Footer copy color `#64748b` is about 3.5:1 contrast. Raise it to at least 4.5:1.

## Phase 7: Accessibility

1. Add a "Skip to content" link as the first focusable element.
2. Wrap the page sections in `<main id="content">`.
3. Global CSS sets `text-decoration: none` on every element. Remove that from the `*` rule:
   - Links inside body text get an underline (`text-underline-offset: 0.2em`).
   - Nav, buttons and cards stay without one.
4. Add a consistent `:focus-visible` ring (2px `#c4b5fd`, 3px offset) for links, buttons and focusable cards.
5. Remove `color` from the `*` rule. Set it on `body` and let it inherit. Update the selectors that existed only to undo it (`.stack-title svg *`, `.stack-bigicon *`) and the loader letters.
6. Mobile nav: it currently wraps into two rows (about 90px of sticky space). Make it a single row: name on the left, links in a horizontally scrollable row or a compact menu button with an accessible disclosure pattern.
7. Buried project cards use `aria-label="Show X"`, which hides their content from screen readers. Use `aria-describedby` or visually hidden text so the title is still read.
8. Add `aria-label="Primary"` to the nav.

## Phase 8: Animation timing

1. Loader: shorten the total intro from about 1.7s to about 1.2s:
   - `FONT_WAIT_MS` 600 to 400.
   - Letter stagger 24ms to 18ms.
   - Slash delay 900ms to 650ms.
   - Slide duration 650ms to 550ms.
   - Update `LEAVE_AT` / `LEAVE_MS` to match the new CSS timings.
   - Replace the hard purple flash cut with a 120ms fade.
2. Hero scroll cue: stop the infinite line animation after the first scroll (add a class on the first `scroll` event) or after 3 iterations.
3. Keep the hero entrance timings (0.7s masks, 60 to 200ms stagger) unchanged.

## Phase 9: Memorable extras (do these last, one at a time, and ask before each)

1. **Board game project cards**:
   - Add a small stat block on each card: Stack, Team, Duration, Difficulty (1 to 5 pips).
   - On hover/focus (tap on mobile), flip the card with a 3D rotateY to show "What I learned".
   - Under reduced motion, show the back content below the front with no flip.
2. **Terminal easter egg**: pressing `~` opens a small overlay terminal (focus trapped, Esc closes) supporting:
   - `help`, `whoami`, `ls projects`, `open <project>`, `cat cv` (downloads the CV), `contact`, `clear`
   - `sudo hire marko` (playful response plus the CTA links)
   Lazy-load it so it does not affect the initial bundle.
3. **A "Currently" strip** between About and Resume: building / learning / playing, driven by `site.currently`. **[ASK]** for the content.

---

## Done checklist

- [ ] `npm run build` and `npm run lint` pass with no warnings.
- [ ] Lighthouse (mobile) Performance ≥ 90, Accessibility ≥ 95, SEO 100.
- [ ] All text ≥ 4.5:1 contrast; large text ≥ 3:1.
- [ ] Full keyboard navigation works, with a visible focus ring everywhere.
- [ ] Reduced motion: no loader, no pinned stack, no flips, the background is a still frame.
- [ ] No code comments, no em dash characters, no AI attribution, no `.claude` folder committed.
