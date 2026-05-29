"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Phone, Mail, CheckCircle, XCircle, Search, Filter, Check, X } from "lucide-react";

export default function RestaurantReservations({ user }) {
  const [reservations, setReservations] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [restaurantsResponse, reservationsResponse] = await Promise.all([
        fetch("/api/restaurants"),
        fetch("/api/reservations")
      ]);
      const restaurantsData = await restaurantsResponse.json();
      const reservationsData = await reservationsResponse.json();
      
      setRestaurants(restaurantsData);
      setReservations(reservationsData);
      
      // Auto-select restaurant based on user's department and username
      if (user.department === "restaurant") {
        // Try to match username with restaurant name
        const matchedRestaurant = restaurantsData.find(r => 
          r.name.toLowerCase().includes(user.username.toLowerCase()) ||
          user.username.toLowerCase().includes(r.name.toLowerCase().split(" ")[0])
        );
        
        if (matchedRestaurant) {
          setSelectedRestaurant(matchedRestaurant.id.toString());
        }
        // If no match, selectedRestaurant remains empty - no reservations will be shown
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredReservations = reservations.filter(res => {
    // Force strict filtering for restaurant reception
    if (user.department === "restaurant") {
      if (!selectedRestaurant) return false;
      if (res.restaurantId !== parseInt(selectedRestaurant)) return false;
    } else {
      // For general users
      const matchesRestaurant = !selectedRestaurant || res.restaurantId === parseInt(selectedRestaurant);
      if (!matchesRestaurant) return false;
    }

    const matchesSearch = res.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         res.phone.includes(searchTerm) ||
                         res.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || res.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch("/api/reservations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) {
        setReservations(reservations.map(r => r.id === id ? { ...r, status: newStatus } : r));
      }
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleCheckIn = async (id) => {
    try {
      const response = await fetch("/api/reservations", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, checkedIn: true, checkedInTime: new Date().toISOString() }),
      });
      if (response.ok) {
        setReservations(reservations.map(r => r.id === id ? { ...r, checkedIn: true, checkedInTime: new Date().toISOString() } : r));
      }
    } catch (error) {
      console.error("Error checking in reservation:", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRestaurantName = (restaurantId) => {
    const restaurant = restaurants.find(r => r.id === restaurantId);
    return restaurant ? restaurant.name : "Unknown";
  };

  if (loading) return <div className="text-center py-12">Loading reservations...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Restaurant Reservations</h1>
        <p className="mt-2 text-neutral-600">Manage table bookings for your restaurant</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
          >
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Guest</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Contact</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Date & Time</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Guests</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Restaurant</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Status</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map((reservation) => (
              <tr key={reservation.id} className="border-b hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-neutral-900">{reservation.guestName}</div>
                  {reservation.specialRequests && (
                    <div className="text-sm text-neutral-600 mt-1">
                      {reservation.specialRequests}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Phone size={14} />
                    {reservation.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1">
                    <Mail size={14} />
                    {reservation.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-900">
                    <Calendar size={14} />
                    {reservation.date}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1">
                    <Clock size={14} />
                    {reservation.time}
                  </div>
                  {reservation.checkedIn && (
                    <div className="text-xs text-green-600 mt-1 font-medium">
                      Checked in at {new Date(reservation.checkedInTime).toLocaleTimeString()}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-900">
                    <Users size={14} />
                    {reservation.guests}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-neutral-600">
                  {getRestaurantName(reservation.restaurantId)}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(reservation.status)}`}>
                    {reservation.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {!reservation.checkedIn && reservation.status === "confirmed" && (
                      <button
                        onClick={() => handleCheckIn(reservation.id)}
                        className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors"
                        title="Check In"
                      >
                        <Check size={16} className="text-green-600" />
                      </button>
                    )}
                    <select
                      value={reservation.status}
                      onChange={(e) => handleStatusChange(reservation.id, e.target.value)}
                      className="px-3 py-1 text-xs rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </td>
              </tr>
            ))}
            {filteredReservations.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                  No reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
