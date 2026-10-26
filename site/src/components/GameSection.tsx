import { useEffect, useState, type ReactNode } from 'react'
import { ArrowUpRight, Play } from 'lucide-react'
import { BlurFade } from '@/components/ui/blur-fade'
import { BorderBeam } from '@/components/ui/border-beam'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import type { Game } from '@/games'

type Props = { game: Game; index: number; total: number; active: boolean; near: boolean; scene: ReactNode }

/* One game = one full page. Left: screenshot carousel with the description under it. Right: the game's themed scene. */
export function GameSection({ game, index, total, active, near, scene }: Props) {
  const [shot, setShot] = useState(0)
  useEffect(() => {
    if (!active) return
    const t = setInterval(() => setShot((s) => (s + 1) % game.shots.length), 4500)
    return () => clearInterval(t)
  }, [active, game.shots.length])
  const t = game.theme

  return (
    <section id={game.id} data-index={index} aria-label={game.title} className="relative flex h-dvh snap-start items-center overflow-hidden">
      {/* scene: fills the right side, fading into the page on the left */}
      <div aria-hidden className="absolute inset-y-0 right-0 w-full lg:w-[64%]">
        {near ? scene : null /* only the visible section and its neighbours run their animations */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,var(--t-bg)_0%,transparent_32%)] lg:block" />
        <div className="absolute inset-0 bg-[var(--t-bg)]/60 lg:hidden" />
      </div>

      <div className="relative z-10 w-full px-5 pb-8 pt-20 transition-[padding] duration-300 md:pl-[calc(var(--rail)+2.5rem)] md:pr-10 lg:w-[calc(var(--rail)+min(40rem,38vw)+6rem)] lg:pl-[calc(var(--rail)+4rem)] lg:pt-8">
        <BlurFade inView delay={0.05}>
          <p className="font-display text-[11px] tracking-[0.38em] text-[var(--t-muted)]">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · {game.kicker.toUpperCase()}
          </p>
        </BlurFade>
        <BlurFade inView delay={0.1}>
          <h2 className="mt-3 font-display text-[clamp(2.4rem,6vw,4.6rem)] font-black leading-none tracking-wide text-[var(--t-fg)]"
            style={{ textShadow: `0 0 40px ${t.glow}` }}>{game.title}</h2>
        </BlurFade>

        <BlurFade inView delay={0.18}>
          <a href={game.href} aria-label={`Play ${game.title}`}
            className="group relative mt-6 block aspect-video w-full max-w-[40rem] overflow-hidden rounded-2xl bg-black/40 ring-1 ring-[var(--t-fg)]/10 [max-height:38dvh]">
            {game.shots.map((s, i) => (
              <img key={s.src} src={s.src} alt={s.alt} loading={index === 0 ? 'eager' : 'lazy'}
                className="absolute inset-0 size-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out group-hover:scale-[1.04]"
                style={{ opacity: i === shot ? 1 : 0 }} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white/90 opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
              <Play className="size-3.5" /> Play in browser
            </span>
            <span className="absolute bottom-3 right-3 flex gap-1.5">
              {game.shots.map((_, i) => (
                <button key={i} aria-label={`Screenshot ${i + 1}`} onClick={(e) => { e.preventDefault(); setShot(i) }}
                  className="h-1.5 rounded-full transition-all" style={{ width: i === shot ? 18 : 6, background: i === shot ? t.accent : 'rgba(255,255,255,0.5)' }} />
              ))}
            </span>
            <BorderBeam size={120} duration={8} colorFrom={t.accent} colorTo={t.accent2} borderWidth={2} />
          </a>
        </BlurFade>

        <BlurFade inView delay={0.26}>
          <p className="mt-6 max-w-[40rem] text-lg font-semibold leading-snug text-[var(--t-fg)]">{game.tagline}</p>
          <p className="mt-2 hidden max-w-[40rem] text-[15px] leading-relaxed text-[var(--t-muted)] sm:block [@media(max-height:760px)]:hidden">{game.description}</p>
        </BlurFade>

        <BlurFade inView delay={0.32}>
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {game.tags.map((tag) => (
              <li key={tag} className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em]"
                style={{ color: t.accent2, borderColor: `${t.accent2}55`, background: `${t.accent2}14` }}>{tag}</li>
            ))}
          </ul>
          <dl className="mt-4 hidden max-w-[40rem] grid-cols-3 gap-3 sm:grid [@media(max-height:820px)]:hidden">
            {game.facts.map(([k, v]) => (
              <div key={k} className="rounded-xl border border-[var(--t-fg)]/10 bg-[var(--t-surface)]/60 px-3 py-2 backdrop-blur">
                <dt className="text-[10px] uppercase tracking-[0.22em] text-[var(--t-muted)]">{k}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-[var(--t-fg)]">{v}</dd>
              </div>
            ))}
          </dl>
        </BlurFade>

        <BlurFade inView delay={0.38}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <ShimmerButton onClick={() => { window.location.href = game.href }} background={t.accent} shimmerColor="#ffffff"
              className="font-display text-sm font-bold tracking-[0.18em] text-black">
              <Play className="mr-2 size-4 fill-current" /> PLAY {game.title.toUpperCase()}
            </ShimmerButton>
            <a href={game.readme} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--t-fg)]/20 px-4 py-2.5 text-sm font-semibold text-[var(--t-fg)] transition-colors hover:border-[var(--t-accent)] hover:text-[var(--t-accent)]">
              How it works <ArrowUpRight className="size-4" />
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  )
}
