import { useMemo } from 'react'

/* Nullpoint: a neon-edged monolith in a dark desert, slanting rain, its reflection on wet ground and a
   pulsing glyph in place of any words. */

function rng(seed: number) {
  return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 }
}

function Monolith() {
  return (
    <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMax meet" className="absolute inset-x-0 bottom-[30%] h-[62%] w-full" aria-hidden>
      <defs>
        <linearGradient id="np-face" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e1a26" /><stop offset="1" stopColor="#05080d" />
        </linearGradient>
      </defs>
      {/* distant outposts */}
      <rect x="40" y="350" width="46" height="50" fill="#0a121b" /><rect x="470" y="338" width="60" height="62" fill="#0a121b" />
      <rect x="52" y="362" width="22" height="2" fill="#ff3ea5" opacity="0.8" /><rect x="482" y="352" width="34" height="2" fill="#4ff2ff" opacity="0.8" />
      {/* the monolith and its spire */}
      <rect x="296" y="10" width="8" height="70" fill="#0e1a26" />
      <rect x="200" y="80" width="200" height="320" fill="url(#np-face)" />
      <rect x="200" y="80" width="200" height="320" fill="none" stroke="#4ff2ff" strokeWidth="1.5" opacity="0.7" />
      {Array.from({ length: 9 }, (_, i) => (
        <rect key={i} x="212" y={110 + i * 32} width="176" height="1.5" fill={i % 3 === 1 ? '#ff3ea5' : '#4ff2ff'} opacity={0.25 + (i % 2) * 0.25} />
      ))}
      <rect className="np-core" x="292" y="196" width="16" height="16" transform="rotate(45 300 204)" fill="none" stroke="#ff3ea5" strokeWidth="2" />
    </svg>
  )
}

function Rain() {
  const drops = useMemo(() => {
    const r = rng(4242)
    return Array.from({ length: 70 }, () => ({ left: r() * 110 - 5, dur: 0.55 + r() * 0.5, delay: -r() * 2, h: 40 + r() * 70, o: 0.15 + r() * 0.35 }))
  }, [])
  return (
    <div aria-hidden className="absolute inset-0">
      {drops.map((d, i) => (
        <span key={i} className="np-rain absolute top-0 w-px bg-gradient-to-b from-transparent to-[#bfefff]"
          style={{ left: `${d.left}%`, height: d.h, opacity: d.o, animationDuration: `${d.dur}s`, animationDelay: `${d.delay}s` }} />
      ))}
    </div>
  )
}

export function NullpointScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(79,242,255,0.16),transparent_70%)]" />
      <Monolith />
      {/* wet ground: a blurred, flipped echo of the glow */}
      <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-[#0a1a24] to-[#03060a]">
        <div className="absolute left-1/2 top-0 h-full w-[34%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(79,242,255,0.35),transparent_80%)] blur-xl" />
        <div className="absolute left-1/2 top-[10%] h-[50%] w-[3%] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(255,62,165,0.6),transparent)] blur-md" />
      </div>
      <div className="absolute inset-x-0 bottom-[30%] h-px bg-[#4ff2ff]/60 shadow-[0_0_18px_2px_rgba(79,242,255,0.5)]" />
      <Rain />
    </div>
  )
}
