import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext'; // Import auth to know who is logged in
import API from '../services/api'; // Import your real API
import { LAUNDRY_STATUS } from '../utils/constants';

const LaundryContext = createContext();

export function LaundryProvider({ children }) {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);

  // Automatically fetch data whenever a user logs in
 useEffect(() => {
    const fetchRealData = async () => {
      if (!user) return; 
      
      try {
        let allBackendEntries = [];
        const role = user.role?.toUpperCase();

        if (role === 'STAFF' || role === 'ADMIN') {
          // STEP 1: Fetch Registers
          console.log("1. Attempting to fetch Registers...");
          let registers = [];
          try {
            // Trying plural route first
            const regRes = await API.get('/registers');
            registers = regRes.data;
            console.log("Successfully fetched registers:", registers);
          } catch (regError) {
            console.log("Plural /registers failed, trying singular /register...");
            try {
              const regRes2 = await API.get('/register');
              registers = regRes2.data;
              console.log("Successfully fetched register:", registers);
            } catch (err2) {
              console.error("BOTH register routes failed. Backend says:", err2.response?.data);
              return; // Stop execution if we can't get registers
            }
          }
          
          if (registers && registers.length > 0) {
            // STEP 2: Fetch Laundry
            console.log("2. Attempting to fetch Laundry for registers...");
            for (const reg of registers) {
              try {
                if (!reg._id) {
                   console.error("Warning: A register is missing its _id:", reg);
                   continue;
                }
                const res = await API.get(`/laundry?registerId=${reg._id}`);
                const entriesWithLocation = res.data.map(entry => ({
                  ...entry,
                  computedHostel: reg.hostel?.name || 'Hostel A',
                  computedFlank: reg.flank?.name || 'Flank 1'
                }));
                allBackendEntries = [...allBackendEntries, ...entriesWithLocation];
              } catch (laundryErr) {
                console.error(`Failed fetching laundry for Register ${reg._id}. Backend says:`, laundryErr.response?.data);
              }
            }
          } else {
             console.log("No registers found in the database.");
          }
        } else {
          // Student Fetch Flow
          const res = await API.get('/laundry/my');
          allBackendEntries = res.data;
        }

        // Map data for UI
        const mappedEntries = allBackendEntries.map(entry => ({
          ...entry,
          id: entry._id, 
          studentName: entry.student?.name || user.name || "Unknown",
          rollNo: entry.student?.rollNumber || "---",
          page: String(entry.student?.pageNumber || "1"),
          hostel: entry.computedHostel || "Hostel A", 
          flank: entry.computedFlank || "Flank 1",
          items: entry.clothes || [], 
        }));

        setEntries(mappedEntries);
      } catch (error) {
        console.error('CRITICAL FATAL ERROR:', error.response?.data || error.message);
      }
    };

    fetchRealData();
  }, [user]);

// Add new submission from student via API
  const addEntry = async (studentInfo, items) => {
    try {
      // 1. EXTRACT RAW DATA
      let rawClothes = [];
      if (Array.isArray(items)) {
        rawClothes = items.map(item => ({
          type: (item.type || item.name || '').toLowerCase().trim(),
          quantity: Number(item.quantity || item.count || item.value || 0)
        }));
      } else if (typeof items === 'object') {
        rawClothes = Object.keys(items).map(key => ({
          type: key.toLowerCase().trim(),
          quantity: Number(items[key])
        }));
      }

      // 2. FORCE BACKEND'S EXACT ALLOWED WORDS
      const formattedClothes = rawClothes
        .filter(item => item.quantity > 0)
        .map(item => {
          let cleanType = 'other'; // Default fallback
          
          if (item.type.includes('shirt') || item.type.includes('tshirt')) cleanType = 'shirt';
          else if (item.type.includes('pant') || item.type.includes('jean') || item.type.includes('trouser')) cleanType = 'pant';
          else if (item.type.includes('bed') || item.type.includes('sheet')) cleanType = 'bedsheet';
          else if (item.type.includes('towel')) cleanType = 'towel';

          return { type: cleanType, quantity: item.quantity };
        });

      console.log("EXACT JSON SENT TO BACKEND:", JSON.stringify({ clothes: formattedClothes }));

      // 3. SEND TO BACKEND
      const response = await API.post('/laundry', { clothes: formattedClothes });
      const newEntry = response.data;

      const formattedEntry = {
        ...newEntry,
        id: newEntry._id,
        studentName: studentInfo?.name || user?.name || "Student",
        rollNo: studentInfo?.rollNo || '---',
        page: String(studentInfo?.page || '1'),
        items: newEntry.clothes || items,
      };

      setEntries((prev) => [formattedEntry, ...prev]);
      return formattedEntry;
      
    } catch (error) {
      // PRINT THE EXACT BACKEND REASON
      console.error("Backend Rejection Reason:", JSON.stringify(error.response?.data, null, 2));
      alert(error.response?.data?.message || 'Failed to submit laundry');
      throw error;
    }
  };

  
 // Update status using the exact backend routes
  const updateStatus = async (entryId, newStatus) => {
    try {
      console.log(`[Context] Updating entry ${entryId} to status: ${newStatus}`);
      let route = '';
      
      const targetStatus = String(newStatus).toLowerCase();

      // Safely match the incoming status to the correct backend route
      if (targetStatus === 'undo') {
        route = `/laundry/${entryId}/undo`;
      }
      else if (targetStatus === String(LAUNDRY_STATUS.RECEIVED_BY_STAFF).toLowerCase()) {
        route = `/laundry/${entryId}/receive`;
      } 
      else if (targetStatus === String(LAUNDRY_STATUS.READY_FOR_PICKUP).toLowerCase()) {
        route = `/laundry/${entryId}/ready`;
      } 
      else if (targetStatus === String(LAUNDRY_STATUS.STUDENT_CONFIRMED).toLowerCase()) {
        route = `/laundry/${entryId}/student-confirm`;
      } 
      else if (targetStatus === String(LAUNDRY_STATUS.COMPLETED).toLowerCase()) {
        route = `/laundry/${entryId}/staff-confirm`;
      }

      if (!route) {
        console.error("ERROR: Could not find a backend route for status:", newStatus);
        alert(`Cannot update: Unknown status "${newStatus}"`);
        return;
      }

      console.log(`[Context] Firing API call to: PATCH ${route}`);
      const response = await API.patch(route);
      
      // Get the true updated status from backend, or fallback to the one we requested
      const finalStatus = response.data?.laundry?.status || response.data?.status || newStatus;
      console.log(`[Context] Success! Backend returned status:`, finalStatus);

      // Instantly update UI on success
      setEntries((prev) =>
        prev.map((entry) =>
          (entry.id === entryId || entry._id === entryId) 
            ? { ...entry, status: finalStatus } 
            : entry
        )
      );
    } catch (error) {
      console.error("Failed to update status. Backend said:", error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <LaundryContext.Provider value={{ entries, addEntry, updateStatus }}>
      {children}
    </LaundryContext.Provider>
  );
}

export const useLaundry = () => useContext(LaundryContext);