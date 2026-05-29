"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Search, Calendar, Eye, X, FileText, Image as ImageIcon, Save, Clock } from "lucide-react";
import ImageUploader from "./ImageUploader";

export default function BlogManagement() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/blogs");
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingPost, setIsAddingPost] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [viewingPost, setViewingPost] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    date: "",
    image: "",
    excerpt: "",
    content: "",
    status: "draft"
  });

  const categories = ["Event", "Restaurant", "Travel", "Hotel", "Lifestyle", "Culture"];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const blogData = {
      title: formData.title,
      content: formData.content,
      excerpt: formData.excerpt,
      category: formData.category,
      image: formData.image,
      author: "Admin",
      date: formData.date,
      status: formData.status,
    };

    try {
      if (editingPost) {
        const response = await fetch("/api/blogs", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...blogData, id: editingPost.id }),
        });
        if (response.ok) {
          const updatedPost = await response.json();
          setPosts(posts.map(post => post.id === editingPost.id ? updatedPost : post));
        }
      } else {
        const response = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        });
        if (response.ok) {
          const newPost = await response.json();
          setPosts([...posts, newPost]);
        }
      }
      resetForm();
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      date: "",
      image: "",
      excerpt: "",
      content: "",
      status: "draft"
    });
    setIsAddingPost(false);
    setEditingPost(null);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      category: post.category,
      date: post.date || "",
      image: post.image,
      excerpt: post.excerpt || "",
      content: post.content,
      status: post.status
    });
    setIsAddingPost(true);
  };

  const handleDelete = async (postId) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      try {
        const response = await fetch(`/api/blogs?id=${postId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPosts(posts.filter(post => post.id !== postId));
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
      }
    }
  };

  const toggleStatus = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, status: post.status === "published" ? "draft" : "published" }
        : post
    ));
  };

  const getStatusColor = (status) => {
    return status === "published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800";
  };

  if (loading) {
    return <div className="text-center py-12">Loading blog posts...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-neutral-900">Blog Management</h1>
          <p className="mt-2 text-neutral-600">Create and manage hotel blog posts</p>
        </div>
        <button
          onClick={() => setIsAddingPost(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#bd902f] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#a67724]"
        >
          <Plus size={18} />
          New Post
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
            />
          </div>
          <select className="px-4 py-2 rounded-lg border border-neutral-200 focus:border-[#bd902f] focus:outline-none">
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="h-48 bg-neutral-100 relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = "/images/post-1.jpg";
                }}
              />
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => setViewingPost(post)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Eye size={16} className="text-neutral-700" />
                </button>
                <button
                  onClick={() => handleEdit(post)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Edit2 size={16} className="text-neutral-700" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                >
                  <Trash2 size={16} className="text-red-600" />
                </button>
              </div>
              <div className="absolute top-2 left-2 flex gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(post.status)}`}>
                  {post.status}
                </span>
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-[#bd902f]/10 text-[#bd902f]">
                  {post.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold text-neutral-900 line-clamp-2">{post.title}</h3>
              <p className="mt-2 text-sm text-neutral-600 line-clamp-3">{post.excerpt}</p>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Date</span>
                  <span className="font-medium text-neutral-900">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Author</span>
                  <span className="font-medium text-neutral-900">{post.author}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-neutral-600">Views</span>
                  <span className="font-medium text-[#bd902f]">{(post.views || 0).toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => toggleStatus(post.id)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-lg transition-colors ${
                    post.status === "published"
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                  }`}
                >
                  {post.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button className="flex-1 px-3 py-2 text-xs font-medium bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View Post Modal */}
      {viewingPost && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-5">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setViewingPost(null)}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
            >
              <X size={20} />
            </button>

            <div className="space-y-6">
              <div className="h-64 bg-neutral-100 rounded-xl overflow-hidden">
                <img
                  src={viewingPost.image}
                  alt={viewingPost.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/images/post-1.jpg";
                  }}
                />
              </div>

              <div>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="font-serif text-3xl font-bold text-neutral-900">{viewingPost.title}</h2>
                    <div className="mt-3 flex items-center gap-4">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(viewingPost.status)}`}>
                        {viewingPost.status}
                      </span>
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#bd902f]/10 text-[#bd902f]">
                        {viewingPost.category}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center gap-6 text-sm text-neutral-600">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <span>{new Date(viewingPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText size={16} />
                    <span>{viewingPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye size={16} />
                    <span>{(viewingPost.views || 0).toLocaleString()} views</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2">Excerpt</h3>
                  <p className="text-neutral-600">{viewingPost.excerpt}</p>
                </div>

                <div className="mt-6">
                  <h3 className="font-semibold text-lg mb-2">Full Content</h3>
                  <div className="prose max-w-none text-neutral-600">
                    <p>{viewingPost.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Post Modal */}
      {isAddingPost && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 px-5">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white p-8 shadow-2xl">
            <button
              type="button"
              onClick={resetForm}
              className="absolute right-6 top-6 grid h-10 w-10 place-items-center rounded-full bg-neutral-100 text-neutral-700 transition hover:bg-neutral-200"
            >
              <X size={20} />
            </button>

            <h2 className="font-serif text-2xl font-bold">
              {editingPost ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Post Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  placeholder="Enter post title"
                  required
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Publication Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full rounded-full border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>

              <ImageUploader
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Featured Image"
              />

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Excerpt *</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none resize-none"
                  rows={3}
                  placeholder="Brief description of the post..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-neutral-700 mb-2">Full Content *</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full rounded-2xl border border-neutral-300 px-4 py-3 focus:border-[#bd902f] focus:outline-none resize-none"
                  rows={8}
                  placeholder="Write the full blog post content..."
                  required
                />
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
                  {editingPost ? "Update Post" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
