# Landing page

Source for the root `index.html` of Random HTML Games: Vite + React + Tailwind v4, shadcn, and Magic UI
components (installed with `npx shadcn@latest add @magicui/<name>`, so they live in `src/components/ui/`).

```bash
npm install
npm run dev     # http://localhost:5173 — the dev server also serves ../<game>/ folders
npm run build   # writes ../index.html and ../site-assets/ (commit both)
```

- `src/games.ts`: every game's copy, screenshots and theme colours
- `src/components/scenes/`: the animated scene on the right of each game's page
- `src/components/GameSection.tsx`, `Sidebar.tsx`, `Intro.tsx`: layout
- The page theme lives in `--t-*` CSS variables (registered with `@property` in `src/index.css`), so it cross-fades between games.
