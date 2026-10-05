# <Game Name> — Helios Review vN

| Field | Value |
| --- | --- |
| Game | `<game-name>/index.html` |
| Build tested | commit `<short-sha>` (or "uncommitted working tree") · file last changed `<YYYY-MM-DD>` |
| Review date | YYYY-MM-DD |
| Previous review | `<link>` or "first review" |
| Environment | Claude desktop built-in browser · viewport(s) tested · served via `python3 -m http.server 8765` |
| Time played | ~N minutes of real/scripted input |

## Verdict
<≤3 sentences: shippable or not, biggest problem, best thing.>

**Overall: X.X / 10** <(capped by open S0/S1? say so)>

## Scorecard
| Category | Weight | Score | Why |
| --- | --- | --- | --- |
| Fun & core loop | 25% | | |
| Game feel & controls | 20% | | |
| Stability & correctness | 20% | | |
| Visuals & audio | 15% | | |
| Performance | 10% | | |
| Onboarding & UX | 10% | | |

## Status of previous bugs
| ID | Title | Was | Now |
| --- | --- | --- | --- |
| | | | FIXED / STILL OPEN / CHANGED |

## Bugs
### <GAME>-001 · S? · <one-line title>
- **Repro:** 1. Load `http://localhost:8765/<game>/` 2. … 3. …
- **Expected:**
- **Actual:**
- **Frequency:** n/n
- **Evidence:** <VERIFIED/MEASURED: numbers, console text, screenshot description>
- **Suspected cause:** `<game>/index.html:<line>` — <explanation> (SUSPECTED)
- **Suggested fix:** <concrete change>

## Performance
| Scenario | Median FPS | 1% low | Worst frame | Notes |
| --- | --- | --- | --- | --- |
| Idle / title | | | | |
| Typical play | | | | |
| Worst case | | | | |

Memory / renderer info: start → after 10 restarts → after long run.

## Break matrix
| # | Test | Result | Notes |
| --- | --- | --- | --- |
| B1 | Documented controls | | |
| B2 | Undocumented keys | | |
| B3 | Opposing inputs | | |
| B4 | Held key through state change | | |
| B5 | Focus loss | | |
| B6 | Long frame / tab resume | | |
| B7 | Pause / menu | | |
| B8 | Restart ×10 | | |
| B9 | End states | | |
| B10 | Resize | | |
| B11 | Mobile / touch | | |
| B12 | Persistence & corrupt storage | | |
| B13 | Audio | | |
| B14 | Long session | | |
| B15 | Boundaries & exploits | | |
| B16 | NaN / numeric stability | | |
| B17 | Accessibility | | |
| B18 | Offline / CDN deps | | |

## README promises vs. reality
| Promise | Holds? | Notes |
| --- | --- | --- |

## Design feedback
- **Observation → Impact → Suggestion**

## What works (don't break these)
-

## Top 5 priorities
1.
2.
3.
4.
5.
