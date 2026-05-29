"use client";

import { useState } from "react";
import { 
  Home, 
  Bed, 
  Utensils, 
  FileText, 
  BarChart3, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Users,
  Calendar,
  TrendingUp,
  DollarSign,
  Image as ImageIcon
} from "lucide-react";

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: Home, roles: ["admin", "manager"] },
  { id: "rooms", label: "Room Management", icon: Bed, roles: ["admin"] },
  { id: "restaurants", label: "Restaurant Management", icon: Utensils, roles: ["admin", "manager"] },
  { id: "blog", label: "Blog Management", icon: FileText, roles: ["admin"] },
  { id: "gallery", label: "Gallery Management", icon: ImageIcon, roles: ["admin"] },
  { id: "employees", label: "Employee Management", icon: Users, roles: ["admin"] },
  { id: "analytics", label: "Analytics", icon: BarChart3, roles: ["admin", "manager"] },
  { id: "settings", label: "Settings", icon: Settings, roles: ["admin"] },
];

export default function AdminLayout({ user, children, activeSection, onLogout, onSectionChange }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filteredItems = sidebarItems.filter(item => 
    item.roles.includes(user.role)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#bd902f]">Admin Panel</h2>
              <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
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
            {filteredItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSectionChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors
                    ${activeSection === item.id 
                      ? 'bg-[#bd902f] text-white' 
                      : 'text-neutral-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User info and logout */}
          <div className="border-t p-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#bd902f] rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {user.username.charAt(0).toUpperCase()}
                </span>
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

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex h-16 items-center justify-between px-4 lg:px-8">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu size={20} />
            </button>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-neutral-900">Welcome back</p>
                <p className="text-xs text-neutral-500 capitalize">{user.username}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
