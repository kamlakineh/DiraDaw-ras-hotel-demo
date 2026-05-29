"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ManagerLayout from "../components/ManagerLayout";
import ManagerDashboard from "../components/ManagerDashboard";
import MenuManagement from "../components/MenuManagement";
import OrderManagement from "../components/OrderManagement";

export default function ManagerDashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("managerUser");
    if (!stored) {
      router.push("/manager");
      return;
    }

    try {
      const parsedUser = JSON.parse(stored);
      if (parsedUser.role !== "manager") {
        localStorage.removeItem("managerUser");
        router.push("/manager");
        return;
      }
      setUser(parsedUser);
      fetchData();
    } catch {
      localStorage.removeItem("managerUser");
      router.push("/manager");
    }
  }, [router]);

  const fetchData = async () => {
    try {
      const [foodsRes, ordersRes] = await Promise.all([
        fetch("/api/manager/foods"),
        fetch("/api/manager/orders"),
      ]);

      if (foodsRes.ok) {
        const foodsData = await foodsRes.json();
        setFoods(Array.isArray(foodsData) ? foodsData : []);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("managerUser");
    router.push("/manager");
  };

  const handleFoodSave = async (payload) => {
    try {
      const url = payload.id ? "/api/manager/foods" : "/api/manager/foods";
      const method = payload.id ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        fetchData();
      } else {
        alert("Failed to save food item");
      }
    } catch (error) {
      console.error("Error saving food:", error);
      alert("Failed to save food item");
    }
  };

  const handleFoodDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this food item?")) return;

    try {
      const response = await fetch(`/api/manager/foods?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      } else {
        alert("Failed to delete food item");
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      alert("Failed to delete food item");
    }
  };

  const handleOrderStatusUpdate = async (id, status) => {
    try {
      const response = await fetch("/api/manager/orders", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });

      if (response.ok) {
        fetchData();
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order:", error);
      alert("Failed to update order status");
    }
  };

  const handleOrderDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this order?")) return;

    try {
      const response = await fetch(`/api/manager/orders?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchData();
      } else {
        alert("Failed to delete order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f7f5f1] flex items-center justify-center">
        <div className="text-neutral-500">Verifying authentication...</div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5f1] flex items-center justify-center">
        <div className="text-neutral-500">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <ManagerLayout
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={handleLogout}
    >
      {activeTab === "dashboard" && (
        <ManagerDashboard
          foods={foods}
          orders={orders}
          onStatusUpdate={handleOrderStatusUpdate}
        />
      )}
      {activeTab === "menu" && (
        <MenuManagement
          foods={foods}
          onSave={handleFoodSave}
          onDelete={handleFoodDelete}
        />
      )}
      {activeTab === "orders" && (
        <OrderManagement
          orders={orders}
          onStatusUpdate={handleOrderStatusUpdate}
          onDelete={handleOrderDelete}
        />
      )}
    </ManagerLayout>
  );
}
