import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

// ⭐️ UPDATED: Full protocolData for all core snake types ⭐️
const protocolData = {
 cobra: {
  dos: {
   en: [
    "Keep victim calm and still - movement spreads venom",
    "Immobilize the bitten limb below heart level",
    "Remove jewelry and tight clothing immediately",
    "Get to hospital IMMEDIATELY - neurotoxic venom acts fast",
    "Note the time of bite for medical team",
   ],
   hi: [
    "पीड़ित को शांत और स्थिर रखें - हलचल जहर फैलाती है",
    "काटे गए अंग को हृदय के स्तर से नीचे स्थिर करें",
    "गहने और तंग कपड़े तुरंत हटा दें",
    "तुरंत अस्पताल पहुंचें - न्यूरोटॉक्सिक जहर तेजी से काम करता है",
    "चिकित्सा टीम के लिए काटने का समय नोट करें",
   ],
  },
  donts: {
   en: [
    "NO ice, tourniquets, or cutting the wound",
    "NO sucking out venom - it does not work",
    "NO alcohol or caffeine - speeds up venom spread",
    "NO traditional healers - waste of critical time",
    "NO waiting for symptoms - GET TO HOSPITAL NOW",
   ],
   hi: [
    "बर्फ, टूर्निकेट, या घाव काटना नहीं",
    "जहर चूसना नहीं - यह काम नहीं करता",
    "शराब या कैफीन नहीं - जहर फैलाव तेज करता है",
    "पारंपरिक चिकित्सक नहीं - महत्वपूर्ण समय की बर्बादी",
    "लक्षणों की प्रतीक्षा न करें - अभी अस्पताल जाएं",
   ],
  },
  urgency: "🚨 CRITICAL: Neurotoxic. Hospital within 1-2 hours.",
  urgencyHi: "🚨 गंभीर: न्यूरोटॉक्सिक। 1-2 घंटे में अस्पताल।",
 },
 krait: {
  dos: {
   en: [
    "Victim must be kept awake and still",
    "Immobilize the bitten limb (splint if possible)",
    "Monitor breathing closely (neurotoxicity is delayed)",
    "Get to hospital IMMEDIATELY—symptoms can appear hours later",
    "Note the time of bite for medical team",
   ],
   hi: [
    "पीड़ित को जगाए रखें और स्थिर रखें",
    "काटे गए अंग को स्थिर करें (यदि संभव हो तो स्प्लिंट लगाएं)",
    "साँस लेने पर बारीकी से नज़र रखें (न्यूरोटॉक्सिसिटी देर से होती है)",
    "तुरंत अस्पताल पहुंचें—लक्षण घंटों बाद दिखाई दे सकते हैं",
    "चिकित्सा टीम के लिए काटने का समय नोट करें",
   ],
  },
  donts: {
   en: [
    "NO ice, tourniquets, or cutting the wound",
    "DO NOT let the victim sleep",
    "NO alcohol or caffeine",
    "DO NOT wait for symptoms to appear",
   ],
   hi: [
    "बर्फ, टूर्निकेट, या घाव काटना नहीं",
    "पीड़ित को सोने न दें",
    "शराब या कैफीन नहीं",
    "लक्षणों की प्रतीक्षा न करें",
   ],
  },
  urgency: "🚨 CRITICAL: Delayed neurotoxicity. Hospital within 2-3 hours.",
  urgencyHi: "🚨 गंभीर: विलंबित न्यूरोटॉक्सिसिटी। 2-3 घंटे में अस्पताल।",
 },
 viper: {
  dos: {
   en: [
    "Keep victim calm and still",
    "Immobilize the bitten limb (splint if possible)",
    "Monitor for bleeding from the wound or gums",
    "Get to hospital IMMEDIATELY - hemotoxic venom is severe",
   ],
   hi: [
    "पीड़ित को शांत और स्थिर रखें",
    "काटे गए अंग को स्थिर करें (यदि संभव हो तो स्प्लिंट लगाएं)",
    "घाव या मसूड़ों से रक्तस्राव की निगरानी करें",
    "तुरंत अस्पताल पहुंचें - हेमोटॉक्सिक जहर गंभीर है",
   ],
  },
  donts: {
   en: [
    "NO ice, tourniquets, or cutting the wound",
    "DO NOT wash the bite site vigorously—residue helps ID",
    "NO traditional healers",
   ],
   hi: [
    "बर्फ, टूर्निकेट, या घाव काटना नहीं",
    "काटने वाली जगह को ज़ोर से न धोएं—अवशेष पहचान में मदद करते हैं",
    "पारंपरिक चिकित्सक नहीं",
   ],
  },
  urgency: "🚨 CRITICAL: Hemotoxic. Hospital within 1-3 hours.",
  urgencyHi: "🚨 गंभीर: हेमोटॉक्सिक। 1-3 घंटे में अस्पताल।",
 },
 "non-venomous": {
  dos: {
   en: [
    "Clean the wound gently with soap and water",
    "Monitor for signs of infection (redness, pus)",
    "Seek medical advice for tetanus prophylaxis",
   ],
   hi: [
    "घाव को साबुन और पानी से धीरे से साफ करें",
    "संक्रमण के लक्षणों की निगरानी करें (लालिमा, मवाद)",
    "टेटनस रोकथाम के लिए चिकित्सा सलाह लें",
   ],
  },
  donts: {
   en: [
    "NO panic—it is not venomous",
    "DO NOT ignore wound care—infection is a risk",
   ],
   hi: [
    "घबराएं नहीं—यह विषैला नहीं है",
    "घाव की देखभाल को अनदेखा न करें—संक्रमण का खतरा है",
   ],
  },
  urgency: "✅ LOW RISK: Focus on wound care.",
  urgencyHi: "✅ कम जोखिम: घाव की देखभाल पर ध्यान दें।",
 },
 unknown: {
  dos: {
   en: [
    "ASSUME VENOMOUS. Keep victim calm and still.",
    "Immobilize the bitten limb below heart level",
    "Clean the wound gently with soap and water",
    "Get to hospital IMMEDIATELY—TIME IS CRITICAL",
   ],
   hi: [
    "विषैला मानें। पीड़ित को शांत और स्थिर रखें।",
    "काटे गए अंग को हृदय के स्तर से नीचे स्थिर करें",
    "घाव को साबुन और पानी से धीरे से साफ करें",
    "तुरंत अस्पताल पहुंचें—समय महत्वपूर्ण है",
   ],
  },
  donts: {
   en: [
    "NO ice, tourniquets, cutting, or sucking",
    "NO alcohol or caffeine",
    "NO traditional healers",
    "DO NOT wash the bite site vigorously",
   ],
   hi: [
    "बर्फ, टूर्निकेट, काटना, या चूसना नहीं",
    "शराब या कैफीन नहीं",
    "पारंपरिक चिकित्सक नहीं",
    "काटने वाली जगह को ज़ोर से न धोएं",
   ],
  },
  urgency: "🚨 URGENT: Treat as venomous until proven otherwise.",
  urgencyHi: "🚨 तत्काल: जब तक अन्यथा साबित न हो, विषैला मानें।",
 },
};

