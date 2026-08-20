import React from 'react';
import { UserCheck, ShieldCheck, Shirt, ArrowRight } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Student Adds Clothes',
    desc: 'Students specify quantities for shirts, pants, bedsheets, and other items on their page.',
    tag: 'Student Action'
  },
  {
    step: '02',
    title: 'Laundry Staff Confirms',
    desc: 'Staff inspects the submitted garments and marks them as received on the register.',
    tag: 'Staff Action'
  },
  {
    step: '03',
    title: 'Clothes Are Returned',
    desc: 'Washed garments are brought back to the hostel flank for pickup.',
    tag: 'Processing'
  },
  {
    step: '04',
    title: 'Both Sides Confirm',
    desc: 'Student and staff confirm handover to complete the register cycle smoothly.',
    tag: 'Dual Verification'
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A]">
            Simple Workflow
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            How The Digital Register Works
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Designed to mirror the traditional physical process with speed and transparency.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs relative flex flex-col justify-between hover:border-[#1E3A8A] transition-all group"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-serif font-black text-[#1E3A8A] group-hover:scale-110 transition-transform">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Visual Flow Indicator */}
        <div className="mt-12 bg-[#FAF7F2] p-4 rounded-xl border border-dashed border-amber-900/20 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-700">
          <span>Student Submission</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span>Staff Intake</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span>Washing</span>
          <ArrowRight className="w-4 h-4 text-slate-400" />
          <span className="text-[#1E3A8A] font-bold">Two-Way Handover Confirmation</span>
        </div>

      </div>
    </section>
  );
}