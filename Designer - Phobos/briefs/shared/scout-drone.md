# Brief: Scout Drone (`scout-drone`, shared)

| Field | Value |
| --- | --- |
| Status | v1 delivered 2026-10-04 · `assets/shared/scout-drone.js` |
| Purpose | Reference asset that proves the Phobos pipeline (asset contract, viewer, budgets). Usable as a generic enemy, companion or ambient prop in any game. |
| Budget class | actor (≤1 500 tris · ≤3 calls · ≤3 materials) |
| Measured | **1 268 tris · 3 draw calls · 3 materials · 3 geometries** · 2.17 × 0.64 × 1.83 m |
| Seen at | 5–60 m, slow to medium speed |

**Silhouette:** a flat X with four rings, readable from above and the side. The eye marks the
front, so players can tell which way it's facing.

**Palette:** hull `#1a2338`, trim `#2f3d5e`, glow `#4ff2ff` (override `accent` for hostile
variants: `#ff4d5e` reads as a threat, `#ffb347` as neutral or a pickup carrier).

**Technique worth reusing:** static parts are merged into one vertex-coloured mesh plus one emissive
mesh, and the rotors are a single `InstancedMesh`. That takes it from 27 draw calls to 3. The `merge()` helper
inside the file is r128-safe, so copy it along with the asset.

**Integration:**
```js
const drone = PHOBOS_ASSETS['scout-drone'].build(THREE, { accent: '#ff4d5e' });
scene.add(drone);
// in the loop:
PHOBOS_ASSETS['scout-drone'].update(drone, time, dt);
```
For a single-file game, paste the whole IIFE into the game's `<script>`.
