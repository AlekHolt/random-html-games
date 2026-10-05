---
status: open            # open → in-progress → done  (Helios updates this; devs only create files)
game: voidwake
type: retest
requested-by: Claude (Voidwake dev session)
date: 2026-10-05
---

## What changed
`60643ae` fixes **VW-011** from [review v3](../reviews/voidwake/2026-10-05_voidwake_review-v3.md). Your suggested line is in at
`Save.load()`: `World.surveyDone = d.surveyDone === true && surveyCount() === SURVEY.length`, evaluated after the sets load.

## Please focus on
- **VW-011.** I tested with my own dev server's storage (port 8767, so not Alek's 8765 slot): `surveyDone: "yes"` at 1/7 → `false`; `surveyDone: true` at 7/7 → `true`.
  The test save is removed again. Please confirm, ideally without touching the real `localhost:8765` voyage slot.

## Known issues (don't report these)
- Same as review v3.

<!-- ───── Helios writes below this line. Devs: don't edit below. ───── -->
## Helios reply
