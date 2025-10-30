import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassTooltipProps {
  children: React.ReactNode
  content: React.ReactNode
  side?: 'top' | 'right' | 'bottom' | 'left'
  className?: string
}

export function GlassTooltip({ children, content, side = 'top', className }: GlassTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: side === 'top' ? 5 : side === 'bottom' ? -5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: side === 'top' ? 5 : side === 'bottom' ? -5 : 0 }}
            transition={{ duration: 0.15 }}
            className={cn(
              'absolute z-50 glass-strong rounded-xl p-3 text-sm border border-white/20 shadow-2xl backdrop-blur-xl whitespace-nowrap',
              positions[side],
              className
            )}
          >
            {content}
            <div
              className={cn(
                'absolute w-2 h-2 bg-white/10 border border-white/20 rotate-45',
                side === 'top' && 'bottom-[-5px] left-1/2 -translate-x-1/2 border-t-0 border-l-0',
                side === 'right' && 'left-[-5px] top-1/2 -translate-y-1/2 border-r-0 border-t-0',
                side === 'bottom' && 'top-[-5px] left-1/2 -translate-x-1/2 border-b-0 border-r-0',
                side === 'left' && 'right-[-5px] top-1/2 -translate-y-1/2 border-l-0 border-b-0'
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
