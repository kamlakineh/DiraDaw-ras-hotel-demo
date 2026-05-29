"use client";

import { useState, useEffect } from "react";
import BookRoom from "./BookRoom";

export default function CheckAvailabilityForm() {
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState(null);
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const [formData, setFormData] = useState({
    checkIn: "",
    checkOut: "",
    roomType: "",
    rooms: "1",
    adults: "1",
    children: "0"
  });

  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      if (Array.isArray(data)) {
        setRooms(data);
      } else {
        console.error("Fetched rooms data is not an array:", data);
        setRooms([]);
      }
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setRooms([]);
    }
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/bookings");
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const checkAvailability = async () => {
    if (!formData.checkIn || !formData.checkOut || !formData.roomType) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    await fetchBookings();

    const selectedRoom = rooms.find(r => r.name === formData.roomType);
    if (!selectedRoom) {
      setLoading(false);
      alert("Room type not found");
      return;
    }

    // Check bookings for this room that overlap with the selected dates
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    const overlappingBookings = bookings.filter(booking => {
      if (booking.roomId !== selectedRoom.id) return false;
      if (booking.status === "cancelled") return false;

      const bookingCheckIn = new Date(booking.checkIn);
      const bookingCheckOut = new Date(booking.checkOut);

      // Check if dates overlap
      return (
        (checkInDate >= bookingCheckIn && checkInDate < bookingCheckOut) ||
        (checkOutDate > bookingCheckIn && checkOutDate <= bookingCheckOut) ||
        (checkInDate <= bookingCheckIn && checkOutDate >= bookingCheckOut)
      );
    });

    const bookedCount = overlappingBookings.length;
    const requestedRooms = parseInt(formData.rooms);
    const availableCount = selectedRoom.availableRooms - bookedCount;

    setAvailableRooms({
      room: selectedRoom,
      available: availableCount >= requestedRooms,
      availableCount,
      requestedRooms,
      pricePerNight: selectedRoom.price,
      nights: Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)),
    });

    setAvailabilityChecked(true);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await checkAvailability();
  };

  const handleCloseBooking = () => {
    setShowBooking(false);
    setAvailabilityChecked(false);
  };

  const handleProceedToBooking = () => {
    if (availableRooms && availableRooms.available) {
      setShowBooking(true);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Check In:</label>
              <input
                type="date"
                value={formData.checkIn}
                onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Check Out:</label>
              <input
                type="date"
                value={formData.checkOut}
                onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-neutral-700 mb-2">Room Type:</label>
            <select
              value={formData.roomType}
              onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
              className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
              required
            >
              <option value="">Select Room Type</option>
              {Array.isArray(rooms) && rooms.map(room => (
                <option key={room.id} value={room.name}>{room.name} - ${room.price}/night</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Adults:</label>
              <select
                value={formData.adults}
                onChange={(e) => setFormData({ ...formData, adults: e.target.value })}
                className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                required
              >
                <option value="">Adults</option>
                {[...Array(4)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>{i + 1} Adult{i > 0 ? "s" : ""}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-neutral-700 mb-2">Children:</label>
              <select
                value={formData.children}
                onChange={(e) => setFormData({ ...formData, children: e.target.value })}
                className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                required
              >
                <option value="">Children</option>
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i}>{i} Child{i !== 1 ? "ren" : ""}</option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724] disabled:opacity-50"
          >
            <span>{loading ? "Checking..." : "Check Availability"}</span>
          </button>
        </div>
      </form>

      {availabilityChecked && availableRooms && (
        <div className={`mt-6 p-4 rounded-xl ${availableRooms.available ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"}`}>
          <h3 className={`font-bold text-lg ${availableRooms.available ? "text-green-800" : "text-red-800"}`}>
            {availableRooms.available ? "Rooms Available!" : "No Rooms Available"}
          </h3>
          <div className="mt-2 space-y-1 text-sm">
            <p><strong>Room Type:</strong> {availableRooms.room.name}</p>
            <p><strong>Available:</strong> {availableRooms.availableCount} room(s)</p>
            <p><strong>Requested:</strong> {availableRooms.requestedRooms} room(s)</p>
            <p><strong>Price:</strong> ${availableRooms.pricePerNight}/night</p>
            <p><strong>Duration:</strong> {availableRooms.nights} night(s)</p>
            {availableRooms.available && (
              <p className="font-bold text-green-700 mt-2">
                Total: ${availableRooms.pricePerNight * availableRooms.nights * availableRooms.requestedRooms}
              </p>
            )}
          </div>
          {availableRooms.available && (
            <button
              onClick={handleProceedToBooking}
              className="mt-4 w-full inline-flex items-center justify-center gap-3 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
            >
              <span>Proceed to Booking</span>
            </button>
          )}
        </div>
      )}

      {showBooking && (
        <BookRoom
          roomType={formData.roomType}
          checkIn={formData.checkIn}
          checkOut={formData.checkOut}
          rooms={formData.rooms}
          adults={formData.adults}
          children={formData.children}
          onClose={handleCloseBooking}
        />
      )}
    </>
  );
}
