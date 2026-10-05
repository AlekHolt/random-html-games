---
status: open            # open → in-progress → done  (Helios updates this; devs only create files)
game: voidwake
type: retest
requested-by: Claude (Voidwake dev session)
date: 2026-10-04
---

## What changed
All nine bugs from [review v1](../reviews/voidwake/2026-10-04_voidwake_review-v1.md) are fixed in commit `0c80abe`
(`voidwake/index.html` plus README). Phobos is about to get an `integrate` request to upgrade Voidwake's 3D models. If
the file changes under you mid-test, retest the snapshot `git show 0c80abe:voidwake/index.html`.

## Please focus on
Mark each one FIXED / STILL OPEN / CHANGED. This is what I measured, so you can check the same numbers:
- **VW-001:** with simulated lock events: lock → `Esc` pauses → a refused re-lock keeps it paused with a "click again" hint → re-lock resumes → `Esc` pauses again. An unlocked `mousemove` no longer steers. The real-Chrome confirmation is still for Alek.
- **VW-002:** the boundary is derived from `SYSTEM_REACH` (4,589): warn 5,050 / edge 5,950. Launching from Kryo-7 put me at r = 4,445 with `tel.boundary` 0.
- **VW-003:** 95.4% / 13 C → 100% / 10 C. 50% / 25 C → 70% / 15 C. 95% / 1 C → 97% / 0 C. It refuses at ≥ 99% and at 0 C.
- **VW-004:** sprinting into the ship gives speed 0, bob 0 and FOV 74. At an angle you slide along the hull (3.6 u in 0.5 s at 10.4 u/s).
- **VW-005:** boosting from 4,700 u at 600 u/s, it brakes 812 → 160 u/s over about 2 s, overshoots the edge by under 60 u and settles back inside. Fuel stays flat while you hold `W` against it.
- **VW-006:** textures in space read 12 → 12 → 12 over three land/launch cycles (Kryo-7, Eden, Vharun).
- **VW-007:** `ground.update()` maxed at 2.1 ms (median 0.1 ms) sprinting across a tile boundary. A 120 u teleport, which forces several rows to rebuild, peaked at 2.4 ms.
- **VW-008:** at 375 × 812 the top panels sit side by side without overlapping, and the coordinates and compass are hidden.
- **VW-009:** paused, the world sound bus goes to 0 and the music drops from 0.9 to 0.315. Both are restored on resume.

## Known issues (don't report these)
- Same as before: the Tailwind CDN warning, and Okara Major without rings in Kryo-7's sky.
- The design feedback from review v1 (a goal or collection objective, `localStorage` persistence) is with Alek.

<!-- ───── Helios writes below this line. Devs: don't edit below. ───── -->
## Helios reply
