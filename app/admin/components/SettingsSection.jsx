"use client";

export default function SettingsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Settings</h1>
        <p className="mt-2 text-neutral-600">Manage system settings and preferences</p>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-sm border">
        <h2 className="text-lg font-semibold text-neutral-900 mb-4">General Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900">Email Notifications</p>
              <p className="text-sm text-neutral-600">Receive email alerts for new bookings</p>
            </div>
            <button className="w-12 h-6 bg-[#bd902f] rounded-full relative transition-colors">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-neutral-900">Auto-respond to Bookings</p>
              <p className="text-sm text-neutral-600">Automatically send confirmation emails</p>
            </div>
            <button className="w-12 h-6 bg-gray-300 rounded-full relative transition-colors">
              <span className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
