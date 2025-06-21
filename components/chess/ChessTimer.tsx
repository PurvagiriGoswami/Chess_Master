"use client"

import { useState, useEffect, useCallback } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, Play, Pause } from 'lucide-react'

interface ChessTimerProps {
  initialTime: number // in seconds
  increment?: number // increment per move in seconds
  isActive: boolean
  onTimeUp?: () => void
  playerName: string
  isCurrentPlayer: boolean
}

export default function ChessTimer({ 
  initialTime, 
  increment = 0, 
  isActive, 
  onTimeUp, 
  playerName,
  isCurrentPlayer 
}: ChessTimerProps) {
  const [timeLeft, setTimeLeft] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  console.log(`ChessTimer for ${playerName} rendered, timeLeft: ${timeLeft}, isActive: ${isActive}`)

  useEffect(() => {
    setIsRunning(isActive && isCurrentPlayer)
  }, [isActive, isCurrentPlayer])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          const newTime = prev - 1
          if (newTime <= 0) {
            console.log(`Time up for ${playerName}`)
            onTimeUp?.()
            return 0
          }
          return newTime
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning, timeLeft, onTimeUp, playerName])

  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }, [])

  const getTimerColor = () => {
    if (timeLeft <= 30) return 'text-red-600'
    if (timeLeft <= 60) return 'text-yellow-600'
    return 'text-chess-forest'
  }

  const getCardStyle = () => {
    let baseClasses = "transition-all duration-300 "
    
    if (isCurrentPlayer && isActive) {
      baseClasses += "border-chess-bronze bg-chess-bronze/5 shadow-lg "
    } else {
      baseClasses += "border-border "
    }
    
    if (timeLeft <= 30 && isRunning) {
      baseClasses += "animate-pulse "
    }
    
    return baseClasses
  }

  return (
    <Card className={`p-4 ${getCardStyle()}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className={`w-4 h-4 ${getTimerColor()}`} />
          <span className="font-medium text-sm">{playerName}</span>
          {isCurrentPlayer && isActive && (
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-mono font-bold ${getTimerColor()}`}>
            {formatTime(timeLeft)}
          </div>
          {increment > 0 && (
            <div className="text-xs text-muted-foreground">
              +{increment}s per move
            </div>
          )}
        </div>
      </div>
      
      {timeLeft <= 10 && isRunning && (
        <div className="mt-2 text-center">
          <span className="text-xs text-red-600 font-medium animate-pulse">
            LOW TIME!
          </span>
        </div>
      )}
    </Card>
  )
}

// Component for managing both players' timers
export function DualChessTimer({ 
  whiteTime, 
  blackTime, 
  increment = 0, 
  currentPlayer, 
  gameActive = true,
  onTimeUp 
}: {
  whiteTime: number
  blackTime: number
  increment?: number
  currentPlayer: 'white' | 'black'
  gameActive?: boolean
  onTimeUp?: (player: 'white' | 'black') => void
}) {
  console.log('DualChessTimer rendered, current player:', currentPlayer)

  return (
    <div className="space-y-3">
      <ChessTimer
        initialTime={blackTime}
        increment={increment}
        isActive={gameActive}
        onTimeUp={() => onTimeUp?.('black')}
        playerName="Black"
        isCurrentPlayer={currentPlayer === 'black'}
      />
      
      <ChessTimer
        initialTime={whiteTime}
        increment={increment}
        isActive={gameActive}
        onTimeUp={() => onTimeUp?.('white')}
        playerName="White"
        isCurrentPlayer={currentPlayer === 'white'}
      />
    </div>
  )
}