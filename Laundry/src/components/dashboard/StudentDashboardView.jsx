import React, { useState, useMemo } from 'react';
import { Plus, ArrowRight, CheckCircle2, Tag, User, ShieldCheck, Calendar, Package } from 'lucide-react';
import { useLaundryStore } from '../../stores/laundryStore';
import { useShallow } from 'zustand/react/shallow';
import LaundrySubmissionModal from './LaundrySubmissionModal';

export default function StudentDashboardView() {
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  
  // Use stable selectors - get raw data and compute derived data with useMemo
  const entries = useLaundryStore((state) => state.entries);
  const currentUser = useLaundryStore((state) => state.currentUser);
  const confirmStudentReturn = useLaundryStore((state) => state.confirmStudentReturn);

  // Compute derived data with useMemo to prevent unnecessary recalculations
  const { studentEntries, activeEntry } = useMemo(() => {
    const currentStudentId = currentUser?.id || 'student-mahima-102';
    const filteredEntries = currentUser 
      ? entries.filter(entry => entry.studentId === currentStudentId)
      : entries.slice(0, 3);
    
    const active = filteredEntries.find(entry => entry.status !== 'COMPLETED');
    
    return {
      studentEntries: filteredEntries,
      activeEntry: active
    };
  }, [entries, currentUser]);
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING_INTAKE':
        return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      case 'STAFF_RECEIVED':
      case 'IN_PROCESSING':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'READY_FOR_PICKUP':
        return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'COMPLETED':
        return 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
      default:
        return 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700';
    }
  };

  const handleStudentConfirm = (entryId) => {
    confirmStudentReturn(entryId);
  };

  return (
    <div className="space-y-8">
      {/* Hero Header Banner */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-8 transition-colors duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <span className="inline-block text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 px-3 py-1 rounded-full mb-3">
              Student Portal
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-2">
              Welcome back, {currentUser?.name || 'Mahima'}
            </h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Log your laundry submission or verify received garments
            </p>
          </div>
          <button
            onClick={() => setShowSubmissionModal(true)}
            className="bg-[#1E3A8A] hover:bg-indigo-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Laundry Submission</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Active Laundry Register Cards */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Active Laundry Register</h2>
        
        {studentEntries.length > 0 ? studentEntries.map((entry) => (
          <div key={entry.id} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 space-y-6 transition-colors duration-300">
            {/* Card Header */}
            <div className="flex justify-between items-start border-b border-slate-100 dark:border-slate-700 pb-4">
              <div>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wider">
                  Digital Laundry Register
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{entry.studentName}</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {entry.hostel} • {entry.flank} • Page #{entry.pageNo}
                </p>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 border ${getStatusColor(entry.status)}`}>
                <CheckCircle2 className="w-3.5 h-3.5" />
                {entry.status.replace('_', ' ')}
              </span>
            </div>

            {/* Items Table */}
            <div className="space-y-3">
              <div className="flex justify-between text-xs font-semibold text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700 pb-2">
                <span>Garment Item</span>
                <span>Quantity</span>
              </div>
              {Object.entries(entry.items).map(([item, quantity]) => (
                quantity > 0 && (
                  <div key={item} className="flex justify-between text-sm font-medium text-slate-700 dark:text-slate-300">
                    <span className="capitalize flex items-center gap-2">
                      <Package className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      {item}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{quantity}</span>
                  </div>
                )
              ))}
            </div>

            {/* Footer with Date and Tag */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{new Date(entry.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
              </div>
              <span className="font-mono bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded font-semibold flex items-center gap-1">
                <Tag className="w-3 h-3" />
                Tag #{entry.tagCode}
              </span>
            </div>
          </div>
        )) : (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-8 text-center transition-colors duration-300">
            <Package className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No laundry entries yet</h3>
            <p className="text-slate-500 dark:text-slate-400 mb-4">Submit your first laundry entry to get started</p>
            <button
              onClick={() => setShowSubmissionModal(true)}
              className="bg-[#1E3A8A] hover:bg-indigo-900 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Create New Entry
            </button>
          </div>
        )}
      </div>

      {/* Dual Verification Box */}
      {activeEntry && (
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-8 transition-colors duration-300">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">
              Both sides confirm. No confusion.
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm">
              Handover is marked complete only after both you and the laundry staff acknowledge receipt.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 items-center">
            {/* Student Confirmation */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 transition-colors duration-300">
              <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
                <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>Student Confirmation</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">"I received my clothes back intact."</p>
              {activeEntry.studentConfirmedReturn ? (
                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Confirmed
                </div>
              ) : (
                <button
                  onClick={() => handleStudentConfirm(activeEntry.id)}
                  className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
                  disabled={activeEntry.status !== 'READY_FOR_PICKUP'}
                >
                  Confirm Return
                </button>
              )}
            </div>

            {/* Staff Confirmation */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3 transition-colors duration-300">
              <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-bold text-sm">
                <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-500" />
                <span>Staff Confirmation</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">"I handed over the clothes."</p>
              {activeEntry.staffConfirmedHandover ? (
                <div className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2.5 py-1 rounded border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Confirmed
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2.5 py-1 rounded border border-amber-200 dark:border-amber-800">
                  Pending Staff
                </div>
              )}
            </div>
          </div>

          {/* Completion Status */}
          {activeEntry.studentConfirmedReturn && activeEntry.staffConfirmedHandover && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-700 text-center mt-6">
              <span className="inline-block bg-[#1E3A8A] dark:bg-blue-600 text-white font-bold text-sm px-6 py-3 rounded-lg shadow-sm">
                ✓ Distribution Officially Completed
              </span>
            </div>
          )}
        </div>
      )}

      {/* Submission Modal */}
      {showSubmissionModal && (
        <LaundrySubmissionModal
          onClose={() => setShowSubmissionModal(false)}
        />
      )}
    </div>
  );
}