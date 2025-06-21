"use client"

import { useState } from 'react'
import ChessHeader from './ChessHeader'
import ChessBoard from './ChessBoard'
import GameModeSelector from './GameModeSelector'
import ChessPuzzle from './ChessPuzzle'
import ChessLanding from './ChessLanding'

export default function ChessLayout() {
  const [currentView, setCurrentView] = useState<'landing' | 'modes' | 'game'>('landing')
  const [currentGameMode, setCurrentGameMode] = useState<any>(null)

  console.log('ChessLayout component rendered, currentView:', currentView)

  const handleStartPlaying = () => {
    console.log('Starting to play - showing game modes')
    setCurrentView('modes')
  }

  const handleModeSelect = (mode: any) => {
    console.log('Mode selected in layout:', mode.name)
    setCurrentGameMode(mode)
    setCurrentView('game')
  }

  const handleBackToModes = () => {
    console.log('Going back to mode selection')
    setCurrentView('modes')
    setCurrentGameMode(null)
  }

  const handleBackToLanding = () => {
    console.log('Going back to landing page')
    setCurrentView('landing')
    setCurrentGameMode(null)
  }

  const renderGameMode = () => {
    if (!currentGameMode) return null

    switch (currentGameMode.id) {
      case 'puzzles':
        return (
          <ChessPuzzle 
            onSolved={(puzzleId, moves) => {
              console.log(`Puzzle ${puzzleId} solved in ${moves} moves`)
            }}
          />
        )
      case 'analysis':
        return (
          <div className="max-w-4xl mx-auto p-6">
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-chess-forest mb-4">Analysis Board</h2>
              <p className="text-muted-foreground">Analysis board feature coming soon!</p>
            </div>
          </div>
        )
      default:
        return (
          <ChessBoard 
            onGameStateChange={(gameState) => {
              console.log('Game state changed:', gameState.fen())
            }}
          />
        )
    }
  }

  const renderCurrentView = () => {
    switch (currentView) {
      case 'landing':
        return <ChessLanding onStartPlaying={handleStartPlaying} />
      case 'modes':
        return <GameModeSelector onModeSelect={handleModeSelect} />
      case 'game':
        return (
          <div className="space-y-4">
            {/* Game Mode Info Bar */}
            {currentGameMode && (
              <div className="bg-card/80 backdrop-blur-sm border-b border-border">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-chess-forest">
                        {currentGameMode.icon}
                      </div>
                      <div>
                        <h2 className="font-semibold text-chess-forest">
                          {currentGameMode.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {currentGameMode.description} • {currentGameMode.timeControl}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <button
                        onClick={handleBackToModes}
                        className="text-sm text-chess-forest hover:text-chess-bronze transition-colors"
                      >
                        ← Game Modes
                      </button>
                      <button
                        onClick={handleBackToLanding}
                        className="text-sm text-chess-forest hover:text-chess-bronze transition-colors"
                      >
                        Home
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Dynamic Game Mode Rendering */}
            {renderGameMode()}
          </div>
        )
      default:
        return <ChessLanding onStartPlaying={handleStartPlaying} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-chess-ivory via-background to-chess-ivory/50">
      {currentView !== 'landing' && <ChessHeader />}
      
      <main className="relative">
        {renderCurrentView()}
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 opacity-[0.02]">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h30v30H0zM30 30h30v30H30z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
               backgroundSize: '60px 60px'
             }}>
        </div>
      </div>
    </div>
  )
}