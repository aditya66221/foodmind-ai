import React from 'react';
import { motion } from 'framer-motion';
import type { ScanResult } from '../../lib/gemini';
import { Activity, Flame, ShieldCheck, TrendingUp } from 'lucide-react';

interface ScanResultsProps {
  result: ScanResult;
}

export const ScanResults: React.FC<ScanResultsProps> = ({ result }) => {
  const getHealthColor = (score: number) => {
    if (score >= 75) return 'text-semantic-success border-semantic-success drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]';
    if (score >= 40) return 'text-neon-orange border-neon-orange drop-shadow-[0_0_10px_rgba(249,115,22,0.5)]';
    return 'text-semantic-danger border-semantic-danger drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]';
  };

  const scoreColor = getHealthColor(result.healthScore);
  const isHealthy = result.healthScore >= 50;

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass-panel p-6 h-full flex flex-col"
    >
      {/* Header section with Name and Health Score */}
      <div className="flex items-start justify-between mb-8 pb-6 border-b border-surface-border">
        <div>
          <h3 className="text-2xl font-heading font-bold mb-1">{result.foodName}</h3>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse"></span>
            <span className="text-sm font-semibold text-neon-cyan tracking-widest uppercase">98% Confidence</span>
          </div>
        </div>
        
        <div className={`shrink-0 w-20 h-20 rounded-full border-4 flex flex-col items-center justify-center bg-background/50 ${scoreColor}`}>
          <span className="text-2xl font-heading font-bold leading-none">{result.healthScore}</span>
          <span className="text-[10px] font-semibold uppercase tracking-widest mt-1 opacity-80">Score</span>
        </div>
      </div>

      {/* Macros Grid */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        <div className="bg-background/40 border border-surface-border rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <Flame className="w-4 h-4 text-neon-orange mb-1" />
          <span className="text-lg font-bold">{result.calories}</span>
          <span className="text-[10px] text-muted uppercase tracking-wider">kcal</span>
        </div>
        <div className="bg-background/40 border border-surface-border rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <Activity className="w-4 h-4 text-neon-purple mb-1" />
          <span className="text-lg font-bold">{result.protein}g</span>
          <span className="text-[10px] text-muted uppercase tracking-wider">Protein</span>
        </div>
        <div className="bg-background/40 border border-surface-border rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <TrendingUp className="w-4 h-4 text-neon-cyan mb-1" />
          <span className="text-lg font-bold">{result.carbs}g</span>
          <span className="text-[10px] text-muted uppercase tracking-wider">Carbs</span>
        </div>
        <div className="bg-background/40 border border-surface-border rounded-xl p-3 flex flex-col items-center justify-center text-center">
          <ShieldCheck className="w-4 h-4 text-semantic-success mb-1" />
          <span className="text-lg font-bold">{result.fat}g</span>
          <span className="text-[10px] text-muted uppercase tracking-wider">Fat</span>
        </div>
      </div>

      {/* AI Verdict */}
      <div className={`mb-6 p-4 rounded-xl border ${isHealthy ? 'bg-semantic-success/10 border-semantic-success/30' : 'bg-semantic-danger/10 border-semantic-danger/30'}`}>
        <p className={`font-medium ${isHealthy ? 'text-semantic-success' : 'text-semantic-danger'}`}>
          <span className="font-bold">AI Verdict:</span> {result.verdict}
        </p>
      </div>

      {/* Better Alternative */}
      <div className="mt-auto bg-surface border border-neon-cyan/30 rounded-xl p-4 shadow-glow-cyan/10">
        <h4 className="text-xs font-semibold text-neon-cyan tracking-widest uppercase mb-2">Suggested Alternative</h4>
        <p className="text-sm text-primary/90">{result.betterAlternative}</p>
      </div>
    </motion.div>
  );
};
