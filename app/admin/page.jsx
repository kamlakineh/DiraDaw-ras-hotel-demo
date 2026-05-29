"use client";

import { useState, useEffect } from "react";
import AdminLogin from "../auth/AdminLogin";
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./components/AdminDashboard";
import RoomManagement from "./components/RoomManagement";
import RestaurantManagement from "./components/RestaurantManagement";
import BlogManagement from "./components/BlogManagement";
import GalleryManagement from "./components/GalleryManagement";
import EmployeeManagement from "./components/EmployeeManagement";
import AnalyticsSection from "./components/AnalyticsSection";
import SettingsSection from "./components/SettingsSection";

export default function AdminPage() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
      }
    }
    setChecked(true);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setActiveSection("dashboard");
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <AdminDashboard user={user} />;
      case "rooms":
        return <RoomManagement />;
      case "restaurants":
        return <RestaurantManagement />;
      case "blog":
        return <BlogManagement />;
      case "gallery":
        return <GalleryManagement />;
      case "employees":
        return <EmployeeManagement />;
      case "analytics":
        return <AnalyticsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return <AdminDashboard user={user} />;
    }
  };

  if (!checked) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <AdminLayout
      user={user}
      activeSection={activeSection}
      onLogout={handleLogout}
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </AdminLayout>
  );
}
