import React from 'react';
import { Settings, Play, Activity } from 'lucide-react';
import { useAppStore, type TabType } from '../../store/useAppStore';

const TABS: { id: TabType; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'scanner', label: 'Scanner' },
  { id: 'patterns', label: 'Patterns' },
  { id: 'simulate', label: 'Simulate' }
];

export const Navbar: React.FC = () => {
  const { 
    activeTab, 
    setActiveTab, 
    setShowSettingsPanel, 
    setDemoMode,
    isDemoMode 
  } = useAppStore();

  const handleDemoClick = () => {
    if (isDemoMode) return;
    setDemoMode(true);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 px-6 flex items-center justify-between glass-panel rounded-none border-t-0 border-l-0 border-r-0 border-b-surface-border">
      {/* Logo Area */}
      <div className="flex items-center gap-3">
        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-surface border border-surface-border">
          <Activity className="w-6 h-6 text-neon-purple" />
          <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-neon-purple rounded-full animate-pulse-border shadow-glow-purple"></div>
        </div>
        <span className="font-heading font-bold text-xl tracking-wide">FoodMind <span className="text-neon-purple">AI</span></span>
      </div>

      {/* Center Tabs */}
      <div className="hidden md:flex items-center p-1 bg-background/50 rounded-xl border border-surface-border">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-surface text-primary shadow-glow-cyan/20 border border-neon-cyan/30'
                : 'text-muted hover:text-primary hover:bg-surface/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        <button 
          onClick={handleDemoClick}
          className="glass-button bg-neon-orange/10 text-neon-orange border border-neon-orange/30 hover:bg-neon-orange/20 shadow-glow-orange hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]"
        >
          <Play className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline font-semibold tracking-wide">Demo Mode</span>
        </button>
        <button 
          onClick={() => setShowSettingsPanel(true)}
          className="p-2.5 rounded-xl bg-surface border border-surface-border text-muted hover:text-primary hover:border-muted/50 transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </nav>
  );
};
