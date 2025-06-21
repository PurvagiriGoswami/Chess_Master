"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  Crown, 
  User, 
  Settings, 
  Trophy, 
  BookOpen, 
  Puzzle,
  Users,
  Menu
} from 'lucide-react'

export default function ChessHeader() {
  const [isOnline, setIsOnline] = useState(true)

  console.log('ChessHeader component rendered')

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Crown className="w-8 h-8 text-chess-bronze" />
              <span className="font-bold text-xl text-chess-forest">
                ChessMaster
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" size="sm" className="text-chess-forest hover:text-chess-bronze">
              <Users className="w-4 h-4 mr-2" />
              Play Online
            </Button>
            <Button variant="ghost" size="sm" className="text-chess-forest hover:text-chess-bronze">
              <Puzzle className="w-4 h-4 mr-2" />
              Puzzles
            </Button>
            <Button variant="ghost" size="sm" className="text-chess-forest hover:text-chess-bronze">
              <BookOpen className="w-4 h-4 mr-2" />
              Learn
            </Button>
            <Button variant="ghost" size="sm" className="text-chess-forest hover:text-chess-bronze">
              <Trophy className="w-4 h-4 mr-2" />
              Tournaments
            </Button>
          </nav>

          {/* User Profile Section */}
          <div className="flex items-center gap-3">
            {/* Online Status */}
            <Badge 
              variant={isOnline ? "default" : "secondary"}
              className={`status-indicator ${isOnline ? 'active' : 'waiting'}`}
            >
              <div className={`w-2 h-2 rounded-full mr-2 ${isOnline ? 'bg-green-500' : 'bg-yellow-500'}`} />
              {isOnline ? 'Online' : 'Offline'}
            </Badge>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2 p-2">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="/api/placeholder/32/32" alt="Player" />
                    <AvatarFallback className="bg-chess-bronze text-white">
                      <User className="w-4 h-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-chess-forest">Guest Player</p>
                    <p className="text-xs text-muted-foreground">Rating: 1200</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Trophy className="w-4 h-4 mr-2" />
                  Game History
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <BookOpen className="w-4 h-4 mr-2" />
                  Analysis Board
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Users className="w-4 h-4 mr-2" />
                    Play Online
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Puzzle className="w-4 h-4 mr-2" />
                    Puzzles
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Learn
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Trophy className="w-4 h-4 mr-2" />
                    Tournaments
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}