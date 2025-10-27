import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import SnakeIdentificationStep from "../Components/SnakeIdentificationStep";
import FirstAidProtocol from "../Components/FirstAidProtocol";
import AntivenomLocator from '../Components/AntivenomLocator';

export default function VictimModeFlow({ language, onBack }) {
  const [currentStep, setCurrentStep] = useState('identify'); // 'identify' | 'first-aid' | 'locator'
  const [identifiedSnake, setIdentifiedSnake] = useState('unknown'); // 'cobra' | 'krait' | 'viper' | 'non-venomous' | 'unknown'

  const handleSnakeIdentified = (snakeType) => {
    setIdentifiedSnake(snakeType);
    setCurrentStep('first-aid');
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="sticky top-0 z-40 bg-red-600 text-white px-4 py-3 flex items-center shadow-lg">
        <button onClick={onBack} className="mr-3">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-bold">
            {language === 'en' ? '🚨 EMERGENCY MODE' : '🚨 आपातकालीन मोड'}
          </h1>
          <p className="text-xs opacity-90">
            {language === 'en' ? 'Victim/Bystander Response' : 'पीड़ित/दर्शक प्रतिक्रिया'}
          </p>
        </div>
      </header>

      <main className="flex-1">
        {currentStep === 'identify' && (
          <SnakeIdentificationStep
            language={language}
            onIdentified={handleSnakeIdentified}
          />
        )}

        {currentStep === 'first-aid' && (
          <FirstAidProtocol
            language={language}
            snakeType={identifiedSnake}
            onNext={() => setCurrentStep('locator')}
          />
        )}

        {currentStep === 'locator' && (
          <AntivenomLocator
            language={language}
            snakeType={identifiedSnake}
          />
        )}
      </main>
    </div>
  );
}
