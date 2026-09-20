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

  const inputClasses =
    'w-full rounded-md border border-border bg-surface px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30';
  const labelClasses = 'mb-1 block text-xs font-medium text-muted';

  return (
    <div className="space-y-6 rounded-lg border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(20,23,31,0.05)]">
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">Digital Register Navigator</h3>
        <p className="text-sm text-muted">Navigate student register pages by Hostel and Flank</p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <form onSubmit={handlePageJump} className="space-y-4 rounded-lg border border-border bg-background p-4">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">Browse Hierarchy</span>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClasses}>Hostel</label>
              <select
                value={selectedHostel}
                onChange={(e) => setSelectedHostel(e.target.value)}
                className={inputClasses}
              >
                {HOSTELS.map((h) => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClasses}>Flank</label>
              <select
                value={selectedFlank}
                onChange={(e) => setSelectedFlank(e.target.value)}
                className={inputClasses}
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
              className={`flex-1 ${inputClasses}`}
            />
            <button
              type="submit"
              className="rounded-md bg-accent px-4 py-2 font-display text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
            >
              Open Page
            </button>
          </div>
        </form>

        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col justify-between space-y-4 rounded-lg border border-border bg-background p-4"
        >
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted">Quick Search</span>
            <p className="mb-3 mt-1 text-xs text-muted">Find student by name, roll number, or submission ID</p>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma or 21045"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={inputClasses}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-ink px-4 py-2 font-display text-sm font-semibold text-background transition-opacity hover:opacity-90"
          >
            Search Register
          </button>
        </form>
      </div>
    </div>
  );
}
