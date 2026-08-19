import { createContext, useContext, useState } from 'react';
import { LAUNDRY_STATUS } from '../utils/constants';

const LaundryContext = createContext();

export function LaundryProvider({ children }) {
  // Global array storing all laundry entries
  const [entries, setEntries] = useState([
    // Pre-populated mock entry for testing
    {
      id: 'REQ-1001',
      studentName: 'Rahul Sharma',
      rollNo: '21045',
      hostel: 'Hostel A',
      flank: 'Flank 1',
      page: '42',
      items: [
        { clothType: 'Shirt', quantity: 2, itemCode: 'S-12' },
        { clothType: 'Pants', quantity: 1, itemCode: 'P-05' },
      ],
      status: LAUNDRY_STATUS.SUBMITTED,
      createdAt: new Date().toISOString(),
    },
  ]);

  // Add new submission from student
  const addEntry = (studentInfo, items) => {
    const newEntry = {
      id: `REQ-${Math.floor(1000 + Math.random() * 9000)}`,
      studentName: studentInfo.name,
      rollNo: studentInfo.rollNo || '21099',
      hostel: studentInfo.hostel,
      flank: studentInfo.flank,
      page: studentInfo.page,
      items,
      status: LAUNDRY_STATUS.SUBMITTED,
      createdAt: new Date().toISOString(),
    };

    setEntries((prev) => [newEntry, ...prev]);
    return newEntry;
  };

  // Update status (used by both staff and student)
  const updateStatus = (entryId, newStatus) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === entryId ? { ...entry, status: newStatus } : entry
      )
    );
  };

  return (
    <LaundryContext.Provider value={{ entries, addEntry, updateStatus }}>
      {children}
    </LaundryContext.Provider>
  );
}

// Custom hook for easy access
export const useLaundry = () => useContext(LaundryContext);