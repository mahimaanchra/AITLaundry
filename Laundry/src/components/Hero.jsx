import React from 'react';
import { Shirt, ArrowRight, Menu, CheckCircle2, ShieldCheck, Tag } from 'lucide-react';

export default function Hero() {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shirt className="w-6 h-6 text-[#1E3A8A]" />
            <span className="font-bold text-lg text-slate-900">WashLog</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
              Laundry Register
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-6 text-sm font-medium text-slate-600">
            <a href="#how-it-works" className="hover:text-[#1E3A8A] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#1E3A8A] transition-colors">Features</a>
            <a href="#verification" className="hover:text-[#1E3A8A] transition-colors">Verification</a>
            <a href="#about" className="hover:text-[#1E3A8A] transition-colors">About</a>
          </div>

          <div className="flex items-center space-x-3">
            <button className="bg-[#1E3A8A] hover:bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center space-x-2 transition-colors cursor-pointer">
              <span>Login to Register</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="md:hidden p-2 text-slate-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Body */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="inline-block text-xs font-bold tracking-wider text-[#1E3A8A] uppercase bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-full">
              Modernizing Hostel Operations
            </span>
            
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
              Your Hostel Laundry Register, <br />
              <span className="text-[#1E3A8A]">Now Digital.</span>
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-xl">
              Keep track of clothes submitted and returned with a simple digital register built around the way your hostel already works. No complicated inventory system—just clear, verifiable records.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button className="bg-[#1E3A8A] hover:bg-indigo-900 text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer">
                <span>Login to Register</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a href="#how-it-works" className="border border-slate-300 hover:bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold flex items-center justify-center transition-colors">
                See How It Works
              </a>
            </div>

            <div className="pt-6 border-t border-slate-200 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Hostel → Flank → Page structure</span>
              </div>
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Two-Way Handover Verification</span>
              </div>
            </div>
          </div>

          {/* Sample Card Display */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-8 space-y-6">
              <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Digital Laundry Register</span>
                  <h3 className="text-lg font-bold text-slate-900">Sajal Rawat</h3>
                  <p className="text-xs text-slate-500 font-medium">Hostel A • Flank F-03 • Page #27</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Received
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-xs font-semibold text-slate-400 border-b border-slate-100 pb-2">
                  <span>Garment Item</span>
                  <span>Quantity</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-700">
                  <span>👔 Shirts</span>
                  <span className="font-bold text-slate-900">3</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-700">
                  <span>👖 Pants</span>
                  <span className="font-bold text-slate-900">2</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-700">
                  <span>🛏️ Bedsheets</span>
                  <span className="font-bold text-slate-900">1</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
                <span>17 Aug 2026</span>
                <span className="font-mono bg-slate-100 text-slate-700 px-2 py-1 rounded font-semibold flex items-center gap-1">
                  <Tag className="w-3 h-3" /> Tag #A3-027
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}