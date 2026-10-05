# Random HTML Games: house style

Maintained by **Phobos**. These tokens were extracted from the existing landing page, Neon Run and
Voidwake on 2026-10-04. They describe what the repo already looks like, so a new game that uses them
fits in on day one. A game may have its own identity; when it diverges, its brief says why.

## Identity in one line
**Neon on deep ink.** Near-black blue backgrounds, cyan/magenta light as the signature, warm amber for
"important / reward", a squared-off techno display face over a narrow, readable UI face.

## Colour tokens

| Token | Hex | Role | Contrast on `--ink` |
| --- | --- | --- | --- |
| `--ink` | `#05070e` | Page / scene background | — |
| `--ink-2` | `#04060c` | Deepest background (game canvases) | — |
| `--panel` | `#0b1120` | Panels, cards, HUD plates | — |
| `--line` | `rgba(130,170,220,.17)` | Hairlines, card borders | — |
| `--text` | `#dbe7ff` | Body / primary text | 16.2 : 1 |
| `--dim` | `#8094bb` | Secondary text | 6.6 : 1 |
| `--faint` | `#56688d` | Tertiary labels. **Large or uppercase-tracked text only** | 3.6 : 1 |
| `--cyan` | `#4ff2ff` | Primary accent: player, interactive, "go" | 14.8 : 1 |
| `--mag` | `#ff3ea5` | Secondary accent: speed, energy, brand gradient end | 6.2 : 1 |
| `--amber` | `#ffb347` | Reward, score, warnings that aren't danger | 11.3 : 1 |
| `--danger` | `#ff4d5e` | Damage, low health, hazards | 6.2 : 1 |
| `--tag` | `#79d6e6` | Chip / tag text on cyan-tinted fill | 12.1 : 1 |

**Signature gradient:** `linear-gradient(100deg, #4ff2ff 10%, #a9c7ff 48%, #ff3ea5 92%)`, used for
display titles.
**Ambient glow:** soft radial cyan at top-left plus magenta at top-right, alpha ≈ .10.

Never signal danger with `--danger` vs. `--cyan`/green alone: pair it with shape, icon, pulse or text.

## Typography

| Use | Font | Weight | Notes |
| --- | --- | --- | --- |
| Display / titles / big HUD numbers | **Orbitron** | 600–900 | Letter-spacing `.04–.08em`. Never for paragraphs. |
| UI / body / labels | **Rajdhani** | 500–700 | 14.5–17 px body. Uppercase labels at 10–11 px use `letter-spacing .16–.42em`. |
| Fallbacks | `system-ui, -apple-system, 'Segoe UI', sans-serif` / `monospace` for Orbitron | | Games must stay legible if Google Fonts fails. |

Load both from one Google Fonts request with `display=swap`.

## Shape & spacing
- Radius: cards **14 px**, chips **999 px**, HUD plates **8–10 px**.
- Hairline borders (`--line`), and cyan at ~45% alpha for hover/focus.
- Spacing scale: 4 · 6 · 8 · 12 · 16 · 20 · 26 · 38 · 56 px.
- Motion: 180 ms ease for hover; lift `translateY(-3px)`. Respect `prefers-reduced-motion`.

## HUD conventions
- Critical numbers (speed, health, fuel) in **Orbitron**, large, bottom-centre or bottom-corners.
- Labels in tracked uppercase **Rajdhani** above the number, in `--dim`.
- HUD plates: `--panel` at 60–80% alpha with `backdrop-filter: blur(6px)` where supported.
- The title screen always shows the controls and a single obvious start action.

## 3D look
- Low-poly, `flatShading`, dark bodies (`#0b1120`–`#1a2338`) with **emissive** cyan/magenta/amber strips.
- Fog colour matches the sky's horizon colour, so objects fade *into* the scene instead of popping.
- Units: metres, +Y up, −Z forward (see the asset contract in `MASTERPROMPT.md` §7).

## Per-game identity
| Game | Divergence from house style |
| --- | --- |
| Neon Run | Pure house style: city night, magenta-heavy. |
| Voidwake | Adds warm planetary oranges (`#ff9a3d`, `#ffd49a`) for suns and atmospheres. Tailwind CDN for UI. |
