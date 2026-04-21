import React from 'react';
import { useAppStore, type TimeOfDay } from '../../store/useAppStore';
import { Clock, Brain, Flame } from 'lucide-react';

const MOODS = [
  { value: 5, emoji: '😊', label: 'Great' },
  { value: 4, emoji: '😐', label: 'Okay' },
  { value: 3, emoji: '😞', label: 'Sad' },
  { value: 2, emoji: '😰', label: 'Anxious' },
  { value: 1, emoji: '🤯', label: 'Overwhelmed' },
];

const TIMES: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening', 'Late Night'];

export const InputControls: React.FC = () => {
  const { 
    timeOfDay, setTimeOfDay, 
    mood, setMood, 
    stressLevel, setStressLevel 
  } = useAppStore();

  return (
    <div className="glass-panel p-6 w-full max-w-md mx-auto space-y-8">
      {/* Time of Day */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary/80">
          <Clock className="w-4 h-4 text-neon-cyan" />
          <label className="text-sm font-semibold uppercase tracking-wider">Time of Day</label>
        </div>
        <select
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value as TimeOfDay)}
          className="w-full bg-background border border-surface-border rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan/50 appearance-none transition-all cursor-pointer"
        >
          {TIMES.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Mood */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-primary/80">
          <Brain className="w-4 h-4 text-neon-purple" />
          <label className="text-sm font-semibold uppercase tracking-wider">Current Mood</label>
        </div>
        <div className="flex justify-between items-center bg-background border border-surface-border rounded-xl p-2">
          {MOODS.map(m => (
            <button
              key={m.value}
              onClick={() => setMood(m.value)}
              title={m.label}
              className={`text-2xl w-12 h-12 flex items-center justify-center rounded-lg transition-all duration-300 ${
                mood === m.value 
                  ? 'bg-surface shadow-glow-purple border border-neon-purple/50 scale-110' 
                  : 'hover:bg-surface/50 opacity-50 hover:opacity-100'
              }`}
            >
              {m.emoji}
            </button>
          ))}
        </div>
      </div>

      {/* Stress Level */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-primary/80">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-neon-orange" />
            <label className="text-sm font-semibold uppercase tracking-wider">Stress Level</label>
          </div>
          <span className="font-heading font-bold text-neon-orange text-lg">{stressLevel}/10</span>
        </div>
        <div className="relative pt-2">
          <input
            type="range"
            min="1"
            max="10"
            value={stressLevel}
            onChange={(e) => setStressLevel(parseInt(e.target.value))}
            className="w-full h-2 bg-background border border-surface-border rounded-lg appearance-none cursor-pointer outline-none"
            style={{
              background: `linear-gradient(to right, rgba(249, 115, 22, 0.5) ${(stressLevel - 1) * 11.11}%, rgba(255, 255, 255, 0.05) ${(stressLevel - 1) * 11.11}%)`
            }}
          />
          {/* Custom thumb styles using Tailwind are tricky for range, we'll use a style block */}
          <style>{`
            input[type=range]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: #F97316;
              cursor: pointer;
              box-shadow: 0 0 15px rgba(249, 115, 22, 0.8);
              border: 2px solid #fff;
              transition: transform 0.2s;
            }
            input[type=range]::-webkit-slider-thumb:hover {
              transform: scale(1.2);
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};
