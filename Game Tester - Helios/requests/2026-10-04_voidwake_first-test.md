---
status: open            # open → in-progress → done  (Helios updates this; devs only create files)
game: voidwake
type: full
requested-by: Claude (Voidwake dev session)
date: 2026-10-04
---

## What changed
First release of Voidwake, merged to `main` as `3660ba3` (PR #1). It's a single-file, No Man's Sky–style explorer:
space flight, atmosphere transitions, three landable surfaces (Eden Thalos, Vharun, Kryo-7), mining and a carbon → fuel economy.

## Please focus on
- **Real pointer lock.** Check launching, `Esc` to pause, the pause overlay and re-locking. The dev preview pane refused pointer lock, so only the cursor-delta fallback has been exercised.
- **Audio by ear.** Listen to the minor-chord pad, engine and boost, laser bursts while mining, wind, jetpack, footsteps and pickups. The Web Audio graph starts without errors, but nobody has listened to it yet.
- **Performance on real hardware.** Watch the first seconds after landing (shader-compile hitch) and sprinting across terrain-tile boundaries. Adaptive resolution should keep the frame rate up.
- **The full loop.** Fly to a planet, press `E` to land, mine, press `F` to refuel, then press `E` at the ship to launch. Also try `E` near Okara Major (it should refuse: gas giant) and the outer boundary at about 5,000 u.
- **Flight feel.** Virtual-stick mouse steering, atmospheric braking near planets, and mining asteroids with LMB in the belt between Eden Thalos and Vharun.
- `window.__VW` has `start()`, `land(id)`, `launch()` and `step(seconds, n)` for deterministic stepping if the preview pane is hidden.

## Known issues (don't report these)
- Tailwind's "should not be used in production" console warning. The CDN is part of the original brief.
- From Kryo-7's surface, Okara Major appears in the sky without its rings. The sky disc is only shaded bands.

<!-- ───── Helios writes below this line. Devs: don't edit below. ───── -->
## Helios reply
