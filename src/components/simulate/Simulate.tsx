import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis } from 'recharts';
import { Battery, Brain, Moon, Activity } from 'lucide-react';

// Generate 24 hours of data
const generateSimulationData = () => {
  const data = [];
  for (let i = 0; i <= 24; i++) {
    const time = i;
    // Healthy energy logic
    let healthyEnergy = 80;
    if (i > 8 && i < 22) healthyEnergy = 85 + Math.sin(i * 0.5) * 10;
    if (i === 13 || i === 19) healthyEnergy -= 10; // Post-meal slight dip
    if (i >= 22 || i <= 6) healthyEnergy = 20; // Sleep

    // Junk energy logic
    let junkEnergy = 70;
    if (i > 8 && i < 22) junkEnergy = 60 + Math.sin(i * 0.8) * 30; // Wild swings
    if (i === 13) junkEnergy = 95; // Sugar rush
    if (i === 15) junkEnergy = 30; // Sugar crash
    if (i === 20) junkEnergy = 90; // Late night binge
    if (i === 23) junkEnergy = 10; // Severe crash
    if (i >= 22 || i <= 6) junkEnergy = 40; // Disrupted sleep

    data.push({
      time,
      timeLabel: `${i.toString().padStart(2, '0')}:00`,
      healthyEnergy: Math.max(0, Math.min(100, healthyEnergy)),
      junkEnergy: Math.max(0, Math.min(100, junkEnergy)),
    });
  }
  return data;
};

const simData = generateSimulationData();

export const Simulate: React.FC = () => {
  const [scrubberHour, setScrubberHour] = useState(12);

  const currentData = simData[scrubberHour];

  const getMoodEmoji = (energy: number) => {
    if (energy > 80) return '🤩';
    if (energy > 60) return '🙂';
    if (energy > 40) return '😐';
    if (energy > 20) return '🥱';
    return '😫';
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-heading font-bold tracking-wide text-primary/90">
          24-Hour Future Simulation
        </h2>
        <p className="text-muted mt-2">
          Drag the timeline to see how one choice diverges your entire day.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Timeline Area */}
        <div className="flex-1 space-y-8 relative">
          
          {/* Healthy Track */}
          <div className="glass-panel p-6 border-semantic-success/30 relative">
            <h4 className="absolute top-4 left-4 font-heading font-bold text-semantic-success z-10">Healthy Path</h4>
            <div className="h-40 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simData}>
                  <defs>
                    <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="timeLabel" hide />
                  <Area type="monotone" dataKey="healthyEnergy" stroke="#22C55E" fillOpacity={1} fill="url(#colorHealthy)" strokeWidth={3} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Junk Track */}
          <div className="glass-panel p-6 border-semantic-danger/30 relative">
            <h4 className="absolute top-4 left-4 font-heading font-bold text-semantic-danger z-10">Junk Path</h4>
            <div className="h-40 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simData}>
                  <defs>
                    <linearGradient id="colorJunk" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="timeLabel" hide />
                  <Area type="monotone" dataKey="junkEnergy" stroke="#EF4444" fillOpacity={1} fill="url(#colorJunk)" strokeWidth={3} isAnimationActive={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Overlaid Scrubber */}
          <div className="absolute inset-0 pt-10 pb-6 pointer-events-none px-6">
            <div className="relative w-full h-full">
              {/* Vertical Scrubber Line */}
              <div 
                className="absolute top-0 bottom-0 w-px bg-neon-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)] z-20 pointer-events-none transition-all duration-100 ease-linear"
                style={{ left: `${(scrubberHour / 24) * 100}%` }}
              >
                <div className="absolute -top-4 -left-6 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan px-2 py-1 rounded text-xs font-bold w-12 text-center backdrop-blur-md">
                  {currentData.timeLabel}
                </div>
              </div>

              {/* Invisible Range Input for Interaction */}
              <input 
                type="range" 
                min="0" 
                max="24" 
                value={scrubberHour}
                onChange={(e) => setScrubberHour(parseInt(e.target.value))}
                className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-full opacity-0 pointer-events-auto cursor-ew-resize z-30"
              />
            </div>
          </div>

          <div className="flex justify-between text-xs text-muted px-6">
            <span>00:00</span>
            <span>06:00</span>
            <span>12:00</span>
            <span>18:00</span>
            <span>24:00</span>
          </div>
        </div>

        {/* Prediction Side Panel */}
        <div className="lg:w-80 space-y-6">
          <div className="glass-panel p-6 border-neon-cyan/20 h-full flex flex-col">
            <h3 className="text-lg font-heading font-bold text-primary/90 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-neon-cyan" />
              Predicted State
            </h3>

            <div className="space-y-8 flex-1">
              {/* Healthy Prediction */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-semantic-success mb-3">Healthy Path</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary/70 flex items-center gap-1.5"><Battery className="w-3.5 h-3.5"/> Energy</span>
                      <span className="font-bold">{Math.round(currentData.healthyEnergy)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-semantic-success transition-all duration-300" style={{ width: `${currentData.healthyEnergy}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary/70 flex items-center gap-1.5"><Brain className="w-3.5 h-3.5"/> Mood</span>
                    <span className="text-xl">{getMoodEmoji(currentData.healthyEnergy)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary/70 flex items-center gap-1.5"><Moon className="w-3.5 h-3.5"/> Sleep</span>
                    <span className="text-sm font-semibold text-semantic-success">Deep</span>
                  </div>
                </div>
              </div>

              <div className="w-full h-px bg-surface-border"></div>

              {/* Junk Prediction */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-semantic-danger mb-3">Junk Path</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-primary/70 flex items-center gap-1.5"><Battery className="w-3.5 h-3.5"/> Energy</span>
                      <span className="font-bold">{Math.round(currentData.junkEnergy)}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-background rounded-full overflow-hidden">
                      <div className="h-full bg-semantic-danger transition-all duration-300" style={{ width: `${currentData.junkEnergy}%` }}></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary/70 flex items-center gap-1.5"><Brain className="w-3.5 h-3.5"/> Mood</span>
                    <span className="text-xl">{getMoodEmoji(currentData.junkEnergy)}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-primary/70 flex items-center gap-1.5"><Moon className="w-3.5 h-3.5"/> Sleep</span>
                    <span className="text-sm font-semibold text-semantic-danger">Disrupted</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
