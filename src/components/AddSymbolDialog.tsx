import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus } from '@phosphor-icons/react'
import { toast } from 'sonner'

interface AddSymbolDialogProps {
  onAdd: (ticker: string) => void
}

const POPULAR_SYMBOLS = [
  { ticker: 'BTC', name: 'Bitcoin' },
  { ticker: 'ETH', name: 'Ethereum' },
  { ticker: 'AAPL', name: 'Apple' },
  { ticker: 'TSLA', name: 'Tesla' },
  { ticker: 'NVDA', name: 'NVIDIA' },
  { ticker: 'MSFT', name: 'Microsoft' }
]

export function AddSymbolDialog({ onAdd }: AddSymbolDialogProps) {
  const [open, setOpen] = useState(false)
  const [ticker, setTicker] = useState('')

  const handleAdd = () => {
    if (!ticker.trim()) {
      toast.error('Please enter a symbol')
      return
    }

    const normalizedTicker = ticker.trim().toUpperCase()
    onAdd(normalizedTicker)
    setTicker('')
    setOpen(false)
    toast.success(`Added ${normalizedTicker} to watchlist`)
  }

  const handleQuickAdd = (symbol: string) => {
    onAdd(symbol)
    setOpen(false)
    toast.success(`Added ${symbol} to watchlist`)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus size={18} weight="bold" />
          Add Symbol
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Symbol to Watchlist</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="ticker">Symbol</Label>
            <Input
              id="ticker"
              placeholder="Enter ticker (e.g., AAPL, BTC)"
              value={ticker}
              onChange={(e) => setTicker(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
              className="font-mono"
            />
          </div>

          <Button onClick={handleAdd} className="w-full">
            Add to Watchlist
          </Button>

          <div className="pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">Popular Symbols</p>
            <div className="grid grid-cols-2 gap-2">
              {POPULAR_SYMBOLS.map((symbol) => (
                <Button
                  key={symbol.ticker}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickAdd(symbol.ticker)}
                  className="justify-start"
                >
                  <span className="font-mono font-bold">{symbol.ticker}</span>
                  <span className="text-muted-foreground ml-2 text-xs">{symbol.name}</span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
