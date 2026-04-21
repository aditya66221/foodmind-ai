import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAppStore, type PersonalityMode } from '../../store/useAppStore';
import { AI_QUOTES } from '../../lib/mockData';
import { MessageSquare, GraduationCap, Users, Flame } from 'lucide-react';

export const PersonalityEngine: React.FC = () => {
  const { aiPersonalityMode, setAiPersonalityMode } = useAppStore();
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // When mode changes, reset quote index
  useEffect(() => {
    setCurrentQuoteIndex(0);
  }, [aiPersonalityMode]);

  const quotes = AI_QUOTES[aiPersonalityMode];
  const fullText = quotes[currentQuoteIndex % quotes.length];

  // Rotate quotes every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex(prev => prev + 1);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    let i = 0;
    
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(prev => prev + fullText.charAt(i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 40); // 40ms per character

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const MODES: { id: PersonalityMode; icon: React.ReactNode; label: string; color: string }[] = [
    { id: 'coach', icon: <GraduationCap className="w-4 h-4" />, label: 'Coach', color: 'text-neon-cyan border-neon-cyan' },
    { id: 'buddy', icon: <Users className="w-4 h-4" />, label: 'Buddy', color: 'text-semantic-success border-semantic-success' },
    { id: 'savage', icon: <Flame className="w-4 h-4" />, label: 'Savage', color: 'text-neon-orange border-neon-orange' },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40 w-80">
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel p-4 shadow-lg border-surface-border flex flex-col gap-3"
      >
        {/* Toggle Pills */}
        <div className="flex items-center justify-between bg-background/50 rounded-lg p-1">
          {MODES.map(mode => (
            <button
              key={mode.id}
              onClick={() => setAiPersonalityMode(mode.id)}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-md text-xs font-semibold transition-all duration-300 ${
                aiPersonalityMode === mode.id 
                  ? `bg-surface border-b-2 ${mode.color} shadow-sm` 
                  : 'text-muted hover:text-primary'
              }`}
            >
              {mode.icon}
              {mode.label}
            </button>
          ))}
        </div>

        {/* Quote Area */}
        <div className="relative min-h-[80px] bg-background/40 border border-surface-border rounded-xl p-4 flex items-start gap-3">
          <MessageSquare className="w-5 h-5 text-neon-purple shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-primary/90 italic leading-relaxed">
              "{displayedText}"
              <span className={`inline-block w-1 h-4 ml-1 bg-neon-purple ${isTyping ? '' : 'animate-pulse'}`}></span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
