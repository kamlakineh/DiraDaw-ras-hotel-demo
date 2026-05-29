"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, X, Image as ImageIcon } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function GalleryManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/gallery");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "hotel",
    image: ""
  });

  const categories = ["hotel", "room", "restaurant", "event"];

  const filteredItems = items.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (categoryFilter === "" || item.category === categoryFilter)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingItem) {
        const response = await fetch("/api/gallery", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, id: editingItem.id }),
        });
        if (response.ok) {
          const updated = await response.json();
          setItems(items.map(i => i.id === editingItem.id ? updated : i));
        }
      } else {
        const response = await fetch("/api/gallery", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const newItem = await response.json();
          setItems([...items, newItem]);
        }
      }
      resetForm();
    } catch (error) {
      console.error("Error saving gallery item:", error);
    }
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", category: "hotel", image: "" });
    setIsAdding(false);
    setEditingItem(null);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      category: item.category,
      image: item.image
    });
    setIsAdding(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Delete this gallery item?")) {
      try {
        const response = await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
        if (response.ok) {
          setItems(items.filter(i => i.id !== id));
        }
      } catch (error) {
        console.error("Error deleting gallery item:", error);
      }
    }
  };

  if (loading) return <div className="text-center py-12">Loading gallery...</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Gallery Management</h1>
        <p className="mt-2 text-neutral-600">Manage hotel, room, restaurant, and event images</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
          ))}
        </select>
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#bd902f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a67724]"
        >
          <Plus size={18} />
          Add Image
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="h-48 bg-neutral-100 relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Edit2 size={16} className="text-neutral-700" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
              <span className="absolute bottom-2 left-2 px-2 py-1 text-xs font-bold bg-black/60 text-white rounded-full capitalize">
                {item.category}
              </span>
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-neutral-900 truncate">{item.title}</h3>
              {item.description && (
                <p className="mt-1 text-sm text-neutral-600 line-clamp-2">{item.description}</p>
              )}
            </div>
          </div>
        ))}
        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-12 text-neutral-500">
            No gallery items found.
          </div>
        )}
      </div>

      {isAdding && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-5">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={resetForm}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-bold">
              {editingItem ? "Edit Gallery Item" : "Add Gallery Item"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none resize-none"
                  rows={3}
                />
              </div>

              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Image *"
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
                  {editingItem ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