export default function FirstAidProtocol({ language, snakeType, onNext }) {
 // FIX: Use Nullish Coalescing (??) or logical OR to provide a safe default value.
 // If snakeType is empty/invalid, it defaults to 'unknown'.
 const safeSnakeType =
  snakeType && protocolData[snakeType] ? snakeType : "unknown";

 const protocol = protocolData[safeSnakeType];

 // The code below now safely reads from the 'protocol' object:
 const dos = protocol.dos[language];
 const donts = protocol.donts[language];
 const urgency = language === "en" ? protocol.urgency : protocol.urgencyHi;

 return (
    // ⭐️ MOBILE CONTAINMENT FIX: Wrap the entire component content 
    // to keep the fixed button centered and constrained. ⭐️
    <div className="flex-1 overflow-y-auto">
        <div className="max-w-xl mx-auto">
            <div className="px-6 py-8 space-y-6 pb-24">
                
                {/* Urgency Alert */}
                <div className="bg-red-600 text-white rounded-lg p-4 text-center shadow-lg">
                    <AlertTriangle className="mx-auto mb-2" size={32} />
                    <p className="font-bold text-lg">{urgency}</p>
                </div>

                {/* DO'S */}
                <div>
                    <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center">
                        <CheckCircle className="mr-2" size={28} />
                        {language === "en" ? "✅ DO's (IMMEDIATELY)" : "✅ क्या करें (तुरंत)"}
                    </h3>
                    <div className="space-y-3">
                        {dos.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg shadow-sm"
                            >
                                <span className="text-green-700 font-bold mr-3 text-xl min-w-[24px]">
                                    {index + 1}
                                </span>
                                <span className="text-gray-800 font-semibold leading-relaxed">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* DON'TS */}
                <div>
                    <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center">
                        <XCircle className="mr-2" size={28} />
                        {language === "en"
                            ? "❌ DON'Ts (NEVER DO)"
                            : "❌ क्या न करें (कभी नहीं)"}
                    </h3>
                    <div className="space-y-3">
                        {donts.map((item, index) => (
                            <div
                                key={index}
                                className="flex items-start bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg shadow-sm"
                            >
                                <span className="text-red-700 font-bold mr-3 text-xl min-w-[24px]">
                                    ✗
                                </span>
                                <span className="text-gray-800 font-semibold leading-relaxed">
                                    {item}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
        {/* ⭐️ STICKY BUTTON FIX: Constrain to max-w-xl and center ⭐️ */}
        <div className="fixed bottom-0 left-0 right-0 z-40">
            <div className="max-w-xl mx-auto bg-white border-t-2 border-gray-200 p-4 shadow-2xl">
                <button
                    onClick={onNext}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg active:scale-95 transition-transform"
                >
                    {language === "en"
                        ? "🏥 FIND NEAREST HOSPITAL NOW"
                        : "🏥 निकटतम अस्पताल अभी खोजें"}
                </button>
            </div>
        </div>
    </div>
 );
}