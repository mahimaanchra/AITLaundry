import React from 'react';
import { ArrowRight, FileX2, CheckCircle2, Search, History } from 'lucide-react';

export default function ProblemTransition() {
  return (
    <section className="py-16 bg-[#FAF7F2]/80 border-y border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            From Paper Register to Digital Accuracy
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            No complex inventory software to learn. Just replacing old paper logs with clear digital entries.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
          
          {/* Paper Register Side */}
          <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-rose-200 shadow-xs relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-lg flex items-center justify-center font-bold">
                <FileX2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Physical Paper Register</h3>
            </div>
            
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Handwritten entries susceptible to illegible handwriting</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>Time-consuming manual search through physical pages</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span>No historical tracking once books are replaced or misplaced</span>
              </li>
            </ul>
          </div>

          {/* Digital Register Side */}
          <div className="bg-white p-6 rounded-2xl border-2 border-dashed border-emerald-200 shadow-xs relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">WashLog Digital Register</h3>
            </div>
            
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Structured digital entries matching Hostel, Flank & Page Number</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Instant searchability for staff and students in seconds</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span>Complete verification history saved permanently</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}