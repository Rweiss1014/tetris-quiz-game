import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { formatScore } from './highScoreLogic';
import { RotateCcw } from 'lucide-react';

interface GameOverDialogProps { open: boolean; score: number; level: number; lines: number; onRestart: () => void; }

export function GameOverDialog({ open, score, level, lines, onRestart }: GameOverDialogProps) {
  return (
    <Dialog open={open}>
      <DialogContent hideClose className="sm:max-w-md bg-gradient-to-br from-slate-800 to-red-900 border-4 border-red-500 text-white p-4">
        <DialogHeader><DialogTitle className="text-2xl text-center text-red-400">GAME OVER</DialogTitle></DialogHeader>
        <div className="space-y-6">
          <div className="bg-slate-900/50 border-2 border-red-400/30 p-4 rounded-lg">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div><div className="text-white/70 text-sm">FINAL SCORE</div><div className="text-cyan-300">{formatScore(score)}</div></div>
              <div><div className="text-white/70 text-sm">LEVEL</div><div className="text-cyan-300">{level}</div></div>
            </div>
            <div className="text-center mt-3 pt-3 border-t border-red-400/20">
              <div className="text-white/70 text-sm">LINES CLEARED</div>
              <div className="text-cyan-300">{lines}</div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-white/90">Better luck next time!</div>
            <div className="text-white/60 text-sm mt-1">Keep practicing to improve your skills.</div>
          </div>
          <Button onClick={onRestart} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 shadow-lg hover:shadow-cyan-500/50">
            <RotateCcw className="w-4 h-4 mr-2" /> Try Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
