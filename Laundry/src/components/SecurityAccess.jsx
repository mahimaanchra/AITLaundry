import React from 'react';
import { UserCheck, Key, Shield } from 'lucide-react';

export default function SecurityAccess() {
  return (
    <section id="about" className="py-16 bg-[#FAF7F2]/60 border-t border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl font-extrabold text-slate-900">
            Account Access & Governance
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Built for structured hostel administration without open public signups.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-xs">
          
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <UserCheck className="w-5 h-5 text-[#1E3A8A]" />
            <h3 className="font-bold text-slate-900">Staff-Created Accounts</h3>
            <p className="text-slate-500">Student accounts are provisioned by hostel staff based on official roll numbers.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <Key className="w-5 h-5 text-[#1E3A8A]" />
            <h3 className="font-bold text-slate-900">Email Password Setup</h3>
            <p className="text-slate-500">Residents receive an activation link to set their password securely.</p>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
            <Shield className="w-5 h-5 text-[#1E3A8A]" />
            <h3 className="font-bold text-slate-900">Assigned Access Only</h3>
            <p className="text-slate-500">Students access only their designated register page; staff manage assigned blocks.</p>
          </div>

        </div>

      </div>
    </section>
  );
}