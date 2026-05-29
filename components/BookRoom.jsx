"use client";

import { useState } from "react";
import { ArrowRight, X, Calendar, Users, Phone, Mail, CreditCard } from "lucide-react";

export default function BookRoom({ roomType, checkIn, checkOut, rooms, adults, children, onClose }) {
  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentMethod: "",
    agreeTerms: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get room ID from room type
      const roomsResponse = await fetch("/api/rooms");
      const roomsData = await roomsResponse.json();
      const selectedRoom = roomsData.find(r => r.name === roomType);

      if (!selectedRoom) {
        alert("Room type not found");
        setLoading(false);
        return;
      }

      const bookingPayload = {
        guestName: `${bookingData.firstName} ${bookingData.lastName}`,
        phone: bookingData.phone,
        email: bookingData.email,
        roomId: selectedRoom.id,
        checkIn,
        checkOut,
        adults: parseInt(adults),
        children: parseInt(children),
        status: "confirmed",
        totalPrice: selectedRoom.price * parseInt(rooms) * Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
      };

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingPayload),
      });

      if (response.ok) {
        alert("Booking confirmed successfully!");
        onClose();
      } else {
        alert("Failed to create booking. Please try again.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const nights = calculateNights();

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-5">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
        >
          <X size={20} />
        </button>

        <div className="mb-8">
          <h2 className="font-serif text-3xl font-bold">Complete Your Booking</h2>
          <div className="mt-6 rounded-2xl bg-[#f7f5f1] p-6">
            <h3 className="font-semibold text-lg">Booking Summary</h3>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-600">Room Type:</span>
                <span className="font-semibold">{roomType || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Check-in:</span>
                <span className="font-semibold">{checkIn || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Check-out:</span>
                <span className="font-semibold">{checkOut || "Not selected"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Number of Rooms:</span>
                <span className="font-semibold">{rooms || "1"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Adults:</span>
                <span className="font-semibold">{adults || "1"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Children:</span>
                <span className="font-semibold">{children || "0"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Nights:</span>
                <span className="font-semibold">{nights}</span>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="font-semibold text-lg mb-4">Guest Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">First Name *</label>
                <input
                  type="text"
                  value={bookingData.firstName}
                  onChange={(e) => setBookingData({ ...bookingData, firstName: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Last Name *</label>
                <input
                  type="text"
                  value={bookingData.lastName}
                  onChange={(e) => setBookingData({ ...bookingData, lastName: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  value={bookingData.email}
                  onChange={(e) => setBookingData({ ...bookingData, email: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  required
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Special Requests</h3>
            <textarea
              value={bookingData.specialRequests}
              onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
              className="w-full rounded-2xl border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none resize-none"
              rows={3}
              placeholder="Any special requests or preferences (optional)"
            />
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Payment Method</h3>
            <select
              value={bookingData.paymentMethod}
              onChange={(e) => setBookingData({ ...bookingData, paymentMethod: e.target.value })}
              className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
              required
            >
              <option value="">Select Payment Method</option>
              <option value="credit-card">Credit Card</option>
              <option value="debit-card">Debit Card</option>
              <option value="bank-transfer">Bank Transfer</option>
              <option value="cash">Cash on Arrival</option>
              <option value="mobile-payment">Mobile Payment</option>
            </select>
          </div>

          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={bookingData.agreeTerms}
                onChange={(e) => setBookingData({ ...bookingData, agreeTerms: e.target.checked })}
                className="mt-1 rounded border-neutral-300 text-[#bd902f] focus:border-[#bd902f] focus:ring-[#bd902f]"
                required
              />
              <span className="text-sm text-neutral-600">
                I agree to the hotel's terms and conditions, cancellation policy, and privacy policy. I understand that my booking is subject to availability.
              </span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724] shadow-md disabled:opacity-50"
            >
              <span className="flex items-center justify-center gap-2">
                {loading ? "Processing..." : "Confirm Booking"}
                {!loading && <ArrowRight size={16} />}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
