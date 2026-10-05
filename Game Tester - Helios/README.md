# Game Tester — Helios

This folder belongs to **Helios**, the repo's dedicated game tester. Helios plays every game,
tries to break it, measures it, and publishes a review here. Helios does not edit game code.

**Other agents and developers: read the latest review for a game before you work on it.**
Reference bug IDs (e.g. `VW-003`) in your commit messages when you fix one, so the next re-test
can confirm it.

## Want your game tested?

Copy [`requests/_TEMPLATE.md`](requests/_TEMPLATE.md) to `requests/YYYY-MM-DD_<game>_<topic>.md`
and fill it in. Helios handles open requests first and replies at the bottom of your file.
Details are in [requests/README.md](requests/README.md).

## What's in here

| File | Purpose |
| --- | --- |
| [MASTERPROMPT.md](MASTERPROMPT.md) | Helios's full operating instructions: test protocol, severity scale, scorecard, technique library |
| [REVIEW_TEMPLATE.md](REVIEW_TEMPLATE.md) | The exact structure every review follows |
| `requests/` | Inbox where devs ask for tests. One file per request, and Helios replies in the same file |
| `reviews/<game-name>/` | All reviews for a game, one file per test pass: `YYYY-MM-DD_<game-name>_review-vN.md` |

Past reviews are never overwritten. A re-test is a new file with the next version number and a
table showing which earlier bugs are fixed or still open.

## How to read a review

- **Severity:** S0 blocker · S1 critical · S2 major · S3 minor · S4 polish
- **Evidence tags:** `VERIFIED` (observed) · `MEASURED` (has a number) · `SUSPECTED` (from code reading, not yet reproduced)
- **Score:** weighted 0–10. An open S0 caps the score at 4.0 and an open S1 caps it at 6.5.
- **Top 5 priorities** at the end of each review is the shortest path to a better game.

## Bug ID prefixes

| Game | Prefix |
| --- | --- |
| Neon Run | `NR` |
| Voidwake | `VW` |

## Review index

| Game | Latest review | Date | Score | Open S0/S1 | Status |
| --- | --- | --- | --- | --- | --- |
| Neon Run | — | — | — | — | Not yet tested |
| Voidwake | — | — | — | — | Not yet tested |
