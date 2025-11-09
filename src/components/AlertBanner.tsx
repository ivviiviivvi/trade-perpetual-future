import { Alert as AlertComponent, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { X, Warning, TrendDown, ChartLineDown } from '@phosphor-icons/react'
import type { Alert } from '@/lib/types'

interface AlertBannerProps {
  alert: Alert
  onDismiss: () => void
}

export function AlertBanner({ alert, onDismiss }: AlertBannerProps) {
  const severityStyles = {
    low: 'border-warning bg-warning/10',
    medium: 'border-warning bg-warning/20',
    high: 'border-destructive bg-destructive/20'
  }

  const icons = {
    downtrend: <TrendDown size={20} weight="bold" />,
    'sentiment-drop': <ChartLineDown size={20} weight="bold" />,
    volatility: <Warning size={20} weight="bold" />
  }

  return (
    <AlertComponent 
      className={`${severityStyles[alert.severity]} animate-slide-down mb-4`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className={alert.severity === 'high' ? 'text-destructive' : 'text-warning'}>
            {icons[alert.type]}
          </div>
          <div>
            <AlertTitle className="font-semibold">
              {alert.severity === 'high' ? '🚨 High Priority Alert' : '⚠️ Alert'}
            </AlertTitle>
            <AlertDescription className="mt-1">
              {alert.message}
            </AlertDescription>
            <p className="text-xs text-muted-foreground mt-2">
              {new Date(alert.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="hover:bg-background/50"
        >
          <X size={18} />
        </Button>
      </div>
    </AlertComponent>
  )
}
