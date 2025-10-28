// src/components/AntivenomLocator.jsx

import { useEffect, useState } from "react";
import { MapPin, Phone, Navigation, RefreshCw, AlertTriangle } from "lucide-react";
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

 useEffect(() => {
  fetchClinics();
 }, []);

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
  // NOTE: This is a placeholder for the user's current location (Ranchi, India)
  const userLat = 23.3441; 
  const userLon = 85.3096;
  const R = 6371; // Earth's radius in kilometers
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
    color: "bg-red-100 text-red-700 border-red-500",
    label: language === "en" ? "OUT OF STOCK" : "स्टॉक खत्म",
    textColor: "text-red-700",
   };
  } else if (stock < 10) {
   return {
    color: "bg-yellow-100 text-yellow-700 border-yellow-500",
    label: language === "en" ? "LOW STOCK" : "कम स्टॉक",
    textColor: "text-yellow-700",
   };
  } else {
   return {
    color: "bg-green-100 text-green-700 border-green-500",
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
    // ⭐️ MOBILE CONTAINMENT WRAPPER ⭐️
  <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="max-w-xl w-full mx-auto flex-1 flex flex-col border-x border-gray-200 shadow-lg">

            {/* Clean Header Section */}
            <div className="bg-white p-4 text-center border-b-2 border-red-600">
                <MapPin size={32} className="mx-auto text-red-600 mb-2" />
                <h2 className="text-xl font-bold text-gray-800">
                    {language === "en" ? "Antivenom Locator" : "एंटीवेनम लोकेटर"}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    {language === "en"
                    ? "Live Antivenom Stock (Polyvalent)"
                    : "लाइव एंटीवेनम स्टॉक (पॉलीवेलेंट)"}
                </p>
                <div className="mt-2 flex justify-center items-center text-xs text-gray-500">
                    <AlertTriangle size={14} className="mr-1 text-red-500" />
                    {language === "en" ? "Verify stock before transfer." : "स्थानांतरण से पहले स्टॉक सत्यापित करें।"}
                </div>
            </div>

            {/* Clinics List Section */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
                <div className="flex justify-between items-center mb-4 sticky top-0 bg-white py-2 z-10 border-b">
                    <h2 className="text-xl font-bold text-gray-800">
                        {language === "en" ? "Nearby Hospitals" : "निकटवर्ती अस्पताल"}
                    </h2>
                    <button
                        onClick={fetchClinics}
                        className={`p-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-full active:scale-95 transition-all shadow-md ${loading ? "animate-spin" : ""}`}
                    >
                        <RefreshCw size={20} />
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
                    <div className="space-y-4 pb-20">
                        {sortedClinics.map((clinic) => {
                            const distance = calculateDistance(
                                clinic.latitude,
                                clinic.longitude
                            );
                            const stockStatus = getStockStatus(clinic.antivenom_stock);

                            return (
                                <div
                                    key={clinic.id}
                                    className="bg-white border-2 border-gray-200 rounded-xl p-4 shadow-lg transition-shadow"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex-1 pr-4">
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
                                        <div className="ml-4 text-right flex-shrink-0">
                                            <span className="text-red-600 font-extrabold text-2xl">
                                                {distance}
                                            </span>
                                            <span className="text-sm text-gray-600 block">km</span>
                                        </div>
                                    </div>

                                    <div className="mb-3 border-t pt-3">
                                        <div
                                            className={`inline-flex items-center px-3 py-1 rounded-full border ${stockStatus.color} font-bold text-xs uppercase`}
                                        >
                                            {stockStatus.label}
                                        </div>
                                        <div className="mt-2">
                                            <span
                                                className={`text-3xl font-bold ${stockStatus.textColor}`}
                                            >
                                                {clinic.antivenom_stock}
                                            </span>
                                            <span className="text-sm text-gray-600 ml-2">
                                                {language === "en"
                                                    ? "vials available"
                                                    : "शीशी उपलब्ध"}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">
                                            {language === "en" ? "Updated: " : "अपडेट: "}
                                            {new Date(clinic.last_updated).toLocaleTimeString(
                                                language === "en" ? "en-IN" : "hi-IN",
                                                { hour: '2-digit', minute: '2-digit' } // Cleaner time format
                                            )}
                                        </p>
                                    </div>

                                    <div className="flex gap-3 mt-4">
                                        <a
                                            href={`tel:${clinic.phone}`}
                                            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-md"
                                        >
                                            <Phone size={18} className="mr-2" />
                                            {language === "en" ? "Call Now" : "अभी कॉल करें"}
                                        </a>
                                        <a
                                            // FIX: Correct Google Maps URL format for navigation
                                            href={`https://www.google.com/maps/dir/?api=1&destination=${clinic.latitude},${clinic.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 rounded-xl flex items-center justify-center active:scale-95 transition-transform shadow-md"
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

            {/* ⭐️ IMPROVED STICKY EMERGENCY HELPLINE FOOTER ⭐️ */}
            <div className="sticky bottom-0 z-50 bg-red-700 text-white text-center py-3 shadow-2xl">
                <p className="font-bold text-base mb-1">
                    {language === "en"
                        ? "🚨 Immediate Ambulance / Help"
                        : "🚨 तत्काल एम्बुलेंस / सहायता"}
                </p>
                <a href="tel:108" className="text-4xl font-extrabold underline tracking-widest block">
                    108
                </a>
            </div>

        </div>
  </div>
 );
}