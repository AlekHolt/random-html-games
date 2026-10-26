/* Every game on the site. Add a new game here (plus a scene in components/scenes) and it gets its own
   full-page section, a sidebar entry and its own theme. Paths are relative to the repo root. */

export type Theme = {
  bg: string          // page background
  surface: string     // cards, sidebar
  fg: string          // main text
  muted: string       // secondary text
  accent: string      // primary accent (buttons, active states)
  accent2: string     // secondary accent (beams, gradients)
  glow: string        // big ambient glow behind the scene
}

export type Game = {
  id: string
  title: string
  kicker: string
  tagline: string
  description: string
  tags: string[]
  facts: [string, string][]
  href: string
  readme: string
  shots: { src: string; alt: string }[]
  theme: Theme
}

export const INTRO_THEME: Theme = {
  bg: '#05070e', surface: '#0b1120', fg: '#dbe7ff', muted: '#8094bb',
  accent: '#4ff2ff', accent2: '#ff3ea5', glow: 'rgba(79, 242, 255, 0.16)',
}

export const GAMES: Game[] = [
  {
    id: 'neon-run',
    title: 'Neon Run',
    kicker: 'Endless night-city racer',
    tagline: 'Two tiers of elevated expressway, one neon city that never ends.',
    description:
      'Thread traffic at 300 km/h through a procedurally generated night city. Drift on the handbrake, refill boost on near misses, and switch between chase, hood, cockpit and cinematic cameras. Every road, building, billboard, car and engine note is generated in code.',
    tags: ['WebGL', 'three.js', 'Procedural', 'Synth audio'],
    facts: [['Controls', 'WASD · Space · Shift'], ['Assets', 'None, all code'], ['Size', 'One HTML file']],
    href: 'neon-run/',
    readme: 'https://github.com/AlekHolt/random-html-games/tree/main/neon-run',
    shots: [
      { src: 'neon-run/screenshots/hero-chase.jpg', alt: 'Chase camera at 270 km/h through the night city' },
      { src: 'neon-run/screenshots/upper-deck.jpg', alt: 'Upper deck of the elevated expressway' },
      { src: 'neon-run/screenshots/hero-cockpit.jpg', alt: 'Cockpit view' },
    ],
    theme: {
      bg: '#0b0414', surface: '#170a24', fg: '#ffe8f6', muted: '#c08fb4',
      accent: '#ff3ea5', accent2: '#4ff2ff', glow: 'rgba(255, 62, 165, 0.22)',
    },
  },
  {
    id: 'voidwake',
    title: 'Voidwake',
    kicker: 'Space exploration',
    tagline: 'Pulse-drive across a star system, land anywhere, and keep your tank alive.',
    description:
      'A No Man’s Sky–style explorer with ten shader-generated bodies, from a ringed gas giant and glowing jungles to the neon undercity of Noctis. Dive through atmospheres, mine crystal deposits, trade, upgrade your ship and fight off pirates. No models, textures or sound files; all of it is generated at runtime.',
    tags: ['WebGL', 'three.js', 'GLSL', 'Procedural', 'Synth audio'],
    facts: [['Controls', 'Mouse · WASD · E · Tab'], ['Bodies', '10 worlds & moons'], ['Size', 'One HTML file']],
    href: 'voidwake/',
    readme: 'https://github.com/AlekHolt/random-html-games/tree/main/voidwake',
    shots: [
      { src: 'voidwake/screenshots/hero-orbit.jpg', alt: 'The ship in orbit over Eden Thalos' },
      { src: 'voidwake/screenshots/hero-noctis.jpg', alt: 'Street level in the neon city of Noctis' },
      { src: 'voidwake/screenshots/hero-eden.jpg', alt: 'Landed on Eden Thalos' },
      { src: 'voidwake/screenshots/hero-umbra.jpg', alt: 'The glowing twilight jungle of Umbra' },
      { src: 'voidwake/screenshots/hero-vharun.jpg', alt: 'Toxic world Vharun' },
    ],
    theme: {
      bg: '#04050f', surface: '#0c1024', fg: '#e6ecff', muted: '#8f9bc8',
      accent: '#ffb347', accent2: '#8f7bff', glow: 'rgba(143, 123, 255, 0.22)',
    },
  },
]
