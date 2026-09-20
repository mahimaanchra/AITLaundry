import React, { useState } from 'react';
import { Shirt, Sun, Moon, User } from 'lucide-react';
import { useLaundryStore } from '../stores/laundryStore';
import { useTheme } from '../providers/ThemeProvider';
import StudentDashboardView from '../components/dashboard/StudentDashboardView';
import StaffDashboardView from '../components/dashboard/StaffDashboardView';
import NotificationBell from '../components/notifications/NotificationBell';
import GlobalSearch from '../components/search/GlobalSearch';
import DemoInitializer from '../components/demo/DemoInitializer';

export default function Dashboard() {
  const [currentRole, setCurrentRole] = useState('student');
  
  const { theme, toggleTheme } = useTheme();
  // Use stable selector - only get the primitive currentUser reference
  const currentUser = useLaundryStore((state) => state.currentUser);

  const backgroundStyle = {
    backgroundColor: '#fdfbf7',
    backgroundImage: `
      radial-gradient(#d6c7b2 0.75px, transparent 0.75px), 
      linear-gradient(135deg, rgba(214,199,178,0.15) 25%, transparent 25%), 
      linear-gradient(225deg, rgba(214,199,178,0.15) 25%, transparent 25%)
    `,
    backgroundSize: '12px 12px, 6px 6px, 6px 6px',
    backgroundPosition: '0 0, 0 0, 3px 3px'
  };

  return (
    <DemoInitializer>
      <div 
        className={`min-h-screen text-slate-800 dark:text-slate-200 font-sans antialiased transition-colors duration-300`}
        style={theme === 'light' ? backgroundStyle : undefined}
      >
      {/* Global Dashboard Header */}
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-700/60 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Left: Branding + Breadcrumb */}
            <div className="flex items-center space-x-6">
              <a href="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-[#1E3A8A] dark:bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold shadow-xs border border-indigo-950 dark:border-blue-700 group-hover:bg-indigo-900 dark:group-hover:bg-blue-700 transition-colors">
                  <Shirt className="w-5 h-5" />
                </div>
                <div>
                  <span className="font-extrabold text-slate-900 dark:text-white text-lg tracking-tight block leading-none">
                    WashLog
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    Dashboard
                  </span>
                </div>
              </a>
              
              <div className="hidden md:block text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                • HOSTEL OPERATIONS / LAUNDRY REGISTER
              </div>
            </div>

            {/* Center: Search */}
            <div className="flex-1 max-w-xl mx-8 hidden md:block">
              <GlobalSearch />
            </div>

            {/* Right: Controls */}
            <div className="flex items-center space-x-3">
              {/* Role Toggle */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-1 flex transition-colors duration-300">
                <button
                  onClick={() => setCurrentRole('student')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    currentRole === 'student'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setCurrentRole('staff')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
                    currentRole === 'staff'
                      ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Staff
                </button>
              </div>

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Notifications */}
              <NotificationBell />

              {/* User Profile */}
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 transition-colors duration-300">
                <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {currentUser?.name || 'Mahima'} <span className="text-slate-400 dark:text-slate-500">| Room {currentUser?.roomNo || '102'}</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentRole === 'student' ? <StudentDashboardView /> : <StaffDashboardView />}
      </main>
    </div>
    </DemoInitializer>
  );
}