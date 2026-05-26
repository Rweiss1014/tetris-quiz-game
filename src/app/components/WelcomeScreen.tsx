import { Gamepad2, Brain, Zap, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { soundEffects } from './soundEffects';

interface WelcomeScreenProps { onStartGame: () => void; highScore: number; }

export function WelcomeScreen({ onStartGame, highScore }: WelcomeScreenProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border-2 border-cyan-400/30 rounded-lg p-8 shadow-2xl max-w-2xl mx-auto">
      <div className="text-center space-y-6">
        <div>
          <h1 className="text-cyan-300 text-5xl mb-2">TETRIS TRAINING</h1>
          <p className="text-white/70">Test your skills. Train your mind.</p>
        </div>
        {highScore > 0 && (
          <div className="bg-cyan-900/30 border border-cyan-400/20 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span className="text-white/90">Best Score:</span>
              <span className="text-cyan-300">{highScore.toLocaleString()}</span>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-6">
          {[{icon: Gamepad2, label: 'Classic Tetris', sub: 'Full gameplay'}, {icon: Brain, label: '5 Questions', sub: 'Test knowledge'}, {icon: Clock, label: 'Speed Matters', sub: 'Beat the clock'}].map(({icon: Icon, label, sub}) => (
            <div key={label} className="flex flex-col items-center gap-2 text-center">
              <div className="bg-cyan-600/20 p-3 rounded-lg"><Icon className="w-6 h-6 text-cyan-300" /></div>
              <div className="text-white/90 text-sm">{label}</div>
              <div className="text-white/60 text-xs">{sub}</div>
            </div>
          ))}
        </div>
        <div className="bg-slate-800/50 border border-cyan-400/20 rounded-lg p-4 text-left">
          <h3 className="text-cyan-300 mb-3 text-center">HOW TO PLAY</h3>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-700 border border-cyan-400/30 rounded text-xs text-white">←</kbd>
              <kbd className="px-2 py-1 bg-slate-700 border border-cyan-400/30 rounded text-xs text-white">→</kbd>
              <span className="text-white/70">Move</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-700 border border-cyan-400/30 rounded text-xs text-white">↑</kbd>
              <span className="text-white/70">Rotate</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-700 border border-cyan-400/30 rounded text-xs text-white">↓</kbd>
              <span className="text-white/70">Soft Drop</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 bg-slate-700 border border-cyan-400/30 rounded text-xs text-white">SPACE</kbd>
              <span className="text-white/70">Hard Drop</span>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <Button onClick={() => { soundEffects.click(); onStartGame(); }}
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-6 text-lg shadow-lg hover:shadow-cyan-500/50">
            <Gamepad2 className="w-5 h-5 mr-2" /> START GAME
          </Button>
        </div>
        <div className="text-white/50 text-xs pt-4 border-t border-cyan-400/10">
          💡 Clear lines to trigger questions. Answer all 5 questions to complete the game!
        </div>
      </div>
    </div>
  );
}
