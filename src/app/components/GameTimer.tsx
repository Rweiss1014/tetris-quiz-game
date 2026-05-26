import { Clock } from 'lucide-react';

interface GameTimerProps { seconds: number; }

export function GameTimer({ seconds }: GameTimerProps) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  return (
    <div className="bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg px-4 py-1.5 shadow-lg">
      <div className="flex items-center justify-center gap-2">
        <Clock className="w-4 h-4 text-cyan-400" />
        <span className="text-white/90 text-sm tabular-nums">{formatted}</span>
      </div>
    </div>
  );
}
