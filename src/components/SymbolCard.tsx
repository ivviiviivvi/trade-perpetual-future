import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Symbol } from '@/lib/types'
import { TrendUp, TrendDown, Minus } from '@phosphor-icons/react'
import { getSentimentColor, getSentimentBgColor } from '@/lib/sentiment'

interface SymbolCardProps {
  symbol: Symbol
  onClick: () => void
  isSelected: boolean
}

export function SymbolCard({ symbol, onClick, isSelected }: SymbolCardProps) {
  const trendIcon = symbol.sentiment.trend === 'up' 
    ? <TrendUp weight="bold" /> 
    : symbol.sentiment.trend === 'down'
    ? <TrendDown weight="bold" />
    : <Minus weight="bold" />

  return (
    <Card
      className={`p-6 cursor-pointer transition-all hover:scale-[1.02] ${
        isSelected ? 'ring-2 ring-accent animate-glow-pulse' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-mono font-bold text-xl">{symbol.ticker}</h3>
          <p className="text-sm text-muted-foreground">{symbol.name}</p>
        </div>
        <Badge className={getSentimentBgColor(symbol.sentiment.score)}>
          <span className={getSentimentColor(symbol.sentiment.score)}>
            {symbol.sentiment.label}
          </span>
        </Badge>
      </div>

      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="font-mono font-bold text-2xl">
            ${symbol.currentPrice.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Sentiment Score</span>
          <div className="flex items-center gap-2">
            <span className={`font-mono font-semibold ${getSentimentColor(symbol.sentiment.score)}`}>
              {symbol.sentiment.score > 0 ? '+' : ''}{symbol.sentiment.score}
            </span>
            <span className={getSentimentColor(symbol.sentiment.score)}>
              {trendIcon}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Confidence</span>
          <span className="font-mono text-sm">{symbol.sentiment.confidence}%</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Volume</span>
          <span className="font-mono text-sm">{symbol.sentiment.volume}</span>
        </div>
      </div>
    </Card>
  )
}
