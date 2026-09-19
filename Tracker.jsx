import React from 'react';
import { CheckCircle2, MapPin, PhoneCall, ShieldCheck } from 'lucide-react';

export default function Tracker({ activeBooking, setActiveTab }) {
  const booking = activeBooking || {
    id: 'PS-782910',
    status: 'In Progress',
    agentName: 'Vikram Singh',
    agentPhone: '+91 98765 43210',
    vehicle: 'MH-02-EX-4921 (Eco Pickup Van)',
    items: ['Newspaper & Cardboard', 'Plastic Bottles', 'Iron Scrap'],
    weight: '35 kg',
    address: 'B-402, Green Park Heights, Andheri West, Mumbai',
    timeSlot: 'Today, 02:00 PM - 04:00 PM',
  };

  const steps = [
    { title: 'Booking Confirmed', desc: 'Pickup request received & verified', status: 'completed' },
    { title: 'Collector Agent Assigned', desc: 'Vikram Singh assigned (4.9★ Rating)', status: 'completed' },
    { title: 'Out for Pickup', desc: 'Agent on the way (Arriving in ~25 mins)', status: 'active' },
    { title: 'Weighed & Instant Paid', desc: 'Digital scale weighing & UPI transfer', status: 'pending' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      
      <div className="bg-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live Pickup Tracker</span>
          </div>
          <h2 className="text-xl font-extrabold mt-1">Order #{booking.id}</h2>
          <p className="text-xs text-slate-400 mt-0.5">{booking.timeSlot}</p>
        </div>

        <button
          onClick={() => setActiveTab('book')}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md"
        >
          Book New Pickup
        </button>
      </div>

      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-md space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 font-extrabold flex items-center justify-center text-sm shadow-xs">
              VS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-sm text-slate-900">{booking.agentName}</h4>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Verified Partner • {booking.vehicle}</p>
            </div>
          </div>

          <a
            href={`tel:${booking.agentPhone}`}
            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-3 py-2 rounded-xl text-xs border border-emerald-200 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Agent</span>
          </a>
        </div>

        <div className="py-2 space-y-6">
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-4 relative">
              {idx !== steps.length - 1 && (
                <div className={`absolute left-4 top-8 bottom-0 w-0.5 ${
                  step.status === 'completed' ? 'bg-emerald-500' : 'bg-slate-200'
                }`}></div>
              )}

              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${
                step.status === 'completed'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : step.status === 'active'
                  ? 'bg-amber-500 text-white ring-4 ring-amber-100 animate-pulse'
                  : 'bg-slate-100 text-slate-400 border border-slate-300'
              }`}>
                {step.status === 'completed' ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="text-xs font-bold">{idx + 1}</span>
                )}
              </div>

              <div>
                <h5 className={`text-xs sm:text-sm font-bold ${
                  step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'
                }`}>
                  {step.title}
                </h5>
                <p className="text-[11px] text-slate-500">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 text-xs space-y-3">
        <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">Pickup Order Summary</h4>

        <div className="flex items-start gap-2.5 text-slate-700">
          <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <span>{booking.address}</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200/80 pt-3">
          <span className="text-slate-500">Scrap Items:</span>
          <span className="font-bold text-slate-800">{Array.isArray(booking.items) ? booking.items.join(', ') : booking.items}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">Est. Weight:</span>
          <span className="font-bold text-slate-800">{booking.weight}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500">Payment Method:</span>
          <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Instant UPI / Cash</span>
        </div>
      </div>

    </div>
  );
}
