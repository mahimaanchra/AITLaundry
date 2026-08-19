import { useState } from 'react';
import Layout from '../components/common/Layout';
import LaundryEntryForm from '../components/student/LaundryEntryForm';
import StatusTracker from '../components/student/StatusTracker';
import { useLaundry } from '../context/LaundryContext';

export default function StudentDashboard() {
  const { entries, addEntry, updateStatus } = useLaundry();
  const [loading, setLoading] = useState(false);

  const mockUser = { 
    name: 'Rahul Sharma', 
    rollNo: '21045', 
    role: 'STUDENT', 
    hostel: 'Hostel A', 
    flank: 'Flank 1', 
    page: '42' 
  };

  // Find active request for this student
  const activeRequest = entries.find((e) => e.page === mockUser.page);

  const handleEntrySubmit = (items) => {
    setLoading(true);
    setTimeout(() => {
      addEntry(mockUser, items);
      setLoading(false);
    }, 500);
  };

  const handleConfirmReceipt = () => {
    if (activeRequest) {
      updateStatus(activeRequest.id, 'STUDENT_CONFIRMED');
    }
  };

  return (
    <Layout user={mockUser} onLogout={() => console.log('logout')}>
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center text-sm">
          <div>
            <span className="text-slate-500">Digital Register Page: </span>
            <span className="font-semibold text-slate-800">
              {mockUser.hostel} → {mockUser.flank} → Page #{mockUser.page}
            </span>
          </div>
        </div>

        {activeRequest ? (
          <StatusTracker
            currentStatus={activeRequest.status}
            onConfirmReceipt={handleConfirmReceipt}
          />
        ) : (
          <LaundryEntryForm onSubmit={handleEntrySubmit} loading={loading} />
        )}
      </div>
    </Layout>
  );
}