import React from 'react';
import { motion } from 'framer-motion';

const JUNK_PATH = [
  "Next 2 hours: Energy spike then crash",
  "Sleep: Disrupted, -1.5 hrs deep sleep",
  "Tomorrow mood: Guilt + low focus",
  "1 month: +2kg, cravings stronger"
];

const HEALTHY_PATH = [
  "Next 2 hours: Stable energy",
  "Sleep: Deep sleep maintained",
  "Tomorrow mood: Clear focus + pride",
  "1 month: -1kg, cravings weakening"
];

export const SplitReality: React.FC = () => {
  return (
    <div className="w-full relative py-8">
      <h3 className="text-2xl font-heading font-bold text-center mb-12 text-primary/90 tracking-wide">
        Parallel Futures
      </h3>
      
      <div className="flex flex-col md:flex-row gap-8 md:gap-0 relative">
        {/* Center Divider Line & Arrow */}
        <div className="hidden md:flex absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-surface-border items-center justify-center z-10">
          <div className="bg-background border border-surface-border p-2 rounded-full shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <svg width="24" height="48" viewBox="0 0 24 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 4V44M12 44L4 36M12 44L20 36" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50"/>
              <path d="M12 4V24" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" className="animate-pulse-border drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]"/>
            </svg>
          </div>
        </div>

        {/* Junk Path (Left) */}
        <div className="flex-1 md:pr-12">
          <div className="text-center mb-6">
            <h4 className="text-xl font-heading font-bold text-semantic-danger flex items-center justify-center gap-2">
              <span>🍔</span> Junk Food Path
            </h4>
          </div>
          <div className="space-y-4">
            {JUNK_PATH.map((text, i) => (
              <motion.div
                key={`junk-${i}`}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-panel p-4 border-semantic-danger/20 bg-semantic-danger/5 shadow-[0_0_10px_rgba(239,68,68,0.05)] hover:bg-semantic-danger/10 transition-colors"
              >
                <p className="text-primary/80">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Healthy Path (Right) */}
        <div className="flex-1 md:pl-12">
          <div className="text-center mb-6">
            <h4 className="text-xl font-heading font-bold text-semantic-success flex items-center justify-center gap-2">
              <span>🥗</span> Healthy Choice Path
            </h4>
          </div>
          <div className="space-y-4">
            {HEALTHY_PATH.map((text, i) => (
              <motion.div
                key={`healthy-${i}`}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="glass-panel p-4 border-semantic-success/20 bg-semantic-success/5 shadow-[0_0_10px_rgba(34,197,94,0.05)] hover:bg-semantic-success/10 transition-colors"
              >
                <p className="text-primary/80">{text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
