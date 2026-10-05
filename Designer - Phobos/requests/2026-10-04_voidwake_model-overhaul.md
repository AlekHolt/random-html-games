---
status: open            # open → in-progress → done  (Phobos updates this; requesters only create files)
game: voidwake
type: integrate
requested-by: Claude (Voidwake dev session), for Alek
date: 2026-10-04
---

## What I need
Alek wants every 3D model in Voidwake to look substantially better, integrated into `voidwake/index.html`
(visual code only). In priority order:
1. **The multitool**, the first-person mining "ray caster". Today it reads as a toy pistol made of boxes.
2. **The starship.** It's the space hero object (chase cam) and also sits parked next to you on planets.
3. **The mineral deposits:** Carbon Crystal, Carbon Crystal Cluster and Ancient Monolith, across all three biomes.
4. **Everything else:** asteroids, and the flora and rocks on each biome. Lush has trees, grass and rocks. Toxic has spires, boulders, glowing pods and tendrils. Ice has shards, rocks, frost trees and tufts.

## Constraints
- **Format.** A single file, using the three.js **r128** global build from cdnjs. No loaders, addons or external assets: procedural `BufferGeometry` only. Available helpers: `mergeGeos(list)` (merges non-indexed position and normal) and `lin(hex)` (linear `Color`). It's an HDR pipeline, so emissive or basic colours above 1.0 bloom (threshold ≈ 1.0 in space, 1.15–1.3 on the ground). Materials receive a PMREM `envMap`. Units ≈ metres, +Y up, −Z forward.
- **Contracts to keep** (gameplay reads these):
  - **Ship.** `buildShipModel(env)` (≈ line 1578) must return `{ group, gear, plumes, plumeMat, nozzles, guns, setThrust(v, boost, time) }`.
    - Forward is −Z, and the ship is about 10 u long with a ~10.5 u span.
    - `guns` are the local muzzle points of the two wing lasers; the beams start there.
    - `gear` is shown only when parked. The landed pads sit about 2.5 u below the origin (`SHIP.y = H + 2.5`).
    - Collision is a 5.2 u cylinder on the ground and a ~4 u sphere in space.
    - The chase cam sits at local (0, 3.3, 15), so the rear and top silhouette is what players see most.
    - Plumes scale along +Z from the nozzles via `setThrust`.
  - **Multitool.** It's built inline in `createGround` (≈ line 2760) as the `gun` group in the viewmodel scene.
    - `gun.userData.glow` is a `MeshBasicMaterial` whose colour is driven by beam heat every frame.
    - `MUZZLE` (≈ line 2785) must stay at the barrel tip, because the beam starts there. `GUN_BASE` sets where the gun sits.
    - Current setup: `gun.scale` is 0.7, the gun sits bottom-right in a 74° FOV, and the near plane is 0.01.
  - **Mineral nodes.** `makeNode(kind, x, z, rnd)` (≈ line 2666) handles the kinds `small`, `large` and `monolith`.
    - Every mesh needs `userData.node = node` for raycast picking.
    - `node.mats = [{ m, base }]` drives the emissive pulse and hit flash, so keep the emissive materials in it.
    - Keep `radius` (collision: 1.4 / 2.3 / 1.9), `top` (4 / 6 / 11) and roughly those footprints.
    - `node.spin` is the monolith's floating cap. The colour comes from the biome's `theme.crystal` (cyan, amber or violet).
    - The death animation scales `node.group` down.
  - **Asteroids.** `buildAsteroidBelt` (≈ line 1690) is one `InstancedMesh` of 340 rocks. The ship lasers hit-test a sphere of `size * 0.85` and collisions use `size * 0.95`, so keep each rock's silhouette close to a unit sphere.
  - **Flora.** In `makePropDefs(type, env)` (≈ line 2330), each def is a set of `InstancedMesh` parts that share matrices across 81 terrain tiles × `perTile`. `colorPart` gets the per-instance colour. Grass alone is 26 per tile, which is 2,106 instances, so keep counts and triangle budgets similar.
- **Budget.** Helios measured the ground at ~167 draw calls and 334k triangles: 51 fps at full resolution on an M1, and 88–100 fps at the adaptive scale. Stay within roughly +30% triangles, and merge parts rather than adding draw calls per instance.
- **Scope.** Gameplay, physics, input, HUD and audio stay as they are. If something needs a non-visual code change, note it in your reply and I'll make it.
- **Base.** Bug fixes landed in `0c80abe`; build on that. Helios has a retest request open against that commit, so coordinate the timing if you can.

## References / vibe
- **No Man's Sky:**
  - a chunky retro-futurist fighter: panelled hull, greebles, a framed canopy, intakes, vents, landing struts
  - multitool silhouettes: a pistol or rifle with a glowing canister, a shrouded barrel and emissive coils
  - resource deposits: faceted crystal clusters glowing from inside, on rock bases, and ancient glyph monoliths
- Current look is in `voidwake/screenshots/`: the ship in `rings.jpg`, the multitool and a cyan crystal in `eden.jpg`, monoliths in `vharun.jpg` and `kryo.jpg`.
- Keep the house style's low-poly `flatShading` with emissive strips where it fits. Voidwake's warm oranges are allowed.

<!-- ───── Phobos writes below this line. Requesters: don't edit below. ───── -->
## Phobos reply
