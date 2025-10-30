import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DiceThree, CoinVertical, ChartLineUp, Trophy, Sparkle, Lightning, Fire, Coins } from '@phosphor-icons/react'
import { toast } from 'sonner'
import type { Game } from '@/lib/types'
import { calculateGamePayout, GAME_FEE_PERCENT } from '@/lib/game-logic'

interface GamesTabProps {
  balance: number
  onCreateGame: (type: Game['type'], wager: number) => void
  onJoinGame: (gameId: string) => void
  activeGames: Game[]
  username: string
}

export function GamesTab({ balance, onCreateGame, onJoinGame, activeGames, username }: GamesTabProps) {
  const [selectedGame, setSelectedGame] = useState<Game['type']>('dice')
  const [wager, setWager] = useState('')
  const [rollingDice, setRollingDice] = useState(false)
  const [flippingCoin, setFlippingCoin] = useState(false)
  const [diceValues, setDiceValues] = useState([1, 1])
  const [coinFace, setCoinFace] = useState<'heads' | 'tails'>('heads')
  const [chartPrediction, setChartPrediction] = useState<'up' | 'down'>('up')
  const [floatingNumbers, setFloatingNumbers] = useState<Array<{ id: number; value: string; x: number; y: number }>>([])

  const wagerNum = parseFloat(wager) || 0
  const potentialWin = calculateGamePayout(wagerNum)
  const canCreate = wagerNum >= 1 && wagerNum <= balance

  const waitingGames = activeGames.filter(g => g.status === 'waiting')
  const completedGames = activeGames.filter(g => g.status === 'completed').slice(0, 10)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!rollingDice && !flippingCoin) {
        setDiceValues([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1])
        setCoinFace(Math.random() > 0.5 ? 'heads' : 'tails')
      }
    }, 2000)
    return () => clearInterval(interval)
  }, [rollingDice, flippingCoin])

  const handleCreate = () => {
    if (canCreate) {
      onCreateGame(selectedGame, wagerNum)
      setWager('')
      
      const newFloat = {
        id: Date.now(),
        value: `-$${wagerNum.toFixed(2)}`,
        x: Math.random() * 200,
        y: 0,
      }
      setFloatingNumbers(prev => [...prev, newFloat])
      setTimeout(() => {
        setFloatingNumbers(prev => prev.filter(f => f.id !== newFloat.id))
      }, 2000)

      if (selectedGame === 'dice') {
        setRollingDice(true)
        let rolls = 0
        const rollInterval = setInterval(() => {
          setDiceValues([Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1])
          rolls++
          if (rolls > 10) {
            clearInterval(rollInterval)
            setRollingDice(false)
          }
        }, 100)
      } else if (selectedGame === 'coinflip') {
        setFlippingCoin(true)
        let flips = 0
        const flipInterval = setInterval(() => {
          setCoinFace(Math.random() > 0.5 ? 'heads' : 'tails')
          flips++
          if (flips > 10) {
            clearInterval(flipInterval)
            setFlippingCoin(false)
          }
        }, 100)
      }

      toast.success('Game created! Waiting for opponent...')
    }
  }

  const handleJoin = (gameId: string) => {
    const game = activeGames.find(g => g.id === gameId)
    if (!game) return

    onJoinGame(gameId)

    const newFloat = {
      id: Date.now(),
      value: `-$${game.wager.toFixed(2)}`,
      x: Math.random() * 200,
      y: 0,
    }
    setFloatingNumbers(prev => [...prev, newFloat])
    setTimeout(() => {
      setFloatingNumbers(prev => prev.filter(f => f.id !== newFloat.id))
    }, 2000)
  }

  return (
    <div className="space-y-6 relative">
      <AnimatePresence>
        {floatingNumbers.map(num => (
          <motion.div
            key={num.id}
            initial={{ opacity: 1, y: num.y, x: num.x }}
            animate={{ opacity: 0, y: num.y - 100 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
            className="absolute top-0 left-1/2 font-mono font-bold text-2xl text-short pointer-events-none z-50"
          >
            {num.value}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          >
            <DiceThree size={36} weight="duotone" className="text-amber" />
          </motion.div>
          PvP Games Arena
        </h2>
        <p className="text-foreground/70 mt-2 flex items-center gap-2">
          <Fire size={16} weight="fill" className="text-long animate-pulse" />
          Challenge players in provably fair games
          <Lightning size={16} weight="fill" className="text-amber animate-pulse" />
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <StatsCard
          icon={<Trophy size={24} weight="duotone" className="text-amber" />}
          label="Active Games"
          value={waitingGames.length}
          color="amber"
        />
        <StatsCard
          icon={<Sparkle size={24} weight="duotone" className="text-cyan" />}
          label="Total Volume"
          value={`$${activeGames.reduce((sum, g) => sum + g.wager, 0).toFixed(0)}`}
          color="cyan"
        />
        <StatsCard
          icon={<Coins size={24} weight="duotone" className="text-long" />}
          label="Your Balance"
          value={`$${balance.toFixed(2)}`}
          color="long"
        />
      </motion.div>

      <Tabs value={selectedGame} onValueChange={(v) => setSelectedGame(v as Game['type'])}>
        <TabsList className="glass-strong grid w-full grid-cols-3 h-auto p-2">
          <TabsTrigger value="dice" className="gap-2 h-12 data-[state=active]:glass-strong data-[state=active]:shadow-lg">
            <DiceThree size={20} weight="duotone" />
            <span className="hidden sm:inline">Dice Roll</span>
            <span className="sm:hidden">Dice</span>
          </TabsTrigger>
          <TabsTrigger value="coinflip" className="gap-2 h-12 data-[state=active]:glass-strong data-[state=active]:shadow-lg">
            <CoinVertical size={20} weight="duotone" />
            <span className="hidden sm:inline">Coin Flip</span>
            <span className="sm:hidden">Coin</span>
          </TabsTrigger>
          <TabsTrigger value="price-prediction" className="gap-2 h-12 data-[state=active]:glass-strong data-[state=active]:shadow-lg">
            <ChartLineUp size={20} weight="duotone" />
            <span className="hidden sm:inline">Price Predict</span>
            <span className="sm:hidden">Price</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dice" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              className="glass-strong rounded-3xl p-6 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <DiceThree size={24} weight="duotone" className="text-amber" />
                Dice Duel
              </h3>
              
              <div className="mb-6 flex justify-center gap-6">
                {diceValues.map((value, idx) => (
                  <motion.div
                    key={idx}
                    className="glass rounded-2xl w-24 h-24 flex items-center justify-center border-2 border-white/20"
                    animate={rollingDice ? {
                      rotateX: [0, 360],
                      rotateY: [0, 360],
                    } : {}}
                    transition={{ duration: 0.3, repeat: rollingDice ? Infinity : 0 }}
                  >
                    <span className="text-5xl font-bold text-amber">{value}</span>
                  </motion.div>
                ))}
              </div>

              <div className="glass rounded-2xl p-4 mb-6 border border-white/10">
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>How it works:</strong>
                </p>
                <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside">
                  <li>Both players roll a 6-sided dice</li>
                  <li>Highest roll wins the entire pot</li>
                  <li>If tied, both players get refunded</li>
                  <li>Results are provably fair using seed generation</li>
                </ul>
              </div>

              <CreateGameForm
                wager={wager}
                setWager={setWager}
                balance={balance}
                potentialWin={potentialWin}
                canCreate={canCreate}
                onCreate={handleCreate}
                gameType="dice"
              />
            </motion.div>

            <OpenGamesList
              games={waitingGames.filter(g => g.type === 'dice')}
              username={username}
              balance={balance}
              onJoin={handleJoin}
              gameType="dice"
            />
          </div>
        </TabsContent>

        <TabsContent value="coinflip" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              className="glass-strong rounded-3xl p-6 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <CoinVertical size={24} weight="duotone" className="text-cyan" />
                Coin Flip
              </h3>

              <div className="mb-6 flex justify-center">
                <motion.div
                  className="glass rounded-full w-32 h-32 flex items-center justify-center border-4 border-white/20 relative overflow-hidden"
                  animate={flippingCoin ? {
                    rotateY: [0, 1800],
                  } : {}}
                  transition={{ duration: 2, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-amber/50 to-cyan/50" />
                  <span className="text-4xl font-bold relative z-10">
                    {coinFace === 'heads' ? '👑' : '💎'}
                  </span>
                </motion.div>
              </div>

              <div className="glass rounded-2xl p-4 mb-6 border border-white/10">
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>How it works:</strong>
                </p>
                <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside">
                  <li>Classic 50/50 coin flip game</li>
                  <li>Winner takes the entire pot minus fee</li>
                  <li>Fair random outcome generation</li>
                  <li>Instant results when opponent joins</li>
                </ul>
              </div>

              <CreateGameForm
                wager={wager}
                setWager={setWager}
                balance={balance}
                potentialWin={potentialWin}
                canCreate={canCreate}
                onCreate={handleCreate}
                gameType="coinflip"
              />
            </motion.div>

            <OpenGamesList
              games={waitingGames.filter(g => g.type === 'coinflip')}
              username={username}
              balance={balance}
              onJoin={handleJoin}
              gameType="coinflip"
            />
          </div>
        </TabsContent>

        <TabsContent value="price-prediction" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              className="glass-strong rounded-3xl p-6 border border-white/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
                <ChartLineUp size={24} weight="duotone" className="text-primary" />
                Price Prediction
              </h3>

              <div className="mb-6">
                <div className="glass rounded-2xl p-6 border border-white/10 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full" viewBox="0 0 200 100">
                      <motion.path
                        d="M 0 50 Q 50 20 100 50 T 200 50"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="oklch(0.75 0.22 150)" />
                          <stop offset="100%" stopColor="oklch(0.70 0.25 10)" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                  <div className="relative z-10 flex justify-center gap-4">
                    <Button
                      variant={chartPrediction === 'up' ? 'default' : 'outline'}
                      className={`flex-1 h-20 ${chartPrediction === 'up' ? 'bg-long hover:bg-long/80' : ''}`}
                      onClick={() => setChartPrediction('up')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ChartLineUp size={24} weight="duotone" />
                        <span className="font-bold">UP</span>
                      </div>
                    </Button>
                    <Button
                      variant={chartPrediction === 'down' ? 'default' : 'outline'}
                      className={`flex-1 h-20 ${chartPrediction === 'down' ? 'bg-short hover:bg-short/80' : ''}`}
                      onClick={() => setChartPrediction('down')}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ChartLineUp size={24} weight="duotone" className="rotate-180" />
                        <span className="font-bold">DOWN</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="glass rounded-2xl p-4 mb-6 border border-white/10">
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>How it works:</strong>
                </p>
                <ul className="text-xs text-foreground/70 space-y-1 list-disc list-inside">
                  <li>Predict if BTC price goes up or down in 60 seconds</li>
                  <li>Closest prediction to actual price wins</li>
                  <li>Live market data determines outcome</li>
                  <li>Skill-based gameplay with market knowledge</li>
                </ul>
              </div>

              <CreateGameForm
                wager={wager}
                setWager={setWager}
                balance={balance}
                potentialWin={potentialWin}
                canCreate={canCreate}
                onCreate={handleCreate}
                gameType="price-prediction"
              />
            </motion.div>

            <OpenGamesList
              games={waitingGames.filter(g => g.type === 'price-prediction')}
              username={username}
              balance={balance}
              onJoin={handleJoin}
              gameType="price-prediction"
            />
          </div>
        </TabsContent>
      </Tabs>

      <RecentGames games={completedGames} username={username} />
    </div>
  )
}

interface StatsCardProps {
  icon: React.ReactNode
  label: string
  value: string | number
  color: string
}

function StatsCard({ icon, label, value, color }: StatsCardProps) {
  return (
    <motion.div
      className="glass-strong rounded-2xl p-4 border border-white/10"
      whileHover={{ scale: 1.02, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center gap-3">
        <div className={`glass rounded-xl p-3 bg-${color}/20`}>
          {icon}
        </div>
        <div>
          <div className="text-xs text-foreground/60">{label}</div>
          <div className="font-mono font-bold text-xl">{value}</div>
        </div>
      </div>
    </motion.div>
  )
}

interface CreateGameFormProps {
  wager: string
  setWager: (v: string) => void
  balance: number
  potentialWin: number
  canCreate: boolean
  onCreate: () => void
  gameType: string
}

function CreateGameForm({ wager, setWager, balance, potentialWin, canCreate, onCreate, gameType }: CreateGameFormProps) {
  const quickAmounts = [10, 25, 50, 100]

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="wager" className="flex items-center gap-2 mb-2">
          <Coins size={16} className="text-amber" />
          Wager Amount
        </Label>
        <Input
          id="wager"
          type="number"
          placeholder="0.00"
          value={wager}
          onChange={(e) => setWager(e.target.value)}
          step="0.01"
          min="1"
          className="font-mono h-14 text-lg glass border-white/20 focus:border-primary/50"
        />
        <div className="flex justify-between mt-2 text-xs text-foreground/60">
          <span>Min: $1.00</span>
          <span>Available: ${balance.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {quickAmounts.map(amount => (
          <Button
            key={amount}
            variant="outline"
            size="sm"
            onClick={() => setWager(amount.toString())}
            className="glass-hover border-white/20"
            disabled={amount > balance}
          >
            ${amount}
          </Button>
        ))}
      </div>

      <div className="glass rounded-2xl p-4 space-y-2 text-sm border border-white/10">
        <div className="flex justify-between">
          <span className="text-foreground/70">Your Wager</span>
          <span className="font-mono font-semibold">${parseFloat(wager || '0').toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-foreground/70">Opponent Match</span>
          <span className="font-mono font-semibold">${parseFloat(wager || '0').toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-foreground/60">
          <span>Fee ({(GAME_FEE_PERCENT * 100).toFixed(0)}%)</span>
          <span className="font-mono">-${(parseFloat(wager || '0') * 2 * GAME_FEE_PERCENT).toFixed(2)}</span>
        </div>
        <div className="border-t border-white/10 pt-2 mt-2"></div>
        <div className="flex justify-between font-semibold">
          <span className="flex items-center gap-1">
            <Trophy size={16} className="text-amber" />
            Winner Takes
          </span>
          <span className="font-mono text-long text-xl">${potentialWin.toFixed(2)}</span>
        </div>
      </div>

      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        <Button
          className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
          disabled={!canCreate}
          onClick={onCreate}
        >
          <Sparkle size={20} className="mr-2" weight="fill" />
          Create Game
        </Button>
      </motion.div>
    </div>
  )
}

interface OpenGamesListProps {
  games: Game[]
  username: string
  balance: number
  onJoin: (id: string) => void
  gameType: string
}

function OpenGamesList({ games, username, balance, onJoin, gameType }: OpenGamesListProps) {
  const getIcon = () => {
    switch (gameType) {
      case 'dice': return <DiceThree size={18} weight="duotone" className="text-amber" />
      case 'coinflip': return <CoinVertical size={18} weight="duotone" className="text-cyan" />
      case 'price-prediction': return <ChartLineUp size={18} weight="duotone" className="text-primary" />
      default: return null
    }
  }

  return (
    <div className="glass-strong rounded-3xl p-6 border border-white/10">
      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
        {getIcon()}
        Open Lobbies ({games.length})
      </h3>

      {games.length === 0 ? (
        <motion.div
          className="text-center py-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="text-6xl mb-4 animate-bounce">🎮</div>
          <p className="text-foreground/70 font-semibold">No open games</p>
          <p className="text-sm text-foreground/60 mt-1">Be the first to create one!</p>
        </motion.div>
      ) : (
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-3">
            <AnimatePresence>
              {games.map((game, idx) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass rounded-2xl p-4 border border-white/10 glass-hover"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="glass rounded-lg p-2 bg-amber/20">
                        {getIcon()}
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          {game.creatorId === username ? 'Your Game' : game.creatorId}
                        </div>
                        <div className="text-xs text-foreground/60">
                          {new Date(game.createdAt).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Badge variant="outline" className="glass border-long text-long">
                        <Lightning size={12} weight="fill" className="mr-1" />
                        Live
                      </Badge>
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="glass rounded-lg p-2 border border-white/10">
                      <div className="text-xs text-foreground/60 mb-1">Wager</div>
                      <div className="font-mono font-bold">${game.wager.toFixed(2)}</div>
                    </div>
                    <div className="glass rounded-lg p-2 border border-white/10">
                      <div className="text-xs text-foreground/60 mb-1">Prize</div>
                      <div className="font-mono font-bold text-long">
                        ${calculateGamePayout(game.wager).toFixed(2)}
                      </div>
                    </div>
                  </div>

                  <Button
                    className="w-full h-11 font-semibold"
                    disabled={game.creatorId === username || balance < game.wager}
                    onClick={() => onJoin(game.id)}
                    variant={game.creatorId === username ? 'outline' : 'default'}
                  >
                    {game.creatorId === username ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          className="mr-2"
                        >
                          ⏳
                        </motion.div>
                        Waiting for Opponent
                      </>
                    ) : balance < game.wager ? (
                      'Insufficient Balance'
                    ) : (
                      <>
                        <Fire size={18} weight="fill" className="mr-2" />
                        Join & Play
                      </>
                    )}
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </ScrollArea>
      )}
    </div>
  )
}

interface RecentGamesProps {
  games: Game[]
  username: string
}

function RecentGames({ games, username }: RecentGamesProps) {
  if (games.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-3xl p-6 border border-white/10"
    >
      <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
        <Trophy size={24} weight="duotone" className="text-amber" />
        Recent Results
      </h3>

      <div className="grid md:grid-cols-2 gap-3">
        {games.map((game, idx) => {
          const isWinner = game.result?.winnerId === username
          const isTie = game.result?.winnerId === 'tie'
          
          return (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className={`glass rounded-2xl p-4 border ${
                isTie ? 'border-amber/30' : isWinner ? 'border-long/30' : 'border-short/30'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="gap-1 text-xs">
                  {game.type === 'dice' && <DiceThree size={12} />}
                  {game.type === 'coinflip' && <CoinVertical size={12} />}
                  {game.type === 'price-prediction' && <ChartLineUp size={12} />}
                  {game.type}
                </Badge>
                <span className={`font-mono font-bold ${
                  isTie ? 'text-amber' : isWinner ? 'text-long' : 'text-short'
                }`}>
                  {isTie ? 'TIE' : isWinner ? '+' : '-'}${game.wager.toFixed(2)}
                </span>
              </div>
              <div className="text-xs text-foreground/60">
                {game.creatorId} vs {game.opponentId}
              </div>
              {game.result?.outcome && (
                <div className="mt-2 text-xs glass rounded-lg p-2 font-mono border border-white/10">
                  {JSON.stringify(game.result.outcome)}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
