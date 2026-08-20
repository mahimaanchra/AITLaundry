import React from 'react';
import { Mail, BellRing, ArrowRight } from 'lucide-react';

export default function Notifications() {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4 max-w-md mx-auto">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold text-slate-300">Laundry Arrival Alert</span>
                </div>
                <span className="text-[10px] text-slate-500">Just Now</span>
              </div>

              <div className="space-y-2 text-xs">
                <p className="font-semibold text-slate-200">
                  Laundry staff has arrived at <span className="text-amber-300 font-bold">Hostel A · Flank F-03</span>
                </p>
                <p className="text-slate-400">
                  Please submit your clothes during today's collection window.
                </p>
              </div>

              <button className="w-full bg-[#1E3A8A] hover:bg-indigo-900 text-amber-50 font-bold text-xs py-2.5 rounded-lg flex items-center justify-center space-x-1 transition-colors cursor-pointer">
                <span>View Register</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-[#1E3A8A] text-xs font-bold px-3 py-1 rounded-full border border-indigo-100">
              <BellRing className="w-3.5 h-3.5" /> Arrival Alerts
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900">
              Know exactly when laundry arrives.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Students receive automated notifications when laundry staff reaches their specific hostel flank, eliminating unnecessary waiting times or missed collection windows.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}