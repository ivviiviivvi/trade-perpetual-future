import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { Reality } from '@/lib/types'
import { Sparkle } from '@phosphor-icons/react'

interface RealityCardProps {
  reality: Reality
  index: number
}

export function RealityCard({ reality, index }: RealityCardProps) {
  const sentimentEmoji = {
    bullish: '📈',
    bearish: '📉',
    neutral: '➡️',
    volatile: '⚡'
  }

  return (
    <Card 
      className="p-6 animate-fade-in-stagger"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl">{sentimentEmoji[reality.sentiment]}</span>
            <h3 className="font-semibold text-lg">{reality.label}</h3>
          </div>
          <p className="text-sm text-muted-foreground">{reality.description}</p>
        </div>
        <Badge 
          variant="secondary"
          className="ml-2 font-mono font-bold text-lg"
        >
          {reality.probability}%
        </Badge>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Probability</span>
          <span className="font-mono">{reality.probability}%</span>
        </div>
        <Progress value={reality.probability} className="h-2" />
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={reality.pricePoints}>
            <XAxis 
              dataKey="time" 
              stroke="oklch(0.65 0.04 240)"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="oklch(0.65 0.04 240)"
              style={{ fontSize: '12px' }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'oklch(0.25 0.06 250)',
                border: '1px solid oklch(0.35 0.08 245)',
                borderRadius: '0.5rem',
                color: 'oklch(0.95 0 0)'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke={reality.color}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
        <Sparkle size={14} className="text-ai-purple" />
        <span>AI-Generated Projection</span>
      </div>
    </Card>
  )
}
