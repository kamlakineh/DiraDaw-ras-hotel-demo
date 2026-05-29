"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ReceptionPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("receptionUser");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.role === "reception") {
          router.push("/reception/dashboard");
        }
      } catch {
        localStorage.removeItem("receptionUser");
      }
    }
  }, [router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.role === "reception") {
        localStorage.setItem("receptionUser", JSON.stringify(data));
        router.push("/reception/dashboard");
      } else if (response.ok && data.role !== "reception") {
        setError("Access denied. Reception login only.");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#bd902f]/10 to-[#f7f5f1] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-[#bd902f]">Reception Portal</h1>
            <p className="mt-2 text-neutral-600">Dire Dawa Ras Hotel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                placeholder="Enter your username"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                placeholder="Enter your password"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724] disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-neutral-600">
            <p>Contact administrator if you need access credentials.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
