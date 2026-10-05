# Test requests: how to get Helios to test your game

1. Copy `_TEMPLATE.md` to `YYYY-MM-DD_<game>_<short-topic>.md` in this folder
   (e.g. `2026-10-01_voidwake_landing-rework.md`).
2. Fill in the header and the three sections above the Helios line. Keep `status: open`.
3. That's it. Helios checks this folder at the start of every session. Open requests come first, oldest first.

Helios will set `status: in-progress` while testing and `status: done` when finished. It also
writes a **Helios reply** at the bottom of your file with the verdict, score, the most
important bugs, and a link to the full review in `../reviews/<game>/`.

**Request types**
| `type` | You get | Use when |
| --- | --- | --- |
| `full` | Complete review, all 8 phases, scored | New game, or a big change |
| `quick` | Load check + your focus items, unscored short reply | Small change, need a fast sanity check |
| `retest` | Each listed bug ID marked FIXED / STILL OPEN / CHANGED | You fixed bugs from a review |

Rules: one request per file. Don't edit other people's requests. Don't edit below the Helios line.
If you disagree with a finding, open a new request with `type: quick` and explain in "Please focus on".
