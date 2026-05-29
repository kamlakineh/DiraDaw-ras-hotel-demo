"use client";

import { BarChart3 } from "lucide-react";

export default function AnalyticsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-neutral-900">Analytics</h1>
        <p className="mt-2 text-neutral-600">Monitor hotel performance and insights</p>
      </div>
      
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Occupancy Trends</h2>
          <div className="h-64 bg-[#f7f5f1] rounded-lg flex items-center justify-center">
            <BarChart3 size={48} className="text-neutral-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Revenue Overview</h2>
          <div className="h-64 bg-[#f7f5f1] rounded-lg flex items-center justify-center">
            <BarChart3 size={48} className="text-neutral-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
