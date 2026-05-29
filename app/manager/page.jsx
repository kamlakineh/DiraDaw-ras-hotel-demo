"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ManagerLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("managerUser");
    if (stored) {
      try {
        const user = JSON.parse(stored);
        if (user.role === "manager") {
          router.push("/manager/dashboard");
        }
      } catch {
        localStorage.removeItem("managerUser");
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

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      if (data.role !== "manager") {
        setError("Access denied. Manager role required.");
        return;
      }

      localStorage.setItem("managerUser", JSON.stringify(data));
      router.push("/manager/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f5f1] flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-[2rem] shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-[#bd902f]">Manager Portal</h1>
            <p className="text-sm text-neutral-500 mt-2">Restaurant Management System</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
              <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[#bd902f] hover:bg-[#a67724] text-white font-bold py-3.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-sm text-neutral-500 hover:text-[#bd902f] transition">
              ← Back to Hotel Website
            </a>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-neutral-400">
            Dire Dawa Ras Hotel — Manager Access Only
          </p>
        </div>
      </div>
    </div>
  );
}
