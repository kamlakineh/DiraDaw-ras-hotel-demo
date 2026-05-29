"use client";

import { useState } from "react";
import { Shield, LogIn, X } from "lucide-react";
import RestaurantReception from "../../components/RestaurantReception";

export default function RestaurantLoginPage({ restaurantId: initialRestaurantId }) {
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(initialRestaurantId || "");
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const restaurantData = {
    1: { name: "Jegol – Arabic Restaurant", manager: "Ahmed Mohammed" },
    2: { name: "The Terrace", manager: "Sarah Johnson" },
    3: { name: "Ertale Lounge", manager: "Michael Tesfaye" },
    4: { name: "Bean Kaffa", manager: "Luna Kassa" },
    5: { name: "Baboon – Lounge Bar", manager: "David Bekele" },
    6: { name: "Moodz Sport Bar & Terrace", manager: "Rachel Solomon" },
    7: { name: "The African Hub", manager: "Samuel Negash" },
    8: { name: "Aquarius Pool Bar", manager: "Nina Hailu" },
    9: { name: "Ras Restaurant", manager: "Thomas Gebre" }
  };

  const currentRestaurant = restaurantData[selectedRestaurantId] || null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedRestaurantId && !credentials.username) {
      setError("Please select a restaurant or enter a username");
      return;
    }

    setIsLoading(true);
    setError("");

    // Simulate authentication - in real app, this would be an API call
    setTimeout(() => {
      // Demo credentials for restaurant staff
      const validCredentials = [
        { username: "jegol", password: "jegol123", restaurantId: 1 },
        { username: "terrace", password: "terrace123", restaurantId: 2 },
        { username: "ertale", password: "ertale123", restaurantId: 3 },
        { username: "bean", password: "bean123", restaurantId: 4 },
        { username: "baboon", password: "baboon123", restaurantId: 5 },
        { username: "moodz", password: "moodz123", restaurantId: 6 },
        { username: "african", password: "african123", restaurantId: 7 },
        { username: "aquarius", password: "aquarius123", restaurantId: 8 },
        { username: "ras", password: "ras123", restaurantId: 9 },
      ];

      // Detect restaurant ID based on specific username first
      let matchedCred = validCredentials.find(
        cred => cred.username === credentials.username.toLowerCase() && 
                 cred.password === credentials.password
      );

      // If not a specific username, check for generic "reception" credentials for selected restaurant
      if (!matchedCred && credentials.username.toLowerCase() === "reception" && credentials.password === "reception123") {
        if (selectedRestaurantId) {
          matchedCred = { username: "reception", password: "reception123", restaurantId: Number(selectedRestaurantId) };
        } else {
          setError("Please select a restaurant to log in as reception");
          setIsLoading(false);
          return;
        }
      }

      if (matchedCred) {
        setSelectedRestaurantId(matchedCred.restaurantId);
        setIsAuthenticated(true);
      } else {
        setError("Invalid username or password for this restaurant");
      }
      setIsLoading(false);
    }, 1000);
  };

  if (isAuthenticated && selectedRestaurantId) {
    return <RestaurantReception restaurantId={Number(selectedRestaurantId)} />;
  }

  return (
    <div className="min-h-screen bg-[#f7f5f1] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-[#bd902f] rounded-full flex items-center justify-center mb-4 shadow-md">
            <Shield size={40} className="text-white" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900">Restaurant Reception</h1>
          <p className="mt-2 text-neutral-600">Dire Dawa Ras Hotel Receptionist Portal</p>
          {currentRestaurant && (
            <div className="mt-2 inline-block bg-[#bd902f]/10 text-[#bd902f] px-4 py-1.5 rounded-full text-sm font-semibold">
              Selected: {currentRestaurant.name}
            </div>
          )}
        </div>

        <div className="bg-white rounded-[2rem] shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!initialRestaurantId && (
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Select Restaurant</label>
                <select
                  value={selectedRestaurantId}
                  onChange={(e) => setSelectedRestaurantId(e.target.value)}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none bg-white"
                >
                  <option value="">-- Choose Restaurant --</option>
                  {Object.entries(restaurantData).map(([id, data]) => (
                    <option key={id} value={id}>{data.name}</option>
                  ))}
                </select>
                <p className="text-xs text-neutral-500 mt-1">If using restaurant-specific login, this is auto-detected.</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Username</label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                placeholder="Enter username (e.g. jegol or reception)"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none pr-12"
                  placeholder="Enter password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-neutral-700"
                >
                  {showPassword ? <X size={20} /> : <LogIn size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-full text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-[#f7f5f1] rounded-2xl">
            <p className="text-xs font-bold text-neutral-600 mb-2">Reception Credentials:</p>
            <div className="space-y-1 text-xs text-neutral-500">
              <p><strong className="text-neutral-700">Specific:</strong> jegol / jegol123 (Auto-logs into Jegol)</p>
              <p><strong className="text-neutral-700">Specific:</strong> terrace / terrace123 (Auto-logs into Terrace)</p>
              <p><strong className="text-neutral-700">Generic:</strong> Select restaurant + use <code className="bg-white px-1.5 py-0.5 rounded">reception</code> / <code className="bg-white px-1.5 py-0.5 rounded">reception123</code></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
