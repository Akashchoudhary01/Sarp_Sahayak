// SnakeIdentificationpage.jsx Frontend
import { useState } from "react";
import { Camera, Upload, SkipForward } from "lucide-react";

// --- UTILITY FUNCTION ---
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

export default function SnakeIdentificationScreen({ language }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:3001"; // ⚠️ Must match your server port

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

      if (data.success) {
        setAiResult(data.result);
      } else {
        // Handle server-side errors (e.g., parsing failed)
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

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result;
        setSelectedImage(dataUrl);
        // Start the identification process
        runIdentification(dataUrl, file.type);
      };
      reader.readAsDataURL(file);
    }
  };

  // Helper to get the correct action text based on language
  const getActionText = (result) => {
    if (!result) return "";
    return language === "en" ? result.action_text_en : result.action_text_hi;
  };

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {language === "en" ? "Snake Identification" : "सांप की पहचान"}
        </h2>
        <p className="text-gray-600">
          {language === "en"
            ? "Upload a clear photo of the snake for AI identification"
            : "AI पहचान के लिए सांप की स्पष्ट फोटो अपलोड करें"}
        </p>
      </div>

      {selectedImage && (
        <div className="bg-gray-100 rounded-lg p-4">
          <img
            src={selectedImage}
            alt="Snake"
            className="w-full h-64 object-cover rounded-lg"
          />

          {analyzing && (
            <div className="mt-4 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-600 border-t-transparent"></div>
              <p className="mt-2 text-gray-700 font-semibold">
                {language === "en"
                  ? "Analyzing image..."
                  : "छवि का विश्लेषण कर रहे हैं..."}
              </p>
            </div>
          )}

          {/* Display Real AI Result */}
          {!analyzing && aiResult && !error && (
            <>
              <div
                className={`mt-4 p-4 rounded-lg 
        ${
          aiResult.venomous_level.includes("Highly")
            ? "bg-red-50 border-2 border-red-400"
            : "bg-green-50 border-2 border-green-400"
        }`}
              >
                <p className="font-bold text-gray-800">
                  {language === "en"
                    ? `AI Result: ${aiResult.species} (${aiResult.venomous_level})`
                    : `AI परिणाम: ${aiResult.species} (${aiResult.venomous_level})`}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {getActionText(aiResult)}
                </p>
              </div>

              {/* ⭐️ NEW CRITICAL WARNING LINE ⭐️ */}
              <div className="mt-4 p-3 bg-yellow-100 border-2 border-yellow-500 rounded-lg">
                <p className="font-bold text-yellow-800 text-sm">
                  {language === "en"
                    ? "⚠️ CRITICAL SAFETY NOTE: Do not rely solely on this AI result. Always treat unknown snakes with extreme caution."
                    : "⚠️ महत्वपूर्ण सुरक्षा नोट: केवल इस AI परिणाम पर निर्भर न रहें। अज्ञात साँपों को हमेशा अत्यंत सावधानी से संभालें।"}
                </p>
              </div>
            </>
          )}

          {/* Display Error Message */}
          {!analyzing && error && (
            <div className="mt-4 p-4 bg-red-100 border-2 border-red-500 rounded-lg">
              <p className="font-bold text-red-800">{error}</p>
            </div>
          )}
        </div>
      )}

      {/* Input/Button Controls */}
      <div className="space-y-4">
        <label className="block">
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handleImageUpload}
            className="hidden"
            // Reset state when a new image is selected
            onClick={(e) => {
              e.target.value = null;
              setAiResult(null);
              setError(null);
            }}
          />
          <div className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-5 px-6 rounded-lg shadow-md active:scale-95 transition-transform cursor-pointer text-center flex items-center justify-center">
            <Camera className="mr-2" size={24} />
            {language === "en" ? "Take Photo" : "फोटो लें"}
          </div>
        </label>

        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            // Reset state when a new image is selected
            onClick={(e) => {
              e.target.value = null;
              setAiResult(null);
              setError(null);
            }}
          />
          <div className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-5 px-6 rounded-lg shadow-md active:scale-95 transition-transform cursor-pointer text-center flex items-center justify-center">
            <Upload className="mr-2" size={24} />
            {language === "en" ? "Upload from Gallery" : "गैलरी से अपलोड करें"}
          </div>
        </label>

        <button
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-sm active:scale-95 transition-transform flex items-center justify-center"
          onClick={() => {
            setSelectedImage(null);
            setAiResult(null);
            setError(null);
          }}
        >
          <SkipForward className="mr-2" size={20} />
          {language === "en"
            ? "I don't know the snake / Skip ID"
            : "मुझे सांप नहीं पता / पहचान छोड़ें"}
        </button>
      </div>

      <div className="mt-6 bg-red-50 border-2 border-red-600 rounded-lg p-4">
        <p className="font-bold text-red-800 text-sm">
          {language === "en" ? "⚠️ IMPORTANT:" : "⚠️ महत्वपूर्ण:"}
        </p>
        <p className="text-sm text-gray-700 mt-1">
          {language === "en"
            ? "AI identification is for reference only. Always seek professional medical help immediately after a snakebite."
            : "AI पहचान केवल संदर्भ के लिए है। सांप के काटने के बाद हमेशा तुरंत पेशेवर चिकित्सा सहायता लें।"}
        </p>
      </div>
    </div>
  );
}
