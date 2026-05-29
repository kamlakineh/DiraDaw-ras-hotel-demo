"use client";

import { useState, useEffect } from "react";
import { Search, Utensils } from "lucide-react";

export default function MenuPage() {
  const [foods, setFoods] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = ["Starter", "Main", "Dessert", "Drink"];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [foodsRes, restaurantsRes] = await Promise.all([
        fetch("/api/manager/foods"),
        fetch("/api/restaurants"),
      ]);

      if (foodsRes.ok) {
        const foodsData = await foodsRes.json();
        setFoods(Array.isArray(foodsData) ? foodsData : []);
      }

      if (restaurantsRes.ok) {
        const restaurantsData = await restaurantsRes.json();
        setRestaurants(Array.isArray(restaurantsData) ? restaurantsData : []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredFoods = foods
    .filter((food) => selectedCategory === "all" || food.category === selectedCategory)
    .filter((food) => selectedRestaurant === "all" || food.restaurantId === Number(selectedRestaurant))
    .filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f7f5f1] flex items-center justify-center">
        <div className="text-neutral-500">Loading menu...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f5f1]">
      {/* Hero Section */}
      <div className="bg-[#bd902f] py-16 px-5">
        <div className="max-w-6xl mx-auto text-center text-white">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-lg opacity-90">Discover our delicious dishes from our restaurants</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-12">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
              <input
                type="text"
                placeholder="Search dishes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
              />
            </div>

            {/* Restaurant Filter */}
            <div className="flex-1">
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
              >
                <option value="all">All Restaurants</option>
                {restaurants.map((restaurant) => (
                  <option key={restaurant.id} value={restaurant.id}>
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Filter */}
            <div className="flex-1">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-5 py-2 rounded-full text-sm font-bold transition ${
              selectedCategory === "all"
                ? "bg-[#bd902f] text-white"
                : "bg-white text-neutral-700 hover:bg-neutral-100"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition ${
                selectedCategory === cat
                  ? "bg-[#bd902f] text-white"
                  : "bg-white text-neutral-700 hover:bg-neutral-100"
              }`}
            >
              {cat}s
            </button>
          ))}
        </div>

        {/* Menu Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredFoods.map((item) => {
            const restaurant = restaurants.find((r) => r.id === item.restaurantId);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden"
              >
                <div className="h-48 bg-neutral-100 relative">
                  <img
                    src={item.image || "/images/restaurant-about.jpg"}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = "/images/restaurant-about.jpg";
                    }}
                  />
                  <span className="absolute left-3 bottom-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white rounded-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-serif text-lg font-bold text-neutral-900">{item.name}</h3>
                    <span className="font-bold text-[#bd902f] text-lg shrink-0">${item.price}</span>
                  </div>
                  {restaurant && (
                    <p className="text-xs text-neutral-500 mb-2">{restaurant.name}</p>
                  )}
                  <p className="text-sm text-neutral-600 leading-relaxed">{item.ingredients}</p>
                </div>
              </div>
            );
          })}
        </div>

        {filteredFoods.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-neutral-100">
            <Utensils size={40} className="mx-auto text-neutral-300" />
            <p className="mt-4 text-neutral-500 font-medium">No dishes found matching your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
