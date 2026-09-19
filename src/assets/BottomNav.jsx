import React from 'react';
import { CalendarPlus, Tag, PackageSearch, Award } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'book', label: 'Book Pickup', icon: CalendarPlus },
    { id: 'rates', label: 'Rate Card', icon: Tag },
    { id: 'track', label: 'Track Order', icon: PackageSearch },
    { id: 'impact', label: 'Eco Wallet', icon: Award },
  ];

  return (
    <nav aria-label="Mobile Bottom Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200 safe-pb px-2 py-1.5 shadow-2xl">
      <div className="grid grid-cols-4 gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                isActive
                  ? 'text-emerald-600 font-bold bg-emerald-50'
                  : 'text-slate-500 font-medium hover:text-slate-800'
              }`}
            >
              <div className={`relative p-1 rounded-lg ${isActive ? 'scale-110' : ''} transition-transform`}>
                <Icon className="w-5 h-5" />
                {isActive && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-600 ring-2 ring-white"></span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-full">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
