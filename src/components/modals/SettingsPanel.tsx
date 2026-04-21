import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { Settings, X, Key, Bell, Save, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const { 
    showSettingsPanel, setShowSettingsPanel,
    geminiApiKey, setGeminiApiKey,
    soundEnabled, setSoundEnabled,
    setDemoMode, setCurrentRisk, setTimeOfDay, setMood, setStressLevel, setActiveTab
  } = useAppStore();

  const [localKey, setLocalKey] = useState(geminiApiKey);
  const [showKey, setShowKey] = useState(false);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

  const handleSaveKey = async () => {
    setTestStatus('testing');
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${localKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "ping" }] }]
        })
      });
      if (response.ok) {
        setTestStatus('success');
        setGeminiApiKey(localKey);
      } else {
        setTestStatus('error');
      }
    } catch {
      setTestStatus('error');
    }
  };

  const handleResetData = () => {
    setDemoMode(false);
    setCurrentRisk(30);
    setTimeOfDay('Morning');
    setMood(3);
    setStressLevel(3);
    setActiveTab('dashboard');
    setShowSettingsPanel(false);
  };

  return (
    <AnimatePresence>
      {showSettingsPanel && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSettingsPanel(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background border-l border-surface-border shadow-[0_0_40px_rgba(0,0,0,0.5)] z-[201] flex flex-col"
          >
            <div className="p-6 border-b border-surface-border flex items-center justify-between">
              <div className="flex items-center gap-3 text-primary/90">
                <Settings className="w-6 h-6 text-neon-cyan" />
                <h2 className="text-xl font-heading font-bold">Settings</h2>
              </div>
              <button 
                onClick={() => setShowSettingsPanel(false)}
                className="p-2 rounded-lg hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5 text-muted" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              
              {/* API Key */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary/90">
                  <Key className="w-5 h-5 text-neon-purple" />
                  <h3 className="font-semibold">Gemini API Key</h3>
                </div>
                <div className="relative">
                  <input 
                    type={showKey ? "text" : "password"}
                    value={localKey}
                    onChange={(e) => {
                      setLocalKey(e.target.value);
                      setTestStatus('idle');
                    }}
                    placeholder="AIzaSy..."
                    className="w-full bg-surface border border-surface-border rounded-xl px-4 py-3 pr-24 text-primary focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50"
                  />
                  <button 
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-primary uppercase tracking-widest font-semibold"
                  >
                    {showKey ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <button 
                    onClick={handleSaveKey}
                    disabled={testStatus === 'testing' || !localKey}
                    className="glass-button text-sm bg-neon-purple/20 border-neon-purple/50 text-neon-purple hover:bg-neon-purple/30 shadow-[0_0_15px_rgba(168,85,247,0.2)] disabled:opacity-50"
                  >
                    <Save className="w-4 h-4" /> Save & Test
                  </button>
                  
                  {testStatus === 'testing' && <span className="text-sm text-muted animate-pulse">Testing connection...</span>}
                  {testStatus === 'success' && <span className="text-sm text-semantic-success flex items-center gap-1"><CheckCircle className="w-4 h-4"/> Connected</span>}
                  {testStatus === 'error' && <span className="text-sm text-semantic-danger flex items-center gap-1"><XCircle className="w-4 h-4"/> Invalid Key</span>}
                </div>
              </div>

              <div className="w-full h-px bg-surface-border"></div>

              {/* Toggles */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-neon-cyan" />
                    <div>
                      <h3 className="font-semibold text-primary/90">Notification Sounds</h3>
                      <p className="text-xs text-muted">Play a subtle chime on interventions.</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${soundEnabled ? 'bg-neon-cyan' : 'bg-surface-border'}`}
                  >
                    <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-300 ${soundEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </button>
                </div>
              </div>

              <div className="w-full h-px bg-surface-border"></div>

              {/* Reset */}
              <div>
                <button 
                  onClick={handleResetData}
                  className="w-full glass-button text-semantic-danger border-semantic-danger/30 hover:bg-semantic-danger/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset App State
                </button>
                <p className="text-xs text-center text-muted mt-3">
                  Resets the risk gauge, inputs, and clears demo mode.
                </p>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
