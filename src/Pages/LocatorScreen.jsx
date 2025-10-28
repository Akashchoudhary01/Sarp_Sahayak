// src/components/AntivenomLocator.jsx

import { useEffect, useState } from "react";
import { MapPin, Phone, Navigation, RefreshCw } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AntivenomLocator({ language, snakeType }) {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClinics = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from("clinics")
        .select("*")
        .order("antivenom_stock", { ascending: false });

      if (fetchError) throw fetchError;
      setClinics(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load clinics");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on start
  useEffect(() => {
    fetchClinics();
  }, []);

  // Live realtime updates listener
  useEffect(() => {
    const channel = supabase
      .channel("clinic-updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "clinics" },
        () => {
          fetchClinics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const calculateDistance = (lat, lon) => {
    const userLat = 23.3441;
    const userLon = 85.3096;
    const R = 6371;
    const dLat = ((lat - userLat) * Math.PI) / 180;
    const dLon = ((lon - userLon) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((userLat * Math.PI) / 180) *
        Math.cos((lat * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  const getStockStatus = (stock) => {
    if (stock === 0) {
      return {
        color: "bg-red-600 text-white border-red-700",
        label: language === "en" ? "OUT OF STOCK" : "स्टॉक खत्म",
        textColor: "text-red-700",
      };
    } else if (stock < 10) {
      return {
        color: "bg-yellow-500 text-gray-900 border-yellow-600",
        label: language === "en" ? "LOW STOCK" : "कम स्टॉक",
        textColor: "text-yellow-700",
      };
    } else {
      return {
        color: "bg-green-600 text-white border-green-700",
        label: language === "en" ? "IN STOCK" : "स्टॉक में",
        textColor: "text-green-700",
      };
    }
  };

  const sortedClinics = [...clinics].sort((a, b) => {
    const distA = parseFloat(calculateDistance(a.latitude, a.longitude));
    const distB = parseFloat(calculateDistance(b.latitude, b.longitude));
    return distA - distB;
  });

  return (
    // UI FIX: Removed h-screen to allow full vertical scrolling if needed
    <div className="flex flex-col min-h-screen">
      {/* Map Header Section */}
      <div className="relative bg-gray-200 h-52 flex items-center justify-center border-b-2 border-gray-300">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400"></div>
        <div className="relative z-10 text-center">
          <MapPin size={48} className="mx-auto text-red-600 mb-2" />
          <p className="text-gray-700 font-semibold">
            {language === "en" ? "Hospital Locator" : "अस्पताल लोकेटर"}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            {language === "en"
              ? "Showing clinics with antivenom"
              : "एंटीवेनम वाले क्लीनिक दिखा रहे हैं"}
          </p>
        </div>

        {/* Animated Pins */}
        <div className="absolute top-12 left-16 z-20 animate-pulse">
          <MapPin
            size={32}
            className="text-red-600 drop-shadow-lg"
            fill="#DC2626"
          />
        </div>
        <div
          className="absolute bottom-4 right-20 z-20 animate-pulse"
          style={{ animationDelay: "0.5s" }}
        >
          <MapPin
            size={32}
            className="text-red-600 drop-shadow-lg"
            fill="#DC2626"
          />
        </div>
        <div
          className="absolute top-24 right-12 z-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          <MapPin
            size={32}
            className="text-red-600 drop-shadow-lg"
            fill="#DC2626"
          />
        </div>
      </div>

      {/* Clinics List Section */}
      {/* UI FIX: Added pb-[100px] to ensure the last card isn't hidden by the fixed footer */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-[100px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {language === "en" ? "Nearby Hospitals" : "निकटवर्ती अस्पताल"}
          </h2>
          <button
            onClick={fetchClinics}
            className="p-2 bg-gray-200 hover:bg-gray-300 rounded-lg active:scale-95 transition-all"
          >
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-red-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">
              {language === "en"
                ? "Loading clinics..."
                : "क्लीनिक लोड कर रहे हैं..."}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-2 border-red-600 rounded-lg p-4 text-center">
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {sortedClinics.map((clinic) => {
              const distance = calculateDistance(
                clinic.latitude,
                clinic.longitude
              );
              const stockStatus = getStockStatus(clinic.antivenom_stock);

              return (
                <div
                  key={clinic.id}
                  className="bg-white border-2 border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 text-lg">
                        {clinic.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {clinic.type}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {clinic.address}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <span className="text-red-600 font-bold text-xl">
                        {distance} km
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div
                      className={`inline-flex items-center px-3 py-2 rounded-lg border-2 ${stockStatus.color} font-bold text-sm`}
                    >
                      {stockStatus.label}
                    </div>
                    <div className="mt-2">
                      <span
                        className={`text-2xl font-bold ${stockStatus.textColor}`}
                      >
                        {clinic.antivenom_stock}
                      </span>
                      <span className="text-sm text-gray-600 ml-2">
                        {language === "en" ? "vials available" : "शीशी उपलब्ध"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {language === "en" ? "Updated: " : "अपडेट: "}
                      {new Date(clinic.last_updated).toLocaleString(
                        language === "en" ? "en-IN" : "hi-IN"
                      )}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <a
                      href={`tel:${clinic.phone}`}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <Phone size={18} className="mr-2" />
                      {language === "en" ? "Call" : "कॉल करें"}
                    </a>
                    <a
                      href={`http://maps.google.com/maps?daddr=${clinic.latitude},${clinic.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center active:scale-95 transition-transform"
                    >
                      <Navigation size={18} className="mr-2" />
                      {language === "en" ? "Navigate" : "नेविगेट करें"}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Emergency Helpline Footer Section */}
      {/* UI FIX: Added fixed bottom-0 z-50 w-full to place it at the absolute bottom */}
      <div className="fixed bottom-0 z-50 w-full bg-red-600 text-white p-4 text-center shadow-2xl">
        <p className="font-bold text-lg mb-1">
          {language === "en"
            ? "🚨 Emergency Helpline"
            : "🚨 आपातकालीन हेल्पलाइन"}
        </p>
        <a href="tel:108" className="text-3xl font-bold underline">
          108
        </a>
      </div>
    </div>
  );
}
