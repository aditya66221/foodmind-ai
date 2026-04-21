import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { RealTimeEventBadge } from './RealTimeEventBadge';
import { Activity, Brain, ShieldAlert, Cpu, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const NODES = [
  { id: 'trigger', label: 'Trigger', icon: <Activity className="w-5 h-5" /> },
  { id: 'analysis', label: 'Risk Analysis', icon: <Cpu className="w-5 h-5" /> },
  { id: 'decision', label: 'AI Decision', icon: <Brain className="w-5 h-5" /> },
  { id: 'intervention', label: 'Intervention', icon: <ShieldAlert className="w-5 h-5" /> },
  { id: 'outcome', label: 'Outcome', icon: <CheckCircle className="w-5 h-5" /> }
];

export const WorkflowVisualizer: React.FC = () => {
  const { isDemoMode, currentRisk } = useAppStore();
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    if (isDemoMode) {
      // Demo sequence logic: light up left to right
      setActiveIndex(0);
      const timers = NODES.map((_, i) => 
        setTimeout(() => setActiveIndex(i), 1500 + i * 800)
      );
      return () => timers.forEach(clearTimeout);
    } else {
      // Normal mode logic based on current risk
      if (currentRisk > 70) setActiveIndex(3); // Intervention
      else if (currentRisk > 40) setActiveIndex(1); // Analysis
      else setActiveIndex(-1); // Default
    }
  }, [isDemoMode, currentRisk]);

  return (
    <div className="w-full max-w-5xl mx-auto relative mt-12 pt-8 pb-4">
      <RealTimeEventBadge isDemoMode={isDemoMode} />
      
      <h3 className="text-xl font-heading font-bold text-center mb-8 text-primary/70 tracking-widest uppercase">
        Live System Logic
      </h3>

      <div className="relative flex items-center justify-between">
        {/* Background Connecting Lines */}
        <div className="absolute left-[10%] right-[10%] top-1/2 -translate-y-1/2 h-0.5 bg-surface-border -z-10 overflow-hidden">
          {/* Animated Glow Dot along the path */}
          <div className="w-full h-full relative">
            <motion.div 
              animate={{ x: ['-10%', '110%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="absolute top-1/2 -translate-y-1/2 w-8 h-2 bg-neon-cyan shadow-[0_0_10px_rgba(6,182,212,0.8)] rounded-full blur-[2px]"
            />
          </div>
        </div>

        {/* Nodes */}
        {NODES.map((node, i) => {
          const isActive = i <= activeIndex;
          return (
            <div key={node.id} className="flex flex-col items-center gap-3 relative bg-background px-4">
              <div 
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border relative ${
                  isActive 
                    ? 'bg-surface border-neon-cyan text-neon-cyan shadow-glow-cyan scale-110' 
                    : 'bg-background border-surface-border text-muted'
                }`}
              >
                {node.icon}
                {isActive && (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 rounded-2xl border border-neon-cyan animate-pulse-border"
                  />
                )}
              </div>
              <span className={`text-xs font-semibold tracking-wide uppercase transition-colors duration-500 ${
                isActive ? 'text-neon-cyan drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'text-muted'
              }`}>
                {node.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
