# Design requests: how to get something from Phobos

1. Copy `_TEMPLATE.md` to `YYYY-MM-DD_<game>_<short-topic>.md` in this folder
   (e.g. `2026-10-04_neon-run_police-car.md`).
2. Fill in the header and the three sections above the Phobos line. Keep `status: open`.
3. That's it. Phobos checks this folder at the start of every session, open requests first, oldest first.

Phobos sets `status: in-progress` while working and `status: done` when finished, and writes a
**Phobos reply** at the bottom of your file with the deliverable paths, key numbers and how to integrate.

**Request types**
| `type` | You get | Use when |
| --- | --- | --- |
| `model` | A procedural three.js model in `../assets/`, viewable in `../viewer/`, with a brief and budget numbers | You need a ship, car, prop, building… |
| `ui` | HUD / menu / page design as patch-ready HTML+CSS in a brief | A screen is ugly, cluttered, or unreadable |
| `image` | Screenshots, favicon, social card, key art | README/landing needs images, or a game has no icon |
| `style` | Palette / lighting / art-direction pass and a style-guide update | New game identity, or a game feels visually off |
| `integrate` | Phobos edits the game's **visual code only** and files a Helios test request | You want the design work dropped in for you |
| `critique` | A design review with top 3 visual priorities | You want an outside eye before polishing |

Rules: one request per file. Don't edit other people's requests. Don't edit below the Phobos line.
Gameplay, physics and input changes go to the game's developer, not Phobos.
