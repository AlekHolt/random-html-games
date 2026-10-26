import { useMemo } from 'react'
import { RetroGrid } from '@/components/ui/retro-grid'

/* Neon Run: synth sun on the horizon, a procedural skyline with lit windows, a retro grid road surface
   and light trails streaking along a distant expressway. */

function rng(seed: number) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
}

function Skyline() {
  const { towers, windows } = useMemo(() => {
    const r = rng(1337), towers: { x: number; w: number; h: number }[] = [], windows: { x: number; y: number; c: string }[] = []
    let x = 0
    while (x < 1000) {
      const w = 22 + r() * 46, h = 50 + Math.pow(r(), 1.6) * 230
      towers.push({ x, w, h })
      for (let wy = 300 - h + 10; wy < 292; wy += 9) for (let wx = x + 5; wx < x + w - 6; wx += 8)
        if (r() < 0.16) windows.push({ x: wx, y: wy, c: r() < 0.6 ? '#ffb347' : r() < 0.5 ? '#4ff2ff' : '#ff3ea5' })
      x += w + 2 + r() * 6
    }
    return { towers, windows }
  }, [])
  return (
    <svg viewBox="0 0 1000 300" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-[42%] h-[38%] w-full" aria-hidden>
      <defs>
        <linearGradient id="nr-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a0f3e" /><stop offset="1" stopColor="#0b0414" />
        </linearGradient>
      </defs>
      {towers.map((t, i) => <rect key={i} x={t.x} y={300 - t.h} width={t.w} height={t.h} fill="url(#nr-tower)" />)}
      {windows.map((w, i) => <rect key={i} x={w.x} y={w.y} width="3" height="4" fill={w.c} opacity="0.85" />)}
    </svg>
  )
}

function SynthSun() {
  // clipped at the horizon; the cut-out stripes sit in the visible lower part, like an 80s sunset
  return (
    <div aria-hidden className="absolute inset-x-0 bottom-[42%] h-[62%] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 aspect-square w-[min(34rem,70%)] -translate-x-1/2 translate-y-[22%] rounded-full
        bg-[linear-gradient(180deg,#ffd36e_0%,#ff8a3d_38%,#ff3ea5_70%,#b2147a_100%)]
        [mask-image:linear-gradient(to_bottom,black_52%,transparent_52%,transparent_54.5%,black_54.5%,black_60%,transparent_60%,transparent_63.5%,black_63.5%,black_68%,transparent_68%,transparent_72.5%,black_72.5%,black_76%,transparent_76%)]" />
      <div className="absolute bottom-0 left-1/2 h-1/2 w-[min(40rem,80%)] -translate-x-1/2 rounded-full bg-[#ff3ea5]/30 blur-3xl" />
    </div>
  )
}

const TRAILS = Array.from({ length: 14 }, (_, i) => {
  const r = rng(91 + i * 7)
  return { top: 59 + r() * 9, dur: 1.6 + r() * 2.4, delay: -r() * 4, w: 80 + r() * 160, head: r() < 0.5, rev: r() < 0.5 }
})

function LightTrails() {
  return (
    <div aria-hidden className="absolute inset-0">
      {TRAILS.map((t, i) => (
        <span key={i} className="nr-trail absolute h-[2px] rounded-full"
          style={{
            top: `${t.top}%`, width: t.w, animationDuration: `${t.dur}s`, animationDelay: `${t.delay}s`,
            animationDirection: t.rev ? 'reverse' : 'normal',
            background: t.head
              ? 'linear-gradient(90deg, transparent, rgba(220,250,255,0.95))'
              : 'linear-gradient(90deg, rgba(255,40,80,0.95), transparent)',
            boxShadow: t.head ? '0 0 10px rgba(79,242,255,0.8)' : '0 0 10px rgba(255,40,80,0.8)',
          }} />
      ))}
    </div>
  )
}

export function NeonRunScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_58%,rgba(255,62,165,0.28),transparent_70%)]" />
      <SynthSun />
      <Skyline />
      <div className="absolute inset-x-0 bottom-0 h-[42%] overflow-hidden">
        <RetroGrid className="absolute inset-0" angle={70} cellSize={56} opacity={0.9} lightLineColor="#ff3ea5" darkLineColor="#ff3ea5" />
        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-[#0b0414] to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-[41.6%] h-[2px] bg-[#ff3ea5] shadow-[0_0_24px_4px_rgba(255,62,165,0.7)]" />
      <LightTrails />
    </div>
  )
}
