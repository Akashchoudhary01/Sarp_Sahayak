import { useState } from 'react';
import LandingScreen from './screens/LandingScreen';
import VictimModeFlow from './screens/VictimModeFlow';
import DoctorModeFlow from './screens/DoctorModeFlow';

function App() {
  const [appMode, setAppMode] = useState('landing'); // 'landing' | 'victim' | 'doctor'
  const [language, setLanguage] = useState('en'); // 'en' | 'hi'

  const renderMode = () => {
    switch (appMode) {
      case 'landing':
        return (
          <LandingScreen
            onSelectMode={(mode) => setAppMode(mode)}
            language={language}
            onToggleLanguage={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          />
        );

      case 'victim':
        return (
          <VictimModeFlow
            language={language}
            onBack={() => setAppMode('landing')}
          />
        );

      case 'doctor':
        return (
          <DoctorModeFlow
            language={language}
            onBack={() => setAppMode('landing')}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {renderMode()}
    </div>
  );
}

export default App;
