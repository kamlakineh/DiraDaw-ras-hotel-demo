"use client";

import { useState, useEffect } from "react";
import {
  Bed,
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  Utensils,
  FileText,
  AlertCircle
} from "lucide-react";

export default function AdminDashboard({ user }) {
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    totalRestaurants: 0,
    todayReservations: 0,
    monthlyRevenue: 0,
    totalBlogPosts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [roomsRes, restaurantsRes, blogsRes, bookingsRes] = await Promise.all([
        fetch("/api/rooms"),
        fetch("/api/restaurants"),
        fetch("/api/blogs"),
        fetch("/api/bookings"),
      ]);

      const rooms = roomsRes.ok ? await roomsRes.json() : [];
      const restaurants = restaurantsRes.ok ? await restaurantsRes.json() : [];
      const blogs = blogsRes.ok ? await blogsRes.json() : [];
      const bookings = bookingsRes.ok ? await bookingsRes.json() : [];

      const roomsArray = Array.isArray(rooms) ? rooms : [];
      const restaurantsArray = Array.isArray(restaurants) ? restaurants : [];
      const blogsArray = Array.isArray(blogs) ? blogs : [];
      const bookingsArray = Array.isArray(bookings) ? bookings : [];

      const totalRooms = roomsArray.reduce((sum, room) => sum + (room.totalRooms || 0), 0);
      const occupiedRooms = bookingsArray.filter(b => b.status === "confirmed").length;
      const todayReservations = restaurantsArray.reduce((sum, r) => sum + (r.todayReservations || 0), 0);

      setStats({
        totalRooms,
        occupiedRooms,
        totalRestaurants: restaurantsArray.length,
        todayReservations,
        monthlyRevenue: 125000,
        totalBlogPosts: blogsArray.length
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const occupancyRate = Math.round((stats.occupiedRooms / stats.totalRooms) * 100);

  const recentActivity = [
    { id: 1, type: "booking", message: "New room booking: Executive Suite - 3 nights", time: "5 min ago" },
    { id: 2, type: "restaurant", message: "Table reservation at Jegol Restaurant for 4 guests", time: "15 min ago" },
    { id: 3, type: "blog", message: "New blog post published: 'Summer Special Offers'", time: "1 hour ago" },
    { id: 4, type: "checkin", message: "Guest check-in: Room 205 - Superior Room", time: "2 hours ago" },
  ];

  const quickActions = [
    { id: "rooms", label: "Manage Rooms", icon: Bed, color: "bg-blue-500" },
    { id: "restaurants", label: "Manage Restaurants", icon: Utensils, color: "bg-green-500" },
    { id: "blog", label: "Manage Blog", icon: FileText, color: "bg-purple-500" },
    { id: "reservations", label: "View Reservations", icon: Calendar, color: "bg-orange-500" },
  ];

  return (
    <div className="space-y-6">
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-neutral-500">Loading dashboard data...</div>
        </div>
      ) : (
        <>
          {/* Header */}
          <div>
            <h1 className="font-serif text-3xl font-bold text-neutral-900">Dashboard</h1>
            <p className="mt-2 text-neutral-600">Welcome to the Dire Dawa Ras Hotel management system</p>
          </div>

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Total Rooms</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.totalRooms}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bed className="text-blue-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-neutral-600">Occupied</span>
              <span className="font-medium">{stats.occupiedRooms} rooms</span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full" 
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
            <p className="mt-1 text-xs text-neutral-500">{occupancyRate}% occupied</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Restaurants</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.totalRestaurants}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Utensils className="text-green-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-neutral-600">Today's Reservations</p>
            <p className="text-lg font-semibold text-green-600">{stats.todayReservations}</p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Monthly Revenue</p>
              <p className="text-2xl font-bold text-neutral-900">${stats.monthlyRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="text-purple-600" size={24} />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-green-600">
            <TrendingUp size={16} className="mr-1" />
            <span>12% from last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-neutral-600">Blog Posts</p>
              <p className="text-2xl font-bold text-neutral-900">{stats.totalBlogPosts}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FileText className="text-orange-600" size={24} />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm text-neutral-600">Published</p>
            <p className="text-lg font-semibold text-orange-600">{stats.totalBlogPosts} posts</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.id}
                className="flex items-center gap-3 p-4 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                <div className={`w-10 h-10 ${action.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="text-white" size={20} />
                </div>
                <span className="font-medium text-neutral-700">{action.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50">
                <div className="w-8 h-8 bg-[#bd902f]/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="text-[#bd902f]" size={16} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-neutral-900">{activity.message}</p>
                  <p className="text-xs text-neutral-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Status */}
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">System Status</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Booking System</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Restaurant Reservations</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Room Availability</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Updated</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600">Database</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Connected</span>
            </div>
          </div>
        </div>
      </div>
        </>
      )}
    </div>
  );
}
