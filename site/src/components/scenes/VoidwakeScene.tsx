import { Particles } from '@/components/ui/particles'
import { Meteors } from '@/components/ui/meteors'
import { OrbitingCircles } from '@/components/ui/orbiting-circles'

/* Voidwake: a starfield, drifting nebulae, a banded ringed gas giant with moons on orbits, and the odd meteor. */

function Moon({ size, from, to }: { size: number; from: string; to: string }) {
  return <div className="rounded-full" style={{ width: size, height: size, background: `radial-gradient(circle at 32% 30%, ${from}, ${to} 70%)`, boxShadow: `0 0 18px ${from}66` }} />
}

function GasGiant() {
  return (
    <div className="relative aspect-square w-[min(22rem,46vw)]">
      {/* back half of the ring */}
      <div className="absolute left-1/2 top-1/2 h-[34%] w-[190%] -translate-x-1/2 -translate-y-1/2 -rotate-[16deg] rounded-[50%] border-[10px] border-[#c9b8ff]/40 [clip-path:inset(0_0_50%_0)]" />
      <div className="vw-planet absolute inset-0 overflow-hidden rounded-full shadow-[0_0_90px_20px_rgba(143,123,255,0.35)]">
        <div className="vw-bands absolute -inset-[20%]" />
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_28%,rgba(255,255,255,0.35),transparent_45%),radial-gradient(circle_at_75%_80%,rgba(4,5,15,0.85),transparent_60%)]" />
      </div>
      {/* front half of the ring passes in front of the planet */}
      <div className="absolute left-1/2 top-1/2 h-[34%] w-[190%] -translate-x-1/2 -translate-y-1/2 -rotate-[16deg] rounded-[50%] border-[10px] border-[#e8dcff]/70 shadow-[0_0_30px_rgba(201,184,255,0.35)] [clip-path:inset(50%_0_0_0)]" />
    </div>
  )
}

export function VoidwakeScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="vw-nebula absolute -right-[10%] top-[5%] h-[70%] w-[70%] rounded-full bg-[radial-gradient(circle,rgba(143,123,255,0.35),transparent_65%)] blur-2xl" />
      <div className="vw-nebula absolute bottom-[-10%] right-[25%] h-[60%] w-[55%] rounded-full bg-[radial-gradient(circle,rgba(79,200,255,0.22),transparent_65%)] blur-2xl [animation-delay:-9s]" />
      <Particles className="absolute inset-0" quantity={180} staticity={40} ease={60} size={0.6} color="#e6ecff" />
      <Meteors number={6} minDelay={0.4} maxDelay={6} minDuration={3} maxDuration={7} angle={215} />
      <div className="absolute inset-0 flex items-center justify-center lg:pl-[38%]">
        <div className="relative flex items-center justify-center">
          <GasGiant />
          <OrbitingCircles radius={250} duration={34} iconSize={22} path={false}>
            <Moon size={22} from="#cfe8ff" to="#3a4a7a" />
          </OrbitingCircles>
          <OrbitingCircles radius={330} duration={52} reverse iconSize={34} path={false}>
            <Moon size={34} from="#7fe0a0" to="#1f5a7a" />
            <Moon size={16} from="#ffb347" to="#7a2a14" />
          </OrbitingCircles>
        </div>
      </div>
    </div>
  )
}
