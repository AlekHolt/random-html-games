# Designer — Phobos

This folder belongs to **Phobos**, the repo's designer. Phobos makes 3D models, visual effects,
HUD/UI and web design, screenshots, icons and key art, and keeps the house style consistent.
Phobos changes a game's code only on an `integrate` request (visual code only), then hands
it to **Helios** (`../Game Tester - Helios/`) for testing.

**Other agents and developers: read [STYLE_GUIDE.md](STYLE_GUIDE.md) before building UI or visuals.**

## Want something designed?

Copy [`requests/_TEMPLATE.md`](requests/_TEMPLATE.md) to `requests/YYYY-MM-DD_<game>_<topic>.md`
and fill it in. Phobos handles open requests first and replies at the bottom of your file.
Request types (`model`, `ui`, `image`, `style`, `integrate`, `critique`) are explained in
[requests/README.md](requests/README.md).

## What's in here

| Path | Purpose |
| --- | --- |
| [MASTERPROMPT.md](MASTERPROMPT.md) | Phobos's operating instructions: workflows, budgets, quality bar, asset contract |
| [STYLE_GUIDE.md](STYLE_GUIDE.md) | House colours, type, spacing, HUD and 3D conventions |
| `requests/` | Inbox. One file per request, and Phobos replies in the same file |
| `briefs/<game>/` | Design briefs and critiques: the "why" behind each deliverable |
| `assets/<scope>/<id>.js` | Procedural three.js models, one self-registering file each (see the asset contract in the masterprompt §7) |
| `assets/manifest.js` | List of asset files the viewer loads |
| `viewer/` | **Model review bench**: turntable, wireframe, silhouette, budget readout, PNG export |
| `art/` | Re-renderable HTML generators for key art, social cards, mood boards |

## Model viewer

Serve the repo (`.claude/launch.json` → `games`, port 8765) and open
<http://localhost:8765/Designer%20-%20Phobos/viewer/>. Add `?asset=<id>` to open one directly.
The budget panel turns red when a model exceeds its class.

## Performance budgets (short version)

| Class | Tris | Draw calls | Materials |
| --- | --- | --- | --- |
| hero | ≤ 6 000 | ≤ 8 | ≤ 5 |
| actor | ≤ 1 500 | ≤ 3 | ≤ 3 |
| prop | ≤ 400 | 1 | 1 |

## Deliverables index

| Date | Scope | Deliverable | Type | Path | Numbers |
| --- | --- | --- | --- | --- | --- |
| 2026-10-04 | shared | Scout Drone (reference asset) | model | [assets/shared/scout-drone.js](assets/shared/scout-drone.js) · [brief](briefs/shared/scout-drone.md) | 1 268 tris · 3 calls · 3 mats |
| 2026-10-04 | repo | House style guide | style | [STYLE_GUIDE.md](STYLE_GUIDE.md) | 12 colour tokens, all body tokens ≥ 4.5:1 |
