import React, { useState } from 'react';
import { Recycle, MapPin, Bell, Menu, X, PhoneCall, ShieldCheck, Leaf } from 'lucide-react';

export default function Header({ activeTab, setActiveTab }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'book', label: 'Book Pickup' },
    { id: 'rates', label: 'Scrap Rates' },
    { id: 'track', label: 'Track Order' },
    { id: 'impact', label: 'Eco Impact & Wallet' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          <div 
            onClick={() => setActiveTab('book')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <Recycle className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-none">
                  Parivartan <span className="text-emerald-600">Setu</span>
                </span>
                <span className="hidden xs:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  <Leaf className="w-2.5 h-2.5 text-emerald-600" /> Green Tech
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">
                Bridge to Transformation & Recycling
              </p>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-semibold text-emerald-800 border border-emerald-200">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" />
            <span>Serving: Mumbai, Delhi NCR, Pune & Ahmedabad</span>
          </div>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={() => setActiveTab('track')}
              aria-label="Notifications"
              className="relative p-2.5 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </button>

            <a
              href="tel:1800123456"
              className="hidden sm:inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
              <span>Toll Free Help</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="flex items-center gap-2 bg-emerald-50 p-2.5 rounded-xl text-xs font-semibold text-emerald-800 border border-emerald-100 mb-3">
            <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Active Location: Selected Region</span>
          </div>

          <div className="grid grid-cols-1 gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold flex items-center justify-between transition-colors ${
                  activeTab === item.id
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <ShieldCheck className="w-4 h-4" />}
              </button>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="tel:1800123456"
              className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl text-xs font-bold shadow-xs"
            >
              <PhoneCall className="w-4 h-4 text-emerald-400" />
              <span>Call Helpline: 1800-123-456</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
