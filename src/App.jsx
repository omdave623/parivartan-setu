import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import BookingForm from './components/BookingForm';
import PriceCatalog from './components/PriceCatalog';
import Tracker from './components/Tracker';
import ImpactDashboard from './components/ImpactDashboard';
import Footer from './components/Footer';
import BottomNav from './components/BottomNav';

export default function App() {
  const [activeTab, setActiveTab] = useState('book');
  const [activeBooking, setActiveBooking] = useState(null);

  const handleBookingSuccess = (bookingData) => {
    setActiveBooking(bookingData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-emerald-500 selection:text-white">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 max-w-7xl w-full mx-auto pb-12">
        {activeTab === 'book' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <Hero setActiveTab={setActiveTab} />
            <BookingForm onBookingSuccess={handleBookingSuccess} />
          </div>
        )}

        {activeTab === 'rates' && (
          <div className="animate-in fade-in duration-200">
            <PriceCatalog setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'track' && (
          <div className="animate-in fade-in duration-200">
            <Tracker activeBooking={activeBooking} setActiveTab={setActiveTab} />
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="animate-in fade-in duration-200">
            <ImpactDashboard />
          </div>
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
