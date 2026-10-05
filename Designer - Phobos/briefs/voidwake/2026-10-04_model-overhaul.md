# Brief: Voidwake model overhaul (integrate)

| Field | Value |
| --- | --- |
| Request | [requests/2026-10-04_voidwake_model-overhaul.md](../../requests/2026-10-04_voidwake_model-overhaul.md) |
| Built on | `44017ff` (contains the `0c80abe` fixes), uncommitted working tree in `voidwake/index.html` |
| Scope | Visual code only. No gameplay constants, physics, input, HUD or audio changed |
| Evidence | `shots/before_*.jpg` vs `shots/after_*.jpg` use the same deterministic cameras (spawn view, chase cam), plus `after_*` close-ups |

## What changed, by priority

1. **Multitool** (`buildMultitool`, new). It replaces 7 boxes with a chamfered extruded receiver: light shell over a gunmetal belly, an orange cowl and a scanner sight with a glowing rear lens. The angled grip has a trigger, guard and orange panel. The barrel has five glowing coils inside a four-rail cage and an emitter head with three outward-flared prongs. On the side the player sees there is a glass canister with a glowing core. Rear heat fins and a vent slot complete it. All glow parts share `userData.glow`, so heat now visibly runs through the coils, canister, lens and vent. 4 draw calls in total.
2. **Starship** (`buildShipModel`). A panelled octagonal loft fuselage with a dark belly and orange flank stripe. A faceted canopy with frame ribs. A dorsal spine with vents and an antenna. Side intakes with ribs. The wing planform has a leading-edge extension, orange, hazard and flap livery, wingtip pods with fins, glow strips and nav lights. The under-wing lasers have cooling rings and muzzle brakes. Twin nacelles have exhaust bells (closed lathe, so the inside renders from behind) and orange collars. A heat-sink grille sits on the rear deck, which the chase cam sees most. The gear has housings, pistons, braces and hazard-ringed pads. **10 draw calls (was ~40)**, hero-budget whites toned down so the sunlit side doesn't blow out in bloom.
3. **Mineral deposits** (`buildMineralGeos`, `makeNode`).
   - **Crystals:** hexagonal crystals with pointed tips burst from a lumpy, AO-shaded rock bed, with loose shards on the ground. There are three shared variants each for Carbon Crystal and Cluster. `CRYSTAL_GLOW` multiplies the emissive by a vertex ramp, so crystals glow from the root up.
   - **Ancient Monolith:** stepped octagonal plinth and a chamfered tapering obelisk with a pyramidion. Glyph inlays sit on all four faces (two variants), with a seam ring, a hovering halo, a floating cap with orbiting shards, and rubble.
   - Every node is now **2 meshes (crystals) or 4 (monolith)**, down from 5–8.
4. **Asteroids** (`asteroidGeo`). Seven craters with raised rims per rock, darker crater floors, noise shading and pale mineral flecks. These are vertex colours, multiplied by the existing per-instance tint. Still 320 triangles and the same near-unit-sphere silhouette.
5. **Flora** (`makePropDefs`). Vertex-colour ramps give every prop a dark base and a lit top under the instance tint.

   | Biome | Prop | Before | After |
   | --- | --- | --- | --- |
   | Lush | Tree | 188 tris | curved tapered trunk under two faceted parasol caps with shaded undersides, 188 tris |
   | Lush | Grass | 36 tris | 8 bent blades, 24 tris |
   | Lush | Boulder | 36 tris | mossy-topped lumpy boulder, 80 tris |
   | Toxic | Spire | | curling five-sided horn with sediment bands, 50 tris |
   | Toxic | Rock | | rust-topped boulder |
   | Toxic | Pod | | onion bulb on a leafed stalk, ~92 tris |
   | Toxic | Tendrils | | 24 tris |
   | Ice | Shard | | pair of pentagonal prisms, 40 tris |
   | Ice | Rock | | frosted lumpy rock |
   | Ice | Frost tree | | three-tier frost pine, 56 tris, double-sided so you can look up into it |
   | Ice | Tuft | | 18 tris |

   Instance counts are unchanged.

## Contracts kept

- **Ship:**
  - `buildShipModel(env)` still returns `{ group, gear, plumes, plumeMat, nozzles, guns, setThrust }`.
  - `guns` = (±3.2, −0.42, −1.45), and the new barrels end there.
  - Nozzles and plumes sit at (±1, −0.05, 3.22 / 3.25).
  - Gear pads bottom out at y ≈ −2.48.
  - Same overall size as before: ≈ 8.4 u nose to nozzle, ≈ 10.7 u span.
- **Multitool:** the emitter tip is still at local (0, 0.01, −0.27), so `MUZZLE`, `GUN_BASE`, scale and rotation are untouched. `gun.userData.glow` is still the heat-driven `MeshBasicMaterial`.
- **Nodes:**
  - every mesh has `userData.node` (raycast mining verified: 75 → 0 HP, +13 C)
  - `node.mats` holds the emissive materials (pulse and flash work)
  - `radius`, `top`, `maxHp` and `yield` are unchanged
  - `node.spin` is the floating cap
  - the death animation still scales `node.group`
- **Seeded stream:** `makeNode` burns the same number of random draws as the old builder, so **every deposit spawns where it always did**. Kind, yield and position were verified identical for all 15 Vharun nodes against HEAD.
- **Asteroids:** a single `InstancedMesh` of 340, with the same seeded positions, sizes and tints.
- **Flora:** the same defs, flags, `perTile`, `colorPart` and palettes.

## Measured (Apple M1, built-in browser pane, 1231×952, scale 1.0)

| Scene | Draw calls before → after | Triangles before → after | Pipelined frame ms before → after |
| --- | --- | --- | --- |
| Space | 46 → **30** | 184k → 184k | 11.7 → 12.0 (noise) |
| Eden (lush) | 167 → **82** | 334k → 344k (+3%) | 13.7 → **13.0** |
| Vharun (toxic) | 182 → **95** | 222k → 252k (+13%) | — |
| Kryo (ice) | 159 → **91** | 150k → 174k (+16%) | — |

All within the +30% ceiling. **Leak check:** textures in space stay at 12 and on the ground at 14 across Eden, Vharun, Kryo and Eden again. Geometries in space plateau at 32–33 with no upward trend. The shared mineral geometries are freed by the existing `Object.values(nodeGeo)` dispose. Zero console errors across every transition.

## New shared helpers (top of the model section)
- `xf`, `mergeTinted`, `tintByNormal` and `shadeByHeight` handle transforms and vertex-colour merging.
- `loftHull` builds chamfered-octagon hard-surface lofts.
- `tubeGeo` and `lathe` build organics.
- `profileGeo` builds side-profile extrusions.
- `lumpy` builds rocks.

Reuse them for future models. They are r128-safe.

## Not done / follow-ups
- **README screenshots:** `voidwake/screenshots/*.jpg` still show the old models. A follow-up `image` request could recapture them.
- **Asteroid craters:** they read as flat cuts at 320 triangles. Real crater bowls would need detail 3 (1,280 tris × 340 = +330k triangles in space), which isn't worth it. A second, cheaper variant mesh would add silhouette variety for +1 draw call if wanted.
