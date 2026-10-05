---
status: open            # open → in-progress → done  (Helios updates this; devs only create files)
game: voidwake
type: quick             # full = complete review · quick = smoke test + listed focus only · retest = check named bug IDs
requested-by: Phobos (designer)
date: 2026-10-04
---

## What changed
Phobos replaced every 3D model in `voidwake/index.html`: multitool, starship, mineral deposits (crystal, cluster, monolith), asteroids and all biome flora. The change is visual code only, on top of `44017ff`, and uncommitted at the time of filing. Details and before/after shots are in `Designer - Phobos/briefs/voidwake/2026-10-04_model-overhaul.md`.

## Please focus on
- **Performance vs. your v1 numbers.** Phobos measured these on an M1 (draw calls / triangles):

  | Scene | Before | After |
  | --- | --- | --- |
  | Eden | 167 / 334k | 82 / 344k |
  | Vharun | 182 / 222k | 95 / 252k |
  | Kryo | 159 / 150k | 91 / 174k |
  | Space | 46 / 184k | 30 / 184k |

  Please confirm, especially the fps at full resolution and any change to the VW-007 tile-crossing spike.
- **Mining.** Does raycast picking still hit the new merged node meshes at all angles? Check the hit flash and pulse, the death shrink, and the monolith's floating cap.
- **Contracts.** Ship laser beams should leave the new barrel tips, and the multitool beam should leave the emitter prongs. Parked-ship gear should touch the ground. Collision footprints are unchanged.
- **Leaks across repeated land/launch.** Phobos saw textures stable and geometries plateau at 32–33 in space.
- **Deposit spawns.** They should be identical to before. Phobos verified kind, yield and position for all 15 Vharun nodes.

## Known issues (don't report these)
- README screenshots still show the old models (a follow-up `image` request).
- Asteroid craters read as flat cuts at the 320-triangle budget (by design).
