import React, { useState } from 'react';
import { Search, Calculator, TrendingUp, IndianRupee } from 'lucide-react';

export default function PriceCatalog({ setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [calcWeight, setCalcWeight] = useState(25);
  const [calcRate, setCalcRate] = useState(16);
  const [calcItemName, setCalcItemName] = useState('Newspaper');

  const categories = ['All', 'Paper', 'Plastics', 'Metals', 'E-Waste', 'Glass & Misc'];

  const scrapRates = [
    { id: 1, name: 'Newspaper (Akhbar)', category: 'Paper', rate: 16, unit: 'kg', trend: '+₹1.5/kg', tag: 'High Demand' },
    { id: 2, name: 'Office White Paper & Books', category: 'Paper', rate: 15, unit: 'kg', trend: 'Stable' },
    { id: 3, name: 'Corrugated Cardboard (Gatta)', category: 'Paper', rate: 14, unit: 'kg', trend: '+₹0.5/kg' },
    { id: 4, name: 'PET Bottles & Cold Drink Bottles', category: 'Plastics', rate: 22, unit: 'kg', trend: '+₹2.0/kg', tag: 'Recyclable' },
    { id: 5, name: 'Hard Plastic (Buckets, Chairs)', category: 'Plastics', rate: 12, unit: 'kg', trend: 'Stable' },
    { id: 6, name: 'Polythene & Plastic Packaging', category: 'Plastics', rate: 8, unit: 'kg', trend: 'Stable' },
    { id: 7, name: 'Iron & Steel Scrap (Loha)', category: 'Metals', rate: 32, unit: 'kg', trend: '+₹3.0/kg', tag: 'Best Rate' },
    { id: 8, name: 'Copper Cable & Wire (Tamba)', category: 'Metals', rate: 450, unit: 'kg', trend: '+₹15/kg', tag: 'Premium' },
    { id: 9, name: 'Brass Utensils (Pital)', category: 'Metals', rate: 330, unit: 'kg', trend: '+₹10/kg' },
    { id: 10, name: 'Aluminum Cans & Frames', category: 'Metals', rate: 110, unit: 'kg', trend: '+₹5.0/kg' },
    { id: 11, name: 'Old Laptops & Computers', category: 'E-Waste', rate: 350, unit: 'piece', trend: 'Fixed Price' },
    { id: 12, name: 'Mobile Phones & Circuit Boards', category: 'E-Waste', rate: 150, unit: 'piece', trend: 'Fixed Price' },
    { id: 13, name: 'Split AC (1.5 Ton Copper)', category: 'E-Waste', rate: 4200, unit: 'piece', trend: 'Top Seller', tag: 'Popular' },
    { id: 14, name: 'Glass Bottles (Beer / Sauce)', category: 'Glass & Misc', rate: 3, unit: 'kg', trend: 'Stable' },
  ];

  const filteredRates = scrapRates.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
            <span>Updated Daily Market Rates</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold">Transparent Scrap Price Card</h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1">
            Zero price manipulation. Electronic digital scale measurement right at your doorstep.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('book')}
          className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs sm:text-sm transition-all shadow-md shrink-0"
        >
          Book Pickup Now
        </button>
      </div>

      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="font-extrabold text-sm sm:text-base text-slate-800">Instant Rate Estimator</h3>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">Item: {calcItemName}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Select Item</label>
            <select
              value={calcItemName}
              onChange={(e) => {
                const found = scrapRates.find((r) => r.name === e.target.value);
                if (found) {
                  setCalcItemName(found.name);
                  setCalcRate(found.rate);
                }
              }}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-semibold outline-none bg-white"
            >
              {scrapRates.map((r) => (
                <option key={r.id} value={r.name}>
                  {r.name} (₹{r.rate}/{r.unit})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Estimated Weight (kg or pcs)</label>
            <input
              type="number"
              min="1"
              max="500"
              value={calcWeight}
              onChange={(e) => setCalcWeight(Number(e.target.value))}
              className="w-full p-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold outline-none"
            />
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-3.5 rounded-2xl flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-900">Estimated Earnings:</span>
            <div className="text-right">
              <p className="text-lg sm:text-xl font-black text-emerald-700 flex items-center justify-end">
                <IndianRupee className="w-4 h-4 stroke-[3]" /> {calcWeight * calcRate}
              </p>
              <p className="text-[10px] text-emerald-600">Paid directly via UPI/Cash</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Search paper, plastic, iron..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white shadow-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full pb-2 sm:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredRates.map((item) => (
          <div
            key={item.id}
            onClick={() => {
              setCalcItemName(item.name);
              setCalcRate(item.rate);
            }}
            className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-3 group"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.category}</span>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-600 transition-colors">
                  {item.name}
                </h4>
              </div>
              {item.tag && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 shrink-0">
                  {item.tag}
                </span>
              )}
            </div>

            <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
              <div>
                <span className="text-xl font-black text-slate-900">₹{item.rate}</span>
                <span className="text-xs text-slate-500 font-semibold"> / {item.unit}</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                {item.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
