"use client";

import { useState } from "react";
import { LogOut, Menu, X, LayoutDashboard, Utensils, Users } from "lucide-react";

export default function ManagerLayout({ user, activeTab, setActiveTab, onLogout, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const tabs = [
    { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
    { id: "menu", name: "Menu Control", icon: Utensils },
    { id: "orders", name: "Client Orders", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#bd902f]">Manager Portal</h2>
              <p className="text-xs text-neutral-500 capitalize">Restaurant Department</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            <div className="px-4 py-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Management
            </div>
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    isActive
                      ? "bg-[#bd902f] text-white font-bold shadow-md shadow-[#bd902f]/20"
                      : "text-neutral-600 hover:bg-gray-50 hover:text-neutral-900"
                  }`}
                >
                  <Icon size={20} />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#bd902f]/10 text-[#bd902f] rounded-full flex items-center justify-center font-bold">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-neutral-900">{user.username}</p>
                <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-neutral-700 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b sticky top-0 z-30">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-4 ml-auto">
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-900">Welcome, {user.username}</p>
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">{user.role}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page content */}
        <main className="p-4 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
