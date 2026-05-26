import { PIECES } from './gameLogic';
import type { TetrominoType } from './gameLogic';

interface NextPiecePreviewProps { piece: TetrominoType; }

export function NextPiecePreview({ piece }: NextPiecePreviewProps) {
  const currentPiece = PIECES[piece];
  if (!currentPiece) return null;
  const { color, rotations } = currentPiece;
  const shape = rotations[0];

  return (
    <div className="bg-white/10 backdrop-blur-sm border-2 border-cyan-400/30 p-3 rounded-lg shadow-lg min-w-[180px]">
      <h3 className="text-cyan-300 mb-2 text-center">NEXT</h3>
      <div className="bg-slate-900/50 border border-cyan-500/30 p-3 rounded-md shadow-inner">
        <div className="flex justify-center">
          <div className="inline-grid gap-0" style={{ gridTemplateColumns: `repeat(${Math.max(...shape.map(r => r.length))}, 1fr)` }}>
            {shape.map((row, ri) => row.map((cell, ci) => (
              <div key={`${ri}-${ci}`} className={`w-4 h-4 ${cell ? `${color} shadow-lg border border-white/20 rounded-sm` : 'bg-transparent'}`} />
            )))}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-white/60 text-xs mb-2 text-center">PIECES</div>
        <div className="grid grid-cols-4 gap-1">
          {Object.entries(PIECES).map(([name, data]) => (
            <div key={name} className={`aspect-square border ${name === piece ? 'border-cyan-400 bg-cyan-900/30' : 'border-cyan-600/20 bg-slate-900/30'} p-1 rounded flex items-center justify-center`}>
              <div className="grid gap-0" style={{ gridTemplateColumns: `repeat(${Math.max(...data.rotations[0].map(r => r.length))}, 1fr)` }}>
                {data.rotations[0].map((row, ri) => row.map((cell, ci) => (
                  <div key={`${ri}-${ci}`} className={`w-1 h-1 ${cell ? data.color.split(' ')[0] : 'bg-transparent'}`} />
                )))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
