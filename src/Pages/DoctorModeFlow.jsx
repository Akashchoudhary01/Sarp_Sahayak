// src/pages/DoctorModeFlow.jsx

import { useState } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle, MapPin, Clock, Users } from 'lucide-react';

// NOTE: You must import the AntivenomLocator component to complete the flow.
import AntivenomLocator from "../Components/AntivenomLocator"; 

export default function DoctorModeFlow({ language, onBack }) {
  // State management
  const [flowStep, setFlowStep] = useState('analysis'); // 'analysis' | 'locator'
    
    // ⭐️ NEW STATE: Patient Details ⭐️
    const [patientAge, setPatientAge] = useState('');
    const [timeSinceBite, setTimeSinceBite] = useState(''); // Time in hours
    
  const [snakeType, setSnakeType] = useState('');
  const [symptoms, setSymptoms] = useState({
    ptosis: false,
    dysphagia: false,
    paralysis: false,
    bleedingGums: false,
    bleedingBite: false,
    failureToClot: false,
    localSwelling: false,
    abdominalPain: false
  });
  const [showResult, setShowResult] = useState(false);

  // Data definitions
  const snakeOptions = [
    { value: 'cobra', label: 'Cobra ', labelHi: 'कोबरा' },
    { value: 'krait', label: 'Krait (Bungarus)', labelHi: 'करैत' },
    { value: 'viper', label: "Viper (Russell's/Saw-scaled)", labelHi: 'वाइपर' },
    { value: 'non-venomous', label: 'Non-Venomous', labelHi: 'गैर-विषैला' },
    { value: 'unknown', label: 'Unknown', labelHi: 'अज्ञात' }
  ];

  const symptomsList = [
    { key: 'ptosis', label: 'Ptosis (drooping eyelids)', labelHi: 'पलकों का झुकना', type: 'neurotoxic' },
    { key: 'dysphagia', label: 'Dysphagia (difficulty swallowing)', labelHi: 'निगलने में कठिनाई', type: 'neurotoxic' },
    { key: 'paralysis', label: 'Paralysis/muscle weakness', labelHi: 'पक्षाघात/मांसपेशी कमजोरी', type: 'neurotoxic' },
    { key: 'bleedingGums', label: 'Bleeding gums/nose', labelHi: 'मसूड़ों/नाक से खून आना', type: 'hemotoxic' },
    { key: 'bleedingBite', label: 'Non-stop bleeding from bite', labelHi: 'काटने से लगातार खून बहना', type: 'hemotoxic' },
    { key: 'failureToClot', label: 'Failure to clot (WBCT20+)', labelHi: 'थक्का न बनना (WBCT20+)', type: 'hemotoxic' },
    { key: 'localSwelling', label: 'Severe local swelling', labelHi: 'गंभीर स्थानीय सूजन', type: 'local' },
    { key: 'abdominalPain', label: 'Abdominal pain', labelHi: 'पेट में दर्द', type: 'systemic' }
  ];

  const toggleSymptom = (key) => {
    setSymptoms(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const analyzeCase = () => {
    setShowResult(true);
    // Do not switch flowStep yet, allow doctor to review result
  };

  const getTreatmentRecommendation = () => {
    const neurotoxicSymptoms = symptoms.ptosis || symptoms.dysphagia || symptoms.paralysis;
    const hemotoxicSymptoms = symptoms.bleedingGums || symptoms.bleedingBite || symptoms.failureToClot;
    const symptomCount = Object.values(symptoms).filter(Boolean).length;

    let recommendation = {};

    if (snakeType === 'non-venomous') {
      recommendation = {
        severity: 'LOW RISK', severityHi: 'कम जोखिम',
        envenomation: 'No envenomation', envenomationHi: 'कोई जहर नहीं',
        antivenom: 'No antivenom required', antivenomHi: 'एंटीवेनम की आवश्यकता नहीं',
        action: 'Clean wound, tetanus prophylaxis, monitor for infection', actionHi: 'घाव साफ करें, टेटनस रोकथाम, संक्रमण की निगरानी',
        color: 'green'
      };
    } else if (neurotoxicSymptoms) {
      recommendation = {
        severity: 'CRITICAL - NEUROTOXIC', severityHi: 'गंभीर - न्यूरोटॉक्सिक',
        envenomation: 'Confirmed neurotoxic envenomation', envenomationHi: 'पुष्ट न्यूरोटॉक्सिक विषाक्तता',
        antivenom: '10 vials polyvalent antivenom', antivenomHi: '10 शीशी पॉलीवेलेंट एंटीवेनम',
        action: 'Immediate IV administration & ventilatory support', actionHi: 'तत्काल IV प्रशासन और वेंटिलेटरी सपोर्ट',
        color: 'red'
      };
    } else if (hemotoxicSymptoms) {
      recommendation = {
        severity: 'HIGH RISK - HEMOTOXIC', severityHi: 'उच्च जोखिम - हेमोटॉक्सिक',
        envenomation: 'Confirmed hemotoxic envenomation', envenomationHi: 'पुष्ट हेमोटॉक्सिक विषाक्तता',
        antivenom: '10 vials initially, repeat WBCT20 in 6 hrs', antivenomHi: '10 शीशी प्रारंभ में, 6 घंटे बाद WBCT20 दोहराएं',
        action: 'Monitor clotting, prepare blood products', actionHi: 'जमावट की निगरानी, रक्त उत्पाद तैयार रखें',
        color: 'orange'
      };
    } else if (symptomCount >= 2) {
      recommendation = {
        severity: 'MODERATE TO HIGH RISK', severityHi: 'मध्यम से उच्च जोखिम',
        envenomation: 'Likely envenomation', envenomationHi: 'संभावित विषाक्तता',
        antivenom: 'Consider early antivenom', antivenomHi: 'प्रारंभिक एंटीवेनम पर विचार करें',
        action: 'Observe closely, monitor vitals', actionHi: 'बारीकी से निगरानी करें, जीवन संकेत देखें',
        color: 'yellow'
      };
    } else {
      recommendation = {
        severity: 'LOW TO MODERATE RISK', severityHi: 'कम से मध्यम जोखिम',
        envenomation: 'Possible dry bite', envenomationHi: 'संभावित सूखा काटना',
        antivenom: 'Hold antivenom, monitor', antivenomHi: 'एंटीवेनम रोकें, निगरानी करें',
        action: 'Observe for 24 hours', actionHi: '24 घंटे निगरानी करें',
        color: 'blue'
      };
    }

    return recommendation;
  };

  const result = showResult ? getTreatmentRecommendation() : null;

  const getColorClass = (color) => {
    switch (color) {
      case 'red': return 'bg-red-600 border-red-800';
      case 'orange': return 'bg-orange-500 border-orange-700';
      case 'yellow': return 'bg-yellow-400 border-yellow-600';
      case 'green': return 'bg-green-500 border-green-700';
      case 'blue': return 'bg-blue-500 border-blue-700';
      default: return 'bg-gray-400 border-gray-600';
    }
  };

  // --- Render Logic (AntivenomLocator) ---
  if (flowStep === 'locator') {
    // If the doctor chooses to find stock, render the locator component
    return (
            // ⭐️ Mobile Containment ⭐️
      <div className="min-h-screen flex flex-col max-w-xl mx-auto border-x border-gray-200 shadow-lg"> 
        <div className="p-4 border-b bg-gray-50 flex items-center">
          <button onClick={() => setFlowStep('analysis')} className="text-gray-600 mr-3">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-lg font-bold">
            {language === 'en' ? 'Antivenom Stock' : 'एंटीवेनम स्टॉक'}
          </h1>
        </div>
        {/* Passes snakeType to allow future filtering of polyvalent vs monovalent stock if implemented */}
        <AntivenomLocator 
          language={language} 
          snakeType={snakeType} 
        />
      </div>
    );
  }

  // --- Default flowStep is 'analysis' ---
  return (
        // ⭐️ Mobile Containment ⭐️
    <div className="min-h-screen flex flex-col bg-white max-w-xl mx-auto border-x border-gray-200 shadow-lg">
      {/* Header */}
      <div className="sticky top-0 bg-red-600 text-white px-4 py-4 flex items-center shadow-lg z-10">
        <button onClick={onBack} className="text-white mr-3">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">
          {language === 'en' ? 'Doctor Mode: Case Analysis' : 'डॉक्टर मोड: केस विश्लेषण'}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-20">
                
                {/* 1. Patient Details */}
                <div>
                    <h2 className="text-lg font-bold mb-3 text-gray-800 flex items-center">
            <Users size={20} className="mr-2 text-red-600" />
            {language === 'en' ? '1. Patient and Time Details' : '1. रोगी और समय विवरण'}
          </h2>
                    <div className="flex space-x-4">
                        {/* Age Input */}
                        <div className="flex-1">
                            <label htmlFor="patientAge" className="block text-sm font-medium text-gray-700">
                                {language === 'en' ? 'Patient Age (Yrs)' : 'रोगी की आयु (वर्ष)'}
                            </label>
                            <input
                                id="patientAge"
                                type="number"
                                value={patientAge}
                                onChange={(e) => setPatientAge(e.target.value)}
                                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold bg-white"
                                placeholder={language === 'en' ? 'e.g., 35' : 'उदा. 35'}
                            />
                        </div>
                        {/* Time Since Bite Input */}
                        <div className="flex-1">
                            <label htmlFor="timeSinceBite" className="block text-sm font-medium text-gray-700">
                                {language === 'en' ? 'Time Since Bite (Hrs)' : 'काटने के बाद का समय (घंटे)'}
                            </label>
                            <input
                                id="timeSinceBite"
                                type="number"
                                value={timeSinceBite}
                                onChange={(e) => setTimeSinceBite(e.target.value)}
                                className="w-full p-3 mt-1 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold bg-white"
                                placeholder={language === 'en' ? 'e.g., 2' : 'उदा. 2'}
                            />
                        </div>
                    </div>
                </div>

        {/* 2. Snake Type Selector */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-gray-800">
            {language === 'en' ? '2. Identify Biting Snake (If Known)' : '2. काटने वाले साँप की पहचान करें (यदि ज्ञात हो)'}
          </h2>
          <select
            value={snakeType}
            onChange={(e) => setSnakeType(e.target.value)}
            className="w-full p-3 border-2 border-gray-300 rounded-lg text-gray-700 font-semibold bg-white appearance-none"
          >
            <option value="">{language === 'en' ? '— Select Type —' : '— प्रकार चुनें —'}</option>
            {snakeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {language === 'en' ? option.label : option.labelHi}
              </option>
            ))}
          </select>
        </div>

        {/* 3. Symptom Checklist */}
        <div>
          <h2 className="text-lg font-bold mb-3 text-gray-800">
            {language === 'en' ? '3. Patient Symptoms Checklist' : '3. रोगी के लक्षणों की जाँच सूची'}
          </h2>
          <div className="space-y-2">
            {symptomsList.map(symptom => (
              <div
                key={symptom.key}
                onClick={() => toggleSymptom(symptom.key)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-colors flex items-center justify-between ${
                  symptoms[symptom.key]
                    ? 'bg-red-50 border-red-600 text-red-800 font-semibold'
                    : 'bg-gray-50 border-gray-300 text-gray-700'
                }`}
              >
                <span>{language === 'en' ? symptom.label : symptom.labelHi}</span>
                {symptoms[symptom.key] ? <CheckCircle size={20} className="flex-shrink-0" /> : <span className="w-5 h-5"></span>}
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Button */}
        <button
          onClick={analyzeCase}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg active:scale-95 transition-transform"
        >
          {language === 'en' ? '🔬 Analyze Case & Get Protocol' : '🔬 केस का विश्लेषण करें और प्रोटोकॉल प्राप्त करें'}
        </button>

        {/* 4. Analysis Result */}
        {showResult && result && (
          <div className="mt-6 border-4 rounded-xl p-4 shadow-xl space-y-3" 
            style={{ borderColor: getColorClass(result.color).split('-')[2] + '-600' }}>
            
            <div className={`text-white p-3 rounded-lg text-center font-bold text-xl uppercase ${getColorClass(result.color)}`}>
              {language === 'en' ? result.severity : result.severityHi}
            </div>

            <div className="border-t pt-3">
              <h3 className="font-bold text-gray-700">
                {language === 'en' ? 'Envenomation Status:' : 'विषाक्तता स्थिति:'}
              </h3>
              <p className="text-gray-900 font-semibold">{language === 'en' ? result.envenomation : result.envenomationHi}</p>
            </div>
            
            <div>
              <h3 className="font-bold text-gray-700">
                {language === 'en' ? 'Antivenom Dosage:' : 'एंटीवेनम खुराक:'}
              </h3>
              <p className="text-gray-900 font-semibold">{language === 'en' ? result.antivenom : result.antivenomHi}</p>
            </div>

            <div>
              <h3 className="font-bold text-gray-700">
                {language === 'en' ? 'Immediate Action:' : 'तत्काल कार्रवाई:'}
              </h3>
              <p className="text-gray-900 font-semibold">{language === 'en' ? result.action : result.actionHi}</p>
            </div>

            {/* Button to transition to Locator */}
            <button
              onClick={() => setFlowStep('locator')}
              className="w-full mt-4 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-lg active:scale-95 transition-transform flex items-center justify-center"
            >
              <MapPin size={20} className="mr-2" />
              {language === 'en' ? 'Check Antivenom Stock Near Me' : 'मेरे पास एंटीवेनम स्टॉक की जाँच करें'}
            </button>
          </div>
        )}
      </div>
      
      {/* Footer space for sticky button */}
      <div className="h-20"></div> 
    </div>
  );
}