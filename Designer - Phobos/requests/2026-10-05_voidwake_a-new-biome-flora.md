---
status: open            # open → in-progress → done  (Phobos updates this; requesters only create files)
game: voidwake
type: model
requested-by: Claude (Voidwake dev session), for Alek
date: 2026-10-05
---

## What I need
**Priority 1 of 5** (Voidwake expansion; Alek's plan is in the brief notes below). Flora, rocks and a terrain/sky palette for
**4 new wild worlds**. Deliver them as one asset, `assets/voidwake/biomes-v2.js`, that I'll paste into the game.
- **Sahri, desert:** golden dunes and mesas, wind-carved rock arches, spiny succulents, bleached bone-like spires. Hot, bright and hazy.
- **Umbra, bioluminescent night jungle:** permanent twilight. Glowing fungus trees, luminous fern fronds, floating spore pods, dark violet ground. Mostly lit by its own flora (cyan, magenta, lime glow).
- **Thalassa, ocean archipelago:** small sandy islands in a vast ocean. Leaning palm-like trees, coral-crystal outcrops on the shoreline, tide-pool rocks. Bright turquoise.
- **Crysalis, exotic glass world:** prismatic glass spires and shards growing from pale glassy plains. Faceted crystal "trees", iridescent pink, violet and teal. No organic life.

## Constraints
- **Same contract as the game's `makePropDefs(type, env)`** (≈ line 2330 in `voidwake/index.html`; Lush/Toxic/Ice are the reference). Export `propDefs(THREE, type, env)` returning an array of defs:
  `{ parts: [[geometry, material], ...], perTile, scale: [min, max], shadow, maxSlope, colorPart?, colors?, squash?, spire?, tilt? }`.
  Parts share instance matrices. `colorPart` gets per-instance colour, and `colors` is the palette (hex, or `[r, g, b]` for HDR emissive).
- **Instancing:** the world streams 81 terrain tiles, and each def is one `InstancedMesh` per part with `perTile × 81` instances. Keep per-instance triangles and `perTile` in line with the current biomes (ground today is ~85 draw calls and ~334k triangles at 57–60 fps on an M1).
- **Theme palette** for each biome, so the terrain matches your art: zenith, horizon, `sunCol`, `hemiSky`/`hemiGround`, fog colour, cloud colour, crystal glow colour, and 4–6 terrain colours by height/slope. Use the same fields as the `THEMES` objects (≈ line 2540). Umbra's sky is dark: give it stars and a dim sun.
- **Rendering:** three.js r128 global build only, no addons. The game renders in HDR with bloom (emissive above 1.0 glows), and materials get a PMREM `envMap` passed in. A plain `ShaderMaterial` is fine: no log depth needed.

## References / vibe
- No Man's Sky biome variety. Umbra should feel like Avatar's Pandora at night. Crysalis is alien and beautiful, not just "blue ice".
- Match your existing Voidwake flora style: the parasol trees and AO vertex ramps.

**Alek's expansion plan, for context:**
- About 40× bigger system with a pulse drive, and a nav map.
- 4 new wild worlds plus 2 city planets: Noctis (criminal, Night City / Coruscant) and Aurelia (ultra-wealthy).
- Credits and trade, NPCs, buyable ship classes and customization, and light combat (pirates, police).

My other requests: (b) resource deposits, (c) city kit, (d) NPC humanoids, (e) ship lineup.

<!-- ───── Phobos writes below this line. Requesters: don't edit below. ───── -->
## Phobos reply
