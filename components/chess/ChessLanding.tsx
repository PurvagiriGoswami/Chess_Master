"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Crown, 
  Play, 
  Puzzle, 
  Trophy, 
  Users, 
  BookOpen,
  Zap,
  Target,
  ArrowRight,
  Star,
  Clock
} from 'lucide-react'

interface ChessLandingProps {
  onStartPlaying?: () => void
}

export default function ChessLanding({ onStartPlaying }: ChessLandingProps) {
  console.log('ChessLanding component rendered')

  const features = [
    {
      icon: <Play className="w-6 h-6" />,
      title: "Play Online",
      description: "Challenge players worldwide in real-time matches",
      color: "text-blue-600"
    },
    {
      icon: <Puzzle className="w-6 h-6" />,
      title: "Solve Puzzles",
      description: "Improve your tactical skills with daily puzzles",
      color: "text-purple-600"
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Learn & Analyze",
      description: "Study master games and analyze your play",
      color: "text-green-600"
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: "Tournaments",
      description: "Compete in organized tournaments and events",
      color: "text-yellow-600"
    }
  ]

  const gameTypes = [
    {
      name: "Bullet",
      time: "1+0",
      description: "Lightning fast games",
      icon: <Zap className="w-5 h-5" />,
      players: "15.2K"
    },
    {
      name: "Blitz",
      time: "5+0",
      description: "Quick tactical battles",
      icon: <Clock className="w-5 h-5" />,
      players: "32.1K"
    },
    {
      name: "Rapid",
      time: "10+0",
      description: "Balanced strategic play",
      icon: <Target className="w-5 h-5" />,
      players: "18.7K"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-chess-ivory via-background to-chess-ivory/50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Crown className="w-16 h-16 text-chess-bronze" />
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-chess-forest mb-6">
              ChessMaster
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The ultimate chess platform for players of all levels. Play, learn, and master the game of kings.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                size="lg" 
                className="bg-chess-forest hover:bg-chess-forest/90 text-white px-8 py-4 text-lg"
                onClick={onStartPlaying}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Playing
              </Button>
              
              <Button variant="outline" size="lg" className="px-8 py-4 text-lg">
                <Users className="w-5 h-5 mr-2" />
                Watch Live Games
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-chess-forest">500K+</div>
                <div className="text-sm text-muted-foreground">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chess-forest">2M+</div>
                <div className="text-sm text-muted-foreground">Games Played</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chess-forest">10K+</div>
                <div className="text-sm text-muted-foreground">Puzzles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-chess-forest">24/7</div>
                <div className="text-sm text-muted-foreground">Tournaments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-chess-forest mb-4">
              Everything You Need to Master Chess
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From beginner tutorials to grandmaster analysis, we have all the tools to help you improve your game.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`${feature.color} mb-4 flex justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-chess-forest mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Game Types Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-chess-forest mb-4">
              Choose Your Battle
            </h2>
            <p className="text-lg text-muted-foreground">
              Find the perfect game type for your skill level and time commitment
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gameTypes.map((type, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="text-chess-bronze">
                      {type.icon}
                    </div>
                    <h3 className="font-bold text-chess-forest">{type.name}</h3>
                  </div>
                  <Badge variant="outline">{type.time}</Badge>
                </div>
                
                <p className="text-muted-foreground mb-4">{type.description}</p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {type.players} playing now
                  </span>
                  <Button size="sm" variant="ghost" className="text-chess-bronze hover:text-chess-bronze/80">
                    Play Now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-chess-forest">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Begin Your Chess Journey?
          </h2>
          <p className="text-xl text-chess-ivory mb-8">
            Join thousands of players improving their game every day
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-chess-bronze hover:bg-chess-bronze/90 text-chess-forest px-8 py-4 text-lg"
              onClick={onStartPlaying}
            >
              <Play className="w-5 h-5 mr-2" />
              Start Playing Now
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="border-chess-ivory text-chess-ivory hover:bg-chess-ivory hover:text-chess-forest px-8 py-4 text-lg"
            >
              <Star className="w-5 h-5 mr-2" />
              View Leaderboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}