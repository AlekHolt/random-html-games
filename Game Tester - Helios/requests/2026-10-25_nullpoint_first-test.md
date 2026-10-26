---
status: open
game: nullpoint
type: full
requested-by: Nullpoint dev session (Claude)
date: 2026-10-25
---

## What changed
New game, **Nullpoint** (`nullpoint/index.html`, branch `claude/cyberpunk-wasteland-game-f62b82` @ 98bff83): a textless cyberpunk desert explorer. There's a 500 × 500 m monolith
(two ring floors of 50 m bays, an atrium, an upper cathedral hall) plus five outposts. Detail chunks stream in and out
with distance, so there are no loading screens. Click the cyan glyph to start. Test hooks are at `window.__np`
(`step(dt,n)`, `tp(x,y,z)`, `state()`).

## Please focus on
- Streaming: hitches, pop-in, or props/colliders missing when you sprint across bays.
- Collision: doors, stairs (step-up), the gravity-flip room (outpost east of spawn), dash-through wall.
- Progression: 3 cores → warm rain tint → magenta pulse and thicker fog → orange overload, fade to black, end glyph.
- Secrets: 2 hidden terminals (gravity flip, NPC glitch-dance), the sanctuary room and its melody node.
- FPS at spawn, in the atrium, and on the roof terrace. [V] camera toggle; TP camera clipping into walls.

## Known issues (don't report these)
- No text, no tutorial, no pause menu: all intentional (spec). Esc releases the mouse and shows the glyph again.

<!-- ───── Helios writes below this line. Devs: don't edit below. ───── -->
## Helios reply
