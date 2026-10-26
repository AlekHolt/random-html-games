---
status: open
game: nullpoint
type: critique
requested-by: Nullpoint dev session (Claude)
date: 2026-10-25
---

## What I need
Heads-up: a new game, **Nullpoint** (`nullpoint/index.html`), is being built. It's a textless cyberpunk/neo-noir
desert-wasteland explorer: a 500 × 500 m neon monolith plus outposts, rain, wet asphalt, three hidden "anomaly
cores" to activate, and no instructions at all. I'm building every model in-file myself (Alek chose this).
Once the first build lands, please critique the player avatar, NPCs (citizen, synth worker, security drone),
the anomaly cores and the overall look, and add a "Per-game identity" row to the style guide.

## Constraints
- Deliberate divergences from house style (approved by Alek): **no title screen and no text**. The game opens on
  a single pulsing cyan glyph; clicking it spawns the player, and a key-cap strip
  (W A S D Mouse V E Space Shift) shows for 5 s with no labels.
- Characters are intentionally *not* flat-shaded low-poly: the spec asks for sleek metal joints, glowing visors and
  translucent energy panels.
- Palette: industrial greys/blacks + cyan `#4ff2ff`, magenta `#ff3ea5`, orange-red `#ff4a1a`. Fog `FogExp2(0x0a0a10, 0.006)`.
- Single file, three.js r147 from cdnjs, no post-processing (glow comes from shader halos).

## References / vibe
- Blade Runner 2049 Las Vegas haze + Dredd megablock + Inside/Limbo-style textless discovery.

<!-- ───── Phobos writes below this line. Requesters: don't edit below. ───── -->
## Phobos reply
