"use client"

import { useState, useCallback } from 'react'
import { Chess } from 'chess.js'
import { Chessboard } from 'react-chessboard'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Lightbulb, 
  Trophy,
  Target
} from 'lucide-react'

interface ChessPuzzle {
  id: string
  fen: string
  solution: string[]
  description: string
  difficulty: 'easy' | 'medium' | 'hard'
  theme: string
  rating: number
}

interface ChessPuzzleProps {
  puzzle?: ChessPuzzle
  onSolved?: (puzzleId: string, moves: number) => void
}

// Sample puzzles for demonstration
const samplePuzzles: ChessPuzzle[] = [
  {
    id: '1',
    fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4',
    solution: ['d8d4', 'f3d4'],
    description: 'Find the best move for Black to win material',
    difficulty: 'easy',
    theme: 'Fork',
    rating: 1200
  },
  {
    id: '2', 
    fen: 'rnb1kbnr/pppp1ppp/8/4p3/4P3/8/PPPPKPPP/RNBQ1BNR b kq - 0 3',
    solution: ['d8h4'],
    description: 'Black to play and win quickly',
    difficulty: 'medium',
    theme: 'Checkmate in 1',
    rating: 1500
  }
]

export default function ChessPuzzle({ puzzle, onSolved }: ChessPuzzleProps) {
  const [currentPuzzle, setCurrentPuzzle] = useState<ChessPuzzle>(
    puzzle || samplePuzzles[0]
  )
  const [game, setGame] = useState(new Chess(currentPuzzle.fen))
  const [playerMoves, setPlayerMoves] = useState<string[]>([])
  const [puzzleStatus, setPuzzleStatus] = useState<'playing' | 'solved' | 'failed'>('playing')
  const [showHint, setShowHint] = useState(false)
  const [moveCount, setMoveCount] = useState(0)

  console.log('ChessPuzzle component rendered, puzzle:', currentPuzzle.id)

  const resetPuzzle = useCallback(() => {
    console.log('Resetting puzzle')
    const newGame = new Chess(currentPuzzle.fen)
    setGame(newGame)
    setPlayerMoves([])
    setPuzzleStatus('playing')
    setShowHint(false)
    setMoveCount(0)
  }, [currentPuzzle])

  const nextPuzzle = useCallback(() => {
    console.log('Loading next puzzle')
    const nextIndex = (samplePuzzles.findIndex(p => p.id === currentPuzzle.id) + 1) % samplePuzzles.length
    const nextPuzzle = samplePuzzles[nextIndex]
    setCurrentPuzzle(nextPuzzle)
    const newGame = new Chess(nextPuzzle.fen)
    setGame(newGame)
    setPlayerMoves([])
    setPuzzleStatus('playing')
    setShowHint(false)
    setMoveCount(0)
  }, [currentPuzzle])

  const onDrop = useCallback((sourceSquare: string, targetSquare: string) => {
    if (puzzleStatus !== 'playing') return false

    console.log('Puzzle move attempted:', sourceSquare, 'to', targetSquare)
    
    const gameCopy = new Chess(game.fen())
    
    try {
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: 'q'
      })

      if (move) {
        const moveString = sourceSquare + targetSquare
        const newPlayerMoves = [...playerMoves, moveString]
        
        console.log('Move made:', moveString)
        console.log('Player moves so far:', newPlayerMoves)
        console.log('Expected solution:', currentPuzzle.solution)
        
        setGame(gameCopy)
        setPlayerMoves(newPlayerMoves)
        setMoveCount(prev => prev + 1)

        // Check if move matches solution
        const expectedMove = currentPuzzle.solution[newPlayerMoves.length - 1]
        
        if (moveString === expectedMove) {
          if (newPlayerMoves.length === currentPuzzle.solution.length) {
            // Puzzle solved!
            console.log('Puzzle solved!')
            setPuzzleStatus('solved')
            onSolved?.(currentPuzzle.id, moveCount + 1)
          }
          // Continue with next expected move
        } else {
          // Wrong move
          console.log('Wrong move, expected:', expectedMove)
          setPuzzleStatus('failed')
        }

        return true
      }
    } catch (error) {
      console.log('Invalid move:', error)
      return false
    }
    
    return false
  }, [game, playerMoves, currentPuzzle, puzzleStatus, moveCount, onSolved])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'hard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = () => {
    switch (puzzleStatus) {
      case 'solved': return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'failed': return <XCircle className="w-5 h-5 text-red-600" />
      default: return <Target className="w-5 h-5 text-blue-600" />
    }
  }

  const progressPercentage = (playerMoves.length / currentPuzzle.solution.length) * 100

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chess Board */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <h2 className="text-xl font-bold text-chess-forest">Chess Puzzle</h2>
              </div>
              <Badge className={getDifficultyColor(currentPuzzle.difficulty)}>
                {currentPuzzle.difficulty} • {currentPuzzle.rating}
              </Badge>
            </div>

            <div className="chess-board mb-4">
              <Chessboard
                position={game.fen()}
                onPieceDrop={onDrop}
                boardWidth={Math.min(500, typeof window !== 'undefined' ? window.innerWidth - 100 : 500)}
                customBoardStyle={{
                  borderRadius: '8px',
                  boxShadow: '0 8px 32px rgba(45, 74, 61, 0.3)',
                }}
                customDarkSquareStyle={{ backgroundColor: '#8B4513' }}
                customLightSquareStyle={{ backgroundColor: '#F4F1E8' }}
                areArrowsAllowed={true}
                showBoardNotation={true}
              />
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{playerMoves.length} / {currentPuzzle.solution.length} moves</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Status Messages */}
            {puzzleStatus === 'solved' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">
                    Puzzle Solved! Great job! ({moveCount} moves)
                  </span>
                </div>
              </div>
            )}

            {puzzleStatus === 'failed' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  <span className="font-medium text-red-800">
                    That's not the solution. Try again!
                  </span>
                </div>
              </div>
            )}

            {/* Controls */}
            <div className="flex gap-2">
              <Button onClick={resetPuzzle} variant="outline" size="sm">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button 
                onClick={() => setShowHint(!showHint)} 
                variant="outline" 
                size="sm"
              >
                <Lightbulb className="w-4 h-4 mr-2" />
                Hint
              </Button>
              {puzzleStatus === 'solved' && (
                <Button onClick={nextPuzzle} size="sm">
                  Next Puzzle
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Puzzle Info Panel */}
        <div className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold mb-2 text-chess-forest">Puzzle Info</h3>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium">Theme:</span>
                <Badge variant="outline" className="ml-2">{currentPuzzle.theme}</Badge>
              </div>
              <div>
                <span className="font-medium">Description:</span>
                <p className="text-muted-foreground mt-1">{currentPuzzle.description}</p>
              </div>
              <div>
                <span className="font-medium">Rating:</span>
                <span className="ml-2">{currentPuzzle.rating}</span>
              </div>
            </div>
          </Card>

          {showHint && (
            <Card className="p-4 bg-blue-50 border-blue-200">
              <h3 className="font-semibold mb-2 text-blue-800">Hint</h3>
              <p className="text-sm text-blue-700">
                Look for tactical opportunities. The first move in the solution is from{' '}
                <code className="bg-blue-100 px-1 rounded">
                  {currentPuzzle.solution[0]?.slice(0, 2)}
                </code>{' '}
                to{' '}
                <code className="bg-blue-100 px-1 rounded">
                  {currentPuzzle.solution[0]?.slice(2, 4)}
                </code>
              </p>
            </Card>
          )}

          <Card className="p-4">
            <h3 className="font-semibold mb-2 text-chess-forest">Your Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Puzzles Solved:</span>
                <span className="font-medium">42</span>
              </div>
              <div className="flex justify-between">
                <span>Success Rate:</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="flex justify-between">
                <span>Average Rating:</span>
                <span className="font-medium">1350</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}