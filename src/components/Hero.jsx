import React from 'react';
import { Calendar, Tag, ShieldCheck, Truck, Scale, IndianRupee, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero({ setActiveTab }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-emerald-900 via-emerald-800 to-slate-900 text-white rounded-3xl my-4 sm:my-6 mx-3 sm:mx-6 p-5 sm:p-8 md:p-12 shadow-2xl">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-teal-400/10 blur-3xl pointer-events-none"></div>

      <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-emerald-700/60 border border-emerald-400/30 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-200 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-300" />
            <span>Smart Scrap Pickup Platform</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Turn Household Scrap into <span className="text-emerald-400 underline decoration-emerald-400/40">Instant Cash</span>
          </h1>

          <p className="text-xs sm:text-base text-emerald-100 max-w-2xl font-medium leading-relaxed">
            Parivartan Setu bridges your recyclable scrap directly to authorized eco-friendly recycling centers. Free doorstep pickup, accurate electronic weighing, and instant UPI payment.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
            <button
              onClick={() => setActiveTab('book')}
              className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-2xl text-sm transition-all transform active:scale-95 shadow-lg shadow-emerald-500/25"
            >
              <Calendar className="w-5 h-5" />
              <span>Schedule Free Pickup</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('rates')}
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold px-6 py-3.5 rounded-2xl text-sm transition-all transform active:scale-95 backdrop-blur-md"
            >
              <Tag className="w-5 h-5 text-emerald-300" />
              <span>Check Live Rates</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t border-emerald-700/50 max-w-xl mx-auto lg:mx-0">
            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-1 text-emerald-300 font-extrabold text-sm sm:text-lg">
                <Truck className="w-4 h-4" /> Free
              </div>
              <span className="text-[11px] text-emerald-200/80">Doorstep Pickup</span>
            </div>

            <div className="flex flex-col items-center lg:items-start border-x border-emerald-700/50 px-2">
              <div className="flex items-center gap-1 text-emerald-300 font-extrabold text-sm sm:text-lg">
                <Scale className="w-4 h-4" /> 100%
              </div>
              <span className="text-[11px] text-emerald-200/80">Digital Weighing</span>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <div className="flex items-center gap-1 text-emerald-300 font-extrabold text-sm sm:text-lg">
                <IndianRupee className="w-4 h-4" /> Instant
              </div>
              <span className="text-[11px] text-emerald-200/80">UPI / Cash Pay</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="bg-slate-800/90 border border-emerald-500/30 backdrop-blur-xl p-5 sm:p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Live Pickup Queue</span>
              </div>
              <span className="text-[10px] bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded-full font-semibold border border-emerald-700">
                Verified Collectors
              </span>
            </div>

            <div className="space-y-2.5">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-200">Newspaper & Metal (35 kg)</p>
                  <p className="text-[10px] text-slate-400">Andheri West, Mumbai • 4 mins ago</p>
                </div>
                <span className="text-emerald-400 font-bold">₹540 Paid</span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                <div>
                  <p className="font-semibold text-slate-200">Electronic E-Waste & Appliances</p>
                  <p className="text-[10px] text-slate-400">Sector 62, Noida • 12 mins ago</p>
                </div>
                <span className="text-emerald-400 font-bold">₹1,250 Paid</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-emerald-200/80">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero Deductions</span>
              </div>
              <span className="font-semibold text-white">★ 4.9/5 Rating (15k+ Reviews)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
