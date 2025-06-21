"use client"

import { useState, useCallback, useEffect } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DualChessTimer } from './ChessTimer'
import { useToast } from '@/hooks/use-toast'
import { RotateCcw, Flag, Users, Settings, Crown, AlertCircle, Clock } from 'lucide-react'

interface ChessBoardProps {
  onGameStateChange?: (gameState: any) => void
}

export default function ChessBoard({ onGameStateChange }: ChessBoardProps) {
  const [game, setGame] = useState(new Chess())
  const [gamePosition, setGamePosition] = useState(game.fen())
  const [moveHistory, setMoveHistory] = useState<string[]>([])
  const [gameStatus, setGameStatus] = useState<'playing' | 'checkmate' | 'draw' | 'stalemate'>('playing')
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white')
  const [capturedPieces, setCapturedPieces] = useState<{ white: string[], black: string[] }>({
    white: [],
    black: []
  })
  const [gameMode, setGameMode] = useState<'untimed' | 'timed'>('untimed')
  const [whiteTime, setWhiteTime] = useState(300) // 5 minutes
  const [blackTime, setBlackTime] = useState(300) // 5 minutes
  const { toast } = useToast()

  console.log('ChessBoard component rendered, current position:', gamePosition)

  const makeMove = useCallback((sourceSquare: string, targetSquare: string) => {
    console.log('Attempting move:', sourceSquare, 'to', targetSquare)
    
    const gameCopy = new Chess(game.fen())
    
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q' // Always promote to queen for simplicity
      })

      if (move) {
        console.log('Move successful:', move)
        setGame(gameCopy)
        setGamePosition(gameCopy.fen())
        setMoveHistory(prev => [...prev, move.san])
        setCurrentPlayer(gameCopy.turn() === 'w' ? 'white' : 'black')

        // Check for game end conditions
        if (gameCopy.isCheckmate()) {
          setGameStatus('checkmate')
          console.log('Game ended: Checkmate')
          toast({
            title: "Checkmate!",
            description: `${currentPlayer === 'white' ? 'Black' : 'White'} wins the game!`,
            variant: "default",
          })
        } else if (gameCopy.isDraw()) {
          setGameStatus('draw')
          console.log('Game ended: Draw')
          toast({
            title: "Draw",
            description: "The game ended in a draw",
            variant: "default",
          })
        } else if (gameCopy.isStalemate()) {
          setGameStatus('stalemate')
          console.log('Game ended: Stalemate')
          toast({
            title: "Stalemate",
            description: "The game ended in stalemate - it's a draw",
            variant: "default",
          })
        } else if (gameCopy.isCheck()) {
          toast({
            title: "Check!",
            description: `${gameCopy.turn() === 'w' ? 'White' : 'Black'} is in check`,
            variant: "destructive",
          })
        }

        // Update captured pieces
        if (move.captured) {
          const capturedPiece = move.captured
          setCapturedPieces(prev => ({
            ...prev,
            [move.color === 'w' ? 'white' : 'black']: [
              ...prev[move.color === 'w' ? 'white' : 'black'],
              capturedPiece
            ]
          }))
        }

        onGameStateChange?.(gameCopy)
        return true
      }
    } catch (error) {
      console.log('Invalid move:', error)
      return false
    }
    
    return false
  }, [game, onGameStateChange])

  const onDrop = useCallback((sourceSquare: string, targetSquare: string) => {
    return makeMove(sourceSquare, targetSquare)
  }, [makeMove])

  const resetGame = useCallback(() => {
    console.log('Resetting game')
    const newGame = new Chess()
    setGame(newGame)
    setGamePosition(newGame.fen())
    setMoveHistory([])
    setGameStatus('playing')
    setCurrentPlayer('white')
    setCapturedPieces({ white: [], black: [] })
    setWhiteTime(300)
    setBlackTime(300)
    toast({
      title: "New Game",
      description: "A new game has been started",
      variant: "default",
    })
  }, [toast])

  const handleTimeUp = useCallback((player: 'white' | 'black') => {
    console.log(`Time up for ${player}`)
    setGameStatus('checkmate') // Treat time up as game over
    toast({
      title: "Time's Up!",
      description: `${player === 'white' ? 'Black' : 'White'} wins on time!`,
      variant: "destructive",
    })
  }, [toast])

  const toggleGameMode = useCallback(() => {
    const newMode = gameMode === 'untimed' ? 'timed' : 'untimed'
    setGameMode(newMode)
    console.log('Game mode changed to:', newMode)
    toast({
      title: `${newMode === 'timed' ? 'Timed' : 'Untimed'} Mode`,
      description: `Switched to ${newMode} game mode`,
      variant: "default",
    })
  }, [gameMode, toast])

  const getGameStatusDisplay = () => {
    switch (gameStatus) {
      case 'checkmate':
        return `Checkmate! ${currentPlayer === 'white' ? 'Black' : 'White'} wins`
      case 'draw':
        return 'Game ended in a draw'
      case 'stalemate':
        return 'Stalemate - Draw'
      default:
        return game.isCheck() ? `${currentPlayer === 'white' ? 'White' : 'Black'} is in check` : `${currentPlayer === 'white' ? 'White' : 'Black'} to move`
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
      {/* Chess Board */}
      <div className="flex-1 flex flex-col items-center">
        <div className="chess-board mb-4">
          <Chessboard
            position={gamePosition}
            onPieceDrop={onDrop}
            boardWidth={Math.min(600, typeof window !== 'undefined' ? window.innerWidth - 100 : 600)}
            customBoardStyle={{
              borderRadius: '8px',
              boxShadow: '0 8px 32px rgba(45, 74, 61, 0.3)',
            }}
            customDarkSquareStyle={{
              backgroundColor: '#8B4513'
            }}
            customLightSquareStyle={{
              backgroundColor: '#F4F1E8'
            }}
            areArrowsAllowed={true}
            showBoardNotation={true}
            boardOrientation="white"
          />
        </div>
        
        {/* Game Status */}
        <div className="text-center mb-4">
          <Badge 
            variant={gameStatus === 'playing' ? 'default' : 'secondary'}
            className="text-lg px-4 py-2"
          >
            {getGameStatusDisplay()}
          </Badge>
        </div>

        {/* Game Controls */}
        <div className="flex flex-wrap gap-2">
          <Button onClick={resetGame} variant="outline" size="sm">
            <RotateCcw className="w-4 h-4 mr-2" />
            New Game
          </Button>
          <Button 
            onClick={toggleGameMode} 
            variant={gameMode === 'timed' ? 'default' : 'outline'} 
            size="sm"
          >
            <Clock className="w-4 h-4 mr-2" />
            {gameMode === 'timed' ? 'Timed' : 'Untimed'}
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Flag className="w-4 h-4 mr-2" />
            Resign
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Users className="w-4 h-4 mr-2" />
            Multiplayer
          </Button>
          <Button variant="outline" size="sm" disabled>
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Game Info Panel */}
      <div className="w-full lg:w-80 space-y-4">
        {/* Chess Timer */}
        {gameMode === 'timed' && (
          <DualChessTimer
            whiteTime={whiteTime}
            blackTime={blackTime}
            increment={0}
            currentPlayer={currentPlayer}
            gameActive={gameStatus === 'playing'}
            onTimeUp={handleTimeUp}
          />
        )}

        {/* Player Info */}
        <Card className="game-panel">
          <h3 className="font-semibold mb-3 text-chess-forest flex items-center gap-2">
            <Crown className="w-4 h-4 text-chess-bronze" />
            Players
          </h3>
          <div className="space-y-3">
            <div className={`flex items-center justify-between p-2 rounded ${
              currentPlayer === 'black' && gameStatus === 'playing' ? 'bg-chess-bronze/10 border border-chess-bronze/30' : ''
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-chess-darkSquare rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">♛</span>
                </div>
                <span className="font-medium">Black Player</span>
              </div>
              {currentPlayer === 'black' && gameStatus === 'playing' && (
                <Badge variant="default" className="text-xs">Your Turn</Badge>
              )}
            </div>
            
            <div className={`flex items-center justify-between p-2 rounded ${
              currentPlayer === 'white' && gameStatus === 'playing' ? 'bg-chess-bronze/10 border border-chess-bronze/30' : ''
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-chess-lightSquare border-2 border-chess-darkSquare rounded-full flex items-center justify-center">
                  <span className="text-chess-darkSquare text-xs font-bold">♕</span>
                </div>
                <span className="font-medium">White Player</span>
              </div>
              {currentPlayer === 'white' && gameStatus === 'playing' && (
                <Badge variant="default" className="text-xs">Your Turn</Badge>
              )}
            </div>
          </div>
        </Card>

        {/* Move History */}
        <Card className="game-panel">
          <h3 className="font-semibold mb-3 text-chess-forest">Move History</h3>
          <div className="max-h-48 overflow-y-auto">
            {moveHistory.length === 0 ? (
              <p className="text-muted-foreground text-sm">No moves yet</p>
            ) : (
              <div className="grid grid-cols-2 gap-1 text-sm">
                {moveHistory.map((move, index) => (
                  <div key={index} className="flex items-center gap-1">
                    <span className="text-muted-foreground w-6">
                      {Math.floor(index / 2) + 1}{index % 2 === 0 ? '.' : '...'}
                    </span>
                    <span className="font-mono">{move}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Captured Pieces */}
        <Card className="game-panel">
          <h3 className="font-semibold mb-3 text-chess-forest">Captured Pieces</h3>
          <div className="space-y-2">
            <div>
              <span className="text-sm font-medium">White captured:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {capturedPieces.white.map((piece, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {piece.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <span className="text-sm font-medium">Black captured:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {capturedPieces.black.map((piece, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {piece.toUpperCase()}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Game Settings */}
        <Card className="game-panel">
          <h3 className="font-semibold mb-3 text-chess-forest">Quick Actions</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => {
                setGameMode('timed')
                setWhiteTime(300)
                setBlackTime(300)
                resetGame()
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Blitz (5 minutes)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => {
                setGameMode('timed')
                setWhiteTime(60)
                setBlackTime(60)
                resetGame()
              }}
            >
              <Clock className="w-4 h-4 mr-2" />
              Bullet (1 minute)
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => {
                setGameMode('untimed')
                resetGame()
              }}
            >
              <Settings className="w-4 h-4 mr-2" />
              Classical (Untimed)
            </Button>
            <Button variant="outline" size="sm" className="w-full justify-start" disabled>
              <Users className="w-4 h-4 mr-2" />
              vs AI (Coming Soon)
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}