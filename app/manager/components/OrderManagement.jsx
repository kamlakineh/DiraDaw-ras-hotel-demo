"use client";

import { useState } from "react";
import { ClipboardList, Trash2, Check, Clock, ShieldAlert, CheckCircle, Search } from "lucide-react";

export default function OrderManagement({ orders, onStatusUpdate, onDelete }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveTab] = useState("all");

  const filteredOrders = orders
    .filter((order) => {
      if (activeFilter === "all") return true;
      return order.status === activeFilter;
    })
    .filter((order) => {
      return (
        order.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm) ||
        (order.roomNumber && order.roomNumber.includes(searchTerm)) ||
        (order.tableNumber && order.tableNumber.includes(searchTerm))
      );
    });

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "preparing":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "served":
        return "bg-green-50 text-green-700 border-green-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200";
      default:
        return "bg-neutral-50 text-neutral-700 border-neutral-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl font-bold text-neutral-900">Client Restaurant Orders</h1>
        <p className="text-sm text-neutral-500">Track and serve food orders submitted by guest rooms or dine-in tables.</p>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search orders by client name, room # or table #..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-200 focus:border-[#bd902f] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-1 bg-neutral-100 p-1 rounded-xl self-start">
          {["all", "pending", "preparing", "served", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setActiveTab(status)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition ${
                activeFilter === status
                  ? "bg-white text-[#bd902f] shadow-sm"
                  : "text-neutral-500 hover:text-neutral-900"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-neutral-100 bg-[#fbfaf8] text-xs font-bold uppercase tracking-wider text-neutral-500">
                <th className="p-4 pl-6">Order ID</th>
                <th className="p-4">Client / Guest</th>
                <th className="p-4">Contact</th>
                <th className="p-4">Location</th>
                <th className="p-4">Ordered Items</th>
                <th className="p-4 text-right">Total Price</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 text-sm">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50/50 transition-colors">
                  <td className="p-4 pl-6 font-bold text-neutral-800">#{order.id}</td>
                  <td className="p-4">
                    <span className="font-semibold text-neutral-900">{order.guestName}</span>
                  </td>
                  <td className="p-4 text-neutral-600">{order.phone}</td>
                  <td className="p-4">
                    {order.roomNumber && (
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 text-[11px] font-bold uppercase rounded-md">
                        Room {order.roomNumber}
                      </span>
                    )}
                    {order.tableNumber && (
                      <span className="px-2.5 py-1 bg-purple-50 text-purple-600 text-[11px] font-bold uppercase rounded-md">
                        Table {order.tableNumber}
                      </span>
                    )}
                  </td>
                  <td className="p-4 max-w-xs">
                    <div className="space-y-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-xs text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded inline-block mr-1">
                          {item.quantity}x {item.name}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right font-bold text-neutral-900">${order.totalPrice}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      {order.status === "pending" && (
                        <button
                          onClick={() => onStatusUpdate(order.id, "preparing")}
                          title="Set to Preparing"
                          className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition"
                        >
                          <Clock size={16} />
                        </button>
                      )}
                      {(order.status === "pending" || order.status === "preparing") && (
                        <button
                          onClick={() => onStatusUpdate(order.id, "served")}
                          title="Mark as Served"
                          className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {order.status !== "served" && order.status !== "cancelled" && (
                        <button
                          onClick={() => onStatusUpdate(order.id, "cancelled")}
                          title="Cancel Order"
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                        >
                          <ShieldAlert size={16} />
                        </button>
                      )}
                      <button
                        onClick={() => onDelete(order.id)}
                        title="Delete record"
                        className="p-1.5 rounded-lg bg-neutral-100 text-neutral-500 hover:bg-red-50 hover:text-red-600 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-16">
            <ClipboardList size={40} className="mx-auto text-neutral-300" />
            <p className="mt-4 text-neutral-500 font-medium">No restaurant orders found.</p>
          </div>
        )}
      </div>
    </div>
  );
}
