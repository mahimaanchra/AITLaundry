import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import LaundryEntryForm from '../components/student/LaundryEntryForm';
import StatusTracker from '../components/student/StatusTracker';
import { useLaundry } from '../context/LaundryContext';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboard() {
  const { entries, addEntry, updateStatus } = useLaundry();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
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

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Layout user={currentUser} onLogout={handleLogout}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg border border-ink bg-ink p-6 text-background">
          <div>
            <span className="rounded-full border border-warn/30 bg-warn-soft px-3 py-1 font-mono text-[11px] font-bold text-warn">
              Active Register Page
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold">
              {currentUser.name} ({currentUser.rollNo})
            </h2>
            <p className="mt-1 text-sm text-background/60">
              {currentUser.hostel} · {currentUser.flank} · Page #{currentUser.page}
            </p>
          </div>
          <div className="rounded-md border border-background/15 bg-background/5 px-4 py-3 text-right">
            <span className="block font-mono text-[11px] uppercase tracking-widest text-background/50">Status</span>
            <span className="font-display text-base font-semibold text-warn">
              {activeRequest ? activeRequest.status : 'Ready to Enter'}
            </span>
          </div>
        </div>

        {activeRequest ? (
          <StatusTracker
            currentStatus={activeRequest.status}
            onConfirmReceipt={handleConfirmReceipt}
          />
        ) : (
          <div className="rounded-lg border border-border bg-surface p-6">
            <h3 className="font-display text-lg font-semibold text-ink">Enter Laundry Register</h3>
            <p className="mt-1 text-sm text-muted">
              Add your clothes below and submit your digital register entry.
            </p>
            <div className="mt-6">
              <LaundryEntryForm onSubmit={handleEntrySubmit} loading={loading} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
