import { create } from 'zustand';

export type TabType = 'dashboard' | 'scanner' | 'patterns' | 'simulate';
export type PersonalityMode = 'coach' | 'buddy' | 'savage';
export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Late Night';

interface AppState {
  // Navigation
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;

  // User Inputs
  timeOfDay: TimeOfDay;
  setTimeOfDay: (time: TimeOfDay) => void;
  mood: number; // 1-5
  setMood: (mood: number) => void;
  stressLevel: number; // 1-10
  setStressLevel: (level: number) => void;

  // Calculated State
  currentRisk: number;
  setCurrentRisk: (risk: number) => void;

  // App Modes
  isDemoMode: boolean;
  setDemoMode: (isDemo: boolean) => void;
  aiPersonalityMode: PersonalityMode;
  setAiPersonalityMode: (mode: PersonalityMode) => void;

  // UI States
  showInterceptionModal: boolean;
  setShowInterceptionModal: (show: boolean) => void;
  showSettingsPanel: boolean;
  setShowSettingsPanel: (show: boolean) => void;

  // User Settings
  geminiApiKey: string;
  setGeminiApiKey: (key: string) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Navigation
  activeTab: 'dashboard',
  setActiveTab: (tab) => set({ activeTab: tab }),

  // User Inputs
  timeOfDay: 'Morning',
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  mood: 3, // neutral
  setMood: (mood) => set({ mood }),
  stressLevel: 3, // low stress
  setStressLevel: (level) => set({ stressLevel: level }),

  // Calculated State
  currentRisk: 30, // base risk
  setCurrentRisk: (risk) => set({ currentRisk: risk }),

  // App Modes
  isDemoMode: false,
  setDemoMode: (isDemo) => set({ isDemoMode: isDemo }),
  aiPersonalityMode: 'coach',
  setAiPersonalityMode: (mode) => set({ aiPersonalityMode: mode }),

  // UI States
  showInterceptionModal: false,
  setShowInterceptionModal: (show) => set({ showInterceptionModal: show }),
  showSettingsPanel: false,
  setShowSettingsPanel: (show) => set({ showSettingsPanel: show }),

  // User Settings
  geminiApiKey: '',
  setGeminiApiKey: (key) => set({ geminiApiKey: key }),
  soundEnabled: true,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
}));
