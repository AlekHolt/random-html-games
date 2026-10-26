import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { GAMES, INTRO_THEME, type Theme } from '@/games'
import { Sidebar } from '@/components/Sidebar'
import { Intro } from '@/components/Intro'
import { GameSection } from '@/components/GameSection'
import { NeonRunScene } from '@/components/scenes/NeonRunScene'
import { VoidwakeScene } from '@/components/scenes/VoidwakeScene'
import { NullpointScene } from '@/components/scenes/NullpointScene'

const SCENES: Record<string, ReactNode> = { 'neon-run': <NeonRunScene />, voidwake: <VoidwakeScene />, nullpoint: <NullpointScene /> }

/* Push a theme into the page's CSS variables; @property in index.css makes them animate between games. */
function applyTheme(t: Theme) {
  const r = document.documentElement.style
  r.setProperty('--t-bg', t.bg); r.setProperty('--t-surface', t.surface); r.setProperty('--t-fg', t.fg)
  r.setProperty('--t-muted', t.muted); r.setProperty('--t-accent', t.accent); r.setProperty('--t-accent2', t.accent2); r.setProperty('--t-glow', t.glow)
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', t.bg)
}

export default function App() {
  const scroller = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(-1)                      // -1 = intro
  const [open, setOpen] = useState(() => { try { const v = localStorage.getItem('rhg.sidebar'); if (v) return v === 'open' } catch { /* private mode */ } return innerWidth >= 1280 })
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem('rhg.sidebar', open ? 'open' : 'closed') } catch { /* private mode */ }
    document.documentElement.style.setProperty('--rail', open ? '16rem' : '4.25rem')   // content offset follows the sidebar
  }, [open])
  useEffect(() => { applyTheme(active < 0 ? INTRO_THEME : GAMES[active].theme) }, [active])

  // the section that fills most of the viewport is the active one
  useEffect(() => {
    const root = scroller.current; if (!root) return
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.intersectionRatio >= 0.55) setActive(Number((e.target as HTMLElement).dataset.index)) })
    }, { root, threshold: 0.55 })
    root.querySelectorAll('section[data-index]').forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // deep links: /#voidwake opens on that game
  useEffect(() => {
    const id = location.hash.slice(1); if (!id) return
    document.getElementById(id)?.scrollIntoView({ behavior: 'instant' as ScrollBehavior })
  }, [])

  const jump = useCallback((i: number) => {
    const id = i < 0 ? 'home' : GAMES[i].id
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', i < 0 ? location.pathname : '#' + id)
    setMobileOpen(false)
  }, [])

  // keyboard: arrows / PageUp / PageDown move a whole game at a time
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement && e.target.closest('input, textarea')) return
      if (e.key === 'ArrowDown' || e.key === 'PageDown') { e.preventDefault(); jump(Math.min(GAMES.length - 1, active + 1)) }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); jump(Math.max(-1, active - 1)) }
    }
    addEventListener('keydown', onKey); return () => removeEventListener('keydown', onKey)
  }, [active, jump])

  return (
    <div className="theme-root bg-[var(--t-bg)] text-[var(--t-fg)]">
      <div aria-hidden className="pointer-events-none fixed inset-0 bg-[radial-gradient(70%_60%_at_75%_50%,var(--t-glow),transparent_70%)]" />
      <Sidebar games={GAMES} active={active} open={open} onToggle={() => setOpen((o) => !o)} onJump={jump} mobileOpen={mobileOpen} onMobile={setMobileOpen} />
      <main ref={scroller} className="relative h-dvh snap-y snap-mandatory overflow-y-auto overscroll-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <Intro games={GAMES} near={active <= 0} onJump={jump} />
        {GAMES.map((g, i) => (
          <GameSection key={g.id} game={g} index={i} total={GAMES.length} active={active === i} near={Math.abs(active - i) <= 1} scene={SCENES[g.id]} />
        ))}
      </main>
      {/* position dots on the right edge */}
      <div className="fixed right-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-2 md:flex">
        {[-1, ...GAMES.map((_, i) => i)].map((i) => (
          <button key={i} onClick={() => jump(i)} aria-label={i < 0 ? 'Home' : GAMES[i].title}
            className="w-1.5 rounded-full transition-all" style={{ height: active === i ? 26 : 8, background: active === i ? 'var(--t-accent)' : 'color-mix(in srgb, var(--t-fg) 30%, transparent)' }} />
        ))}
      </div>
    </div>
  )
}
