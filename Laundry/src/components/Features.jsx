import React from 'react';
import { BookOpen, Hash, Camera, ShieldCheck, Bell, History } from 'lucide-react';

const FEATURES = [
  {
    icon: BookOpen,
    title: 'Digital Register Mapping',
    desc: 'Follows the familiar Hostel → Flank → Page hierarchy for seamless navigation.',
  },
  {
    icon: Hash,
    title: 'Simple Laundry Entries',
    desc: 'Quick itemized counters for shirts, trousers, bedsheets, towels, and delicates.',
  },
  {
    icon: Camera,
    title: 'Optional Cloth Photos',
    desc: 'Students can attach photos of special garments for easy identification later.',
  },
  {
    icon: ShieldCheck,
    title: 'Two-Way Verification',
    desc: 'Both student and staff confirm distribution before closing the entry.',
  },
  {
    icon: Bell,
    title: 'Laundry Notifications',
    desc: 'Automated email alerts inform residents when laundry staff arrives.',
  },
  {
    icon: History,
    title: 'Complete History',
    desc: 'Permanent record of past entries to resolve missing item claims easily.',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1E3A8A]">
            Core Features
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Built Specifically for Hostel Needs
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Every feature is focused on making daily register operations clean and accountable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 bg-indigo-50 text-[#1E3A8A] rounded-xl flex items-center justify-center font-bold mb-4 border border-indigo-100">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}