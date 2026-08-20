import { useState } from 'react';
import Layout from '../components/common/Layout';
import LaundryEntryForm from '../components/student/LaundryEntryForm';
import StatusTracker from '../components/student/StatusTracker';
import { useLaundry } from '../context/LaundryContext';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboard() {
  const { entries, addEntry, updateStatus } = useLaundry();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const currentUser = user || {
    name: 'Rahul Sharma',
    rollNo: '21045',
    role: 'STUDENT',
    hostel: 'Hostel A',
    flank: 'Flank 1',
    page: '42',
  };

  const activeRequest = entries.find((e) => e.page === currentUser.page);

  const handleEntrySubmit = (items) => {
    setLoading(true);
    setTimeout(() => {
      addEntry(currentUser, items);
      setLoading(false);
    }, 500);
  };

  const handleConfirmReceipt = () => {
    if (activeRequest) {
      updateStatus(activeRequest.id, 'Picked Up & Confirmed');
    }
  };

  return (
    <Layout user={currentUser}>
      <div className="space-y-6">
        {/* Student Register Header Banner */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-6 rounded-2xl shadow-md border-2 border-emerald-600 flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="bg-yellow-300 text-slate-900 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Active Register Page
            </span>
            <h2 className="text-2xl font-black mt-2">
              {currentUser.name} ({currentUser.rollNo})
            </h2>
            <p className="text-emerald-100 text-sm font-medium mt-1">
              {currentUser.hostel} • {currentUser.flank} • Page #{currentUser.page}
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-xl border border-white/20 text-right">
            <span className="text-xs text-emerald-100 block">Status</span>
            <span className="font-bold text-yellow-300 text-base">
              {activeRequest ? activeRequest.status : 'Ready to Enter'}
            </span>
          </div>
        </div>

        {/* Enter Register Form or View Tracker */}
        {activeRequest ? (
          <StatusTracker
            currentStatus={activeRequest.status}
            onConfirmReceipt={handleConfirmReceipt}
          />
        ) : (
          <div className="bg-white p-6 rounded-2xl border-2 border-emerald-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              🧺 Enter Laundry Register
            </h3>
            <p className="text-sm text-slate-500 mb-6">
              Add your clothes below and submit your digital register entry.
            </p>
            <LaundryEntryForm onSubmit={handleEntrySubmit} loading={loading} />
          </div>
        )}
      </div>
    </Layout>
  );
}