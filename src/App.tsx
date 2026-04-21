
import { useAppStore } from './store/useAppStore';
import { Navbar } from './components/layout/Navbar';
import { ParticleBackground } from './components/layout/ParticleBackground';
import { Dashboard } from './components/dashboard/Dashboard';
import { FoodScanner } from './components/scanner/FoodScanner';
import { Patterns } from './components/patterns/Patterns';
import { Simulate } from './components/simulate/Simulate';
import { SettingsPanel } from './components/modals/SettingsPanel';
import { InterceptionModal } from './components/modals/InterceptionModal';
import { PersonalityEngine } from './components/shared/PersonalityEngine';
import { DemoManager } from './components/shared/DemoManager';

function App() {
  const { activeTab } = useAppStore();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'scanner':
        return <FoodScanner />;
      case 'patterns':
        return <Patterns />;
      case 'simulate':
        return <Simulate />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="relative min-h-screen text-primary overflow-hidden">
      <ParticleBackground />
      <Navbar />
      
      <main className="relative z-10 pt-20 h-[calc(100vh)] overflow-y-auto">
        {renderContent()}
      </main>

      <PersonalityEngine />
      <SettingsPanel />
      <InterceptionModal />
      <DemoManager />
    </div>
  );
}

export default App;
