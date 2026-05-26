import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Trophy, Star, Zap, Crown, Sparkles } from 'lucide-react';
import { useEffect } from 'react';
import { soundEffects } from './soundEffects';

interface GameCompleteDialogProps { open: boolean; score: number; totalLines: number; onPlayAgain: () => void; }

export function GameCompleteDialog({ open, score, totalLines, onPlayAgain }: GameCompleteDialogProps) {
  useEffect(() => { if (open) soundEffects.gameComplete(); }, [open]);

  return (
    <Dialog open={open}>
      <DialogContent hideClose className="sm:max-w-md bg-gradient-to-br from-slate-800 to-cyan-900 border-4 border-yellow-400 text-white p-4 max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle className="sr-only">Game Complete</DialogTitle></DialogHeader>
        <div className="text-center space-y-4 py-2">
          <div className="relative h-20">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 bg-yellow-400/20 rounded-full animate-ping"></div>
            </div>
            <div className="relative flex items-center justify-center">
              <Crown className="w-16 h-16 text-yellow-400 animate-bounce" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <h2 className="text-yellow-300 text-2xl">CONGRATULATIONS!</h2>
              <Sparkles className="w-5 h-5 text-yellow-300" />
            </div>
            <p className="text-white/90">You've Completed All Questions!</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-900/30 via-yellow-600/30 to-yellow-900/30 border-2 border-yellow-400/50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-300">MASTER ACHIEVED</span>
              <Trophy className="w-6 h-6 text-yellow-400" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800/50 border border-cyan-400/30 rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Star className="w-3 h-3 text-yellow-400" />
                  <span className="text-white/70 text-xs">Final Score</span>
                </div>
                <div className="text-cyan-300">{score.toLocaleString()}</div>
              </div>
              <div className="bg-slate-800/50 border border-cyan-400/30 rounded-lg p-2">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Zap className="w-3 h-3 text-yellow-400" />
                  <span className="text-white/70 text-xs">Lines Cleared</span>
                </div>
                <div className="text-cyan-300">{totalLines}</div>
              </div>
            </div>
          </div>
          <div className="bg-cyan-900/30 border border-cyan-400/30 rounded-lg p-3">
            <p className="text-white/80 text-sm">You've completed all 5 questions! Ready to challenge yourself again?</p>
          </div>
          <Button onClick={onPlayAgain} className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 shadow-lg hover:shadow-cyan-500/50 transition-all duration-200">
            <Sparkles className="w-4 h-4 mr-2" /> Play Again
          </Button>
          <div className="text-yellow-400/70 text-xs pt-2 border-t border-yellow-400/20">
            🏆 Achievement Unlocked: Tetris Training Master 🏆
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
