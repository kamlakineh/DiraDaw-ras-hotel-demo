"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, X, Utensils, Search } from "lucide-react";
import ImageUploader from "../../admin/components/ImageUploader";

export default function MenuManagement({ foods, onSave, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    ingredients: "",
    category: "Main",
    image: "",
  });

  const categories = ["Starter", "Main", "Dessert", "Drink"];

  const filteredFoods = foods
    .filter((food) => activeCategory === "all" || food.category === activeCategory)
    .filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      ingredients: item.ingredients,
      category: item.category,
      image: item.image || "",
    });
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingItem(null);
    setFormData({
      name: "",
      price: "",
      ingredients: "",
      category: "Main",
      image: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.ingredients) {
      alert("Please fill out all required fields.");
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
    };

    if (editingItem) {
      payload.id = editingItem.id;
    }

    onSave(payload);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl font-bold text-neutral-900">Food Menu Management</h1>
          <p className="text-sm text-neutral-500">Configure prices, ingredients, and categories for all food items.</p>
        </div>
        <button
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 rounded-full bg-[#bd902f] hover:bg-[#a67724] px-6 py-3 text-sm font-bold text-white transition shadow-md shadow-[#bd902f]/10 self-start sm:self-auto"
        >
          <Plus size={18} />
          <span>Add New Dish</span>
        </button>
      </div>

      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search food by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5 bg-neutral-100 p-1.5 rounded-xl">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
              activeCategory === "all" ? "bg-white text-[#bd902f] shadow-sm" : "text-neutral-600 hover:text-neutral-950"
            }`}
          >
            All Menu
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                activeCategory === cat ? "bg-white text-[#bd902f] shadow-sm" : "text-neutral-600 hover:text-neutral-950"
              }`}
            >
              {cat}s
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Dishes */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredFoods.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden flex flex-col justify-between">
            <div>
              <div className="h-48 bg-neutral-100 relative">
                <img
                  src={item.image || "/images/restaurant-about.jpg"}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/restaurant-about.jpg";
                  }}
                />
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="w-8 h-8 bg-white/95 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm text-neutral-700 hover:text-[#bd902f]"
                  >
                    <Edit2 size={14} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    className="w-8 h-8 bg-white/95 rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm text-red-600 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <span className="absolute left-3 bottom-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white rounded-md">
                  {item.category}
                </span>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-serif text-lg font-bold text-neutral-900">{item.name}</h3>
                  <span className="font-bold text-[#bd902f] text-lg shrink-0">${item.price}</span>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Ingredients</p>
                  <p className="text-sm text-neutral-600 mt-1 leading-relaxed">{item.ingredients}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredFoods.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-neutral-100">
          <Utensils size={40} className="mx-auto text-neutral-300" />
          <p className="mt-4 text-neutral-500 font-medium">No dishes found matching search filters.</p>
        </div>
      )}

      {/* Add / Edit Dish Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/70 px-5">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-bold">
              {editingItem ? "Edit Dish Details" : "Add New Dish"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Dish Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  placeholder="e.g., Tibs, Kitfo, Lasagna"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Price ($) *</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    placeholder="e.g., 18"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Ingredients *</label>
                <textarea
                  value={formData.ingredients}
                  onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none resize-none"
                  rows={3}
                  placeholder="e.g., Fresh beef, garlic, red onions, butter, local spices"
                  required
                />
              </div>

              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Food Dish Image"
              />

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-full border border-neutral-300 px-6 py-3.5 text-sm font-bold text-neutral-700 transition hover:bg-neutral-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#bd902f] px-6 py-3.5 text-sm font-bold text-white transition hover:bg-[#a67724]"
                >
                  {editingItem ? "Update Dish" : "Create Dish"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
