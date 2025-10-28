import { CheckCircle, XCircle, AlertTriangle } from "lucide-react";

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
  // You need to ensure the 'unknown' or default key exists in protocolData
  // for when snakeType is initially empty. Assuming your full data has an 'unknown' key:
  unknown: {
    dos: {
      en: ["Keep patient calm", "Immobilize the limb", "Get to hospital"],
      hi: ["शांत रखें", "अंग को स्थिर करें", "अस्पताल जाएं"],
    },
    donts: {
      en: ["NO cutting or sucking", "NO tourniquet", "NO traditional healer"],
      hi: ["काटना या चूसना नहीं", "टूर्निकेट नहीं", "पारंपरिक चिकित्सक नहीं"],
    },
    urgency: "🚨 URGENT: Treat as venomous until proven otherwise.",
    urgencyHi: "🚨 तत्काल: जब तक अन्यथा साबित न हो, विषैला मानें।",
  },
  // ... include all your krait, viper, non-venomous data here
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
    <div className="px-6 py-8 space-y-6 pb-24">
      {/* ... rest of your JSX code is fine ... */}
      <div className="bg-red-600 text-white rounded-lg p-4 text-center">
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
              className="flex items-start bg-green-50 border-l-4 border-green-600 p-4 rounded-r-lg"
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
              className="flex items-start bg-red-50 border-l-4 border-red-600 p-4 rounded-r-lg"
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

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 p-4 shadow-lg">
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
  );
}
