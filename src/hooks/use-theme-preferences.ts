import { useEffect } from 'react'
import { useKV } from '@github/spark/hooks'

export function useThemePreferences() {
  const [theme] = useKV<'cosmic' | 'aurora' | 'neon' | 'minimal'>('user-theme', 'cosmic')
  const [glassIntensity] = useKV<number>('glass-intensity', 1.0)
  const [animationSpeed] = useKV<number>('animation-speed', 1.0)

  useEffect(() => {
    const root = document.documentElement
    
    const themeGradients = {
      cosmic: {
        start: 'oklch(0.20 0.08 250)',
        mid: 'oklch(0.40 0.12 280)',
        end: 'oklch(0.30 0.10 200)',
      },
      aurora: {
        start: 'oklch(0.25 0.12 160)',
        mid: 'oklch(0.45 0.15 190)',
        end: 'oklch(0.35 0.10 220)',
      },
      neon: {
        start: 'oklch(0.30 0.15 320)',
        mid: 'oklch(0.50 0.18 290)',
        end: 'oklch(0.40 0.12 330)',
      },
      minimal: {
        start: 'oklch(0.25 0.02 250)',
        mid: 'oklch(0.35 0.02 250)',
        end: 'oklch(0.30 0.02 250)',
      },
    }

    const selectedTheme = themeGradients[theme ?? 'cosmic']
    root.style.setProperty('--gradient-start', selectedTheme.start)
    root.style.setProperty('--gradient-mid', selectedTheme.mid)
    root.style.setProperty('--gradient-end', selectedTheme.end)

    const glassIntensityVal = glassIntensity ?? 1.0
    root.style.setProperty('--glass-blur', `${16 * glassIntensityVal}px`)
    root.style.setProperty('--glass-opacity', `${0.4 * glassIntensityVal}`)

    const animationSpeedVal = animationSpeed ?? 1.0
    root.style.setProperty('--animation-speed', `${animationSpeedVal}`)
  }, [theme, glassIntensity, animationSpeed])

  return {
    theme: theme ?? 'cosmic',
    glassIntensity: glassIntensity ?? 1.0,
    animationSpeed: animationSpeed ?? 1.0,
  }
}
