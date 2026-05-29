"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Bed, Users, DollarSign, X, Check, TrendingUp, Calendar } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function RoomManagement() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("/api/rooms");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingRoom, setIsAddingRoom] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    maxOccupancy: "",
    totalRooms: "",
    availableRooms: "",
    roomNumbers: "",
    amenities: "",
    description: "",
    longDescription: "",
    bed: "",
    guests: "",
    size: "",
    badge: "",
    discount: "",
    image: "",
    gallery: []
  });

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const amenitiesArray = formData.amenities.split(",").map(item => item.trim()).filter(item => item);
    
    const roomData = {
      name: formData.name,
      price: Number(formData.price),
      maxOccupancy: Number(formData.maxOccupancy),
      totalRooms: Number(formData.totalRooms),
      availableRooms: Number(formData.availableRooms),
      roomNumbers: formData.roomNumbers,
      amenities: amenitiesArray,
      description: formData.description,
      longDescription: formData.longDescription,
      bed: formData.bed,
      guests: formData.guests,
      size: formData.size,
      badge: formData.badge,
      discount: formData.discount,
      image: formData.image,
      gallery: formData.gallery || []
    };

    try {
      if (editingRoom) {
        const response = await fetch("/api/rooms", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...roomData, id: editingRoom.id }),
        });
        if (response.ok) {
          const updatedRoom = await response.json();
          setRooms(rooms.map(room => room.id === editingRoom.id ? updatedRoom : room));
        }
      } else {
        const response = await fetch("/api/rooms", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(roomData),
        });
        if (response.ok) {
          const newRoom = await response.json();
          setRooms([...rooms, newRoom]);
        }
      }
      resetForm();
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      maxOccupancy: "",
      totalRooms: "",
      availableRooms: "",
      roomNumbers: "",
      amenities: "",
      description: "",
      longDescription: "",
      bed: "",
      guests: "",
      size: "",
      badge: "",
      discount: "",
      image: "",
      gallery: []
    });
    setIsAddingRoom(false);
    setEditingRoom(null);
  };

  const handleEdit = (room) => {
    setEditingRoom(room);
    setFormData({
      name: room.name,
      price: room.price,
      maxOccupancy: room.maxOccupancy,
      totalRooms: room.totalRooms,
      availableRooms: room.availableRooms,
      roomNumbers: room.roomNumbers || "",
      amenities: room.amenities.join(", "),
      description: room.description,
      longDescription: room.longDescription || "",
      bed: room.bed || "",
      guests: room.guests || "",
      size: room.size || "",
      badge: room.badge || "",
      discount: room.discount || "",
      image: room.image,
      gallery: room.gallery || []
    });
    setIsAddingRoom(true);
  };

  const handleDelete = async (roomId) => {
    if (confirm("Are you sure you want to delete this room type?")) {
      try {
        const response = await fetch(`/api/rooms?id=${roomId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setRooms(rooms.filter(room => room.id !== roomId));
        }
      } catch (error) {
        console.error("Error deleting room:", error);
      }
    }
  };

  const totalRooms = rooms.reduce((sum, room) => sum + room.totalRooms, 0);
  const totalAvailable = rooms.reduce((sum, room) => sum + room.availableRooms, 0);
  const occupancyRate = totalRooms > 0 ? Math.round(((totalRooms - totalAvailable) / totalRooms) * 100) : 0;

  if (loading) {
    return <div className="text-center py-12">Loading rooms...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Room Management</h1>
        <p className="mt-2 text-neutral-600">Manage all hotel rooms and occupancy</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Rooms</p>
              <p className="text-2xl font-bold text-neutral-900">{totalRooms}</p>
            </div>
            <Bed className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Available</p>
              <p className="text-2xl font-bold text-green-600">{totalAvailable}</p>
            </div>
            <Check className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Occupancy Rate</p>
              <p className="text-2xl font-bold text-[#bd902f]">{occupancyRate}%</p>
            </div>
            <TrendingUp className="text-[#bd902f]" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Room Types</p>
              <p className="text-2xl font-bold text-neutral-900">{rooms.length}</p>
            </div>
            <Users className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder="Search room types..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
          />
        </div>
        <button
          onClick={() => setIsAddingRoom(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#bd902f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a67724]"
        >
          <Plus size={18} />
          Add Room Type
        </button>
      </div>

      {/* Room Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="h-48 bg-neutral-100 relative">
              <img
                src={room.image}
                alt={room.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/room-about.jpg";
                }}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(room)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Edit2 size={16} className="text-neutral-700" />
                </button>
                <button
                  onClick={() => handleDelete(room.id)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-neutral-900">{room.name}</h3>
              <p className="mt-2 text-sm text-neutral-600">{room.description}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Price per night</span>
                  <span className="font-bold text-[#bd902f]">${room.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Max occupancy</span>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-neutral-400" />
                    <span className="font-medium">{room.maxOccupancy}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Availability</span>
                  <span className={`font-medium ${room.availableRooms > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {room.availableRooms}/{room.totalRooms}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium text-neutral-500 mb-2">Amenities</p>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 3).map((amenity, index) => (
                    <span key={index} className="px-2 py-1 text-xs bg-[#f7f5f1] rounded-full text-neutral-600">
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 3 && (
                    <span className="px-2 py-1 text-xs bg-[#f7f5f1] rounded-full text-neutral-600">
                      +{room.amenities.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Room Modal */}
      {isAddingRoom && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-5">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={resetForm}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-bold">
              {editingRoom ? "Edit Room Type" : "Add New Room Type"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Room Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., Deluxe Rooms"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Price per Night *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., 200"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Max Occupancy *</label>
                  <input
                    type="number"
                    value={formData.maxOccupancy}
                    onChange={(e) => setFormData({ ...formData, maxOccupancy: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., 4"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Total Rooms *</label>
                  <input
                    type="number"
                    value={formData.totalRooms}
                    onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., 10"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Available Rooms *</label>
                  <input
                    type="number"
                    value={formData.availableRooms}
                    onChange={(e) => setFormData({ ...formData, availableRooms: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., 5"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Room Numbers *</label>
                <input
                  type="text"
                  value={formData.roomNumbers}
                  onChange={(e) => setFormData({ ...formData, roomNumbers: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  placeholder="e.g., 10, 45, 30, 31, 45"
                  required
                />
                <p className="mt-1 text-xs text-neutral-500">Separate individual room numbers with commas</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none resize-none"
                  rows={3}
                  placeholder="Describe the room type..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Amenities *</label>
                <input
                  type="text"
                  value={formData.amenities}
                  onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  placeholder="WiFi, TV, Air Conditioning, Mini Bar"
                  required
                />
                <p className="mt-1 text-xs text-neutral-500">Separate amenities with commas</p>
              </div>

              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Image"
              />

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
                >
                  {editingRoom ? "Update Room" : "Add Room"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
