export interface Symbol {
  ticker: string
  name: string
  currentPrice: number
  sentiment: SentimentData
}

export interface SentimentData {
  score: number
  label: 'Bullish' | 'Bearish' | 'Neutral'
  confidence: number
  volume: number
  trend: 'up' | 'down' | 'stable'
  lastUpdated: number
}

export interface Reality {
  id: string
  label: string
  description: string
  probability: number
  pricePoints: PricePoint[]
  sentiment: 'bullish' | 'bearish' | 'neutral' | 'volatile'
  color: string
}

export interface PricePoint {
  time: string
  price: number
}

export interface HashtagTrend {
  hashtag: string
  mentions: number
  sentiment: number
  sentimentLabel: 'Positive' | 'Negative' | 'Neutral'
  trend: 'rising' | 'falling' | 'stable'
  changePercent: number
}

export interface Alert {
  id: string
  symbol: string
  type: 'downtrend' | 'sentiment-drop' | 'volatility'
  severity: 'low' | 'medium' | 'high'
  message: string
  timestamp: number
  dismissed: boolean
}
