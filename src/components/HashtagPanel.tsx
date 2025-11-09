import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TrendUp, TrendDown, Minus, Hash } from '@phosphor-icons/react'
import type { HashtagTrend } from '@/lib/types'

interface HashtagPanelProps {
  hashtags: HashtagTrend[]
}

export function HashtagPanel({ hashtags }: HashtagPanelProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <Hash size={24} weight="bold" className="text-accent" />
        <h2 className="text-2xl font-bold">Trending Hashtags</h2>
      </div>

      <ScrollArea className="h-[500px] pr-4">
        <div className="space-y-3">
          {hashtags.map((tag, index) => (
            <div
              key={tag.hashtag}
              className="p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all animate-fade-in-stagger"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-accent">{tag.hashtag}</span>
                  {tag.trend === 'rising' && (
                    <TrendUp size={16} weight="bold" className="text-success" />
                  )}
                  {tag.trend === 'falling' && (
                    <TrendDown size={16} weight="bold" className="text-destructive" />
                  )}
                  {tag.trend === 'stable' && (
                    <Minus size={16} weight="bold" className="text-muted-foreground" />
                  )}
                </div>
                <Badge
                  variant="secondary"
                  className={
                    tag.sentimentLabel === 'Positive'
                      ? 'bg-success/20 text-success'
                      : tag.sentimentLabel === 'Negative'
                      ? 'bg-destructive/20 text-destructive'
                      : 'bg-muted/30'
                  }
                >
                  {tag.sentimentLabel}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Mentions</span>
                  <div className="font-mono font-semibold">
                    {tag.mentions.toLocaleString()}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Sentiment</span>
                  <div className="font-mono font-semibold">
                    {tag.sentiment > 0 ? '+' : ''}{tag.sentiment}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Change</span>
                  <div className={`font-mono font-semibold ${
                    tag.changePercent > 0 ? 'text-success' : tag.changePercent < 0 ? 'text-destructive' : ''
                  }`}>
                    {tag.changePercent > 0 ? '+' : ''}{tag.changePercent}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </Card>
  )
}
