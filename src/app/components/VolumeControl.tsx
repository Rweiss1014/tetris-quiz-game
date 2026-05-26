import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundEffects } from './soundEffects';
import { Slider } from './ui/slider';

export function VolumeControl() {
  const [volume, setVolume] = useState(soundEffects.getVolume());
  const [isMuted, setIsMuted] = useState(!soundEffects.isEnabled());
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => { soundEffects.setVolume(volume); }, [volume]);
  useEffect(() => { soundEffects.setEnabled(!isMuted); }, [isMuted]);

  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2"
      onMouseEnter={() => setShowSlider(true)}
      onMouseLeave={() => setShowSlider(false)}>
      {showSlider && !isMuted && (
        <div className="bg-slate-800/90 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-3 py-2 w-32">
          <Slider value={[volume * 100]} min={0} max={100} step={10} onValueChange={v => setVolume(v[0] / 100)} className="cursor-pointer" />
        </div>
      )}
      <button onClick={() => { setIsMuted(!isMuted); soundEffects.click(); }}
        className="bg-slate-800/90 backdrop-blur-sm border-2 border-cyan-400/30 rounded-lg p-3 hover:bg-cyan-600/20 hover:border-cyan-400/60 transition-all duration-200"
        aria-label={isMuted ? 'Unmute' : 'Mute'}>
        {isMuted ? <VolumeX className="w-5 h-5 text-red-400" /> : <Volume2 className="w-5 h-5 text-cyan-400" />}
      </button>
    </div>
  );
}
