import { useEffect, useRef } from 'react'
import { useKV } from '@github/spark/hooks'

interface DynamicBackgroundProps {
  marketSentiment?: 'bullish' | 'bearish' | 'neutral'
  intensity?: number
}

export function DynamicBackground({ marketSentiment = 'neutral', intensity = 0.5 }: DynamicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [theme] = useKV<string>('user-theme', 'cosmic')

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const particles: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      color: string
      opacity: number
    }> = []

    const colors = {
      bullish: ['rgba(112, 255, 168, ', 'rgba(168, 255, 112, ', 'rgba(200, 255, 180, '],
      bearish: ['rgba(255, 112, 112, ', 'rgba(255, 168, 112, ', 'rgba(255, 140, 140, '],
      neutral: ['rgba(112, 168, 255, ', 'rgba(168, 112, 255, ', 'rgba(140, 200, 255, '],
    }

    const particleColors = colors[marketSentiment]
    const particleCount = Math.floor(50 * intensity)

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        opacity: Math.random() * 0.5 + 0.2,
      })
    }

    let animationFrameId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(24, 26, 50, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, i) => {
        particle.x += particle.vx
        particle.y += particle.vy

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color + particle.opacity + ')'
        ctx.fill()

        particles.forEach((otherParticle, j) => {
          if (i === j) return
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = particle.color + (0.15 * (1 - distance / 150)) + ')'
            ctx.lineWidth = 0.5
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [marketSentiment, intensity, theme])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  )
}
