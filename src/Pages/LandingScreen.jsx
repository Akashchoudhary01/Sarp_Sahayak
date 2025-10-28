import { AlertCircle, Stethoscope } from "lucide-react";

export default function LandingScreen({
  onSelectMode,
  language,
  onToggleLanguage,
}) {
  // Get the current year dynamically for the copyright date
  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      {/* ⭐️ NEW WRAPPER: Restricts the entire app width and centers it ⭐️ */}
      <div className="max-w-xl w-full mx-auto flex-1 flex flex-col border-x border-gray-200 shadow-lg">
        {/* ⭐️ HEADER MOVED INSIDE CONTAINER ⭐️ */}
        <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-black">
          <div className="text-2xl font-bold text-gray-800 ">Sarpa-Sahayak</div>
          <button
            onClick={onToggleLanguage}
            className="text-sm font-semibold text-gray-700 px-3 py-1 border-2 border-black rounded"
          >
            {language === "en" ? "हिन्दी" : "ENG"}
          </button>
        </header>

        <main className="flex-1 flex flex-col justify-center px-6 pb-20">
          <div className="text-center mb-12">
            <h1 className="text-4xl mt-5 font-bold text-gray-800 mb-4">
              {language === "en"
                ? "Save Time, Save a Life."
                : "समय बचाओ, जान बचाओ।"}
            </h1>
            <p className="text-lg text-gray-600 max-w-md mx-auto">
              {language === "en"
                ? "AI-powered snakebite emergency response system"
                : "AI-संचालित सर्पदंश आपातकालीन प्रतिक्रिया प्रणाली"}
            </p>
          </div>

          <div className="space-y-6 max-w-md mx-auto w-full">
            <button
              onClick={() => onSelectMode("victim")}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-8 px-8 rounded-xl shadow-2xl active:scale-95 transition-all border-4 border-red-700"
            >
              <AlertCircle className="mx-auto mb-3" size={48} />
              <div className="text-2xl mb-2">
                {language === "en" ? "🚨 VICTIM/BYSTANDER" : "🚨 पीड़ित/दर्शक"}
              </div>
              <div className="text-sm font-normal opacity-90">
                {language === "en"
                  ? "Emergency Response Mode"
                  : "आपातकालीन प्रतिक्रिया मोड"}
              </div>
            </button>

            <button
              onClick={() => onSelectMode("doctor")}
              className="w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-8 px-8 rounded-xl shadow-2xl active:scale-95 transition-all border-4 border-gray-900"
            >
              <Stethoscope className="mx-auto mb-3" size={48} />
              <div className="text-2xl mb-2">
                {language === "en" ? "⚕️ DOCTOR/CLINIC" : "⚕️ डॉक्टर/क्लिनिक"}
              </div>
              <div className="text-sm font-normal opacity-90">
                {language === "en"
                  ? "Medical Professional Mode"
                  : "चिकित्सा पेशेवर मोड"}
              </div>
            </button>
          </div>

          <div className="mt-12 text-center text-xl text-gray-500">
            <p>
              {language === "en"
                ? "Developed for immediate snakebite response"
                : "तत्काल सर्पदंश प्रतिक्रिया के लिए विकसित"}
            </p>
          </div>
        </main>

        {/* FOOTER MOVED INSIDE CONTAINER */}
        <footer className="w-full py-4 bg-gray-200 text-center text-md text-gray-600 border-t border-black">
          <p className="mb-1 ">Made with ❤️ by *Team DevX*</p>
          <p>&copy; {currentYear} All Rights Reserved. Sarpa-Sahayak</p>
        </footer>
      </div>{" "}
      {/* End of max-w-xl container */}
    </div>
  );
}
