"use client";

import { DollarSign, Utensils, ClipboardList, Clock, TrendingUp, Users } from "lucide-react";

export default function ManagerDashboard({ foods, orders, onStatusUpdate }) {
  // Compute analytics
  const totalRevenue = orders
    .filter((o) => o.status === "served")
    .reduce((sum, o) => sum + o.totalPrice, 0);

  const totalOrders = orders.length;
  const totalFoods = foods.length;
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "preparing").length;

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime())
    .slice(0, 5);

  const stats = [
    {
      label: "Total Restaurant Revenue",
      value: `$${totalRevenue}`,
      icon: DollarSign,
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Total Orders Placed",
      value: totalOrders,
      icon: ClipboardList,
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Active Menu Items",
      value: totalFoods,
      icon: Utensils,
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Orders In Progress",
      value: pendingOrders,
      icon: Clock,
      color: "text-red-600 bg-red-50",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#bd902f] to-[#a67724] p-8 text-white shadow-lg">
        <h1 className="font-serif text-3xl font-bold">Restaurant Analytics & Metrics</h1>
        <p className="mt-2 text-white/80 text-sm max-w-xl">
          Track revenue, view restaurant food preparation lists, update client orders, and manage menu ingredients dynamically.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500">{stat.label}</p>
                <p className="text-2xl font-bold text-neutral-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-xl ${stat.color}`}>
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders and Insights */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Pending/Preparing Kitchen Display */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-bold text-neutral-900">Kitchen Activity Monitor</h2>
            <span className="px-2.5 py-1 text-xs font-semibold bg-red-50 text-red-600 rounded-full flex items-center gap-1.5">
              <Clock size={12} /> {pendingOrders} Active
            </span>
          </div>

          <div className="space-y-4">
            {orders.filter((o) => o.status === "pending" || o.status === "preparing").length === 0 ? (
              <div className="text-center py-10 text-neutral-400 text-sm">
                No orders are currently in preparation. All clear!
              </div>
            ) : (
              orders
                .filter((o) => o.status === "pending" || o.status === "preparing")
                .map((order) => (
                  <div key={order.id} className="p-4 rounded-xl bg-[#f9f8f6] border border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-neutral-900 text-sm">Order #{order.id}</span>
                        <span className="text-xs text-neutral-500">— {order.guestName}</span>
                        {order.roomNumber && (
                          <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded">
                            Room {order.roomNumber}
                          </span>
                        )}
                        {order.tableNumber && (
                          <span className="px-2 py-0.5 bg-purple-50 text-purple-600 text-[10px] font-bold uppercase rounded">
                            Table {order.tableNumber}
                          </span>
                        )}
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {order.items.map((item, idx) => (
                          <span key={idx} className="text-xs px-2 py-0.5 bg-white border border-neutral-200 rounded text-neutral-700">
                            {item.quantity}x {item.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "pending" ? "bg-amber-50 text-amber-600 border border-amber-200" : "bg-blue-50 text-blue-600 border border-blue-200"
                      }`}>
                        {order.status}
                      </span>
                      <button
                        onClick={() => onStatusUpdate(order.id, order.status === "pending" ? "preparing" : "served")}
                        className="px-4 py-1.5 bg-[#bd902f] hover:bg-[#a67724] text-white text-xs font-bold rounded-lg transition"
                      >
                        {order.status === "pending" ? "Prepare" : "Serve"}
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>

        {/* Categories Breakdown card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100">
          <h2 className="font-serif text-xl font-bold text-neutral-900 mb-4">Popular Food Categories</h2>
          <div className="space-y-4">
            {["Starter", "Main", "Dessert", "Drink"].map((cat) => {
              const count = foods.filter((f) => f.category === cat).length;
              const percent = foods.length ? Math.round((count / foods.length) * 100) : 0;
              return (
                <div key={cat} className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold text-neutral-700">{cat}</span>
                    <span className="text-neutral-500">{count} items ({percent}%)</span>
                  </div>
                  <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#bd902f] rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
