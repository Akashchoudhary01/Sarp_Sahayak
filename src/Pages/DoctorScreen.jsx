import { useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';

export default function DoctorScreen({ language }) {
 const [snakeType, setSnakeType] = useState('');
 const [symptoms, setSymptoms] = useState([]);

 const snakeTypes = language === 'en'
  ? ['Unknown', 'Cobra', 'Krait', "Russell's Viper", 'Saw-scaled Viper', 'Non-venomous']
  : ['अज्ञात', 'कोबरा', 'करैत', 'रसेल वाइपर', 'सॉ-स्केल्ड वाइपर', 'गैर-विषैला'];

 const symptomsList = language === 'en'
  ? [
    'Bleeding gums',
    'Droopy eyelids',
    'Difficulty breathing',
    'Swelling at bite site',
    'Abdominal pain'
   ]
  : [
    'मसूड़ों से खून आना',
    'पलकों का झुकना',
    'सांस लेने में कठिनाई',
    'काटने की जगह पर सूजन',
    'पेट में दर्द'
   ];

 const toggleSymptom = (symptom) => {
  if (symptoms.includes(symptom)) {
   setSymptoms(symptoms.filter(s => s !== symptom));
  } else {
   setSymptoms([...symptoms, symptom]);
  }
 };

 const handleSave = () => {
  alert(language === 'en'
   ? 'Patient information saved successfully!'
   : 'रोगी की जानकारी सफलतापूर्वक सहेजी गई!');
 };

 return (
    // ⭐️ NEW WRAPPER: Restricts the width and centers the content ⭐️
    <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="max-w-xl w-full mx-auto flex-1 flex flex-col border-x border-gray-200 shadow-lg">
            
            <div className="flex-1 px-6 py-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        {language === 'en' ? 'Doctor Mode' : 'डॉक्टर मोड'}
                    </h2>
                    <p className="text-gray-600">
                        {language === 'en'
                            ? 'Quick assessment for medical professionals'
                            : 'चिकित्सा पेशेवरों के लिए त्वरित मूल्यांकन'}
                    </p>
                </div>

                <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 flex items-start">
                    <AlertTriangle className="text-yellow-600 mr-3 flex-shrink-0 mt-1" size={24} />
                    <div>
                        <p className="font-bold text-gray-800 text-sm">
                            {language === 'en' ? 'For Medical Professionals Only' : 'केवल चिकित्सा पेशेवरों के लिए'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                            {language === 'en'
                                ? 'This form is for quick documentation and triage assessment.'
                                : 'यह फॉर्म त्वरित दस्तावेज़ीकरण और ट्राइएज मूल्यांकन के लिए है।'}
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="block">
                        <span className="text-gray-800 font-bold mb-2 block">
                            {language === 'en' ? 'Snake Type:' : 'सांप का प्रकार:'}
                        </span>
                        <select
                            value={snakeType}
                            onChange={(e) => setSnakeType(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-600 focus:outline-none text-gray-800 font-semibold"
                        >
                            <option value="">
                                {language === 'en' ? 'Select snake type...' : 'सांप का प्रकार चुनें...'}
                            </option>
                            {snakeTypes.map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <div className="space-y-3">
                    <h3 className="text-gray-800 font-bold">
                        {language === 'en' ? 'Critical Symptoms:' : 'गंभीर लक्षण:'}
                    </h3>
                    <div className="space-y-2">
                        {symptomsList.map((symptom) => (
                            <label
                                key={symptom}
                                className="flex items-center bg-gray-50 border-2 border-gray-300 rounded-lg p-4 cursor-pointer hover:bg-gray-100 active:scale-95 transition-all"
                            >
                                <input
                                    type="checkbox"
                                    checked={symptoms.includes(symptom)}
                                    onChange={() => toggleSymptom(symptom)}
                                    className="w-5 h-5 text-red-600 border-2 border-gray-400 rounded focus:ring-2 focus:ring-red-600"
                                />
                                <span className="ml-3 text-gray-800 font-semibold">{symptom}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-50 border-2 border-gray-300 rounded-lg p-4 space-y-3">
                    <h3 className="text-gray-800 font-bold">
                        {language === 'en' ? 'Quick Vitals:' : 'त्वरित जीवन संकेत:'}
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="text"
                            placeholder="BP (mmHg)"
                            className="px-3 py-2 border-2 border-gray-300 rounded focus:border-red-600 focus:outline-none"
                        />
                        <input
                            type="text"
                            placeholder={language === 'en' ? 'Pulse (bpm)' : 'नाड़ी (bpm)'}
                            className="px-3 py-2 border-2 border-gray-300 rounded focus:border-red-600 focus:outline-none"
                        />
                    </div>
                </div>

                {symptoms.length > 0 && (
                    <div className="bg-red-50 border-2 border-red-600 rounded-lg p-4">
                        <p className="font-bold text-red-800">
                            {language === 'en' ? '⚠️ Symptoms Detected:' : '⚠️ लक्षण पाए गए:'}
                        </p>
                        <p className="text-sm text-gray-700 mt-2">
                            {symptoms.length} {language === 'en' ? 'critical symptoms selected' : 'गंभीर लक्षण चयनित'}
                        </p>
                        {symptoms.length >= 3 && (
                            <p className="text-sm font-bold text-red-800 mt-1">
                                {language === 'en'
                                    ? '🚨 SEVERE CASE: Immediate anti-venom administration recommended'
                                    : '🚨 गंभीर मामला: तत्काल एंटी-वेनम प्रशासन की सिफारिश'}
                            </p>
                        )}
                    </div>
                )}

                <button
                    onClick={handleSave}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg active:scale-95 transition-transform flex items-center justify-center"
                >
                    <Save className="mr-2" size={20} />
                    {language === 'en' ? 'Save Assessment' : 'मूल्यांकन सहेजें'}
                </button>
            </div>
            {/* Added padding for the footer/bottom of the screen */}
            <div className="pb-8"></div>
        </div>
    </div>
 );
}