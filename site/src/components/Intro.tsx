import { ChevronDown } from 'lucide-react'
import { AuroraText } from '@/components/ui/aurora-text'
import { BlurFade } from '@/components/ui/blur-fade'
import { FlickeringGrid } from '@/components/ui/flickering-grid'
import { Particles } from '@/components/ui/particles'
import type { Game } from '@/games'

/* Home page: what this collection is, the games as chips, and a scroll cue. */
export function Intro({ games, near, onJump }: { games: Game[]; near: boolean; onJump: (i: number) => void }) {
  return (
    <section id="home" data-index={-1} aria-label="Random HTML Games" className="relative flex h-dvh snap-start items-center justify-center overflow-hidden">
      {near && (
        <div aria-hidden className="absolute inset-0">
          <FlickeringGrid className="absolute inset-0 [mask-image:radial-gradient(60%_55%_at_50%_45%,white,transparent)]" squareSize={3} gridGap={7} color="#4ff2ff" maxOpacity={0.22} flickerChance={0.08} />
          <Particles className="absolute inset-0" quantity={90} size={0.5} color="#dbe7ff" staticity={60} />
          <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_18%_-8%,rgba(79,242,255,0.14),transparent_70%),radial-gradient(760px_380px_at_86%_4%,rgba(255,62,165,0.14),transparent_70%)]" />
        </div>
      )}
      <div className="relative z-10 px-6 text-center md:pl-[calc(var(--rail)+1.5rem)]">
        <BlurFade inView delay={0.05}>
          <p className="font-display text-[11px] tracking-[0.5em] text-[var(--t-muted)]">A COLLECTION OF BROWSER GAMES</p>
        </BlurFade>
        <BlurFade inView delay={0.12}>
          <h1 className="mt-5 font-display text-[clamp(2.6rem,9vw,7rem)] font-black leading-[0.95] tracking-wide text-[var(--t-fg)]">
            Random <AuroraText colors={['#4ff2ff', '#a9c7ff', '#ff3ea5', '#ffb347']} speed={0.8}>HTML</AuroraText> Games
          </h1>
        </BlurFade>
        <BlurFade inView delay={0.2}>
          <p className="mx-auto mt-6 max-w-[38rem] text-lg leading-relaxed text-[var(--t-muted)]">
            Every game lives in <b className="text-[var(--t-fg)]">one HTML file</b>. No installs, no downloads, no assets.
            Worlds, cars, ships and sound are all generated in code. Open it and play.
          </p>
        </BlurFade>
        <BlurFade inView delay={0.28}>
          <ul className="mt-9 flex flex-wrap justify-center gap-3">
            {games.map((g, i) => (
              <li key={g.id}>
                <button onClick={() => onJump(i)}
                  className="group flex items-center gap-3 rounded-2xl border border-[var(--t-fg)]/12 bg-[var(--t-surface)]/60 p-2 pr-4 text-left backdrop-blur transition-colors hover:border-[var(--t-fg)]/30">
                  <img src={g.shots[0].src} alt="" className="h-12 w-20 rounded-lg object-cover" />
                  <span>
                    <span className="block font-display text-sm tracking-wide text-[var(--t-fg)]">{g.title}</span>
                    <span className="block text-xs" style={{ color: g.theme.accent }}>{g.kicker}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </BlurFade>
      </div>
      <button onClick={() => onJump(0)} aria-label="Scroll to the first game"
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-[10px] tracking-[0.4em] text-[var(--t-muted)] transition-colors hover:text-[var(--t-fg)] md:ml-[2.1rem]">
        SCROLL <ChevronDown className="size-5 animate-bounce" />
      </button>
    </section>
  )
}
