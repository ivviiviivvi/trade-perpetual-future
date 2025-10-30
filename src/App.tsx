import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster, toast } from 'sonner'
import { MarketCard } from '@/components/MarketCard'
import { TradingPanel } from '@/components/TradingPanel'
import { PositionCard } from '@/components/PositionCard'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Wallet, ChartLine } from '@phosphor-icons/react'
import { usePriceSimulation } from '@/hooks/use-price-simulation'
import type { Market, Position, ClosedPosition } from '@/lib/types'

const INITIAL_MARKETS: Market[] = [
  {
    id: 'btc',
    symbol: 'BTC-PERP',
    name: 'Bitcoin Perpetual',
    basePrice: 67500,
    currentPrice: 67500,
    change24h: 0,
    volume24h: '$2.4B',
    icon: '₿',
  },
  {
    id: 'eth',
    symbol: 'ETH-PERP',
    name: 'Ethereum Perpetual',
    basePrice: 3200,
    currentPrice: 3200,
    change24h: 0,
    volume24h: '$1.8B',
    icon: 'Ξ',
  },
  {
    id: 'sol',
    symbol: 'SOL-PERP',
    name: 'Solana Perpetual',
    basePrice: 145,
    currentPrice: 145,
    change24h: 0,
    volume24h: '$890M',
    icon: '◎',
  },
]

const INITIAL_BALANCE = 10000

