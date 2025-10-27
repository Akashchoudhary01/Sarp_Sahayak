import { MapPin, Phone, Navigation } from 'lucide-react';

export default function LocatorScreen({ language }) {
  const hospitals = [
    {
      name: language === 'en' ? 'District Hospital' : 'जिला अस्पताल',
      address: language === 'en' ? '123 Medical Road, City Center' : '123 मेडिकल रोड, सिटी सेंटर',
      distance: '2.3 km',
      phone: '+91-1234567890',
      hasAntiVenom: true
    },
    {
      name: language === 'en' ? 'Primary Health Center' : 'प्राथमिक स्वास्थ्य केंद्र',
      address: language === 'en' ? '456 Health Street, East Zone' : '456 हेल्थ स्ट्रीट, ईस्ट जोन',
      distance: '5.7 km',
      phone: '+91-0987654321',
      hasAntiVenom: true
    }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Map Placeholder */}
      <div className="relative bg-gray-200 h-64 flex items-center justify-center border-b-2 border-gray-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400"></div>
        <div className="relative z-10 text-center">
          <MapPin size={48} className="mx-auto text-red-600 mb-2" />
          <p className="text-gray-700 font-semibold">
            {language === 'en' ? 'Map View (Placeholder)' : 'मानचित्र दृश्य (प्लेसहोल्डर)'}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {language === 'en' ? 'Showing nearby hospitals' : 'निकटवर्ती अस्पताल दिखा रहे हैं'}
          </p>
        </div>

        {/* Map Markers */}
        <div className="absolute top-20 left-16 z-20">
          <MapPin size={32} className="text-red-600 drop-shadow-lg" fill="#DC2626" />
        </div>
        <div className="absolute bottom-16 right-20 z-20">
          <MapPin size={32} className="text-red-600 drop-shadow-lg" fill="#DC2626" />
        </div>
      </div>

      {/* Hospital List */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          {language === 'en' ? 'Nearby Hospitals with Anti-Venom' : 'निकटवर्ती अस्पताल (एंटी-वेनम उपलब्ध)'}
        </h2>

        <div className="space-y-4">
          {hospitals.map((hospital, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg">{hospital.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{hospital.address}</p>
                </div>
                <div className="ml-4 text-right">
                  <span className="text-red-600 font-bold text-lg">{hospital.distance}</span>
                </div>
              </div>

              {hospital.hasAntiVenom && (
                <div className="bg-green-50 border border-green-500 rounded px-2 py-1 inline-block mb-3">
                  <span className="text-xs font-semibold text-green-800">
                    ✓ {language === 'en' ? 'Anti-Venom Available' : 'एंटी-वेनम उपलब्ध'}
                  </span>
                </div>
              )}

              <div className="flex gap-2 mt-3">
                <a
                  href={`tel:${hospital.phone}`}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Phone size={18} className="mr-2" />
                  {language === 'en' ? 'Call' : 'कॉल करें'}
                </a>
                <button className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center active:scale-95 transition-transform">
                  <Navigation size={18} className="mr-2" />
                  {language === 'en' ? 'Navigate' : 'नेविगेट करें'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Number */}
        <div className="mt-6 bg-red-600 text-white rounded-lg p-4 text-center">
          <p className="font-bold text-lg mb-2">
            {language === 'en' ? '🚨 Emergency Helpline' : '🚨 आपातकालीन हेल्पलाइन'}
          </p>
          <a href="tel:108" className="text-2xl font-bold underline">
            108
          </a>
        </div>
      </div>
    </div>
  );
}
