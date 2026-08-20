import React from 'react';
import { Shirt } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-[#1E3A8A] text-amber-50 rounded-lg flex items-center justify-center font-bold">
            <Shirt className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-white text-sm block">WashLog</span>
            <span className="text-[10px] text-slate-500">Digital laundry records for hostel life.</span>
          </div>
        </div>

        <div className="flex space-x-6 font-medium text-slate-300">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#verification" className="hover:text-white transition-colors">Verification</a>
          <a href="/login" className="hover:text-white transition-colors">Login</a>
        </div>

        <div className="text-slate-500">
          © {new Date().getFullYear()} WashLog. All rights reserved.
        </div>

      </div>
    </footer>
  );
}