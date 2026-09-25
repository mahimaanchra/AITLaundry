import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import RegisterNavigator from '../components/staff/RegistrationNavigator';
import StaffRegisterView from '../components/staff/StaffRegisterView';
import { useLaundry } from '../context/LaundryContext'; // Use Context!
import { useAuth } from '../context/AuthContext';

export default function StaffDashboard() {
  const { entries, updateStatus } = useLaundry();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const currentStaff = user || { name: 'Staff Member', role: 'STAFF' };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const [selectedLocation, setSelectedLocation] = useState({
    hostel: 'Hostel A',
    flank: 'Flank 1',
    page: '1',
  });

  const handleSelectPage = (location) => {
    setSelectedLocation(location);
  };

  const handleSearch = (query) => {
    console.log("Search clicked! Looking for:", query);
    console.log("Currently searching inside these entries:", entries);

    const found = entries.find(
      (e) => (e.studentName && e.studentName.toLowerCase().includes(query.toLowerCase())) || 
             e.rollNo === query ||
             String(e.rollNo) === String(query) // Added this in case one is a number and one is a string!
    );
    
    if (found) {
      console.log("Student found! Moving to their page:", found);
      setSelectedLocation({ hostel: found.hostel, flank: found.flank, page: found.page });
    } else {
      alert(`Could not find any laundry for "${query}". Either they haven't submitted it, or it's not loading!`);
    }
  };

  const activeEntry = entries.find(
    (e) =>
      e.hostel === selectedLocation.hostel &&
      e.flank === selectedLocation.flank &&
      e.page === selectedLocation.page
  );

  const pageData = selectedLocation.page
    ? {
        student: {
          name: activeEntry?.studentName || 'No entry for this page',
          rollNo: activeEntry?.rollNo || '---',
          hostel: selectedLocation.hostel,
          flank: selectedLocation.flank,
          page: selectedLocation.page,
        },
        activeEntry,
      }
    : null;

   const handleUpdateStatus = (newStatus) => {
    console.log("1. Button clicked! Trying to change status to:", newStatus);
    console.log("2. Is there an activeEntry?", activeEntry);
    console.log("3. What is the ID being sent?", activeEntry?.id, "or maybe _id?", activeEntry?._id);

    if (activeEntry) {
      // Trying BOTH id and _id just in case!
      const targetId = activeEntry.id || activeEntry._id; 
      
      console.log("4. Firing updateStatus to context with ID:", targetId);
      updateStatus(targetId, newStatus);
    } else {
      console.log("ERROR: activeEntry is missing!");
    }
  };

  return (
    <Layout user={currentStaff} onLogout={handleLogout}>
      <div className="space-y-6">
        <RegisterNavigator onSelectPage={handleSelectPage} onSearch={handleSearch} />
        <StaffRegisterView pageData={pageData} onUpdateStatus={handleUpdateStatus} />
      </div>
    </Layout>
  );
}