import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  DiceThree, 
  CoinVertical, 
  ChartLineUp, 
  Trophy, 
  Lightning, 
  Fire, 
  Coins,
  Users,
  Clock,
  Sparkle
} from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { Game } from '@/lib/types'
import { calculateGamePayout, GAME_FEE_PERCENT } from '@/lib/game-logic'

interface EnhancedGamesTabProps {
  balance: number
  onCreateGame: (type: Game['type'], wager: number) => void
  onJoinGame: (gameId: string) => void
  activeGames: Game[]
  username: string
}

export function EnhancedGamesTab({ balance, onCreateGame, onJoinGame, activeGames, username }: EnhancedGamesTabProps) {
  const [selectedGame, setSelectedGame] = useState<Game['type']>('dice')
  const [wager, setWager] = useState('')
  const [animatingGame, setAnimatingGame] = useState<string | null>(null)
  const [diceRotation, setDiceRotation] = useState({ x: 0, y: 0 })
  const [coinRotation, setCoinRotation] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string }>>([])

  const wagerNum = parseFloat(wager) || 0
  const potentialWin = calculateGamePayout(wagerNum)
  const canCreate = wagerNum >= 1 && wagerNum <= balance

  const waitingGames = activeGames.filter(g => g.status === 'waiting' && g.creatorId !== username)
  const myGames = activeGames.filter(g => g.status === 'waiting' && g.creatorId === username)
  const recentGames = activeGames.filter(g => g.status === 'completed').slice(0, 5)

  useEffect(() => {
    const interval = setInterval(() => {
      setDiceRotation({
        x: Math.random() * 360,
        y: Math.random() * 360,
      })
      setCoinRotation(prev => prev + 180)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const createParticles = (x: number, y: number, color: string) => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 100,
      y: y + (Math.random() - 0.5) * 100,
      color,
    }))
    setParticles(prev => [...prev, ...newParticles])
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)))
    }, 1000)
  }

  const handleCreate = () => {
    if (canCreate) {
      onCreateGame(selectedGame, wagerNum)
      setWager('')
      setAnimatingGame(selectedGame)
      createParticles(200, 200, '#70a8ff')
      
      setTimeout(() => {
        setAnimatingGame(null)
      }, 1500)

      toast.success(`${selectedGame.charAt(0).toUpperCase() + selectedGame.slice(1)} game created!`)
    }
  }

  const handleJoin = (gameId: string) => {
    setAnimatingGame(gameId)
    createParticles(400, 300, '#ffd470')
    
    setTimeout(() => {
      onJoinGame(gameId)
      setAnimatingGame(null)
    }, 1000)
  }

  const gameTypes = [
    {
      id: 'dice' as const,
      name: 'Dice Roll',
      icon: DiceThree,
      color: 'from-amber-500 to-orange-600',
      description: 'Roll dice - highest wins',
      emoji: '🎲',
    },
    {
      id: 'coinflip' as const,
      name: 'Coin Flip',
      icon: CoinVertical,
      color: 'from-cyan-500 to-blue-600',
      description: '50/50 chance - simple & fast',
      emoji: '🪙',
    },
    {
      id: 'price-prediction' as const,
      name: 'Price Predict',
      icon: ChartLineUp,
      color: 'from-purple-500 to-pink-600',
      description: 'Predict market movement',
      emoji: '📈',
    },
  ]

  const selectedGameType = gameTypes.find(g => g.id === selectedGame)!

  return (
    <div className="space-y-6 relative">
      <AnimatePresence>
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 1, scale: 1, x: 200, y: 200 }}
            animate={{ 
              opacity: 0, 
              scale: 0,
              x: particle.x,
              y: particle.y,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{ backgroundColor: particle.color, boxShadow: `0 0 10px ${particle.color}` }}
          />
        ))}
      </AnimatePresence>

      <div className="glass-ultra rounded-3xl p-8 border border-white/20 animate-gradient-shift gradient-animated">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2 text-gradient-animated">PvP Gaming Arena</h2>
            <p className="text-foreground/70">Challenge players in provably fair games</p>
          </div>
          <div className="glass rounded-2xl px-6 py-3 border border-white/20">
            <div className="flex items-center gap-2 mb-1">
              <Coins size={20} weight="duotone" className="text-amber" />
              <span className="text-sm text-foreground/70">Balance</span>
            </div>
            <span className="text-2xl font-mono font-bold">${balance.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {gameTypes.map((game) => {
            const Icon = game.icon
            const isSelected = selectedGame === game.id
            return (
              <motion.button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`glass-hover rounded-2xl p-6 border-2 transition-all relative overflow-hidden ${
                  isSelected 
                    ? 'border-accent shadow-2xl shadow-accent/40 scale-105' 
                    : 'border-white/10'
                }`}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-10`} />
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3">
                    <div className={`bg-gradient-to-br ${game.color} p-3 rounded-xl shadow-lg`}>
                      <Icon size={28} weight="duotone" className="text-white" />
                    </div>
                    <span className="text-4xl animate-bounce-subtle">{game.emoji}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-1">{game.name}</h3>
                  <p className="text-xs text-foreground/60">{game.description}</p>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-3 flex items-center gap-1 text-accent text-sm font-semibold"
                    >
                      <Sparkle size={16} weight="fill" />
                      Selected
                    </motion.div>
                  )}
                </div>
              </motion.button>
            )
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            key={selectedGame}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <Card className="glass-strong p-8 border-white/10">
              <div className="space-y-6">
                <div>
                  <Label className="text-base font-semibold mb-2 flex items-center gap-2">
                    <Coins size={18} weight="duotone" className="text-amber" />
                    Wager Amount
                  </Label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-foreground/60">$</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={wager}
                      onChange={(e) => setWager(e.target.value)}
                      className="pl-8 text-xl font-mono h-14 glass border-white/20"
                      min="1"
                      max={balance}
                    />
                  </div>
                  <div className="flex gap-2 mt-3">
                    {[10, 25, 50, 100].map(amount => (
                      <Button
                        key={amount}
                        onClick={() => setWager(amount.toString())}
                        variant="outline"
                        size="sm"
                        className="glass-interactive border-white/20 flex-1"
                        disabled={amount > balance}
                      >
                        ${amount}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="glass rounded-xl p-4 border border-white/10 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/70">Fee ({GAME_FEE_PERCENT}%)</span>
                    <span className="font-mono">${(wagerNum * GAME_FEE_PERCENT / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-long">Potential Win</span>
                    <span className="font-mono text-long">${potentialWin.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleCreate}
                  disabled={!canCreate || animatingGame === selectedGame}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-accent to-ai-purple hover:opacity-90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                >
                  {animatingGame === selectedGame ? (
                    <span className="flex items-center gap-2">
                      <Lightning size={20} className="animate-spin" />
                      Creating...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Fire size={20} weight="fill" />
                      Create {selectedGameType.name} Game
                    </span>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          <div className="space-y-4">
            <Card className="glass-strong p-6 border-white/10">
              <div className="flex items-center gap-2 mb-4">
                <Users size={24} weight="duotone" className="text-cyan" />
                <h3 className="font-bold text-xl">Open Lobbies</h3>
                <Badge variant="secondary" className="ml-auto">
                  {waitingGames.length}
                </Badge>
              </div>

              {waitingGames.length === 0 ? (
                <div className="text-center py-12">
                  <Clock size={48} className="mx-auto mb-3 text-foreground/40 animate-spin-slow" />
                  <p className="text-foreground/60">No open games</p>
                  <p className="text-sm text-foreground/40 mt-1">Be the first to create one!</p>
                </div>
              ) : (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-3">
                    {waitingGames.map((game) => {
                      const gameType = gameTypes.find(g => g.id === game.type)!
                      const GameIcon = gameType.icon
                      return (
                        <motion.div
                          key={game.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="glass-interactive rounded-xl p-4 border border-white/10"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`bg-gradient-to-br ${gameType.color} p-2 rounded-lg`}>
                                <GameIcon size={20} weight="duotone" className="text-white" />
                              </div>
                              <div>
                                <div className="font-semibold">{gameType.name}</div>
                                <div className="text-sm text-foreground/60">by {game.creatorId}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-mono font-bold text-lg">${game.wager.toFixed(2)}</div>
                              <Button
                                onClick={() => handleJoin(game.id)}
                                size="sm"
                                disabled={animatingGame === game.id || game.wager > balance}
                                className="mt-1 bg-long hover:bg-long/90"
                              >
                                {animatingGame === game.id ? 'Joining...' : 'Join'}
                              </Button>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </ScrollArea>
              )}
            </Card>

            {myGames.length > 0 && (
              <Card className="glass p-4 border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Clock size={20} weight="duotone" className="text-amber" />
                  <h4 className="font-semibold">Your Waiting Games</h4>
                </div>
                <div className="space-y-2">
                  {myGames.map(game => {
                    const gameType = gameTypes.find(g => g.id === game.type)!
                    return (
                      <div key={game.id} className="flex justify-between items-center text-sm">
                        <span className="text-foreground/70">{gameType.name}</span>
                        <span className="font-mono font-semibold">${game.wager.toFixed(2)}</span>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}

            {recentGames.length > 0 && (
              <Card className="glass p-4 border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Trophy size={20} weight="duotone" className="text-amber" />
                  <h4 className="font-semibold">Recent Results</h4>
                </div>
                <div className="space-y-2">
                  {recentGames.map(game => {
                    const winnerId = game.result?.winnerId
                    const isWinner = winnerId === username
                    const gameType = gameTypes.find(g => g.id === game.type)!
                    return (
                      <div 
                        key={game.id} 
                        className={`flex justify-between items-center text-sm p-2 rounded-lg ${
                          isWinner ? 'bg-long/10' : 'bg-short/10'
                        }`}
                      >
                        <span className="text-foreground/70">{gameType.emoji} {gameType.name}</span>
                        <span className={`font-mono font-semibold ${isWinner ? 'text-long' : 'text-short'}`}>
                          {isWinner ? '+' : '-'}${game.wager.toFixed(2)}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
