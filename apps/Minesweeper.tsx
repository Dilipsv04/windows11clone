import React, { useState, useEffect } from 'react';
import { MineIcon } from '../assets/icons';

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  adjacentMines: number;
};

type GameStatus = 'playing' | 'won' | 'lost';

const createBoard = (rows: number, cols: number, mines: number): Cell[][] => {
  const board: Cell[][] = Array(rows).fill(null).map(() => 
    Array(cols).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      adjacentMines: 0,
    }))
  );

  let minesPlaced = 0;
  while (minesPlaced < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!board[r][c].isMine) {
      board[r][c].isMine = true;
      minesPlaced++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c].isMine) continue;
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue;
          const nr = r + i;
          const nc = c + j;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc].isMine) {
            count++;
          }
        }
      }
      board[r][c].adjacentMines = count;
    }
  }

  return board;
};

const Minesweeper: React.FC = () => {
  const [board, setBoard] = useState<Cell[][]>(() => createBoard(16, 16, 40));
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [flags, setFlags] = useState(40);

  const resetGame = () => {
    setBoard(createBoard(16, 16, 40));
    setGameStatus('playing');
    setFlags(40);
  };
  
  useEffect(() => {
    if (gameStatus !== 'playing') return;
    const revealedCount = board.flat().filter(c => c.isRevealed).length;
    const totalSafeCells = 16 * 16 - 40;
    if (revealedCount === totalSafeCells) {
        setGameStatus('won');
    }
  }, [board, gameStatus]);


  const revealCell = (r: number, c: number) => {
    if (gameStatus !== 'playing' || board[r][c].isRevealed || board[r][c].isFlagged) return;

    const newBoard = JSON.parse(JSON.stringify(board));
    
    if (newBoard[r][c].isMine) {
      setGameStatus('lost');
      // Reveal all mines on loss
      newBoard.forEach((row: Cell[]) => row.forEach(cell => { if(cell.isMine) cell.isRevealed = true; }));
      setBoard(newBoard);
      return;
    }
    
    const reveal = (row: number, col: number) => {
        if (row < 0 || row >= 16 || col < 0 || col >= 16 || newBoard[row][col].isRevealed) return;

        newBoard[row][col].isRevealed = true;

        if (newBoard[row][col].adjacentMines === 0) {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    reveal(row + i, col + j);
                }
            }
        }
    };

    reveal(r, c);
    setBoard(newBoard);
  };

  const flagCell = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameStatus !== 'playing' || board[r][c].isRevealed) return;

    const newBoard = [...board];
    const cell = newBoard[r][c];
    if (cell.isFlagged) {
      cell.isFlagged = false;
      setFlags(f => f + 1);
    } else if (flags > 0) {
      cell.isFlagged = true;
      setFlags(f => f - 1);
    }
    setBoard(newBoard);
  };
  
  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return '🚩';
    if (!cell.isRevealed) return null;
    if (cell.isMine) return <MineIcon className="w-4 h-4 text-white" />;
    if (cell.adjacentMines > 0) {
        const colors = ['text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500', 'text-yellow-500', 'text-cyan-500', 'text-orange-500', 'text-pink-500'];
        return <span className={`font-bold ${colors[cell.adjacentMines-1]}`}>{cell.adjacentMines}</span>
    }
    return null;
  }
  
  return (
    <div className="h-full w-full flex flex-col bg-[#202020] text-white items-center justify-center p-4 select-none">
        <div className="flex justify-between items-center w-full max-w-lg mb-4 p-2 bg-gray-800 rounded-lg">
            <div className="text-xl font-bold text-red-500">{flags.toString().padStart(3, '0')}</div>
            <button onClick={resetGame} className="text-2xl">
                {gameStatus === 'playing' && '🙂'}
                {gameStatus === 'won' && '😎'}
                {gameStatus === 'lost' && '😵'}
            </button>
            <div className="text-xl font-bold text-red-500">000</div>
        </div>
        <div className="grid grid-cols-16 border border-gray-600 bg-gray-700 p-1">
            {board.map((row, r) => (
                row.map((cell, c) => (
                    <div
                        key={`${r}-${c}`}
                        onClick={() => revealCell(r, c)}
                        onContextMenu={(e) => flagCell(e, r, c)}
                        className={`w-6 h-6 flex items-center justify-center text-sm border
                        ${!cell.isRevealed
                            ? 'bg-gray-600 hover:bg-gray-500 border-gray-500' 
                            : 'bg-gray-800 border-gray-700'
                        }`}
                    >
                       {getCellContent(cell)}
                    </div>
                ))
            ))}
        </div>
         <style>{'.grid-cols-16 { grid-template-columns: repeat(16, minmax(0, 1fr)); }'}</style>
    </div>
  );
};

export default Minesweeper;
