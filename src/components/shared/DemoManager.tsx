import React, { useEffect, useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { motion, AnimatePresence } from 'framer-motion';

export const DemoManager: React.FC = () => {
  const { 
    isDemoMode, setDemoMode, 
    setActiveTab, setTimeOfDay, setStressLevel, setMood, 
    setShowInterceptionModal, setCurrentRisk 
  } = useAppStore();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!isDemoMode) return;

    let isCancelled = false;
    
    const runSequence = async () => {
      // Show Toast
      setShowToast(true);
      
      // Ensure we are on dashboard
      setActiveTab('dashboard');

      const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

      if (isCancelled) return;
      await sleep(1500);
      
      // 1. Set time -> Late Night
      if (isCancelled) return;
      setTimeOfDay('Late Night');
      
      // 2. Set stress -> 9
      await sleep(1500);
      if (isCancelled) return;
      setStressLevel(9);

      // 3. Set mood -> Sad
      await sleep(1500);
      if (isCancelled) return;
      setMood(3); // Sad emoji

      // 4 & 5. Risk gauge animates to 87%, ring turns red, pulse... 
      // (This happens automatically due to state changes and calculateRisk, but let's override risk to exactly 87 for the demo)
      await sleep(1000);
      if (isCancelled) return;
      setCurrentRisk(87);

      // 6. Badge appears automatically in CravingGauge because risk > 70
      
      // 7. 3 second pause
      await sleep(3000);
      if (isCancelled) return;

      // 8. Interception modal slides up
      setShowInterceptionModal(true);

      // 9. Workflow visualizer starts animating (handled inside WorkflowVisualizer when isDemoMode is true)
      
      // Auto-turn off demo toast after sequence finishes + a bit
      await sleep(5000);
      setShowToast(false);
      setDemoMode(false);
    };

    runSequence();

    return () => {
      isCancelled = true;
      setShowToast(false);
    };
  }, [isDemoMode]);

  return (
    <AnimatePresence>
      {showToast && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-full bg-surface border border-neon-orange shadow-glow-orange flex items-center gap-3 backdrop-blur-xl"
        >
          <span className="animate-pulse">🤖</span>
          <span className="text-sm font-semibold text-primary tracking-wide">
            Demo Scenario Active — 11:30 PM simulation
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
