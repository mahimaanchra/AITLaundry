import React from 'react';
import { User, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Verification() {
  return (
    <section id="verification" className="py-20 bg-[#FAF7F2]/80 border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-slate-900">
            Both sides confirm. No confusion.
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Handover is marked complete only after both the resident student and the laundry desk staff acknowledge receipt.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
          
          <div className="grid sm:grid-cols-2 gap-6 items-center">
            
            {/* Student Approval */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <User className="w-4 h-4 text-indigo-600" />
                <span>Student Confirmation</span>
              </div>
              <p className="text-xs text-slate-500">"I received my clothes back intact."</p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
              </div>
            </div>

            {/* Staff Approval */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
              <div className="flex items-center space-x-2 text-slate-900 font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>Staff Confirmation</span>
              </div>
              <p className="text-xs text-slate-500">"I handed over the clothes."</p>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
              </div>
            </div>

          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <span className="inline-block bg-[#1E3A8A] text-amber-50 font-bold text-xs px-4 py-2 rounded-lg shadow-2xs">
              ✓ Distribution Officially Completed
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}