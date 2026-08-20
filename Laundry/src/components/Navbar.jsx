import React, { useState } from 'react';
import { Menu, X, Shirt, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-amber-900/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <a href="#" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-[#1E3A8A] text-amber-50 rounded-xl flex items-center justify-center font-bold shadow-xs border border-indigo-950 group-hover:bg-indigo-900 transition-colors">
              <Shirt className="w-5 h-5 text-amber-100" />
            </div>
            <div>
              <span className="font-extrabold text-slate-900 text-lg tracking-tight block leading-none">
                WashLog
              </span>
              <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
                Laundry Register
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <a href="#how-it-works" className="hover:text-[#1E3A8A] transition-colors">How It Works</a>
            <a href="#features" className="hover:text-[#1E3A8A] transition-colors">Features</a>
            <a href="#verification" className="hover:text-[#1E3A8A] transition-colors">Verification</a>
            <a href="#about" className="hover:text-[#1E3A8A] transition-colors">About</a>
          </div>

          {/* Right Action */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="inline-flex items-center space-x-1.5 bg-[#1E3A8A] text-amber-50 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-900 transition-colors border border-indigo-950 shadow-xs"
            >
              <span>Login to Register</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Hamburger */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-amber-900/10 px-4 pt-2 pb-6 space-y-3">
          <a
            href="#how-it-works"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-amber-100/50"
          >
            How It Works
          </a>
          <a
            href="#features"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-amber-100/50"
          >
            Features
          </a>
          <a
            href="#verification"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-amber-100/50"
          >
            Verification
          </a>
          <a
            href="#about"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-amber-100/50"
          >
            About
          </a>
          <a
            href="/login"
            onClick={() => setIsOpen(false)}
            className="w-full text-center block bg-[#1E3A8A] text-amber-50 px-4 py-2.5 rounded-lg font-bold text-sm shadow-xs border border-indigo-950 mt-4"
          >
            Login to Register
          </a>
        </div>
      )}
    </nav>
  );
}