import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CTA() {
  return (
    <section className="py-20 bg-[#1E3A8A] text-amber-50 relative overflow-hidden">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Ready to leave the paper register behind?
        </h2>
        <p className="text-indigo-100 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Access your digital laundry register and keep every submission, washing state, and return cycle organized in one place.
        </p>
        <div>
          <a
            href="/login"
            className="inline-flex items-center space-x-2 bg-amber-50 text-[#1E3A8A] hover:bg-white px-8 py-4 rounded-xl font-extrabold text-base transition-all shadow-lg"
          >
            <span>Login to Register</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}