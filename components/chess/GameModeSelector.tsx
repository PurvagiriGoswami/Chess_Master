"use client"

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Clock, 
  Zap, 
  Timer, 
  Bot, 
  Users, 
  Trophy,
  BookOpen,
  Puzzle
} from 'lucide-react'

interface GameMode {
  id: string
  name: string
  description: string
  timeControl: string
  icon: React.ReactNode
  difficulty?: 'easy' | 'medium' | 'hard'
  popular?: boolean
}

interface GameModeSelectorProps {
  onModeSelect?: (mode: GameMode) => void
}

export default function GameModeSelector({ onModeSelect }: GameModeSelectorProps) {
  const [selectedMode, setSelectedMode] = useState<string>('')

  console.log('GameModeSelector component rendered')

  const onlineModes: GameMode[] = [
    {
      id: 'blitz',
      name: 'Blitz',
      description: 'Fast-paced games for quick thinking',
      timeControl: '5+0',
      icon: <Zap className="w-5 h-5" />,
      popular: true
    },
    {
      id: 'bullet',
      name: 'Bullet',
      description: 'Lightning-fast games',
      timeControl: '1+0',
      icon: <Timer className="w-5 h-5" />
    },
    {
      id: 'rapid',
      name: 'Rapid',
      description: 'Balanced time for strategic play',
      timeControl: '10+0',
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'classical',
      name: 'Classical',
      description: 'Deep strategic games',
      timeControl: '30+0',
      icon: <BookOpen className="w-5 h-5" />
    }
  ]

  const offlineModes: GameMode[] = [
    {
      id: 'ai-easy',
      name: 'AI - Easy',
      description: 'Perfect for beginners',
      timeControl: 'No limit',
      icon: <Bot className="w-5 h-5" />,
      difficulty: 'easy'
    },
    {
      id: 'ai-medium',
      name: 'AI - Medium',
      description: 'Balanced challenge',
      timeControl: 'No limit',
      icon: <Bot className="w-5 h-5" />,
      difficulty: 'medium'
    },
    {
      id: 'ai-hard',
      name: 'AI - Hard',
      description: 'For experienced players',
      timeControl: 'No limit',
      icon: <Bot className="w-5 h-5" />,
      difficulty: 'hard'
    },
    {
      id: 'local',
      name: 'Local Play',
      description: 'Play with a friend on same device',
      timeControl: 'No limit',
      icon: <Users className="w-5 h-5" />
    }
  ]

  const practiceMode: GameMode[] = [
    {
      id: 'puzzles',
      name: 'Puzzles',
      description: 'Solve tactical challenges',
      timeControl: 'No limit',
      icon: <Puzzle className="w-5 h-5" />
    },
    {
      id: 'analysis',
      name: 'Analysis Board',
      description: 'Study positions and games',
      timeControl: 'No limit',
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      id: 'tournaments',
      name: 'Tournaments',
      description: 'Join competitive events',
      timeControl: 'Varies',
      icon: <Trophy className="w-5 h-5" />
    }
  ]

  const handleModeSelect = (mode: GameMode) => {
    console.log('Game mode selected:', mode.name)
    setSelectedMode(mode.id)
    onModeSelect?.(mode)
  }

  const ModeCard = ({ mode }: { mode: GameMode }) => (
    <Card 
      className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 border-2 ${
        selectedMode === mode.id 
          ? 'border-chess-bronze bg-chess-bronze/5' 
          : 'border-border hover:border-chess-bronze/50'
      }`}
      onClick={() => handleModeSelect(mode)}
    >
      <div className="flex items-start gap-3">
        <div className="text-chess-forest mt-1">
          {mode.icon}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-chess-forest">{mode.name}</h3>
            {mode.popular && (
              <Badge variant="secondary" className="text-xs">
                Popular
              </Badge>
            )}
            {mode.difficulty && (
              <Badge 
                variant={mode.difficulty === 'easy' ? 'default' : mode.difficulty === 'medium' ? 'secondary' : 'destructive'}
                className="text-xs"
              >
                {mode.difficulty}
              </Badge>
            )}
          </div>
          <p className="text-sm text-muted-foreground mb-2">{mode.description}</p>
          <div className="flex items-center gap-2">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{mode.timeControl}</span>
          </div>
        </div>
      </div>
    </Card>
  )

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-chess-forest mb-2">Choose Your Game Mode</h1>
        <p className="text-muted-foreground">Select how you want to play chess today</p>
      </div>

      <Tabs defaultValue="online" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="online" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Online Play
          </TabsTrigger>
          <TabsTrigger value="offline" className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            Offline Play
          </TabsTrigger>
          <TabsTrigger value="practice" className="flex items-center gap-2">
            <Puzzle className="w-4 h-4" />
            Practice
          </TabsTrigger>
        </TabsList>

        <TabsContent value="online" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {onlineModes.map((mode) => (
              <ModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="offline" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {offlineModes.map((mode) => (
              <ModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="practice" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {practiceMode.map((mode) => (
              <ModeCard key={mode.id} mode={mode} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedMode && (
        <div className="mt-8 text-center">
          <Button 
            size="lg" 
            className="bg-chess-forest hover:bg-chess-forest/90 text-white px-8"
            onClick={() => console.log('Starting game with mode:', selectedMode)}
          >
            Start Game
          </Button>
        </div>
      )}
    </div>
  )
}