import { useState } from 'react';
import Layout from '../components/common/Layout';
import RegisterNavigator from '../components/staff/RegistrationNavigator';
import StaffRegisterView from '../components/staff/StaffRegisterView';
import { useLaundry } from '../context/LaundryContext';

export default function StaffDashboard() {
  const { entries, updateStatus } = useLaundry();
  const mockStaff = { name: 'Ramesh Kumar (Laundry Staff)', role: 'STAFF' };

  const [selectedLocation, setSelectedLocation] = useState({
    hostel: 'Hostel A',
    flank: 'Flank 1',
    page: '42',
  });

  const handleSelectPage = (location) => {
    setSelectedLocation(location);
  };

  const handleSearch = (query) => {
    const found = entries.find(
      (e) => e.studentName.toLowerCase().includes(query.toLowerCase()) || e.rollNo === query
    );
    if (found) {
      setSelectedLocation({ hostel: found.hostel, flank: found.flank, page: found.page });
    }
  };

  // Look up actual entry matching selected hostel, flank, and page
  const activeEntry = entries.find(
    (e) =>
      e.hostel === selectedLocation.hostel &&
      e.flank === selectedLocation.flank &&
      e.page === selectedLocation.page
  );

  const pageData = selectedLocation.page
    ? {
        student: {
          name: activeEntry?.studentName || 'Rahul Sharma',
          rollNo: activeEntry?.rollNo || '21045',
          hostel: selectedLocation.hostel,
          flank: selectedLocation.flank,
          page: selectedLocation.page,
        },
        activeEntry,
      }
    : null;

  const handleUpdateStatus = (newStatus) => {
    if (activeEntry) {
      updateStatus(activeEntry.id, newStatus);
    }
  };

  return (
    <Layout user={mockStaff} onLogout={() => console.log('logout')}>
      <div className="space-y-6">
        <RegisterNavigator onSelectPage={handleSelectPage} onSearch={handleSearch} />
        <StaffRegisterView pageData={pageData} onUpdateStatus={handleUpdateStatus} />
      </div>
    </Layout>
  );
}