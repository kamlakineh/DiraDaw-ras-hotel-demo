"use client";

import { useState } from "react";
import { Search, Calendar, Clock, Users, CheckCircle, XCircle, AlertCircle, Phone, Mail, ArrowLeft } from "lucide-react";

export default function RestaurantReception({ restaurantId, onBack = null }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [reservations, setReservations] = useState([
    {
      id: 1,
      guestName: "John Doe",
      phone: "+251 911 234 567",
      email: "john.doe@email.com",
      restaurant: "Jegol – Arabic Restaurant",
      date: "2025-05-27",
      time: "19:00",
      guests: 4,
      specialRequests: "Vegetarian options needed",
      status: "confirmed",
      checkedIn: false,
      checkedInTime: null
    },
    {
      id: 2,
      guestName: "Sarah Smith",
      phone: "+251 922 345 678",
      email: "sarah.smith@email.com",
      restaurant: "The Terrace",
      date: "2025-05-27",
      time: "20:30",
      guests: 2,
      specialRequests: "",
      status: "confirmed",
      checkedIn: true,
      checkedInTime: "20:15"
    },
    {
      id: 3,
      guestName: "Michael Johnson",
      phone: "+251 933 456 789",
      email: "michael.j@email.com",
      restaurant: "Ertale Lounge",
      date: "2025-05-27",
      time: "21:00",
      guests: 6,
      specialRequests: "Birthday celebration",
      status: "confirmed",
      checkedIn: true,
      checkedInTime: "20:50"
    }
  ]);

  const filteredReservations = reservations.filter(reservation => {
    const matchesSearch = reservation.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reservation.phone.includes(searchTerm) ||
                         reservation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = reservation.date === selectedDate;
    return matchesSearch && matchesDate;
  });

  const handleCheckIn = (reservationId) => {
    const now = new Date();
    const timeString = now.toTimeString().slice(0, 5);
    
    setReservations(reservations.map(reservation =>
      reservation.id === reservationId
        ? { ...reservation, checkedIn: true, checkedInTime: timeString }
        : reservation
    ));
  };

  const handleCheckOut = (reservationId) => {
    setReservations(reservations.map(reservation =>
      reservation.id === reservationId
        ? { ...reservation, checkedIn: false, checkedInTime: null }
        : reservation
    ));
  };

  const updateStatus = (reservationId, newStatus) => {
    setReservations(reservations.map(reservation =>
      reservation.id === reservationId
        ? { ...reservation, status: newStatus }
        : reservation
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const todayStats = {
    total: filteredReservations.length,
    confirmed: filteredReservations.filter(r => r.status === "confirmed").length,
    checkedIn: filteredReservations.filter(r => r.checkedIn).length,
    pending: filteredReservations.filter(r => r.status === "pending").length,
    totalGuests: filteredReservations.reduce((sum, r) => sum + parseInt(r.guests), 0)
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        {onBack && (
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-neutral-100 text-neutral-600 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
        )}
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900">Restaurant Reception</h1>
          <p className="mt-2 text-neutral-600">Manage restaurant reservations</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Reservations</p>
              <p className="text-2xl font-bold text-neutral-900">{todayStats.total}</p>
            </div>
            <Calendar className="text-[#bd902f]" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Confirmed</p>
              <p className="text-2xl font-bold text-green-600">{todayStats.confirmed}</p>
            </div>
            <CheckCircle className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Checked In</p>
              <p className="text-2xl font-bold text-blue-600">{todayStats.checkedIn}</p>
            </div>
            <Users className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Guests</p>
              <p className="text-2xl font-bold text-purple-600">{todayStats.totalGuests}</p>
            </div>
            <Users className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
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
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-1">Date</label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Reservations Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-neutral-900">Today's Reservations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Guest</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Restaurant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Guests</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Checked In</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {filteredReservations.map((reservation) => (
                <tr key={reservation.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-neutral-900">{reservation.guestName}</div>
                      {reservation.specialRequests && (
                        <div className="text-xs text-neutral-500 mt-1">{reservation.specialRequests}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-neutral-900">
                      <div className="flex items-center gap-1">
                        <Phone size={14} className="text-neutral-400" />
                        {reservation.phone}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Mail size={14} className="text-neutral-400" />
                        {reservation.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                    {reservation.restaurant}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-neutral-900">
                      <Clock size={14} className="text-neutral-400" />
                      {reservation.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-sm text-neutral-900">
                      <Users size={14} className="text-neutral-400" />
                      {reservation.guests}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={reservation.status}
                      onChange={(e) => updateStatus(reservation.id, e.target.value)}
                      className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(reservation.status)}`}
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {reservation.checkedIn ? (
                      <div className="flex items-center gap-1 text-sm text-green-600">
                        <CheckCircle size={16} />
                        <span>{reservation.checkedInTime}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-sm text-neutral-400">
                        <XCircle size={16} />
                        <span>Not checked in</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {!reservation.checkedIn ? (
                        <button
                          onClick={() => handleCheckIn(reservation.id)}
                          className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-lg hover:bg-green-200 transition-colors"
                        >
                          Check In
                        </button>
                      ) : (
                        <button
                          onClick={() => handleCheckOut(reservation.id)}
                          className="px-3 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-lg hover:bg-red-200 transition-colors"
                        >
                          Check Out
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
