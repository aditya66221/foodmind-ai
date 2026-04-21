import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { Timer, Droplet, Salad, X } from 'lucide-react';

export const InterceptionModal: React.FC = () => {
  const { showInterceptionModal, setShowInterceptionModal, timeOfDay, stressLevel } = useAppStore();
  const [countdown, setCountdown] = useState<number | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (countdown !== null && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setShowInterceptionModal(false);
      setCountdown(null);
    }
    return () => clearTimeout(timer);
  }, [countdown, setShowInterceptionModal]);

  const handleWait = () => {
    setCountdown(120); // 2 minutes
  };

  const handleResolve = () => {
    setShowInterceptionModal(false);
    setCountdown(null);
  };

  // Basic fallback reason generator
  const getReason = () => {
    if (timeOfDay === 'Late Night' && stressLevel >= 7) {
      return "Late-night stress eating detected. Your cortisol is high.";
    }
    if (stressLevel >= 8) {
      return "High stress levels detected. You're seeking comfort, not nourishment.";
    }
    return "Pattern matches your historical junk food triggers. Let's pause.";
  };

  return (
    <AnimatePresence>
      {showInterceptionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleResolve}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ y: '100%', scale: 0.9, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: '100%', scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200, duration: 0.4 }}
            className="relative w-full max-w-lg glass-panel border-semantic-danger/50 shadow-glow-danger p-8 overflow-hidden"
          >
            {/* Animated gradient border top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-semantic-danger to-transparent animate-pulse" />

            <div className="text-center space-y-6">
              <div>
                <h2 className="text-3xl font-heading font-bold text-semantic-danger mb-2 flex items-center justify-center gap-3">
                  <span className="animate-bounce">🚨</span> AI INTERVENTION
                </h2>
                <p className="text-primary/90 font-medium">
                  You're likely about to make an impulsive food decision.
                </p>
              </div>

              <div className="bg-semantic-danger/10 border border-semantic-danger/20 rounded-xl p-4">
                <p className="text-sm text-semantic-danger font-medium">
                  {getReason()}
                </p>
              </div>

              <div className="space-y-3 pt-4">
                {countdown === null ? (
                  <button 
                    onClick={handleWait}
                    className="w-full glass-button bg-surface hover:bg-surface/80 border border-surface-border text-primary"
                  >
                    <Timer className="w-5 h-5 text-neon-cyan" />
                    Wait 2 Minutes
                  </button>
                ) : (
                  <div className="w-full py-2 flex items-center justify-center gap-2 text-neon-cyan font-bold text-xl font-heading">
                    <Timer className="w-6 h-6 animate-pulse" />
                    {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                  </div>
                )}

                <button 
                  onClick={handleResolve}
                  className="w-full glass-button bg-semantic-success/20 hover:bg-semantic-success/30 border border-semantic-success/50 text-semantic-success transition-all shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:shadow-[0_0_20px_rgba(34,197,94,0.4)]"
                >
                  <Droplet className="w-5 h-5" />
                  Drink Water Instead
                </button>

                <button 
                  onClick={() => {
                    handleResolve();
                    useAppStore.getState().setActiveTab('scanner');
                  }}
                  className="w-full glass-button bg-neon-purple/20 hover:bg-neon-purple/30 border border-neon-purple/50 text-neon-purple transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] hover:shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  <Salad className="w-5 h-5" />
                  Show Me Alternatives
                </button>
              </div>

              <p className="text-xs text-muted/50 uppercase tracking-widest pt-4">
                Powered by FoodMind Neural Engine
              </p>
            </div>
            
            <button 
              onClick={handleResolve}
              className="absolute top-4 right-4 text-muted hover:text-primary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
