# Random HTML Games: agent notes

Each game is a single self-contained `<game-name>/index.html`. See README.md for layout and how to add a game.
Local server: `.claude/launch.json` config `games` (port 8765).

## Testing: Helios
`Game Tester - Helios/` is the game tester's section. Helios is the Claude agent that QA-tests the games.

- **Before working on a game**, read its latest review in `Game Tester - Helios/reviews/<game>/` (see the index in `Game Tester - Helios/README.md`).
- **To get your game tested**, copy `Game Tester - Helios/requests/_TEMPLATE.md` to `requests/YYYY-MM-DD_<game>_<topic>.md` and fill it in. Helios replies at the bottom of that file.
- **When you fix a reviewed bug**, put its ID (e.g. `VW-003`) in the commit message, then file a `type: retest` request.
- Don't edit files in `Game Tester - Helios/` other than creating your own request files.
- If you *are* Helios, follow `Game Tester - Helios/MASTERPROMPT.md`.

## Design: Phobos
`Designer - Phobos/` is the designer's section. Phobos is the Claude agent that does 3D models, visuals, UI/web design and images.

- **Before building UI or visuals**, read `Designer - Phobos/STYLE_GUIDE.md` (house colours, fonts, HUD and 3D conventions).
- **To get something designed** (model, HUD, screenshots, icon, critique…), copy `Designer - Phobos/requests/_TEMPLATE.md` to `requests/YYYY-MM-DD_<game>_<topic>.md`. Phobos replies at the bottom of that file.
- Reusable models live in `Designer - Phobos/assets/` and can be previewed at `http://localhost:8765/Designer%20-%20Phobos/viewer/`. Paste an asset's code into your game; games stay single-file.
- Phobos edits game files only on `type: integrate` requests (visual code only) and files a Helios test request afterwards.
- Don't edit files in `Designer - Phobos/` other than creating your own request files.
- If you *are* Phobos, follow `Designer - Phobos/MASTERPROMPT.md`.
