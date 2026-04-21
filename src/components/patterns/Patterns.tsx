import React from 'react';
import { MOCK_HEATMAP_DATA, MOCK_TIMELINE_DECISIONS } from '../../lib/mockData';
import { Moon, Flame, Smartphone, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

// Mini sparkline data
const data1 = [10, 20, 15, 40, 50, 80, 90];
const data2 = [20, 30, 80, 40, 90, 85, 95];
const data3 = [10, 15, 30, 25, 45, 40, 50];

const mapData = (arr: number[]) => arr.map((val, i) => ({ x: i, y: val }));

const InsightCards = () => (
  <div className="grid md:grid-cols-3 gap-6 mb-12">
    <div className="glass-panel p-6 border-neon-purple/20 hover:border-neon-purple/40 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-neon-purple/10 rounded-lg">
          <Moon className="w-5 h-5 text-neon-purple" />
        </div>
        <h4 className="font-heading font-bold">Night Craver</h4>
      </div>
      <p className="text-sm text-primary/80 mb-4">83% of your cravings occur after 10PM</p>
      <div className="h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mapData(data1)}>
            <Area type="monotone" dataKey="y" stroke="#A855F7" fill="#A855F7" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="glass-panel p-6 border-neon-orange/20 hover:border-neon-orange/40 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-neon-orange/10 rounded-lg">
          <Flame className="w-5 h-5 text-neon-orange" />
        </div>
        <h4 className="font-heading font-bold">Stress Eater</h4>
      </div>
      <p className="text-sm text-primary/80 mb-4">Junk cravings spike 2.4x when stress &gt; 7</p>
      <div className="h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mapData(data2)}>
            <Area type="monotone" dataKey="y" stroke="#F97316" fill="#F97316" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>

    <div className="glass-panel p-6 border-neon-cyan/20 hover:border-neon-cyan/40 transition-colors">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-neon-cyan/10 rounded-lg">
          <Smartphone className="w-5 h-5 text-neon-cyan" />
        </div>
        <h4 className="font-heading font-bold">Screen Binge</h4>
      </div>
      <p className="text-sm text-primary/80 mb-4">You snack 40% more during 2+ hr screen sessions</p>
      <div className="h-12 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mapData(data3)}>
            <Area type="monotone" dataKey="y" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.2} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

const CravingHeatmap = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const times = ['6A-10A', '10A-2P', '2P-6P', '6P-10P', '10P-2A', '2A-6A'];

  const getColor = (val: number) => {
    if (val < 25) return 'bg-semantic-success/20';
    if (val < 50) return 'bg-semantic-success/60';
    if (val < 75) return 'bg-neon-orange/60';
    return 'bg-semantic-danger/80 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
  };

  return (
    <div className="glass-panel p-8">
      <h3 className="text-xl font-heading font-bold mb-6 text-primary/90">Weekly Craving Heatmap</h3>
      <div className="flex">
        {/* Y-axis labels */}
        <div className="flex flex-col justify-between pr-4 py-2 text-xs text-muted font-medium w-16 shrink-0">
          {times.map(t => <div key={t} className="h-8 flex items-center">{t}</div>)}
        </div>
        {/* Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-7 gap-2">
            {days.map((d, i) => <div key={i} className="text-center text-xs text-muted font-medium mb-2">{d}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {MOCK_HEATMAP_DATA.map((row, rIdx) => 
              row.map((val, cIdx) => (
                <div 
                  key={`${rIdx}-${cIdx}`} 
                  className={`h-8 rounded-md transition-all duration-300 hover:scale-110 cursor-pointer ${getColor(val)}`}
                  title={`${days[cIdx]} ${times[rIdx]}: Risk ${val}%`}
                />
              ))
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-4 text-xs text-muted">
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-semantic-success/20"></div> Low</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-neon-orange/60"></div> Med</span>
        <span className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-semantic-danger/80"></div> High</span>
      </div>
    </div>
  );
};

const DecisionTimeline = () => {
  const getStatusColor = (status: string) => {
    if (status === 'resisted') return 'border-semantic-success text-semantic-success';
    if (status === 'compromised') return 'border-neon-orange text-neon-orange';
    return 'border-semantic-danger text-semantic-danger';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'resisted') return <TrendingDown className="w-4 h-4" />;
    if (status === 'compromised') return <Minus className="w-4 h-4" />;
    return <TrendingUp className="w-4 h-4" />;
  };

  return (
    <div className="glass-panel p-8">
      <h3 className="text-xl font-heading font-bold mb-6 text-primary/90">Decision History</h3>
      <div className="space-y-4">
        {MOCK_TIMELINE_DECISIONS.map(decision => (
          <div key={decision.id} className="flex gap-4 group">
            {/* Timeline Line & Dot */}
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full border-2 bg-background ${getStatusColor(decision.status)}`} />
              <div className="w-px h-full bg-surface-border my-1 group-last:hidden" />
            </div>
            
            {/* Content */}
            <div className="pb-6">
              <span className="text-xs text-muted font-medium block mb-1">{decision.timestamp}</span>
              <div className={`glass-panel border-l-4 p-4 ${getStatusColor(decision.status).split(' ')[0]} bg-surface/50`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-heading font-bold text-sm text-primary">{decision.action}</span>
                  <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md bg-background ${getStatusColor(decision.status)}`}>
                    {getStatusIcon(decision.status)}
                    {decision.outcome}
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-muted">Risk Level:</span>
                  <span className={`px-1.5 py-0.5 rounded ${
                    decision.risk === 'High' ? 'bg-semantic-danger/20 text-semantic-danger' : 
                    decision.risk === 'Medium' ? 'bg-neon-orange/20 text-neon-orange' : 
                    'bg-semantic-success/20 text-semantic-success'
                  }`}>{decision.risk}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Patterns: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-12 max-w-6xl">
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold tracking-wide text-primary/90">
          Behavior Patterns
        </h2>
        <p className="text-muted mt-2">
          Your subconscious eating triggers analyzed and decoded.
        </p>
      </div>

      <InsightCards />

      <div className="grid lg:grid-cols-2 gap-8">
        <CravingHeatmap />
        <DecisionTimeline />
      </div>
    </div>
  );
};
