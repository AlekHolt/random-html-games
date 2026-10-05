---
status: open            # open → in-progress → done  (Phobos updates this; requesters only create files)
game: voidwake
type: model
requested-by: Claude (Voidwake dev session), for Alek
date: 2026-10-05
---

## What I need
**Priority 3 of 5.** Voidwake gets two **ecumenopolis city planets**, and you land in one walkable district on each. Alek
wants a "Coruscant / Night City" vibe. Please deliver a kit as `assets/voidwake/city-kit.js`, which I'll assemble into district scenes.

- **Noctis**, criminal underworld. Permanent night and rain:
  - Vertical megablocks (40–400 m) stacked with balconies, pipes, AC units and cabling.
  - Dense neon signage and holographic billboards; Asian-futurist / cyberpunk glyph signs work, with no real brands.
  - Grimy pink, cyan, amber and violet light. A black-market alley feel.
- **Aurelia**, ultra-wealthy, at golden hour:
  - Soaring white-and-gold spires with glass curtain walls.
  - Sky gardens on terraces, fountains, polished stone plazas, elegant arches.
  - A luxury shipyard. Clean, bright and serene.

**Pieces I need** (each as geometry + material, or a small `Group`, so I can instance the repeated ones):
1. **Towers:** 5+ variants per city, with a facade/window material (lit windows, slight flicker, works at 1–2 km in fog).
2. **Signage:** animated neon sign panels and holo billboards (Noctis heavy, Aurelia subtle). Expose a per-frame `update(t)` or uniforms.
3. **Landing pad** for the player's ship. The ship is ~10 m long, ~10.7 m span, gear pads at y = −2.5 under its origin.
4. **Vendor kiosks**, each recognisable at a glance:
   - Trade Broker terminal
   - Shipwright counter, plus a display pad for ships for sale
   - Outfitter (paint and upgrades)
   - Contract board (holo board)
   - Bar front with a bartender spot
   - Noctis only: a black-market stall
5. **Street props:** lamps, steam vents, planters, benches, barriers, a fountain (Aurelia), skybridges/walkways overhead.
6. **Flying cars:** 2–3 variants, ~5 m. I'll run ~30 of them along aerial lanes, so they need to be instanceable with light trails or emissive tails.

## Constraints
- The walkable area is a plaza about 120 × 120 m, inside a ~600 m skyline that fogs out. The player is first-person (eye height 1.72 m) and has a jetpack, so they can fly up to ~40 m.
- Budget for the whole district in view: ~150 draw calls and ~450k triangles (the M1 holds 57–60 fps at ~334k today). Instance the repeated pieces.
- three.js r128 global build only. HDR bloom (emissive above 1.0 glows), and materials get a PMREM `envMap`. No log depth needed.
- Asset contract per your MASTERPROMPT §7. The city exterior seen from orbit is mine (a planet shader); this is only the walkable district.

## References / vibe
- Noctis: Blade Runner 2049 and Cyberpunk 2077 street level, plus Coruscant's lower levels. Rain-slick reflections are welcome if they're cheap.
- Aurelia: Coruscant's upper senate district, Dubai Marina at sunset, the Naboo palace's elegance.

<!-- ───── Phobos writes below this line. Requesters: don't edit below. ───── -->
## Phobos reply
