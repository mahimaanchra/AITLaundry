import React, { useState, useMemo } from 'react';
import { CheckCircle2, AlertCircle, Clock, Search, Tag, Calendar, User, Bell, Package } from 'lucide-react';
import { useLaundryStore } from '../../stores/laundryStore';
import { useShallow } from 'zustand/react/shallow';

export default function StaffDashboardView() {
  // Use stable selectors
  const entries = useLaundryStore((state) => state.entries);
  const selectedLocation = useLaundryStore((state) => state.selectedLocation);
  const setSelectedLocation = useLaundryStore((state) => state.setSelectedLocation);
  const updateEntryStatus = useLaundryStore((state) => state.updateEntryStatus);
  const confirmStaffHandover = useLaundryStore((state) => state.confirmStaffHandover);
  const addNotification = useLaundryStore((state) => state.addNotification);

  const [searchQuery, setSearchQuery] = useState('');

  const hostels = ['Hostel A', 'Hostel B', 'Hostel C'];
  const flanks = ['Flank F-01', 'Flank F-02', 'Flank F-03', 'Flank F-04'];
  const pages = Array.from({ length: 50 }, (_, i) => String(i + 1));

  // Compute metrics with useMemo to prevent recalculation on every render
  const metrics = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];

    return {
      todaySubmissions: entries.filter(e => e.createdAt.startsWith(today)).length,
      pendingIntake: entries.filter(e => e.status === 'PENDING_INTAKE').length,
      readyForDistribution: entries.filter(e => e.status === 'READY_FOR_PICKUP').length,
      completedToday: entries.filter(e => 
        e.status === 'COMPLETED' && 
        e.completedAt?.startsWith(today)
      ).length,
      disputed: entries.filter(e => e.status === 'DISPUTED').length,
    };
  }, [entries]);

  const handleStatusUpdate = (entryId, newStatus) => {
    updateEntryStatus(entryId, newStatus);
  };

  const handleStaffConfirm = (entryId) => {
    confirmStaffHandover(entryId);
  };

  const sendArrivalAlert = () => {
    addNotification({
      type: 'STAFF_ARRIVAL',
      title: 'Staff Arrival Alert Sent',
      message: `Laundry staff has arrived at ${selectedLocation.hostel} - ${selectedLocation.flank}`,
      metadata: { location: selectedLocation }
    });
  };

  const getActionButton = (entry) => {
    switch (entry.status) {
      case 'PENDING_INTAKE':
        return (
          <button
            onClick={() => handleStatusUpdate(entry.id, 'STAFF_RECEIVED')}
            className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Mark Received
          </button>
        );
      case 'STAFF_RECEIVED':
        return (
          <button
            onClick={() => handleStatusUpdate(entry.id, 'READY_FOR_PICKUP')}
            className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Ready for Pickup
          </button>
        );
      case 'READY_FOR_PICKUP':
        return !entry.staffConfirmedHandover ? (
          <button
            onClick={() => handleStaffConfirm(entry.id)}
            className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
          >
            Confirm Handover
          </button>
        ) : (
          <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">
            Staff Confirmed
          </span>
        );
      default:
        return null;
    }
  };

  // Filter entries based on location and search - memoized for performance
  const filteredEntries = useMemo(() => {
    return entries.filter(entry => {
      const matchesLocation = 
        entry.hostel === selectedLocation.hostel &&
        entry.flank === selectedLocation.flank &&
        entry.pageNo.toString() === selectedLocation.pageNo;
      
      const matchesSearch = !searchQuery || 
        entry.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.rollNo.includes(searchQuery) ||
        entry.roomNo.includes(searchQuery) ||
        entry.tagCode.includes(searchQuery);
      
      return matchesLocation && matchesSearch;
    });
  }, [entries, selectedLocation, searchQuery]);

  const getStatusDisplayName = (status) => {
    switch (status) {
      case 'PENDING_INTAKE': return 'Pending Intake';
      case 'STAFF_RECEIVED': return 'Staff Received';
      case 'IN_PROCESSING': return 'Processing';
      case 'READY_FOR_PICKUP': return 'Ready for Pickup';
      case 'COMPLETED': return 'Completed';
      case 'DISPUTED': return 'Disputed';
      default: return status;
    }
  };

  return (
    <div className="space-y-8">
      {/* Digital Book Navigation Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-6 transition-colors duration-300">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <span className="inline-block text-xs font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 px-3 py-1 rounded-full mb-3">
              Staff Portal
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-2">Digital Register Management</h1>
            <p className="text-slate-600 dark:text-slate-300 text-sm">Navigate and manage hostel laundry registers</p>
          </div>

          {/* Location Selectors */}
          <div className="flex flex-col sm:flex-row gap-4">
            <select
              value={selectedLocation.hostel}
              onChange={(e) => setSelectedLocation({ hostel: e.target.value })}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              {hostels.map(hostel => (
                <option key={hostel} value={hostel}>{hostel}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation.flank}
              onChange={(e) => setSelectedLocation({ flank: e.target.value })}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              {flanks.map(flank => (
                <option key={flank} value={flank}>{flank}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation.pageNo}
              onChange={(e) => setSelectedLocation({ pageNo: e.target.value })}
              className="px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              {pages.map(page => (
                <option key={page} value={page}>Page #{page}</option>
              ))}
            </select>

            <button
              onClick={sendArrivalAlert}
              className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition-colors whitespace-nowrap"
            >
              <Bell className="w-4 h-4" />
              Send Arrival Alert
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-4 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Today's Submissions</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{metrics.todaySubmissions}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-4 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Pending Intake</p>
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-400 mt-1">{metrics.pendingIntake}</p>
            </div>
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-900/20 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-4 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Ready for Distribution</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{metrics.readyForDistribution}</p>
            </div>
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-4 transition-colors duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Disputed Items</p>
              <p className="text-2xl font-bold text-red-600 dark:text-red-400 mt-1">{metrics.disputed}</p>
            </div>
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/20 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 p-4 transition-colors duration-300">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by student name, roll number, room, or tag code..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
          />
        </div>
      </div>

      {/* Digital Register Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200/60 dark:border-slate-700/60 overflow-hidden transition-colors duration-300">
        <div className="p-6 border-b border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Digital Register - {selectedLocation.hostel} • {selectedLocation.flank} • Page #{selectedLocation.pageNo}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Paper log replacement grid for tracking laundry submissions and handovers
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-750 border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Date</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Student & Room</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Garments</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Tag Code</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Status</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wide">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredEntries.length > 0 ? filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-400">
                      <Calendar className="w-3 h-3" />
                      {new Date(entry.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white text-sm">{entry.studentName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Room {entry.roomNo} • {entry.rollNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-700 dark:text-slate-300">
                      {Object.entries(entry.items)
                        .filter(([_, quantity]) => quantity > 0)
                        .map(([item, quantity]) => `${item}: ${quantity}`)
                        .join(', ')}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 w-fit">
                      <Tag className="w-3 h-3" />
                      {entry.tagCode}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                      entry.status === 'PENDING_INTAKE' ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800' :
                      entry.status === 'STAFF_RECEIVED' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800' :
                      entry.status === 'READY_FOR_PICKUP' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800' :
                      'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                    }`}>
                      {getStatusDisplayName(entry.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getActionButton(entry)}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3 text-slate-500 dark:text-slate-400">
                      <Package className="w-8 h-8" />
                      <p className="font-medium">No entries found for this page</p>
                      <p className="text-sm">Try selecting a different page or clearing your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}