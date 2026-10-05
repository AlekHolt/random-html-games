# Voidwake

*Part of [Random HTML Games](../README.md).*

A space exploration game inspired by No Man's Sky, in a single HTML file. Fly a starship around a
procedurally shaded star system, dive through an atmosphere, land, and mine crystal deposits for the
carbon that keeps your fuel tank alive. There are no models, textures or sound files. Every planet,
nebula, ship, crystal and sound is generated in code: about 3,000 lines of JavaScript and GLSL on top
of three.js r128.

**[▶ Play it](https://alekholt.github.io/random-html-games/voidwake/)** · or download `index.html` and double-click it.

![Ringed gas giant](screenshots/rings.jpg)

## Controls

**In space**

| Input | Action |
| --- | --- |
| Mouse | Pitch / yaw (a virtual stick; the reticle shows deflection) |
| `W` / `S` | Thrust / reverse |
| `A` / `D` | Roll |
| `←` `→` `↑` `↓` | Strafe (lateral / vertical) |
| `Shift` | Pulse boost (burns fuel fast) |
| Hold left mouse | Mine asteroids with the wing lasers |
| `Tab` | Cycle the active target (nearest → each body) |
| `E` | Enter the atmosphere of the planet you are next to |

**On a planet**

| Input | Action |
| --- | --- |
| `WASD` · mouse | Walk and look (pointer lock) |
| `Shift` | Sprint |
| `Space` | Jump; hold to use the jetpack |
| Hold left mouse | Mining beam (watch the heat gauge) |
| `C` | Scanner pulse: tags every deposit within range |
| `E` | Board the ship and launch to orbit (costs 10% fuel), or decode a waystone |

`J` opens the survey log. `F` turns carbon into fuel anywhere: 1 C buys 2%, up to 20% per press, and you only pay for what fits
in the tank. `M` mutes. `Esc` pauses, which silences the world and ducks the music.

The system ends at an outer boundary about 5,000 u from the sun. Past the warning line, outward thrust
fades out and the ship is braked to a stop before the edge, without burning fuel against it.

## The loop

You start in orbit near **Eden Thalos**. Thrust drains the tank, and boost drains it fast. Carbon
comes from asteroids in space and from crystals and monoliths on the surface, and it converts into
fuel. Launching from a surface costs 10%, so on the ground you mine until you can afford to leave.
An empty tank never strands you: emergency thrusters still give 20% thrust.

### The Halcyon Survey

The goal is to survey the whole system. Seven objectives are tracked in the HUD's **Survey Log**; press
`J` for the full list:

- Land on Eden Thalos, Vharun and Kryo-7.
- On each, find and decode its **Ancient Waystone**, a glyph-carved obelisk with a gold light beacon that
  stands 75–125 u from the landing site. The scanner (`C`) tags it, and `E` decodes it for +30 C and a
  glyph word.
- Survey **Okara Major** by flying into close orbit (+20 C). The gas giant can't be landed on, but it
  counts.

Completing all seven pays a +100 C bonus.

**Progress saves automatically** in the browser (`localStorage`): carbon, fuel, worlds visited, glyphs,
the survey and stats. It saves every few seconds, on every milestone, and when the tab closes. The
title screen shows your saved voyage, and **New voyage** (click twice) erases it. A blocked, private or
corrupt store just means a fresh start.

The system has four landable or visible bodies:

| Body | Class | Surface |
| --- | --- | --- |
| **Eden Thalos** | Paradise world | Rolling meadows, lakes, candy-coloured canopy trees, cyan crystals |
| **Vharun** | Toxic wasteland | Terraced crimson dunes, black spires, glowing pods, amber sludge |
| **Okara Major** | Ringed gas giant | No solid surface; flying into it pushes you back out |
| **Kryo-7** | Frozen moon of Okara | Snowfields, ice shards, frost trees, Okara filling the sky |

![Kryo-7](screenshots/kryo.jpg)

## How it's built

**Planets** are one high-resolution sphere each, displaced in a vertex shader by 3D simplex fBm and
ridged multifractal noise. Each vertex samples the height field three times to rebuild its normal on
the tangent plane, so continents, mountains and coastlines are lit correctly. The fragment shader
colours by height, slope and latitude. Eden gets oceans with a sun glint and polar caps, Vharun
gets glowing lava basins and sulfur streaks, and Kryo gets frozen seas with fractures. Clouds are a
separate animated fBm shell.

**Atmospheres** are an analytic single-scattering shell. Each pixel intersects the view ray with the
atmosphere and planet spheres, integrates an exponential density profile across the chord with
per-sample sun visibility, and adds a Fresnel rim. The shell switches faces when you fly inside it,
so the haze also works from within the atmosphere.

**The gas giant** uses domain-warped latitude bands with differential rotation and a storm. Its
rings are four concentric `RingGeometry` bands sharing one procedural density profile, with a
Cassini-style gap. The planet casts its shadow onto the rings, and the rings cast shadows back onto
the planet.

**The sky** is a nebula baked once into a 1024² cubemap from fBm in neon pink, cyan and violet. On
top sit 2,000 twinkling point stars clustered along a galactic band. The same cubemap feeds a PMREM
environment map, so the ship's hull reflects the nebula.

**Planet surfaces** stream a 9×9 grid of recycled terrain tiles around you, generated on the CPU from
the same seeded noise each time. Normals come from central differences across tile borders, so
there are no seams. Flora is instanced per biome (trees, tufts, rocks, spires, glowing pods, ice
shards). Each landing spawns 15–20 mining nodes: crystals, clusters and rare glyph-banded monoliths.
The mining beam is a camera-facing ribbon from the multitool's muzzle to the raycast hit point.

**Rendering** happens in an HDR half-float multisampled target, followed by a hand-rolled 4-level
bloom, ACES tone mapping, chromatic aberration and vignette. Internal resolution scales itself down
when frames get expensive.

**Audio** is all Web Audio. The space soundtrack is a five-voice detuned-saw pad that glides between
minor-key chords (Am9 → Fmaj9 → Dm9 → Em9 → Cmaj9) through an LFO-swept low-pass filter, convolution
reverb and a delay line of sparse pentatonic plucks. Mining fires white-noise bursts through fast
exponential gain envelopes on top of a buzzing hum. Engine, wind, jetpack, footsteps and pickups
are all synthesised too.

**Scene flow** is a strict state machine
(`INTRO → SPACE_FLIGHT ⇄ ATMOSPHERE_TRANSITION ⇄ GROUND_EXPLORATION`). On landing, the ship dives on
autopilot while the screen fades to the planet's sky colour. Behind the opaque fade, the space scene
graph is disposed and the surface scene is built and pre-compiled, then the fade lifts as your ship
descends next to you.

![Vharun](screenshots/vharun.jpg)

## Running it

It's one file. Open `index.html` in any browser with WebGL2. The only network requests are three.js
r128 from cdnjs, the Tailwind CDN and two Google fonts.

```bash
python3 -m http.server 8000
```

The game needs a keyboard and mouse. If the browser never grants pointer lock (in some embedded views,
for example), mouse steering falls back to raw cursor movement. A one-off refusal after you press `Esc`
(Chrome blocks an instant re-lock) just keeps the game paused until you click again.

## Debug handles

`window.__VW` exposes the renderer, world state, input, the live `space` / `ground` scene objects, the
latest telemetry, and helpers for automation: `start()`, `land(id)`, `launch()` and `step(seconds, n)`
(a deterministic frame stepper).

## License

MIT — see [LICENSE](../LICENSE).
