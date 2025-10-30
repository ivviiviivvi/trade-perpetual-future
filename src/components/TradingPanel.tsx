import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { TrendUp, TrendDown, Lightning } from '@phosphor-icons/react'
import type { Market } from '@/lib/types'
import { cn } from '@/lib/utils'

interface TradingPanelProps {
  market: Market
  balance: number
  onTrade: (side: 'long' | 'short', size: number, leverage: number) => void
}

export function TradingPanel({ market, balance, onTrade }: TradingPanelProps) {
  const [size, setSize] = useState('')
  const [leverage, setLeverage] = useState([10])
  const [selectedSide, setSelectedSide] = useState<'long' | 'short'>('long')

  const sizeNum = parseFloat(size) || 0
  const leverageNum = leverage[0]
  const positionValue = sizeNum * leverageNum
  const canTrade = sizeNum >= 0.01 && sizeNum <= balance

  const handleTrade = () => {
    if (canTrade) {
      onTrade(selectedSide, sizeNum, leverageNum)
      setSize('')
      setLeverage([10])
    }
  }

  const calculateLiquidationPrice = () => {
    if (sizeNum === 0) return 0
    const maintenanceMargin = 0.05
    if (selectedSide === 'long') {
      return market.currentPrice * (1 - 1 / leverageNum + maintenanceMargin)
    } else {
      return market.currentPrice * (1 + 1 / leverageNum - maintenanceMargin)
    }
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Trade {market.symbol}</h2>
          <p className="text-sm text-muted-foreground">
            ${market.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <Badge variant="secondary" className="text-xs">
          DEMO MODE
        </Badge>
      </div>

      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedSide === 'long' ? 'default' : 'outline'}
          className={cn(
            'flex-1 gap-2 transition-all',
            selectedSide === 'long' && 'bg-long text-long-foreground hover:bg-long/90'
          )}
          onClick={() => setSelectedSide('long')}
        >
          <TrendUp weight="bold" size={20} />
          LONG
        </Button>
        <Button
          variant={selectedSide === 'short' ? 'default' : 'outline'}
          className={cn(
            'flex-1 gap-2 transition-all',
            selectedSide === 'short' && 'bg-short text-short-foreground hover:bg-short/90'
          )}
          onClick={() => setSelectedSide('short')}
        >
          <TrendDown weight="bold" size={20} />
          SHORT
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="position-size" className="text-sm mb-2 block">
            Position Size (USD)
          </Label>
          <Input
            id="position-size"
            type="number"
            placeholder="0.00"
            value={size}
            onChange={(e) => setSize(e.target.value)}
            step="0.01"
            min="0.01"
            className="font-mono"
          />
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Min: $0.01</span>
            <span>Available: ${balance.toFixed(2)}</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <Label className="text-sm">Leverage</Label>
            <Badge variant="secondary" className="gap-1 font-mono">
              <Lightning weight="fill" size={12} />
              {leverageNum}x
            </Badge>
          </div>
          <Slider
            value={leverage}
            onValueChange={setLeverage}
            min={1}
            max={20}
            step={1}
            className="mb-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1x</span>
            <span>20x</span>
          </div>
        </div>
      </div>

      <div className="bg-muted rounded-lg p-4 space-y-2 mb-6 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Position Value</span>
          <span className="font-mono">${positionValue.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Collateral</span>
          <span className="font-mono">${sizeNum.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Est. Liquidation</span>
          <span className="font-mono text-destructive">
            ${calculateLiquidationPrice().toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        className={cn(
          'w-full gap-2 text-base h-12',
          selectedSide === 'long' && 'bg-long text-long-foreground hover:bg-long/90',
          selectedSide === 'short' && 'bg-short text-short-foreground hover:bg-short/90'
        )}
        disabled={!canTrade}
        onClick={handleTrade}
      >
        {selectedSide === 'long' ? (
          <>
            <TrendUp weight="bold" size={20} />
            Open Long
          </>
        ) : (
          <>
            <TrendDown weight="bold" size={20} />
            Open Short
          </>
        )}
      </Button>

      {sizeNum > 0 && !canTrade && (
        <p className="text-xs text-destructive mt-2 text-center">
          Insufficient balance or invalid position size
        </p>
      )}
    </Card>
  )
}
