import { ChevronsLeft, ChevronsRight, Gamepad2, Menu, X } from 'lucide-react'

const Github = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.77.11 3.06.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
)
import { cn } from '@/lib/utils'
import type { Game } from '@/games'

type Props = {
  games: Game[]
  active: number            // -1 = intro
  open: boolean
  onToggle: () => void
  onJump: (i: number) => void
  mobileOpen: boolean
  onMobile: (v: boolean) => void
}

/* Collapsible game index. Desktop: a rail that expands to show thumbnails. Phone: a slide-over sheet. */
export function Sidebar({ games, active, open, onToggle, onJump, mobileOpen, onMobile }: Props) {
  const list = (expanded: boolean) => (
    <nav aria-label="Games" className="flex flex-1 flex-col gap-2 overflow-y-auto px-3 py-2">
      <button onClick={() => onJump(-1)} title="Home"
        className={cn('group flex items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-[var(--t-fg)]/5',
          active === -1 && 'bg-[var(--t-fg)]/8 ring-1 ring-[var(--t-accent)]/50')}>
        <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[var(--t-fg)]/5 text-[var(--t-accent)]"><Gamepad2 className="size-5" /></span>
        {expanded && <span className="font-display text-xs tracking-[0.2em] text-[var(--t-fg)]">HOME</span>}
      </button>
      {games.map((g, i) => (
        <button key={g.id} onClick={() => onJump(i)} title={g.title} aria-current={active === i ? 'true' : undefined}
          className={cn('group relative flex items-center gap-3 rounded-xl p-2 text-left transition-colors hover:bg-[var(--t-fg)]/5',
            active === i && 'bg-[var(--t-fg)]/8 ring-1 ring-[var(--t-accent)]/50')}>
          <span className="relative size-10 shrink-0 overflow-hidden rounded-lg ring-1 ring-[var(--t-fg)]/10" style={{ boxShadow: active === i ? `0 0 16px ${g.theme.accent}88` : undefined }}>
            <img src={g.shots[0].src} alt="" className="size-full object-cover" />
          </span>
          {expanded && (
            <span className="min-w-0">
              <span className="block truncate font-display text-sm tracking-wide text-[var(--t-fg)]">{g.title}</span>
              <span className="block truncate text-xs text-[var(--t-muted)]">{g.kicker}</span>
            </span>
          )}
          <span className="absolute -left-3 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full transition-opacity" style={{ background: g.theme.accent, opacity: active === i ? 1 : 0 }} />
        </button>
      ))}
    </nav>
  )
  const footer = (expanded: boolean) => (
    <div className="flex items-center gap-2 border-t border-[var(--t-fg)]/10 p-3">
      <a href="https://github.com/AlekHolt/random-html-games" target="_blank" rel="noreferrer" title="Source on GitHub"
        className="grid size-10 place-items-center rounded-lg text-[var(--t-muted)] transition-colors hover:bg-[var(--t-fg)]/5 hover:text-[var(--t-fg)]"><Github className="size-5" /></a>
      {expanded && <span className="text-xs text-[var(--t-muted)]">{games.length} games · all single-file</span>}
    </div>
  )

  return (
    <>
      {/* desktop rail */}
      <aside className={cn('fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-[var(--t-fg)]/10 bg-[var(--t-surface)]/70 backdrop-blur-xl transition-[width] duration-300 md:flex',
        open ? 'w-64' : 'w-[4.25rem]')}>
        <div className="flex h-16 items-center justify-between px-3">
          {open && <span className="pl-2 font-display text-[11px] tracking-[0.32em] text-[var(--t-muted)]">RANDOM&nbsp;HTML&nbsp;GAMES</span>}
          <button onClick={onToggle} aria-label={open ? 'Collapse sidebar' : 'Expand sidebar'} aria-expanded={open}
            className="grid size-10 place-items-center rounded-lg text-[var(--t-muted)] transition-colors hover:bg-[var(--t-fg)]/5 hover:text-[var(--t-fg)]">
            {open ? <ChevronsLeft className="size-5" /> : <ChevronsRight className="size-5" />}
          </button>
        </div>
        {list(open)}
        {footer(open)}
      </aside>

      {/* phone: floating button + sheet */}
      <button onClick={() => onMobile(true)} aria-label="Open game list"
        className="fixed left-4 top-4 z-40 grid size-11 place-items-center rounded-xl border border-[var(--t-fg)]/15 bg-[var(--t-surface)]/80 text-[var(--t-fg)] backdrop-blur-xl md:hidden">
        <Menu className="size-5" />
      </button>
      <div className={cn('fixed inset-0 z-50 md:hidden', mobileOpen ? 'pointer-events-auto' : 'pointer-events-none')}>
        <div onClick={() => onMobile(false)} className={cn('absolute inset-0 bg-black/60 transition-opacity', mobileOpen ? 'opacity-100' : 'opacity-0')} />
        <aside className={cn('absolute inset-y-0 left-0 flex w-72 flex-col bg-[var(--t-surface)] transition-transform duration-300', mobileOpen ? 'translate-x-0' : '-translate-x-full')}>
          <div className="flex h-16 items-center justify-between px-4">
            <span className="font-display text-[11px] tracking-[0.32em] text-[var(--t-muted)]">RANDOM HTML GAMES</span>
            <button onClick={() => onMobile(false)} aria-label="Close game list" className="grid size-10 place-items-center rounded-lg text-[var(--t-fg)]"><X className="size-5" /></button>
          </div>
          {list(true)}
          {footer(true)}
        </aside>
      </div>
    </>
  )
}
