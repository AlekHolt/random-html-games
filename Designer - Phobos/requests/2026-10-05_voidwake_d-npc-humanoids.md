---
status: open            # open → in-progress → done  (Phobos updates this; requesters only create files)
game: voidwake
type: model
requested-by: Claude (Voidwake dev session), for Alek
date: 2026-10-05
---

## What I need
**Priority 4 of 5.** NPCs for the city districts:
- **Pedestrians:** a crowd of 40–60 walking along plaza paths.
- **Vendors:** standing NPCs behind the kiosks from the city-kit request, idle-gesturing, who you talk to with `E`.

Please deliver `assets/voidwake/npc-humanoids.js`.
- **One instanceable humanoid** (~1.8 m, low-poly, stylised to fit the game's flat-shaded look) with a vertex attribute that marks limbs: `aLimb` (0 torso, 1 head, 2 armL, 3 armR, 4 legL, 5 legR), plus pivot data, so a **vertex-shader walk cycle** can swing limbs.
- **The material:** export `crowdMaterial(THREE, env)`, a `MeshStandardMaterial` with `onBeforeCompile` (or a ShaderMaterial) that animates walking from per-instance attributes `aPhase` and `aSpeed` and a `uTime` uniform.
  - It should support `instanceColor` for outfit tint, with a second tint for skin, hair or accent if you can.
  - A per-instance `aIdle` (0 or 1) switches to an idle or gesturing pose for vendors.
- **Two outfit styles**, as geometry variants or shared geometry with tint rules:
  - **Noctis:** hoods, long jackets, visors, neon trim, cyber-arms.
  - **Aurelia:** long coats and robes, white, gold and pale blue, elegant headwear.
- A few **distinctive vendor silhouettes**, if you can: a heavy-set shipwright, a hooded black marketeer, a robot bartender.

## Constraints
- About 600 triangles or fewer per NPC, and 60 NPCs in 1–2 draw calls. Instancing is the reason for the vertex-shader animation.
- three.js r128 global build only. HDR bloom, and materials get a PMREM `envMap`. No log depth needed.
- Units are metres with +Y up, and the origin is between the feet. Pedestrians face −Z when walking forward.

## References / vibe
- Night City street crowds for Noctis, and Coruscant's upper levels and Naboo nobles for Aurelia.
- They're readable as people at 5–40 m, and don't need faces.

<!-- ───── Phobos writes below this line. Requesters: don't edit below. ───── -->
## Phobos reply
