"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Clock, Users, CheckCircle, XCircle, Eye, X, Calendar, MapPin, TrendingUp, DollarSign } from "lucide-react";
import RestaurantReception from "./RestaurantReception";
import ImageUploader from "./ImageUploader";

export default function RestaurantManagement() {
  const [selectedReceptionId, setSelectedReceptionId] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch("/api/restaurants");
      const data = await response.json();
      setRestaurants(data);
    } catch (error) {
      console.error("Error fetching restaurants:", error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingRestaurant, setIsAddingRestaurant] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [viewingRestaurant, setViewingRestaurant] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    opening: "",
    image: "",
    capacity: "",
    manager: "",
    phone: "",
    status: "active"
  });

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    restaurant.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const openingArray = formData.opening.split(",").map(item => item.trim()).filter(item => item);
    
    const restaurantData = {
      name: formData.name,
      description: formData.description,
      opening: openingArray,
      image: formData.image,
      capacity: Number(formData.capacity),
      manager: formData.manager,
      phone: formData.phone,
      status: formData.status,
    };

    try {
      if (editingRestaurant) {
        const response = await fetch("/api/restaurants", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...restaurantData, id: editingRestaurant.id }),
        });
        if (response.ok) {
          const updatedRestaurant = await response.json();
          setRestaurants(restaurants.map(restaurant => restaurant.id === editingRestaurant.id ? updatedRestaurant : restaurant));
        }
      } else {
        const response = await fetch("/api/restaurants", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(restaurantData),
        });
        if (response.ok) {
          const newRestaurant = await response.json();
          setRestaurants([...restaurants, newRestaurant]);
        }
      }
      resetForm();
    } catch (error) {
      console.error("Error saving restaurant:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      opening: "",
      image: "",
      capacity: "",
      manager: "",
      phone: "",
      status: "active"
    });
    setIsAddingRestaurant(false);
    setEditingRestaurant(null);
  };

  const handleEdit = (restaurant) => {
    setEditingRestaurant(restaurant);
    setFormData({
      name: restaurant.name,
      description: restaurant.description,
      opening: restaurant.opening.join(", "),
      image: restaurant.image,
      capacity: restaurant.capacity,
      manager: restaurant.manager,
      phone: restaurant.phone,
      status: restaurant.status
    });
    setIsAddingRestaurant(true);
  };

  const handleDelete = async (restaurantId) => {
    if (confirm("Are you sure you want to delete this restaurant?")) {
      try {
        const response = await fetch(`/api/restaurants?id=${restaurantId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setRestaurants(restaurants.filter(restaurant => restaurant.id !== restaurantId));
        }
      } catch (error) {
        console.error("Error deleting restaurant:", error);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "maintenance": return "bg-yellow-100 text-yellow-800";
      case "closed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const totalRevenue = restaurants.reduce((sum, r) => sum + (r.monthlyRevenue || 0), 0);
  const totalReservations = restaurants.reduce((sum, r) => sum + (r.todayReservations || 0), 0);

  if (loading) {
    return <div className="text-center py-12">Loading restaurants...</div>;
  }

  if (selectedReceptionId) {
    return (
      <div>
        <button
          onClick={() => setSelectedReceptionId(null)}
          className="mb-4 inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
        >
          <X size={20} />
          Back to Restaurant Management
        </button>
        <RestaurantReception restaurantId={selectedReceptionId} onBack={() => setSelectedReceptionId(null)} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Restaurant Management</h1>
        <p className="mt-2 text-neutral-600">Manage all hotel restaurants and performance</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Restaurants</p>
              <p className="text-2xl font-bold text-neutral-900">{restaurants.length}</p>
            </div>
            <Users className="text-blue-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Today's Reservations</p>
              <p className="text-2xl font-bold text-green-600">{totalReservations}</p>
            </div>
            <Calendar className="text-green-600" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-[#bd902f]">${totalRevenue.toLocaleString()}</p>
            </div>
            <DollarSign className="text-[#bd902f]" size={24} />
          </div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Capacity</p>
              <p className="text-2xl font-bold text-purple-600">{restaurants.reduce((sum, r) => sum + r.capacity, 0)}</p>
            </div>
            <TrendingUp className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      {/* Search and Add */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder="Search restaurants or managers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
          />
        </div>
        <button
          onClick={() => setIsAddingRestaurant(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#bd902f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a67724]"
        >
          <Plus size={18} />
          Add Restaurant
        </button>
      </div>

      {/* Restaurant Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRestaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="h-48 bg-neutral-100 relative">
              <img
                src={restaurant.image}
                alt={restaurant.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/restaurant-about.jpg";
                }}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => setSelectedReceptionId(restaurant.id)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  title="View Reception"
                >
                  <Eye size={16} className="text-neutral-700" />
                </button>
                <button
                  onClick={() => handleEdit(restaurant)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Edit2 size={16} className="text-neutral-700" />
                </button>
                <button
                  onClick={() => handleDelete(restaurant.id)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(restaurant.status)}`}>
                  {restaurant.status}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-neutral-900">{restaurant.name}</h3>
              <p className="mt-2 text-sm text-neutral-600 line-clamp-2">{restaurant.description}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Manager</span>
                  <span className="font-medium text-neutral-900">{restaurant.manager}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Capacity</span>
                  <div className="flex items-center gap-1">
                    <Users size={16} className="text-neutral-400" />
                    <span className="font-medium">{restaurant.capacity}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Today's Reservations</span>
                  <span className="font-medium text-[#bd902f]">{restaurant.todayReservations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Monthly Revenue</span>
                  <span className="font-medium text-green-600">${restaurant.monthlyRevenue.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium text-neutral-500 mb-1">Opening Hours</p>
                <div className="space-y-1">
                  {restaurant.opening.slice(0, 2).map((time, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs text-neutral-600">
                      <Clock size={12} />
                      <span>{time}</span>
                    </div>
                  ))}
                  {restaurant.opening.length > 2 && (
                    <p className="text-xs text-neutral-500">+{restaurant.opening.length - 2} more hours</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Restaurant Modal */}
      {viewingRestaurant && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-5">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setViewingRestaurant(null)}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div className="h-64 bg-neutral-100 rounded-xl overflow-hidden">
                <img
                  src={viewingRestaurant.image}
                  alt={viewingRestaurant.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/restaurant-about.jpg";
                  }}
                />
              </div>

              <div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="font-serif text-2xl font-bold text-neutral-900">{viewingRestaurant.name}</h2>
                    <span className={`inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(viewingRestaurant.status)}`}>
                      {viewingRestaurant.status}
                    </span>
                  </div>
                </div>
                <p className="mt-4 text-neutral-600">{viewingRestaurant.description}</p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-[#f7f5f1] rounded-xl p-4">
                  <h3 className="font-semibold text-neutral-900 mb-3">Restaurant Details</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users size={16} className="text-neutral-400" />
                      <span className="text-sm text-neutral-600">Capacity:</span>
                      <span className="text-sm font-medium">{viewingRestaurant.capacity} guests</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-neutral-400" />
                      <span className="text-sm text-neutral-600">Phone:</span>
                      <span className="text-sm font-medium">{viewingRestaurant.phone}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f7f5f1] rounded-xl p-4">
                  <h3 className="font-semibold text-neutral-900 mb-3">Performance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Today's Reservations</span>
                      <span className="text-sm font-medium text-[#bd902f]">{viewingRestaurant.todayReservations}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-neutral-600">Monthly Revenue</span>
                      <span className="text-sm font-medium text-green-600">${viewingRestaurant.monthlyRevenue.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f7f5f1] rounded-xl p-4">
                <h3 className="font-semibold text-neutral-900 mb-3">Opening Hours</h3>
                <div className="space-y-2">
                  {viewingRestaurant.opening.map((time, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Clock size={16} className="text-neutral-400" />
                      <span className="text-sm text-neutral-600">{time}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#f7f5f1] rounded-xl p-4">
                <h3 className="font-semibold text-neutral-900 mb-3">Manager Information</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-neutral-900">{viewingRestaurant.manager}</p>
                    <p className="text-sm text-neutral-600">Restaurant Manager</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 text-sm font-medium text-white bg-[#bd902f] rounded-lg hover:bg-[#a67724] transition-colors">
                      Contact Manager
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Restaurant Modal */}
      {isAddingRestaurant && (
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
              {editingRestaurant ? "Edit Restaurant" : "Add New Restaurant"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Restaurant Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., The Terrace"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Manager Name *</label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Capacity *</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., 50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., +251 251 113 255"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Description *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none resize-none"
                  rows={3}
                  placeholder="Describe the restaurant..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Opening Hours *</label>
                <input
                  type="text"
                  value={formData.opening}
                  onChange={(e) => setFormData({ ...formData, opening: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  placeholder="10:00 AM – 12:00 AM, 06:00 PM – 11:00 PM"
                  required
                />
                <p className="mt-1 text-xs text-neutral-500">Separate hours with commas</p>
              </div>

              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Image"
              />

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="closed">Closed</option>
                </select>
              </div>

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
                  {editingRestaurant ? "Update Restaurant" : "Add Restaurant"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
