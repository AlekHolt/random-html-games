# Nullpoint

A textless neo-noir explorer set in a rain-soaked desert. You spawn at (0, 0, 0) beside a 500 × 500 m neon
monolith and five outposts. There are no words and no tutorial: you work out the world by poking at it.

**▶ Play:** open `index.html`, click the pulsing glyph.

The keys are shown for five seconds and never explained: `W A S D`, `Mouse`, `V`, `E`, `Space`, `Shift`.

<details><summary>Spoilers: what the keys do and how to win</summary>

- **V** switches between a damped shoulder camera and first person (the avatar's head hides in first person).
- **Shift** dash-sprints and leaves a trail of fading neon silhouettes.
- **Space** jumps; hold it for a higher jump. Inside a lit anti-gravity vent, holding Space floats you up the column.
- **E** works whatever the floating octahedron marks: terminals, server racks, reactor rods, console walls,
  pylons (the main gate, the plaza grid colour, power-line surges, dormant lifts) and the anomaly cores.
- **Goal:** wake the three anomaly cores (the east reactor outpost, the monolith's north-west vault bay and the
  platform hanging in the atrium). One core warms the light and tints the rain cyan. Two send a magenta pulse up the
  monolith and thicken the fog. Three overload the facility.
- **Secrets:** a crawlspace terminal under the server shack east of spawn flips gravity in that room; a terminal on
  top of a pipe high in the cathedral hall makes the NPCs glitch-dance; the dead end of the western alley is a
  light projection you can only dash through, and the hex node in the dark room behind it plays a synth-wave loop.
</details>

## How it works
- **One file:** three.js r147 from cdnjs. Everything else (geometry, shaders, audio) is generated in code.
- **Streaming:** the world is split into ~230 chunks (each 50 m monolith bay per floor, plus atrium, cathedral,
  facade and outpost chunks). Each chunk builds when you come within its radius and is disposed once you pass the
  radius plus a 45 m margin. Builds run on a 3.5 ms-per-frame budget, nearest first, so there are no loading
  screens. Colliders, interactables, light nodes and per-frame updaters belong to their chunk and leave with it.
- **NPCs:** NPCs join or leave the scene graph by 50 m sector (3 × 3 around the player), so far ones cost nothing.
- **Lights:** only 8 real `PointLight`s exist. Every 0.25 s they jump to the most relevant of hundreds of neon
  light nodes. The wet-asphalt shader reads the same 8 lights to draw stretched puddle reflections.
- **Glow without post-processing:** neon tubes are paired with crossed additive ribbons that have a Gaussian
  cross-section, and cores and lamps use radial sprites.
- **Batching:** structures merge into a few vertex-coloured meshes. Their shader adds world-space panel seams, the
  core-2 pulse wave and the core-3 overload.
- **Audio:** Web Audio only: filtered-noise rain with LFO, thunder, a detuned drone, footsteps, the dash whoosh,
  chimes and clunks, a 112 bpm sequencer for the sanctuary, and a harmonic sweep for the finale.
- **Test hooks:** `window.__np` has `step(dt,n)`, `tp(x,y,z)`, `key(code,down)`, `press(code)`, `look(yaw,pitch)`
  and `state()`.
