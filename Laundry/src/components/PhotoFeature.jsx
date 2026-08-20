import React from 'react';
import { Camera, Check, Tag } from 'lucide-react';

export default function PhotoFeature() {
  return (
    <section className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-4">
            <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
              <Camera className="w-3.5 h-3.5" /> Optional Identification
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">
              Need to identify a specific cloth later?
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Students can optionally save a photo or unique tag identifier for individual clothes when submitting them. It’s completely optional—use it when you need extra clarity for expensive or similar-looking garments.
            </p>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-[#FAF7F2] p-6 rounded-2xl border-2 border-dashed border-amber-900/20 max-w-md mx-auto shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-700">Cloth Identification</span>
                <span className="text-[10px] bg-slate-200 font-bold text-slate-700 px-2 py-0.5 rounded">
                  OPTIONAL
                </span>
              </div>

              {/* Mock Cloth Tile */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <div className="h-36 bg-slate-100 rounded-lg flex items-center justify-center text-4xl border border-slate-200">
                  👔
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">Navy Denim Jacket</h4>
                    <p className="text-[11px] text-slate-500 font-mono">Code: SH-024</p>
                  </div>
                  <div className="text-right text-[11px] font-semibold text-emerald-700 space-y-0.5">
                    <div className="flex items-center gap-1"><Check className="w-3 h-3" /> Submitted</div>
                    <div className="flex items-center gap-1"><Check className="w-3 h-3" /> Handed Over</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}