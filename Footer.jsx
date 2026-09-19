import React from 'react';
import { Recycle, ShieldCheck, Heart, Mail, Phone } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="bg-slate-900 text-white mt-12 pt-10 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                <Recycle className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-lg text-white">
                Parivartan <span className="text-emerald-400">Setu</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering individuals and businesses to recycle responsibly while earning transparent market prices for household and commercial scrap.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-400 mb-3">Quick Navigation</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <button onClick={() => setActiveTab('book')} className="hover:text-emerald-400 transition-colors">
                  Book Doorstep Pickup
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('rates')} className="hover:text-emerald-400 transition-colors">
                  Daily Scrap Rate Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('track')} className="hover:text-emerald-400 transition-colors">
                  Track Active Orders
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('impact')} className="hover:text-emerald-400 transition-colors">
                  Eco Impact & Wallet
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-400 mb-3">Scrap Types We Buy</h5>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>• Newspaper, Books & Office Paper</li>
              <li>• Cardboard & Heavy Packaging</li>
              <li>• PET Plastic & Polyethylene</li>
              <li>• Iron, Copper, Brass & Aluminum</li>
              <li>• E-Waste & Discarded Electronics</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-bold text-xs uppercase tracking-wider text-emerald-400 mb-3">Helpline & Support</h5>
            <div className="text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>Toll Free: 1800-123-456 (9 AM - 7 PM)</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>support@parivartansetu.org</span>
              </div>
            </div>
            <div className="pt-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> ISO Certified Partner
              </span>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Parivartan Setu. All rights reserved.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Clean India & Sustainable Future</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
