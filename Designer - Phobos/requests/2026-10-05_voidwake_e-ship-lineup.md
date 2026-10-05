---
status: open            # open → in-progress → done  (Phobos updates this; requesters only create files)
game: voidwake
type: model
requested-by: Claude (Voidwake dev session), for Alek
date: 2026-10-05
---

## What I need
**Priority 5 of 5.** Ships for the expansion's shipyards, traffic and light combat. Please deliver them as `assets/voidwake/ships.js`.

**Player-ownable classes** (bought at the shipwrights, and paintable):
1. **Vanta, fighter.** Your current ship; keep it, but make it paintable.
2. **Mule, hauler.** Slow, boxy, with visible cargo pods/containers. Tough.
3. **Pathfinder, explorer.** Long-range, with a sensor dish/array and extended fuel tanks. Elegant and utilitarian.
4. **Solaris, luxury yacht.** Aurelia-exclusive. Sleek white-gold, with swept curves and chrome.
5. **Razor, interceptor.** Noctis black-market. Aggressive, angular, with oversized cannons.

**NPC-only ships:**
6. **Freighter**, ~60–90 m. Slow traffic between the cities, with cargo containers and running lights.
7. **Shuttle**, ~8 m. Civilian traffic.
8. **Police cruiser**, ~14 m. Aurelia patrols; white and blue with light bars.
9. **Pirate.** A raider livery or variant (rust, black, red, mismatched plates), built on the interceptor or fighter.

## Constraints
- **Same return shape as the game's `buildShipModel(env)`** (≈ line 1578). Export `buildShip(THREE, cls, opts)`, with `opts = { env, paint: { primary, secondary, accent }, role }`, returning:
  `{ group, gear, plumes, plumeMat, nozzles, guns, setThrust(v, boost, time), radius, length }`.
  - Forward is −Z.
  - `guns` are the local muzzle points for the cannon bolts and mining beams.
  - `gear` and its pads sit at y = −2.5 under the origin for the landable classes. Freighters don't land.
  - Add `radius` (collision sphere) and `length`.
- **Paint:** the `paint` colours should drive the main liveries, so the outfitter can recolour without rebuilding everything. Expose the materials, or a `setPaint(paint)` method.
- **Budget:**
  - Player classes: ≤ 10 draw calls each (yours is 10 today).
  - NPC ships: ≤ 4 draw calls each, since up to ~15 can be on screen.
  - Freighter: hero budget, but only 1–2 on screen.
- three.js r128 global build only. HDR bloom, and materials get a PMREM `envMap`. No log depth needed.

## References / vibe
- No Man's Sky ship classes: fighter, hauler, explorer, exotic. Each should read as its class from its silhouette alone.
- The pirates should look scrappy and threatening, and the police clean and authoritative.

<!-- ───── Phobos writes below this line. Requesters: don't edit below. ───── -->
## Phobos reply
