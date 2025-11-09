import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { Toaster, toast } from 'sonner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SymbolCard } from '@/components/SymbolCard'
import { RealityCard } from '@/components/RealityCard'
import { AlertBanner } from '@/components/AlertBanner'
import { HashtagPanel } from '@/components/HashtagPanel'
import { AddSymbolDialog } from '@/components/AddSymbolDialog'
import { ChartLine, Hash, Bell, Eye, ArrowsClockwise, Sparkle } from '@phosphor-icons/react'
import type { Symbol, Reality, HashtagTrend, Alert } from '@/lib/types'
import { analyzeSentiment, generateRealities, analyzeHashtags, checkForAlerts } from '@/lib/sentiment'

const DEFAULT_SYMBOLS = ['BTC', 'ETH', 'AAPL']

function App() {
  const [watchlist, setWatchlist] = useKV<string[]>('watchlist', DEFAULT_SYMBOLS)
  const [symbols, setSymbols] = useState<Symbol[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState<Symbol | null>(null)
  const [realities, setRealities] = useState<Reality[]>([])
  const [hashtags, setHashtags] = useState<HashtagTrend[]>([])
  const [alerts, setAlerts] = useKV<Alert[]>('alerts', [])
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const currentWatchlist = watchlist ?? DEFAULT_SYMBOLS
  const currentAlerts = (alerts ?? []).filter(a => !a.dismissed)

  const getSymbolPrice = (ticker: string): number => {
    const prices: Record<string, number> = {
      BTC: 67500,
      ETH: 3200,
      SOL: 145,
      AAPL: 185,
      TSLA: 245,
      NVDA: 875,
      MSFT: 420,
      GOOGL: 140
    }
    return prices[ticker] || 100 + Math.random() * 400
  }

  const getSymbolName = (ticker: string): string => {
    const names: Record<string, string> = {
      BTC: 'Bitcoin',
      ETH: 'Ethereum',
      SOL: 'Solana',
      AAPL: 'Apple Inc.',
      TSLA: 'Tesla Inc.',
      NVDA: 'NVIDIA Corporation',
      MSFT: 'Microsoft Corporation',
      GOOGL: 'Alphabet Inc.'
    }
    return names[ticker] || `${ticker} Asset`
  }

  useEffect(() => {
    loadSymbols()
  }, [currentWatchlist])

  const loadSymbols = async () => {
    setIsLoading(true)
    try {
      const symbolsData: Symbol[] = []
      
      for (const ticker of currentWatchlist) {
        const sentiment = await analyzeSentiment(ticker)
        const alert = checkForAlerts(ticker, sentiment)
        
        if (alert) {
          setAlerts(current => [alert, ...(current ?? [])])
          toast.error(alert.message)
        }

        symbolsData.push({
          ticker,
          name: getSymbolName(ticker),
          currentPrice: getSymbolPrice(ticker),
          sentiment
        })
      }

      setSymbols(symbolsData)
      if (symbolsData.length > 0 && !selectedSymbol) {
        setSelectedSymbol(symbolsData[0])
      }
    } catch (error) {
      toast.error('Failed to load sentiment data')
    } finally {
      setIsLoading(false)
    }
  }

  const analyzeSymbol = async (symbol: Symbol) => {
    setIsAnalyzing(true)
    try {
      const [realitiesData, hashtagsData] = await Promise.all([
        generateRealities(symbol.ticker, symbol.currentPrice, symbol.sentiment),
        analyzeHashtags(symbol.ticker)
      ])

      setRealities(realitiesData)
      setHashtags(hashtagsData)
    } catch (error) {
      toast.error('Analysis failed')
    } finally {
      setIsAnalyzing(false)
    }
  }

  useEffect(() => {
    if (selectedSymbol) {
      analyzeSymbol(selectedSymbol)
    }
  }, [selectedSymbol])

  const handleAddSymbol = async (ticker: string) => {
    if (currentWatchlist.includes(ticker)) {
      toast.error(`${ticker} is already in your watchlist`)
      return
    }

    setWatchlist(current => [...(current ?? []), ticker])
  }

  const handleRemoveSymbol = (ticker: string) => {
    setWatchlist(current => (current ?? []).filter(t => t !== ticker))
    if (selectedSymbol?.ticker === ticker) {
      const remaining = symbols.filter(s => s.ticker !== ticker)
      setSelectedSymbol(remaining[0] || null)
    }
    toast.success(`Removed ${ticker} from watchlist`)
  }

  const handleDismissAlert = (id: string) => {
    setAlerts(current => 
      (current ?? []).map(a => a.id === id ? { ...a, dismissed: true } : a)
    )
  }

  const handleRefresh = () => {
    loadSymbols()
    if (selectedSymbol) {
      const updated = symbols.find(s => s.ticker === selectedSymbol.ticker)
      if (updated) {
        analyzeSymbol(updated)
      }
    }
    toast.success('Data refreshed')
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" />

      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkle size={32} weight="fill" className="text-ai-purple" />
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Reality Projector</h1>
                <p className="text-sm text-muted-foreground">Multi-Timeline Market Sentiment Analysis</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isLoading}
                className="gap-2"
              >
                <ArrowsClockwise size={16} className={isLoading ? 'animate-spin' : ''} />
                Refresh
              </Button>
              <AddSymbolDialog onAdd={handleAddSymbol} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {currentAlerts.length > 0 && (
          <div className="mb-6 space-y-2">
            {currentAlerts.slice(0, 3).map(alert => (
              <AlertBanner
                key={alert.id}
                alert={alert}
                onDismiss={() => handleDismissAlert(alert.id)}
              />
            ))}
          </div>
        )}

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard" className="gap-2">
              <Eye size={18} weight="duotone" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="realities" className="gap-2" disabled={!selectedSymbol}>
              <ChartLine size={18} weight="duotone" />
              Realities
            </TabsTrigger>
            <TabsTrigger value="hashtags" className="gap-2" disabled={!selectedSymbol}>
              <Hash size={18} weight="duotone" />
              Hashtags
            </TabsTrigger>
            <TabsTrigger value="alerts" className="gap-2">
              <Bell size={18} weight="duotone" />
              Alerts ({currentAlerts.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Your Watchlist</h2>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin mb-4">
                    <ArrowsClockwise size={32} />
                  </div>
                  <p className="text-muted-foreground">Loading sentiment data...</p>
                </div>
              ) : symbols.length === 0 ? (
                <div className="text-center py-12">
                  <Eye size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mb-4">No symbols in watchlist</p>
                  <AddSymbolDialog onAdd={handleAddSymbol} />
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {symbols.map((symbol) => (
                    <div key={symbol.ticker} className="relative">
                      <SymbolCard
                        symbol={symbol}
                        onClick={() => setSelectedSymbol(symbol)}
                        isSelected={selectedSymbol?.ticker === symbol.ticker}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemoveSymbol(symbol.ticker)
                        }}
                        className="absolute top-2 right-2 h-8 w-8 p-0 hover:bg-destructive/20 hover:text-destructive"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {selectedSymbol && (
              <>
                <Separator />
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Quick Analysis: {selectedSymbol.ticker}
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Current Sentiment</h3>
                      <div className="p-6 rounded-lg bg-card border border-border">
                        <div className="text-6xl font-mono font-bold text-center mb-4">
                          <span className={
                            selectedSymbol.sentiment.score > 20 
                              ? 'text-success' 
                              : selectedSymbol.sentiment.score < -20 
                              ? 'text-destructive' 
                              : 'text-muted-foreground'
                          }>
                            {selectedSymbol.sentiment.score > 0 ? '+' : ''}{selectedSymbol.sentiment.score}
                          </span>
                        </div>
                        <p className="text-center text-lg font-semibold">
                          {selectedSymbol.sentiment.label}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Key Metrics</h3>
                      <div className="space-y-3">
                        <div className="p-4 rounded-lg bg-card border border-border">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Price</span>
                            <span className="font-mono font-bold text-xl">
                              ${selectedSymbol.currentPrice.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-card border border-border">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Confidence</span>
                            <span className="font-mono font-bold text-xl">
                              {selectedSymbol.sentiment.confidence}%
                            </span>
                          </div>
                        </div>
                        <div className="p-4 rounded-lg bg-card border border-border">
                          <div className="flex justify-between items-center">
                            <span className="text-muted-foreground">Discussion Volume</span>
                            <span className="font-mono font-bold text-xl">
                              {selectedSymbol.sentiment.volume}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="realities">
            {isAnalyzing ? (
              <div className="text-center py-12">
                <Sparkle size={48} className="mx-auto mb-4 text-ai-purple animate-pulse" />
                <p className="text-lg text-muted-foreground">Projecting realities...</p>
              </div>
            ) : realities.length > 0 ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Parallel Realities: {selectedSymbol?.ticker}
                  </h2>
                  <p className="text-muted-foreground">
                    AI-generated projections showing possible market outcomes over the next 7 days
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {realities.map((reality, index) => (
                    <RealityCard key={reality.id} reality={reality} index={index} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <ChartLine size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Select a symbol to view reality projections</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="hashtags">
            {isAnalyzing ? (
              <div className="text-center py-12">
                <Hash size={48} className="mx-auto mb-4 text-accent animate-pulse" />
                <p className="text-lg text-muted-foreground">Analyzing hashtags...</p>
              </div>
            ) : hashtags.length > 0 ? (
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-2">
                    Trending for {selectedSymbol?.ticker}
                  </h2>
                  <p className="text-muted-foreground">
                    Real-time sentiment analysis of popular hashtags and discussions
                  </p>
                </div>
                <HashtagPanel hashtags={hashtags} />
              </div>
            ) : (
              <div className="text-center py-12">
                <Hash size={48} className="mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">Select a symbol to view hashtag trends</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="alerts">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Alert History</h2>
                <p className="text-muted-foreground">
                  Track all downtrend alerts and sentiment warnings
                </p>
              </div>
              {(alerts ?? []).length === 0 ? (
                <div className="text-center py-12">
                  <Bell size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg text-muted-foreground mb-2">No alerts yet</p>
                  <p className="text-sm text-muted-foreground">
                    You'll be notified when sentiment drops or downtrends are detected
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {(alerts ?? []).map(alert => (
                    <AlertBanner
                      key={alert.id}
                      alert={alert}
                      onDismiss={() => handleDismissAlert(alert.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            ⚠️ AI-generated projections are for informational purposes only and should not be considered financial advice
          </p>
          <p className="text-xs text-muted-foreground">
            Powered by advanced sentiment analysis • Multi-reality projection engine • Real-time alerts
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
