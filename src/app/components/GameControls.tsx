import { Button } from './ui/button';

interface GameControlsProps {
  isPlaying: boolean;
  gameOver: boolean;
  gamePhase: string;
  onTogglePlay: () => void;
  onReset: () => void;
}

export function GameControls({ isPlaying, gameOver, gamePhase, onTogglePlay, onReset }: GameControlsProps) {
  const getPlayButtonText = () => {
    if (gamePhase === 'menu') return 'START GAME';
    if (isPlaying) return 'PAUSE';
    if (gameOver) return 'GAME OVER';
    return 'RESUME';
  };

  const isDisabled = gameOver || gamePhase === 'question';

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-2 items-center">
        <Button
          onClick={onTogglePlay}
          disabled={isDisabled}
          className={`px-4 py-1.5 border-2 transition-all shadow-lg ${
            gamePhase === 'menu' ? 'bg-cyan-600 hover:bg-cyan-700 border-cyan-500 text-white'
            : isPlaying ? 'bg-red-600 hover:bg-red-700 border-red-500 text-white'
            : 'bg-green-600 hover:bg-green-700 border-green-500 text-white'
          } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {getPlayButtonText()}
        </Button>
        <Button
          onClick={onReset}
          disabled={gamePhase === 'question'}
          className="px-4 py-1.5 bg-slate-600 hover:bg-slate-700 border-2 border-slate-500 text-white transition-all shadow-lg"
        >
          RESET
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full shadow-lg ${
          gamePhase === 'playing' && isPlaying ? 'bg-green-400 animate-pulse'
          : gamePhase === 'gameOver' ? 'bg-red-600'
          : 'bg-cyan-400'
        }`} />
        <span className="text-white/90 text-xs">
          {gamePhase === 'playing' ? (isPlaying ? 'PLAYING' : 'PAUSED') : gamePhase.toUpperCase()}
        </span>
      </div>
    </div>
  );
}
