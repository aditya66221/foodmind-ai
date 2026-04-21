import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { calculateRisk } from '../../lib/riskEngine';
import { AlertTriangle } from 'lucide-react';

export const CravingGauge: React.FC = () => {
  const { currentRisk, setCurrentRisk, timeOfDay, mood, stressLevel, isDemoMode, setShowInterceptionModal } = useAppStore();

  // Recalculate risk whenever inputs change (unless in demo mode which drives it externally, wait no, demo mode drives inputs which drives risk)
  useEffect(() => {
    const risk = calculateRisk(timeOfDay, mood, stressLevel);
    setCurrentRisk(risk);
  }, [timeOfDay, mood, stressLevel, setCurrentRisk]);

  // Check for interception trigger
  useEffect(() => {
    if (currentRisk > 70 && !isDemoMode) {
      // In normal mode, trigger interception if risk > 70
      // In demo mode, it's orchestrated by the demo sequence
      const timer = setTimeout(() => setShowInterceptionModal(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentRisk, isDemoMode, setShowInterceptionModal]);

  const getRiskColor = (risk: number) => {
    if (risk < 40) return '#22C55E'; // green
    if (risk < 60) return '#EAB308'; // yellow
    if (risk < 70) return '#F97316'; // orange
    return '#EF4444'; // red
  };

  const riskColor = getRiskColor(currentRisk);
  const isHighRisk = currentRisk > 70;
  const minsUntilUrge = Math.max(5, Math.floor(120 - currentRisk));

  const size = 300;
  const strokeWidth = 16;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (currentRisk / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-[300px] h-[300px] flex items-center justify-center">
        {/* SVG Gauge */}
        <svg
          width={size}
          height={size}
          className={`transform -rotate-90 ${isHighRisk ? 'animate-pulse-border drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}`}
        >
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#F97316" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Outer Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            className="opacity-20"
          />

          {/* Inner Fill */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={riskColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset, stroke: riskColor }}
            transition={{ duration: 1, ease: "easeOut" }}
            filter="url(#glow)"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-sm font-semibold tracking-widest text-muted uppercase mb-1">
            Craving Risk
          </span>
          <div className="flex items-start">
            <motion.span 
              key={currentRisk}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-heading font-bold"
              style={{ color: riskColor, textShadow: `0 0 20px ${riskColor}80` }}
            >
              {currentRisk}
            </motion.span>
            <span className="text-2xl mt-1 ml-1 text-muted">%</span>
          </div>
          <span className="text-xs text-muted mt-2">
            ~{minsUntilUrge} mins until peak urge
          </span>
        </div>
      </div>

      {/* Warning Badge */}
      {isHighRisk && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mt-6 flex items-center gap-2 px-4 py-2 rounded-full bg-semantic-danger/10 border border-semantic-danger/30 text-semantic-danger shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        >
          <AlertTriangle className="w-4 h-4" />
          <span className="text-sm font-semibold tracking-wide uppercase">High Intervention Risk</span>
        </motion.div>
      )}
    </div>
  );
};
