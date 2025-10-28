import { useState } from "react";
import { Camera, Upload, AlertCircle } from "lucide-react";

// --- UTILITY FUNCTION (from SnakeIdentificationScreen.jsx) ---
// Converts the Data URL (Base64 string) into the format the server expects
function dataURLToGenerativePart(dataUrl, mimeType) {
  const base64Data = dataUrl.split(",")[1];
  return {
    inlineData: {
      data: base64Data,
      mimeType,
    },
  };
}
// --- END UTILITY ---

export default function SnakeIdentificationStep({ language, onIdentified }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  // aiResult will store the species string (e.g., 'cobra') after parsing the JSON
  const [aiResult, setAiResult] = useState(null);
  const [manualSelection, setManualSelection] = useState(null);
  const [error, setError] = useState(null); // Added error state

  const BASE_URL = "http://localhost:3001"; // ⚠️ Must match your server port

  const snakeOptions = [
    { value: "cobra", label: "Cobra", labelHi: "कोबरा" },
    { value: "krait", label: "Krait", labelHi: "करैत" },
    { value: "viper", label: "Viper", labelHi: "वाइपर" },
    { value: "non-venomous", label: "Non-Venomous", labelHi: "गैर-विषैला" },
    { value: "unknown", label: "Unknown/Skip", labelHi: "अज्ञात/छोड़ें" },
  ];

  // ⭐️ NEW API CALL LOGIC ⭐️
  const runIdentification = async (dataUrl, fileType) => {
    setAnalyzing(true);
    setAiResult(null);
    setError(null);

    try {
      const imagePart = dataURLToGenerativePart(dataUrl, fileType);

      const response = await fetch(`${BASE_URL}/identify-snake`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imagePart, language }),
      });

      const data = await response.json();

      if (data.success && data.result) {
        // Map the AI species name to the snakeOptions value (e.g., "Common Krait" -> "krait")
        // This is a simplified mapping; you might need smarter parsing here.
        let speciesName = data.result.species.toLowerCase();
        let identifiedType = "unknown";

        if (speciesName.includes("cobra")) identifiedType = "cobra";
        else if (
          speciesName.includes("krait") ||
          speciesName.includes("bungarus")
        )
          identifiedType = "krait";
        else if (speciesName.includes("viper")) identifiedType = "viper";
        else if (
          speciesName.includes("non-venomous") ||
          speciesName.includes("dry bite")
        )
          identifiedType = "non-venomous";

        setAiResult(identifiedType);
      } else {
        setError(
          language === "en"
            ? "AI Service Error: Could not get a reliable result."
            : "AI सेवा त्रुटि: विश्वसनीय परिणाम प्राप्त नहीं हो सका।"
        );
      }
    } catch (e) {
      console.error("Network or Fetch Error:", e);
      setError(
        language === "en"
          ? "Network error. Ensure the backend server is running."
          : "नेटवर्क त्रुटि। सुनिश्चित करें कि बैकएंड सर्वर चल रहा है।"
      );
    } finally {
      setAnalyzing(false);
    }
  };
  // ⭐️ END NEW API CALL LOGIC ⭐️

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setSelectedImage(dataUrl);
        // Start the API identification process
        runIdentification(dataUrl, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleManualSelect = (snakeType) => {
    setManualSelection(snakeType);
  };

  const handleProceed = () => {
    const finalSelection = manualSelection || aiResult || "unknown";
    onIdentified(finalSelection);
  };

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4 flex items-start">
        <AlertCircle
          className="text-yellow-600 mr-3 flex-shrink-0 mt-1"
          size={24}
        />
        <div>
          <p className="font-bold text-gray-800 text-sm">
            {language === "en"
              ? "Step 1: Identify the Snake"
              : "चरण 1: सांप की पहचान करें"}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {language === "en"
              ? "Upload a photo or manually select the snake type"
              : "फोटो अपलोड करें या मैन्युअल रूप से सांप का प्रकार चुनें"}
          </p>
        </div>
      </div>

      {selectedImage && (
        <div className="bg-gray-100 rounded-lg p-4">
          <img
            src={selectedImage}
            alt="Snake"
            className="w-full h-64 object-cover rounded-lg mb-4"
          />
          {analyzing && (
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
              <p className="mt-2 text-gray-700 font-semibold">
                {language === "en"
                  ? "AI Analyzing..."
                  : "AI विश्लेषण कर रहा है..."}
              </p>
            </div>
          )}
          {!analyzing && aiResult && (
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
              <p className="font-bold text-gray-800">
                {language === "en" ? "🤖 AI Suggestion: " : "🤖 AI सुझाव: "}
                {
                  snakeOptions.find((s) => s.value === aiResult)?.[
                    language === "en" ? "label" : "labelHi"
                  ]
                }
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {language === "en"
                  ? "Please verify or select manually below"
                  : "कृपया नीचे सत्यापित करें या मैन्युअल रूप से चुनें"}
              </p>
            </div>
          )}
          {/* Display API/Network Error */}
          {!analyzing && error && (
            <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 rounded-lg">
              <p className="font-bold text-red-800">{error}</p>
            </div>
          )}
        </div>
      )}

      {!selectedImage && (
        <div className="space-y-4">
          <label className="block">
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-5 px-6 rounded-lg shadow-md active:scale-95 transition-transform cursor-pointer text-center flex items-center justify-center">
              <Camera className="mr-2" size={24} />
              {language === "en" ? "📸 Take Photo" : "📸 फोटो लें"}
            </div>
          </label>

          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
            <div className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-6 rounded-lg shadow-md active:scale-95 transition-transform cursor-pointer text-center flex items-center justify-center">
              <Upload className="mr-2" size={24} />
              {language === "en" ? "Upload Photo" : "फोटो अपलोड करें"}
            </div>
          </label>
        </div>
      )}

      <div className="border-t-2 border-gray-200 pt-6">
        <h3 className="font-bold text-gray-800 mb-3">
          {language === "en" ? "Manual Selection:" : "मैनुअल चयन:"}
        </h3>
        <div className="space-y-2">
          {snakeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleManualSelect(option.value)}
              className={`w-full text-left px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                manualSelection === option.value
                  ? "bg-red-600 text-white border-red-700"
                  : "bg-white text-gray-800 border-gray-300 hover:border-gray-400"
              }`}
            >
              {language === "en" ? option.label : option.labelHi}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleProceed}
        disabled={!aiResult && !manualSelection}
        className={`w-full font-bold py-4 px-6 rounded-lg shadow-lg transition-all ${
          aiResult || manualSelection
            ? "bg-red-600 hover:bg-red-700 text-white active:scale-95"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {language === "en"
          ? "➡️ Continue to First Aid"
          : "➡️ प्राथमिक उपचार के लिए जारी रखें"}
      </button>
    </div>
  );
}
