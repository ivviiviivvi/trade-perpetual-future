import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X, TrendUp, TrendDown, Lightning } from '@phosphor-icons/react'
import type { Position } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PositionCardProps {
  position: Position
  onClose: (id: string) => void
}

export function PositionCard({ position, onClose }: PositionCardProps) {
  const isLong = position.side === 'long'
  const isProfitable = position.unrealizedPnl >= 0

  return (
    <Card className="p-4 animate-slide-up">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Badge
            variant={isLong ? 'default' : 'destructive'}
            className={cn(
              'gap-1',
              isLong && 'bg-long text-long-foreground hover:bg-long'
            )}
          >
            {isLong ? <TrendUp weight="bold" size={12} /> : <TrendDown weight="bold" size={12} />}
            {isLong ? 'LONG' : 'SHORT'}
          </Badge>
          <span className="font-semibold">{position.marketSymbol}</span>
          <Badge variant="outline" className="gap-1 text-xs">
            <Lightning weight="fill" size={10} />
            {position.leverage}x
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() => onClose(position.id)}
        >
          <X size={16} />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm mb-3">
        <div>
          <div className="text-muted-foreground text-xs mb-1">Size</div>
          <div className="font-mono">${position.size.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs mb-1">Entry Price</div>
          <div className="font-mono">${position.entryPrice.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs mb-1">Current Price</div>
          <div className="font-mono">${position.currentPrice.toFixed(2)}</div>
        </div>
        <div>
          <div className="text-muted-foreground text-xs mb-1">Liq. Price</div>
          <div className="font-mono text-destructive text-xs">
            ${position.liquidationPrice.toFixed(2)}
          </div>
        </div>
      </div>

      <div
        className={cn(
          'rounded-lg p-3 flex items-center justify-between',
          isProfitable ? 'bg-long/10' : 'bg-short/10'
        )}
      >
        <div>
          <div className="text-xs text-muted-foreground mb-1">Unrealized P&L</div>
          <div className={cn('font-mono font-semibold text-lg', isProfitable ? 'text-long' : 'text-short')}>
            {isProfitable ? '+' : ''}${position.unrealizedPnl.toFixed(2)}
          </div>
        </div>
        <div className={cn('font-mono text-2xl font-bold', isProfitable ? 'text-long' : 'text-short')}>
          {isProfitable ? '+' : ''}{position.unrealizedPnlPercent.toFixed(2)}%
        </div>
      </div>
    </Card>
  )
}
