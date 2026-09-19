import React, { useState } from 'react';
import { Newspaper, Box, Tv, ShieldCheck, Calendar, Clock, MapPin, Phone, User, CheckCircle2, ArrowRight } from 'lucide-react';

export default function BookingForm({ onBookingSuccess }) {
  const [step, setStep] = useState(1);
  const [selectedItems, setSelectedItems] = useState(['newspaper', 'plastic']);
  const [estimatedWeight, setEstimatedWeight] = useState('20-50 kg');
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    street: '',
    city: 'Mumbai',
    date: 'Tomorrow',
    slot: '10:00 AM - 01:00 PM'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const scrapCategories = [
    { id: 'newspaper', name: 'Paper & Newsprint', rate: '₹16/kg', icon: Newspaper, color: 'border-blue-200 bg-blue-50 text-blue-800' },
    { id: 'cardboard', name: 'Cardboard & Cartons', rate: '₹14/kg', icon: Box, color: 'border-amber-200 bg-amber-50 text-amber-800' },
    { id: 'plastic', name: 'Plastics & Bottles', rate: '₹12/kg', icon: Box, color: 'border-emerald-200 bg-emerald-50 text-emerald-800' },
    { id: 'metal', name: 'Iron, Copper & Brass', rate: '₹30-350/kg', icon: ShieldCheck, color: 'border-slate-200 bg-slate-100 text-slate-800' },
    { id: 'ewaste', name: 'E-Waste & Appliances', rate: '₹25-500/pc', icon: Tv, color: 'border-purple-200 bg-purple-50 text-purple-800' },
  ];

  const weightOptions = ['Under 20 kg', '20-50 kg', '50-100 kg', '100+ kg (Bulk)'];

  const toggleItem = (id) => {
    if (selectedItems.includes(id)) {
      if (selectedItems.length > 1) {
        setSelectedItems(selectedItems.filter((i) => i !== id));
      }
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!address.name || !address.phone || !address.street) {
      alert('Please fill out your name, mobile number, and pickup address.');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onBookingSuccess) {
        onBookingSuccess({
          id: 'PS-' + Math.floor(100000 + Math.random() * 900000),
          items: selectedItems,
          weight: estimatedWeight,
          address: address.street,
        });
      }
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-6 sm:p-10 rounded-3xl shadow-xl border border-emerald-100 text-center space-y-6 my-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Pickup Booking Confirmed!</h2>
          <p className="text-sm text-slate-600 mt-2">
            Thank you for choosing <span className="font-bold text-emerald-600">Parivartan Setu</span>. Your request has been assigned to our verified neighborhood pickup agent.
          </p>
        </div>

        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Booking ID:</span>
            <span className="font-mono font-bold text-slate-800">PS-849201</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="text-slate-500">Scheduled Date:</span>
            <span className="font-semibold text-slate-800">{address.date} ({address.slot})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Pickup Address:</span>
            <span className="font-semibold text-slate-800 text-right truncate max-w-[200px]">{address.street}, {address.city}</span>
          </div>
        </div>

        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-md"
        >
          Book Another Pickup
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto my-6 px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
        
        <div className="bg-slate-900 text-white p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold">Schedule Scrap Pickup</h2>
              <p className="text-xs text-slate-400">Free Doorstep Pickup • Instant Electronic Weight & Pay</p>
            </div>
            <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
              Step {step} of 2
            </span>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: step === 1 ? '50%' : '100%' }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-5 sm:p-8 space-y-6">
          
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3">
                  1. Select Scrap Materials to Sell
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {scrapCategories.map((cat) => {
                    const Icon = cat.icon;
                    const isSelected = selectedItems.includes(cat.id);
                    return (
                      <div
                        key={cat.id}
                        onClick={() => toggleItem(cat.id)}
                        className={`p-3.5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/70 shadow-xs'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${cat.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-slate-900">{cat.name}</p>
                            <p className="text-[11px] font-semibold text-emerald-600">{cat.rate}</p>
                          </div>
                        </div>

                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-3">
                  2. Estimated Weight
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {weightOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => setEstimatedWeight(opt)}
                      className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all ${
                        estimatedWeight === opt
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setStep(2)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-2xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <span>Continue to Address & Time</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={address.name}
                      onChange={(e) => setAddress({ ...address, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number (For Order OTP)</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      required
                      placeholder="10-digit mobile number"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">Pickup Address & Landmark</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    required
                    rows="2"
                    placeholder="Flat/House No., Building Name, Street Area"
                    value={address.street}
                    onChange={(e) => setAddress({ ...address, street: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                  ></textarea>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Preferred Day</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={address.date}
                      onChange={(e) => setAddress({ ...address, date: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                    >
                      <option value="Today">Today (Express 2-hr)</option>
                      <option value="Tomorrow">Tomorrow</option>
                      <option value="Day after tomorrow">Day after tomorrow</option>
                      <option value="Weekend Special">Weekend Special</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">Time Slot</label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <select
                      value={address.slot}
                      onChange={(e) => setAddress({ ...address, slot: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                    >
                      <option value="09:00 AM - 12:00 PM">09:00 AM - 12:00 PM</option>
                      <option value="12:00 PM - 03:00 PM">12:00 PM - 03:00 PM</option>
                      <option value="03:00 PM - 06:00 PM">03:00 PM - 06:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3.5 rounded-2xl text-xs sm:text-sm transition-all"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-2/3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl text-xs sm:text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Processing Booking...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Confirm Free Pickup</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </form>

      </div>
    </div>
  );
}
