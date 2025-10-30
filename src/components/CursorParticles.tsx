import { useCursorParticles } from '@/hooks/use-cursor-particles'

export function CursorParticles() {
  const particles = useCursorParticles(true)

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map((particle) => {
        const opacity = 1 - particle.life / particle.maxLife
        return (
          <div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: opacity,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        )
      })}
    </div>
  )
}
