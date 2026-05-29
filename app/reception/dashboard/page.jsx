"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ReceptionLayout from "../components/ReceptionLayout";
import RestaurantReservations from "../components/RestaurantReservations";
import RoomBookings from "../components/RoomBookings";

export default function ReceptionDashboard() {
  const [user, setUser] = useState(null);
  const [checked, setChecked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("receptionUser");
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        if (userData.role !== "reception" || !userData.department) {
          localStorage.removeItem("receptionUser");
          router.push("/reception");
          return;
        }
        setUser(userData);
      } catch {
        localStorage.removeItem("receptionUser");
        router.push("/reception");
      }
    } else {
      router.push("/reception");
    }
    setChecked(true);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("receptionUser");
    setUser(null);
    router.push("/reception");
  };

  if (!checked) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  const renderContent = () => {
    switch (user.department) {
      case "restaurant":
        return <RestaurantReservations user={user} />;
      case "room":
        return <RoomBookings user={user} />;
      case "general":
        return <RestaurantReservations user={user} />;
      default:
        return <RestaurantReservations user={user} />;
    }
  };

  return (
    <ReceptionLayout user={user} onLogout={handleLogout}>
      {renderContent()}
    </ReceptionLayout>
  );
}
