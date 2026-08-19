import { useState } from 'react';
import { HOSTELS, FLANKS } from '../../utils/constants';

export default function RegisterNavigator({ onSelectPage, onSearch }) {
  const [selectedHostel, setSelectedHostel] = useState(HOSTELS[0] || 'Hostel A');
  const [selectedFlank, setSelectedFlank] = useState(FLANKS[0] || 'Flank 1');
  const [pageInput, setPageInput] = useState('');
  const [searchInput, setSearchInput] = useState('');

  const handlePageJump = (e) => {
    e.preventDefault();
    if (!pageInput.trim()) return;
    onSelectPage({ hostel: selectedHostel, flank: selectedFlank, page: pageInput });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    onSearch(searchInput);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-xs space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-slate-900">Digital Register Navigator</h3>
        <p className="text-sm text-slate-500">Navigate student register pages by Hostel and Flank</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Navigation by Hostel / Flank / Page */}
        <form onSubmit={handlePageJump} className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Browse Hierarchy</span>
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Hostel</label>
              <select
                value={selectedHostel}
                onChange={(e) => setSelectedHostel(e.target.value)}
                className="w-full bg-white px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {HOSTELS.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Flank</label>
              <select
                value={selectedFlank}
                onChange={(e) => setSelectedFlank(e.target.value)}
                className="w-full bg-white px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {FLANKS.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Page No. (e.g. 42)"
              value={pageInput}
              onChange={(e) => setPageInput(e.target.value)}
              className="flex-1 bg-white px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              Open Page
            </button>
          </div>
        </form>

        {/* Quick Search */}
        <form onSubmit={handleSearchSubmit} className="space-y-4 bg-slate-50 p-4 rounded-lg border border-slate-200 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quick Search</span>
            <p className="text-xs text-slate-500 mt-1 mb-3">Find student by name, roll number, or submission ID</p>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma or 21045"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-white px-3 py-2 border border-slate-300 rounded-md text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-slate-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-900 transition-colors"
          >
            Search Register
          </button>
        </form>
      </div>
    </div>
  );
}