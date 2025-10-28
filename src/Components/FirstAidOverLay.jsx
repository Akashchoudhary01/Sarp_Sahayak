import { X, CheckCircle, XCircle } from 'lucide-react';

export default function FirstAidOverlay({ onClose, language }) {
 const dos = language === 'en'
  ? [
    'Keep the victim calm and still',
    'Remove jewelry and tight clothing near the bite',
    'Keep the bitten limb immobilized and below heart level',
    'Clean the wound gently with soap and water',
    'Get to a hospital immediately'
   ]
  : [
    'पीड़ित को शांत और स्थिर रखें',
    'काटने के पास के गहने और तंग कपड़े हटा दें',
    'काटे गए अंग को स्थिर रखें और हृदय के स्तर से नीचे रखें',
    'घाव को साबुन और पानी से धीरे से साफ करें',
    'तुरंत अस्पताल पहुंचें'
   ];

 const donts = language === 'en'
  ? [
    'DO NOT apply ice or tourniquet',
    'DO NOT cut the wound or try to suck out venom',
    'DO NOT give the victim alcohol or caffeine',
    'DO NOT wait for symptoms to appear',
    'DO NOT try to catch or kill the snake'
   ]
  : [
    'बर्फ या टूर्निकेट न लगाएं',
    'घाव को न काटें या जहर चूसने की कोशिश न करें',
    'पीड़ित को शराब या कैफीन न दें',
    'लक्षण प्रकट होने की प्रतीक्षा न करें',
    'सांप को पकड़ने या मारने की कोशिश न करें'
   ];

 return (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        {/* ⭐️ CHANGED: max-w-lg ensures the modal stays narrow ⭐️ */}
   <div className="bg-white rounded-lg shadow-2xl **max-w-md** w-full max-h-[90vh] overflow-y-auto">
    
    <div className="sticky top-0 bg-red-600 text-white px-6 py-4 flex justify-between items-center rounded-t-lg">
     <h2 className="text-xl font-bold">
      {language === 'en' ? '🩹 First Aid Guide' : '🩹 प्राथमिक उपचार गाइड'}
     </h2>
     <button
      onClick={onClose}
      className="text-white hover:bg-red-700 rounded-full p-1 active:scale-95 transition-transform"
     >
      <X size={28} />
     </button>
    </div>

    <div className="p-6 space-y-6">
     
     <div>
      <h3 className="text-lg font-bold text-green-700 mb-3 flex items-center">
       <CheckCircle className="mr-2" size={24} />
       {language === 'en' ? "DO's (क्या करें)" : 'क्या करें'}
      </h3>
      <ul className="space-y-3">
       {dos.map((item, index) => (
        <li
         key={index}
         className="flex items-start bg-green-50 border-l-4 border-green-600 p-3 rounded"
        >
         <span className="text-green-700 font-bold mr-3 text-lg">{index + 1}.</span>
         <span className="text-gray-800 font-semibold">{item}</span>
        </li>
       ))}
      </ul>
     </div>

     <div>
      <h3 className="text-lg font-bold text-red-700 mb-3 flex items-center">
       <XCircle className="mr-2" size={24} />
       {language === 'en' ? "DON'Ts (क्या न करें)" : 'क्या न करें'}
      </h3>
      <ul className="space-y-3">
       {donts.map((item, index) => (
        <li
         key={index}
         className="flex items-start bg-red-50 border-l-4 border-red-600 p-3 rounded"
        >
         <span className="text-red-700 font-bold mr-3 text-lg">✗</span>
         <span className="text-gray-800 font-semibold">{item}</span>
        </li>
       ))}
      </ul>
     </div>

     <div className="bg-gray-800 text-white rounded-lg p-4 text-center">
      <p className="font-bold mb-2">
       {language === 'en' ? '🚨 Emergency Helpline' : '🚨 आपातकालीन हेल्पलाइन'}
      </p>
      <a href="tel:108" className="text-3xl font-bold underline">
       108
      </a>
     </div>

     <button
      onClick={onClose}
      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg active:scale-95 transition-transform"
     >
      {language === 'en' ? 'Close' : 'बंद करें'}
     </button>
    </div>
   </div>
  </div>
 );
}