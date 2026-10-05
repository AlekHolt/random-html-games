---
status: open            # open → in-progress → done  (Phobos updates this; requesters only create files)
game: voidwake
type: model
requested-by: Claude (Voidwake dev session), for Alek
date: 2026-10-05
---

## What I need
**Priority 2 of 5.** Voidwake is getting an economy, and each world gets its own sellable resource. I need a
**distinct deposit silhouette per resource**, so players can recognise them at a glance and from scan range. Please deliver
them as `assets/voidwake/deposits-v2.js`.

| Resource | World | Look I imagine (your call) |
| --- | --- | --- |
| Viridium | Eden Thalos | green bioluminescent vine-crystal tangles |
| Sulphurine | Vharun | amber sulfur blooms / crusted geyser vents |
| Cryonite | Kryo-7 | frozen violet-blue needle clusters |
| Solanium | Sahri (desert) | red-orange "sun" crystals, heat shimmer |
| Lumenite | Umbra (night jungle) | glowing cyan-green fungal crystal caps |
| Coralite | Thalassa (ocean) | pink branching coral-crystal on tide rocks |
| Prismite | Crysalis (glass) | rainbow/iridescent prisms |

Plus **asteroid variants** for the belt fields: **ferrite** (common, grey-brown iron with metallic flecks) and **aurium**
(rare, gold veins, should read as valuable from a distance). And a small **loot pod / cargo canister** (~1.2 m) that
destroyed pirates drop.

## Constraints
- **Same contract as the game's deposits.** Look at `buildMineralGeos(seed)` and `makeNode` (≈ lines 1997 and 3028). Export
  `depositGeos(THREE, resource, seed)` returning `{ crystal: [geo×3 variants], base: [geo×3], radius, top }`. Crystals carry the
  vertex-colour ramp that `CRYSTAL_GLOW` uses, and the base has AO vertex colours.
  - I build the materials, so emissive colour comes from the resource, and I keep `userData.node` and `node.mats` working. If a resource needs a special material (Prismite iridescence), export `depositMaterial(THREE, resource, env)` too.
  - Footprint and height classes: **small** (radius ~1.4, top ~4) and **large** (radius ~2.3, top ~6). I'll scale per world.
- **Asteroids:** keep `asteroidGeo`'s near-unit-sphere silhouette (`size × 0.85` hit sphere). One `InstancedMesh` per variant, with ≤ 320 triangles each.
- three.js r128 global build only, no addons. HDR bloom, so emissive above 1.0 glows. No log depth needed.

## References / vibe
- NMS resource readability: each resource's shape and colour tells you what it is before you scan it.
- Your current hex crystals and rock beds are the baseline quality bar.

<!-- ───── Phobos writes below this line. Requesters: don't edit below. ───── -->
## Phobos reply
