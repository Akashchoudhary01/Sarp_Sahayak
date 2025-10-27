import { Camera, AlertCircle } from 'lucide-react';

export default function HomeScreen({ onEmergency, onShowFirstAid, language }) {
  return (
    <div className="flex flex-col">
      {/* Slogan Banner */}
      <div className="relative bg-gradient-to-r from-gray-100 to-gray-200 px-6 py-12 text-center">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTAwIDIwYTgwIDgwIDAgMSAxIDAgMTYwIDgwIDgwIDAgMCAxIDAtMTYweiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkYzMzMzIiBzdHJva2Utd2lkdGg9IjQiLz48cGF0aCBkPSJNMTAwIDYwdjgwTTYwIDEwMGg4MCIgc3Ryb2tlPSIjRkYzMzMzIiBzdHJva2Utd2lkdGg9IjYiLz48L3N2Zz4=')]"></div>
        <h2 className="text-3xl font-bold text-gray-800 relative z-10">
          {language === 'en' ? 'Save Time, Save a Life.' : 'समय बचाओ, जान बचाओ।'}
        </h2>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 space-y-6">
        {/* Primary Emergency Button */}
        <button
          onClick={onEmergency}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-6 px-8 rounded-lg shadow-lg active:scale-95 transition-transform text-lg"
        >
          <AlertCircle className="inline-block mr-2" size={28} />
          <div className="mt-2">
            {language === 'en' ? 'EMERGENCY: START PROTOCOL' : 'आपातकाल: प्रोटोकॉल शुरू करें'}
          </div>
        </button>

        {/* AI Upload Button */}
        <button
          onClick={onEmergency}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-5 px-6 rounded-lg shadow-md active:scale-95 transition-transform flex items-center justify-center"
        >
          <Camera className="mr-2" size={24} />
          {language === 'en' ? '📸 Upload Snake Photo' : '📸 सांप की फोटो अपलोड करें'}
        </button>

        {/* Quick First Aid Link */}
        <button
          onClick={onShowFirstAid}
          className="w-full bg-white border-2 border-gray-800 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-sm active:scale-95 transition-transform"
        >
          {language === 'en'
            ? '🩹 Immediate First Aid (DO\'s/DON\'Ts)'
            : '🩹 तुरंत प्राथमिक उपचार (क्या करें/क्या न करें)'}
        </button>

        {/* Information Section */}
        <div className="mt-8 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="font-bold text-gray-800 text-lg mb-3">
            {language === 'en' ? 'Quick Guide:' : 'त्वरित मार्गदर्शिका:'}
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-2">1.</span>
              <span>{language === 'en'
                ? 'Start emergency protocol immediately'
                : 'तुरंत आपातकालीन प्रोटोकॉल शुरू करें'}</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-2">2.</span>
              <span>{language === 'en'
                ? 'Upload photo for AI identification'
                : 'AI पहचान के लिए फोटो अपलोड करें'}</span>
            </li>
            <li className="flex items-start">
              <span className="text-red-600 font-bold mr-2">3.</span>
              <span>{language === 'en'
                ? 'Find nearest hospital using Locator'
                : 'लोकेटर का उपयोग करके निकटतम अस्पताल खोजें'}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
