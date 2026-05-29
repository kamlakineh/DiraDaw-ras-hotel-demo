"use client";

import { useState, useEffect } from "react";
import { Calendar, Clock, Users, Phone, Mail, Bed, Search, Filter, Check, X } from "lucide-react";

export default function RoomBookings({ user }) {
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [roomsResponse, bookingsResponse] = await Promise.all([
        fetch("/api/rooms"),
        fetch("/api/bookings")
      ]);
      const roomsData = await roomsResponse.json();
      const bookingsData = await bookingsResponse.json();
      
      setRooms(roomsData);
      setBookings(bookingsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const matchesRoom = !selectedRoom || booking.roomId === parseInt(selectedRoom);
    const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         booking.phone.includes(searchTerm) ||
                         booking.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !statusFilter || booking.status === statusFilter;
    return matchesRoom && matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (response.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const handleRoomNumberChange = async (id, newRoomNumber) => {
    try {
      const response = await fetch("/api/bookings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, assignedRoomNumber: newRoomNumber }),
      });
      if (response.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, assignedRoomNumber: newRoomNumber } : b));
      }
    } catch (error) {
      console.error("Error updating assigned room number:", error);
    }
  };

  const getRoomNumbersForRoomType = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    if (!room || !room.roomNumbers) return [];
    return room.roomNumbers.split(",").map(n => n.trim()).filter(Boolean);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "checked_in": return "bg-purple-100 text-purple-800";
      case "checked_out": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoomName = (roomId) => {
    const room = rooms.find(r => r.id === roomId);
    return room ? room.name : "Unknown";
  };

  if (loading) return <div className="text-center py-12">Loading bookings...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Room Bookings</h1>
        <p className="mt-2 text-neutral-600">Manage room bookings for your department</p>
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
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="checked_in">Checked In</option>
            <option value="checked_out">Checked Out</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full">
          <thead className="bg-neutral-50 border-b">
            <tr>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Guest</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Contact</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Dates</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Room & Guests</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Price</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Status</th>
              <th className="text-left px-6 py-4 text-sm font-bold text-neutral-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.map((booking) => (
              <tr key={booking.id} className="border-b hover:bg-neutral-50">
                <td className="px-6 py-4">
                  <div className="font-medium text-neutral-900">{booking.guestName}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600">
                    <Phone size={14} />
                    {booking.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1">
                    <Mail size={14} />
                    {booking.email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-900">
                    <Calendar size={14} />
                    {booking.checkIn}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1">
                    <Clock size={14} />
                    {booking.checkOut}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-900">
                    <Bed size={14} />
                    {getRoomName(booking.roomId)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-neutral-600 mt-1">
                    <Users size={14} />
                    {booking.adults} adults, {booking.children} children
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-xs text-neutral-500">Room #:</span>
                    <select
                      value={booking.assignedRoomNumber || ""}
                      onChange={(e) => handleRoomNumberChange(booking.id, e.target.value)}
                      className="px-2 py-0.5 text-xs rounded border border-neutral-200 focus:border-[#bd902f] focus:outline-none bg-white font-semibold text-neutral-700"
                    >
                      <option value="">Select...</option>
                      {getRoomNumbersForRoomType(booking.roomId).map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium text-neutral-900">
                  ${booking.totalPrice}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                    {booking.status.replace(/_/g, " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={booking.status}
                    onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                    className="px-3 py-1 text-xs rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="checked_in">Checked In</option>
                    <option value="checked_out">Checked Out</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {filteredBookings.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-neutral-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
