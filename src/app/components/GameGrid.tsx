import { PIECES, EMPTY_CELL, GRID_WIDTH, GRID_HEIGHT } from './gameLogic';
import type { TetrominoType } from './gameLogic';

interface GameGridProps {
  grid: string[][];
  currentPiece: { type: TetrominoType; x: number; y: number; rotation: number } | null;
}

export function GameGrid({ grid, currentPiece }: GameGridProps) {
  const isPartOfCurrentPiece = (row: number, col: number): boolean => {
    if (!currentPiece) return false;
    const shape = PIECES[currentPiece.type].rotations[currentPiece.rotation];
    for (let r = 0; r < shape.length; r++)
      for (let c = 0; c < shape[r].length; c++)
        if (shape[r][c] && currentPiece.y + r === row && currentPiece.x + c === col) return true;
    return false;
  };

  const getGhostPiece = () => {
    if (!currentPiece) return null;
    let ghostY = currentPiece.y;
    while (ghostY < GRID_HEIGHT) {
      const shape = PIECES[currentPiece.type].rotations[currentPiece.rotation];
      let wouldCollide = false;
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (shape[r][c]) {
            const gridX = currentPiece.x + c;
            const gridY = ghostY + r + 1;
            if (gridY >= GRID_HEIGHT || (gridY >= 0 && grid[gridY][gridX] !== EMPTY_CELL)) { wouldCollide = true; break; }
          }
        }
        if (wouldCollide) break;
      }
      if (wouldCollide) break;
      ghostY++;
    }
    return { ...currentPiece, y: ghostY };
  };

  const ghostPiece = getGhostPiece();

  const isPartOfGhostPiece = (row: number, col: number): boolean => {
    if (!ghostPiece || !currentPiece || ghostPiece.y === currentPiece.y) return false;
    const shape = PIECES[ghostPiece.type].rotations[ghostPiece.rotation];
    for (let r = 0; r < shape.length; r++)
      for (let c = 0; c < shape[r].length; c++)
        if (shape[r][c] && ghostPiece.y + r === row && ghostPiece.x + c === col) return true;
    return false;
  };

  const renderCell = (row: number, col: number) => {
    if (isPartOfCurrentPiece(row, col)) {
      return <div key={`${row}-${col}`} className={`w-6 h-6 border border-white/20 ${PIECES[currentPiece!.type].color} shadow-lg rounded-sm`} />;
    }
    if (isPartOfGhostPiece(row, col)) {
      return <div key={`${row}-${col}`} className={`w-6 h-6 border border-cyan-400/30 ${PIECES[ghostPiece!.type].color.split(' ')[0]} opacity-20 rounded-sm`} />;
    }
    const cellValue = grid[row][col];
    if (cellValue && cellValue !== EMPTY_CELL) {
      return <div key={`${row}-${col}`} className={`w-6 h-6 border border-white/20 ${PIECES[cellValue as TetrominoType].color} shadow-lg opacity-90 rounded-sm`} />;
    }
    return <div key={`${row}-${col}`} className="w-6 h-6 border border-slate-700/40 bg-slate-900/30" />;
  };

  return (
    <div className="border-4 border-cyan-500/40 bg-slate-800/50 backdrop-blur-sm p-2 rounded-lg shadow-2xl">
      <div className="grid grid-cols-10 gap-0 bg-slate-900/70 border-2 border-cyan-600/30 rounded">
        {grid.map((row, rowIndex) => row.map((_, colIndex) => renderCell(rowIndex, colIndex)))}
      </div>
    </div>
  );
}
