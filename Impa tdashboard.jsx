import React from 'react';
import { Leaf, Award, Trees, Droplets, Wind, Wallet, ArrowUpRight, CheckCircle2, Share2 } from 'lucide-react';

export default function ImpactDashboard() {
  const stats = [
    { title: 'CO₂ Emissions Prevented', value: '184 kg', icon: Wind, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    { title: 'Trees Conserved', value: '14 Trees', icon: Trees, color: 'bg-green-50 text-green-700 border-green-200' },
    { title: 'Water Saved', value: '2,400 Liters', icon: Droplets, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { title: 'Total Waste Recycled', value: '340 kg', icon: Leaf, color: 'bg-teal-50 text-teal-700 border-teal-200' },
  ];

  const transactions = [
    { id: 1, type: 'Pickup Payout (UPI)', amount: '+ ₹540.00', date: 'Yesterday, 04:15 PM', status: 'Completed' },
    { id: 2, type: 'Green Reward Bonus', amount: '+ ₹50.00', date: '14 Sep 2026', status: 'Credited' },
    { id: 3, type: 'Pickup Payout (Cash)', amount: '+ ₹1,280.00', date: '02 Sep 2026', status: 'Completed' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Wallet className="w-4 h-4" />
            </div>
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">Parivartan Eco Wallet</span>
          </div>

          <p className="text-3xl sm:text-4xl font-black mt-3 tracking-tight">₹1,870.00</p>
          <p className="text-xs text-emerald-200/80 mt-1">Total Lifetime Earnings from Recycled Scrap</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-5 py-3 rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2">
            <span>Withdraw to Bank / UPI</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          
          <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-3 rounded-2xl text-xs transition-all backdrop-blur-md flex items-center justify-center gap-2 border border-white/10">
            <Share2 className="w-4 h-4 text-emerald-300" />
            <span>Share Eco Certificate</span>
          </button>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-emerald-600" />
          <h3 className="font-extrabold text-base sm:text-lg text-slate-900">Your Green Impact Contribution</h3>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`p-4 sm:p-5 rounded-2xl border ${item.color} space-y-2 shadow-2xs`}>
                <div className="flex items-center justify-between">
                  <Icon className="w-5 h-5 opacity-80" />
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">Verified</span>
                </div>
                <p className="text-lg sm:text-2xl font-black">{item.value}</p>
                <p className="text-[11px] font-semibold opacity-90 leading-tight">{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h4 className="font-extrabold text-sm sm:text-base text-slate-900">Recent Payout Transactions</h4>
          <span className="text-xs text-emerald-600 font-bold">3 Completed</span>
        </div>

        <div className="divide-y divide-slate-100">
          {transactions.map((tx) => (
            <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-slate-800">{tx.type}</p>
                  <p className="text-[10px] text-slate-400">{tx.date}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-black text-emerald-600 text-sm">{tx.amount}</p>
                <span className="text-[10px] text-slate-500 font-medium">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
