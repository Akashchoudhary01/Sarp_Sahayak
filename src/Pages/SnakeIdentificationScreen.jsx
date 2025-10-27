import { useState } from 'react';
import { Camera, Upload, SkipForward } from 'lucide-react';

export default function SnakeIdentificationScreen({ language }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
        setAnalyzing(true);
        setTimeout(() => setAnalyzing(false), 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="px-6 py-8 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {language === 'en' ? 'Snake Identification' : 'सांप की पहचान'}
        </h2>
        <p className="text-gray-600">
          {language === 'en'
            ? 'Upload a clear photo of the snake for AI identification'
            : 'AI पहचान के लिए सांप की स्पष्ट फोटो अपलोड करें'}
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
                {language === 'en' ? 'Analyzing image...' : 'छवि का विश्लेषण कर रहे हैं...'}
              </p>
            </div>
          )}

          {!analyzing && (
            <div className="mt-4 p-4 bg-yellow-50 border-2 border-yellow-400 rounded-lg">
              <p className="font-bold text-gray-800">
                {language === 'en'
                  ? 'AI Result: Common Krait (Highly Venomous)'
                  : 'AI परिणाम: सामान्य करैत (अत्यधिक विषैला)'}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {language === 'en'
                  ? 'Seek immediate medical attention'
                  : 'तुरंत चिकित्सा सहायता लें'}
              </p>
            </div>
          )}
        </div>
      )}

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
            {language === 'en' ? 'Take Photo' : 'फोटो लें'}
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
            {language === 'en' ? 'Upload from Gallery' : 'गैलरी से अपलोड करें'}
          </div>
        </label>

        <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 px-6 rounded-lg shadow-sm active:scale-95 transition-transform flex items-center justify-center">
          <SkipForward className="mr-2" size={20} />
          {language === 'en'
            ? "I don't know the snake / Skip ID"
            : 'मुझे सांप नहीं पता / पहचान छोड़ें'}
        </button>
      </div>

      <div className="mt-6 bg-red-50 border-2 border-red-600 rounded-lg p-4">
        <p className="font-bold text-red-800 text-sm">
          {language === 'en' ? '⚠️ IMPORTANT:' : '⚠️ महत्वपूर्ण:'}
        </p>
        <p className="text-sm text-gray-700 mt-1">
          {language === 'en'
            ? 'AI identification is for reference only. Always seek professional medical help immediately after a snakebite.'
            : 'AI पहचान केवल संदर्भ के लिए है। सांप के काटने के बाद हमेशा तुरंत पेशेवर चिकित्सा सहायता लें।'}
        </p>
      </div>
    </div>
  );
}
