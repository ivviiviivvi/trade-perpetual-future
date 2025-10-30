export interface Market {
  id: string
  symbol: string
  name: string
  basePrice: number
  currentPrice: number
  change24h: number
  volume24h: string
  icon: string
}

export interface Position {
  id: string
  marketId: string
  marketSymbol: string
  side: 'long' | 'short'
  size: number
  leverage: number
  entryPrice: number
  currentPrice: number
  liquidationPrice: number
  unrealizedPnl: number
  unrealizedPnlPercent: number
  timestamp: number
}

export interface ClosedPosition extends Position {
  exitPrice: number
  realizedPnl: number
  realizedPnlPercent: number
  closedAt: number
}
