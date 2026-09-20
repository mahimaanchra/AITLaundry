import React, { useEffect, useState, useRef } from 'react';
import { useLaundryStore } from '../../stores/laundryStore';
import { seedMockData } from '../../utils/mockData';

const DemoInitializer = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const hasSeeded = useRef(false);
  
  // Use stable selectors - only get what we need without creating new objects
  const entries = useLaundryStore((state) => state.entries);
  const addNotification = useLaundryStore((state) => state.addNotification);

  useEffect(() => {
    const initializeDemo = () => {
      // Check localStorage flag first to avoid any unnecessary seeding
      const isAlreadySeeded = localStorage.getItem('washlog_seeded');
      
      if (!isAlreadySeeded && !hasSeeded.current && entries.length === 0) {
        console.log('🌱 Seeding demo data...');
        hasSeeded.current = true;
        
        const seeded = seedMockData();
        if (seeded) {
          // Mark as seeded to prevent future runs
          localStorage.setItem('washlog_seeded', 'true');
          
          // Add welcome notification after a delay
          setTimeout(() => {
            addNotification({
              type: 'SYSTEM',
              title: 'Welcome to WashLog!',
              message: 'Demo data has been loaded. Explore both student and staff portals using the role toggle.'
            });
          }, 2000);
        }
      }
      
      setIsInitialized(true);
    };

    // Run initialization only once
    if (!isInitialized) {
      initializeDemo();
    }
  }, [isInitialized, addNotification]); // Remove entries.length from dependencies

  // Show loading screen while initializing
  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Loading WashLog...</h2>
          <p className="text-slate-600 dark:text-slate-400">Initializing your digital laundry register</p>
        </div>
      </div>
    );
  }

  return children;
};

export default DemoInitializer;