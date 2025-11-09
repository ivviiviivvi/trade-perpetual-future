import { useState } from 'react'
import { useKV } from '@github/spark/hooks'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { 
  Palette, 
  Sparkle, 
  Eye, 
  Lightning,
  Atom,
  Fire
} from '@phosphor-icons/react'
import { toast } from 'sonner'

export function PersonalizationPanel() {
  const [particlesEnabled, setParticlesEnabled] = useKV<boolean>('particles-enabled', true)
  const [particleIntensity, setParticleIntensity] = useKV<number>('particle-intensity', 1.0)
  const [glassIntensity, setGlassIntensity] = useKV<number>('glass-intensity', 1.0)
  const [animationSpeed, setAnimationSpeed] = useKV<number>('animation-speed', 1.0)
  const [theme, setTheme] = useKV<'cosmic' | 'aurora' | 'neon' | 'minimal'>('user-theme', 'cosmic')

  const themes = [
    { 
      id: 'cosmic' as const, 
      name: 'Cosmic', 
      icon: Atom,
      gradient: 'from-blue-500 via-purple-500 to-pink-500'
    },
    { 
      id: 'aurora' as const, 
      name: 'Aurora', 
      icon: Sparkle,
      gradient: 'from-green-400 via-cyan-500 to-blue-500'
    },
    { 
      id: 'neon' as const, 
      name: 'Neon', 
      icon: Lightning,
      gradient: 'from-pink-500 via-purple-500 to-indigo-500'
    },
    { 
      id: 'minimal' as const, 
      name: 'Minimal', 
      icon: Eye,
      gradient: 'from-gray-400 via-gray-500 to-gray-600'
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Palette size={24} weight="duotone" className="text-ai-purple" />
          Personalization
        </h3>
        <p className="text-sm text-foreground/70 mb-6">
          Customize your trading experience with themes, effects, and visual preferences
        </p>
      </div>

      <Card className="glass-strong p-6 border-white/10">
        <div className="space-y-6">
          <div>
            <Label className="text-base font-semibold mb-4 block">Visual Theme</Label>
            <div className="grid grid-cols-2 gap-3">
              {themes.map((t) => {
                const Icon = t.icon
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id)
                      toast.success(`Theme changed to ${t.name}`)
                    }}
                    className={`glass-interactive p-4 rounded-2xl border-2 transition-all ${
                      theme === t.id 
                        ? 'border-accent shadow-lg shadow-accent/30' 
                        : 'border-white/10'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`bg-gradient-to-r ${t.gradient} p-3 rounded-xl`}>
                        <Icon size={24} weight="duotone" className="text-white" />
                      </div>
                      <span className="font-semibold text-sm">{t.name}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label htmlFor="particles" className="font-semibold">Cursor Particles</Label>
                <p className="text-xs text-foreground/60">Interactive particle trail following cursor</p>
              </div>
              <Switch 
                id="particles"
                checked={particlesEnabled ?? true}
                onCheckedChange={setParticlesEnabled}
              />
            </div>

            {particlesEnabled && (
              <div className="space-y-2 ml-4 pl-4 border-l-2 border-white/10">
                <Label className="text-sm">Particle Intensity: {((particleIntensity ?? 1) * 100).toFixed(0)}%</Label>
                <Slider
                  value={[particleIntensity ?? 1]}
                  onValueChange={(v) => setParticleIntensity(v[0])}
                  min={0.1}
                  max={2}
                  step={0.1}
                  className="w-full"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Glass Effect Intensity: {((glassIntensity ?? 1) * 100).toFixed(0)}%</Label>
            <p className="text-xs text-foreground/60 mb-2">Adjust blur and transparency of glassmorphic elements</p>
            <Slider
              value={[glassIntensity ?? 1]}
              onValueChange={(v) => setGlassIntensity(v[0])}
              min={0.3}
              max={1.5}
              step={0.1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Animation Speed: {((animationSpeed ?? 1) * 100).toFixed(0)}%</Label>
            <p className="text-xs text-foreground/60 mb-2">Control the speed of UI animations and transitions</p>
            <Slider
              value={[animationSpeed ?? 1]}
              onValueChange={(v) => setAnimationSpeed(v[0])}
              min={0.5}
              max={2}
              step={0.1}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      <Card className="glass p-4 border-white/10">
        <div className="flex items-start gap-3">
          <Fire size={20} weight="duotone" className="text-amber mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold mb-1">Pro Tip</p>
            <p className="text-xs text-foreground/70">
              Your preferences are saved automatically and will persist across sessions. Experiment with different combinations to find your perfect setup!
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
