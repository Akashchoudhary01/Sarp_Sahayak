import { useState } from 'react';
import { ArrowLeft, AlertTriangle, CheckCircle } from 'lucide-react';

export default function DoctorModeFlow({ language, onBack }) {
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

  const snakeOptions = [
    { value: 'cobra', label: 'Cobra (Naja naja)', labelHi: 'कोबरा' },
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
  };

  const getTreatmentRecommendation = () => {
    const neurotoxicSymptoms = symptoms.ptosis || symptoms.dysphagia || symptoms.paralysis;
    const hemotoxicSymptoms = symptoms.bleedingGums || symptoms.bleedingBite || symptoms.failureToClot;
    const symptomCount = Object.values(symptoms).filter(Boolean).length;

    let recommendation = {};

    if (snakeType === 'non-venomous') {
      recommendation = {
        severity: 'LOW RISK',
        severityHi: 'कम जोखिम',
        envenomation: 'No envenomation',
        envenomationHi: 'कोई जहर नहीं',
        antivenom: 'No antivenom required',
        antivenomHi: 'एंटीवेनम की आवश्यकता नहीं',
        action: 'Clean wound, tetanus prophylaxis, monitor for infection',
        actionHi: 'घाव साफ करें, टेटनस रोकथाम, संक्रमण की निगरानी',
        color: 'green'
      };
    } else if (neurotoxicSymptoms) {
      recommendation = {
        severity: 'CRITICAL - NEUROTOXIC',
        severityHi: 'गंभीर - न्यूरोटॉक्सिक',
        envenomation: 'Confirmed neurotoxic envenomation',
        envenomationHi: 'पुष्ट न्यूरोटॉक्सिक विषाक्तता',
        antivenom: '10 vials polyvalent antivenom',
        antivenomHi: '10 शीशी पॉलीवेलेंट एंटीवेनम',
        action: 'Immediate IV administration & ventilatory support',
        actionHi: 'तत्काल IV प्रशासन और वेंटिलेटरी सपोर्ट',
        color: 'red'
      };
    } else if (hemotoxicSymptoms) {
      recommendation = {
        severity: 'HIGH RISK - HEMOTOXIC',
        severityHi: 'उच्च जोखिम - हेमोटॉक्सिक',
        envenomation: 'Confirmed hemotoxic envenomation',
        envenomationHi: 'पुष्ट हेमोटॉक्सिक विषाक्तता',
        antivenom: '10 vials initially, repeat WBCT20 in 6 hrs',
        antivenomHi: '10 शीशी प्रारंभ में, 6 घंटे बाद WBCT20 दोहराएं',
        action: 'Monitor clotting, prepare blood products',
        actionHi: 'जमावट की निगरानी, रक्त उत्पाद तैयार रखें',
        color: 'orange'
      };
    } else if (symptomCount >= 2) {
      recommendation = {
        severity: 'MODERATE TO HIGH RISK',
        severityHi: 'मध्यम से उच्च जोखिम',
        envenomation: 'Likely envenomation',
        envenomationHi: 'संभावित विषाक्तता',
        antivenom: 'Consider early antivenom',
        antivenomHi: 'प्रारंभिक एंटीवेनम पर विचार करें',
        action: 'Observe closely, monitor vitals',
        actionHi: 'बारीकी से निगरानी करें, जीवन संकेत देखें',
        color: 'yellow'
      };
    } else {
      recommendation = {
        severity: 'LOW TO MODERATE RISK',
        severityHi: 'कम से मध्यम जोखिम',
        envenomation: 'Possible dry bite',
        envenomationHi: 'संभावित सूखा काटना',
        antivenom: 'Hold antivenom, monitor',
        antivenomHi: 'एंटीवेनम रोकें, निगरानी करें',
        action: 'Observe for 24 hours',
        actionHi: '24 घंटे निगरानी करें',
        color: 'blue'
      };
    }

    return recommendation;
  };

  const result = showResult ? getTreatmentRecommendation() : null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* UI remains unchanged */}
      {/* ✅ Keep your JSX UI code EXACTLY same — no change required */}
      {/* Just paste the UI part back here */}
    </div>
  );
}