function App() {
  const [balance, setBalance] = useKV<number>('balance', INITIAL_BALANCE)
  const [positions, setPositions] = useKV<Position[]>('positions', [])
  const [closedPositions, setClosedPositions] = useKV<ClosedPosition[]>('closedPositions', [])
  const [selectedMarketId, setSelectedMarketId] = useState('btc')

  const markets = usePriceSimulation(INITIAL_MARKETS)
  const selectedMarket = markets.find((m) => m.id === selectedMarketId) || markets[0]

  const currentBalance = balance ?? INITIAL_BALANCE
  const currentPositions = positions ?? []
  const currentClosedPositions = closedPositions ?? []

  useEffect(() => {
    setPositions((currentPositions) => {
      const posList = currentPositions ?? []
      return posList.map((pos) => {
        const market = markets.find((m) => m.id === pos.marketId)
        if (!market) return pos

        const currentPrice = market.currentPrice
        const priceDiff = currentPrice - pos.entryPrice
        const pnlMultiplier = pos.side === 'long' ? 1 : -1
        const unrealizedPnl = (priceDiff / pos.entryPrice) * pos.size * pos.leverage * pnlMultiplier
        const unrealizedPnlPercent = (unrealizedPnl / pos.size) * 100

        return {
          ...pos,
          currentPrice,
          unrealizedPnl,
          unrealizedPnlPercent,
        }
      })
    })
  }, [markets, setPositions])

  const handleTrade = (side: 'long' | 'short', size: number, leverage: number) => {
    if (size > currentBalance) {
      toast.error('Insufficient balance')
      return
    }

    const maintenanceMargin = 0.05
    const liquidationPrice =
      side === 'long'
        ? selectedMarket.currentPrice * (1 - 1 / leverage + maintenanceMargin)
        : selectedMarket.currentPrice * (1 + 1 / leverage - maintenanceMargin)

    const newPosition: Position = {
      id: Date.now().toString(),
      marketId: selectedMarket.id,
      marketSymbol: selectedMarket.symbol,
      side,
      size,
      leverage,
      entryPrice: selectedMarket.currentPrice,
      currentPrice: selectedMarket.currentPrice,
      liquidationPrice,
      unrealizedPnl: 0,
      unrealizedPnlPercent: 0,
      timestamp: Date.now(),
    }

    setPositions((current) => [...(current ?? []), newPosition])
    setBalance((current) => (current ?? INITIAL_BALANCE) - size)

    toast.success(`${side.toUpperCase()} position opened`, {
      description: `${size.toFixed(2)} USD at ${leverage}x leverage`,
    })
  }

  const handleClosePosition = (id: string) => {
    setPositions((currentPositions) => {
      const posList = currentPositions ?? []
      const position = posList.find((p) => p.id === id)
      if (!position) return posList

      const closedPosition: ClosedPosition = {
        ...position,
        exitPrice: position.currentPrice,
        realizedPnl: position.unrealizedPnl,
        realizedPnlPercent: position.unrealizedPnlPercent,
        closedAt: Date.now(),
      }

      setClosedPositions((current) => [closedPosition, ...(current ?? [])])
      setBalance((current) => (current ?? INITIAL_BALANCE) + position.size + position.unrealizedPnl)

      toast.success('Position closed', {
        description: `P&L: ${position.unrealizedPnl >= 0 ? '+' : ''}$${position.unrealizedPnl.toFixed(2)}`,
      })

      return posList.filter((p) => p.id !== id)
    })
  }

  const totalUnrealizedPnl = currentPositions.reduce((sum, pos) => sum + pos.unrealizedPnl, 0)
  const totalValue = currentBalance + currentPositions.reduce((sum, pos) => sum + pos.size, 0) + totalUnrealizedPnl

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" />

      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">💥</div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Bang Perp Exchange</h1>
                <p className="text-xs text-muted-foreground">Demo Trading Simulator</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Card className="p-3 bg-card/80">
                <div className="flex items-center gap-3">
                  <Wallet size={20} className="text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Available Balance</div>
                    <div className="font-mono font-semibold">${currentBalance.toFixed(2)}</div>
                  </div>
                </div>
              </Card>

              <Card className="p-3 bg-card/80">
                <div className="flex items-center gap-3">
                  <ChartLine size={20} className="text-primary" />
                  <div>
                    <div className="text-xs text-muted-foreground">Portfolio Value</div>
                    <div className="font-mono font-semibold">${totalValue.toFixed(2)}</div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          {markets.map((market) => (
            <MarketCard
              key={market.id}
              market={market}
              isSelected={market.id === selectedMarketId}
              onClick={() => setSelectedMarketId(market.id)}
            />
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <TradingPanel market={selectedMarket} balance={currentBalance} onTrade={handleTrade} />

          <Card className="p-6">
            <Tabs defaultValue="open" className="w-full">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="open" className="flex-1">
                  Open Positions ({currentPositions.length})
                </TabsTrigger>
                <TabsTrigger value="closed" className="flex-1">
                  History ({currentClosedPositions.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="open">
                {currentPositions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3">📊</div>
                    <p className="text-muted-foreground">No open positions</p>
                    <p className="text-sm text-muted-foreground mt-1">Open your first trade to get started</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-3">
                      {currentPositions.map((position) => (
                        <PositionCard key={position.id} position={position} onClose={handleClosePosition} />
                      ))}
                    </div>
                  </ScrollArea>
                )}

                {currentPositions.length > 0 && (
                  <>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Total Unrealized P&L</span>
                      <span
                        className={`font-mono font-semibold text-lg ${
                          totalUnrealizedPnl >= 0 ? 'text-long' : 'text-short'
                        }`}
                      >
                        {totalUnrealizedPnl >= 0 ? '+' : ''}${totalUnrealizedPnl.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </TabsContent>

              <TabsContent value="closed">
                {currentClosedPositions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3">📜</div>
                    <p className="text-muted-foreground">No trading history</p>
                    <p className="text-sm text-muted-foreground mt-1">Your closed positions will appear here</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-3">
                      {currentClosedPositions.map((position) => (
                        <Card key={position.id} className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="font-semibold">{position.marketSymbol}</span>
                              <span className={`text-xs ${position.side === 'long' ? 'text-long' : 'text-short'}`}>
                                {position.side.toUpperCase()}
                              </span>
                            </div>
                            <div className={`font-mono ${position.realizedPnl >= 0 ? 'text-long' : 'text-short'}`}>
                              {position.realizedPnl >= 0 ? '+' : ''}${position.realizedPnl.toFixed(2)}
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Entry: </span>
                              <span className="font-mono">${position.entryPrice.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Exit: </span>
                              <span className="font-mono">${position.exitPrice.toFixed(2)}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Size: </span>
                              <span className="font-mono">${position.size.toFixed(2)}</span>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            ⚠️ This is a DEMO trading simulator for educational purposes only
          </p>
          <p className="text-xs text-muted-foreground">
            No real money involved • All trades are simulated • For demonstration purposes only
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App