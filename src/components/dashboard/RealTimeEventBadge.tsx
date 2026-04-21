import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EVENTS = [
  "📱 Food delivery app opened",
  "⏰ Late night detected",
  "📊 Screen time spike",
  "🛋️ Sedentary pattern detected",
  "🔥 Stress indicator rising"
];

export const RealTimeEventBadge: React.FC<{ isDemoMode: boolean }> = ({ isDemoMode }) => {
  const [currentEvent, setCurrentEvent] = useState<string | null>(null);

  useEffect(() => {
    if (isDemoMode) {
      setCurrentEvent("⏰ Late night detected");
      return;
    }

    const triggerRandomEvent = () => {
      const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
      setCurrentEvent(event);
      setTimeout(() => setCurrentEvent(null), 4000);
    };

    const interval = setInterval(triggerRandomEvent, 15000);
    return () => clearInterval(interval);
  }, [isDemoMode]);

  return (
    <div className="absolute right-0 -top-12 z-20 h-10 w-64 overflow-hidden flex justify-end">
      <AnimatePresence>
        {currentEvent && (
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neon-orange/10 border border-neon-orange/30 text-neon-orange shadow-[0_0_15px_rgba(249,115,22,0.2)] whitespace-nowrap text-sm font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-neon-orange animate-pulse"></span>
            {currentEvent}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
