import { useState } from 'react';

const FABRIC_ITEMS = [
  { id: 'tshirt', label: 'T-Shirts & Tops', icon: '👕', badge: 'Cotton', border: 'border-indigo-300 bg-indigo-50/40' },
  { id: 'trousers', label: 'Pants & Jeans', icon: '👖', badge: 'Denim', border: 'border-sky-300 bg-sky-50/40' },
  { id: 'bedsheet', label: 'Bedsheets', icon: '🛏️', badge: 'Linen', border: 'border-amber-300 bg-amber-50/40' },
  { id: 'towel', label: 'Towels', icon: '🧴', badge: 'Terry', border: 'border-emerald-300 bg-emerald-50/40' },
  { id: 'socks', label: 'Socks & Delicates', icon: '🧦', badge: 'Knit', border: 'border-rose-300 bg-rose-50/40' },
  { id: 'other', label: 'Other Clothes', icon: '🧺', badge: 'Mixed', border: 'border-purple-300 bg-purple-50/40' },
];

export default function LaundryEntryForm({ onSubmit, loading }) {
  const [counts, setCounts] = useState({
    tshirt: 0,
    trousers: 0,
    bedsheet: 0,
    towel: 0,
    socks: 0,
    other: 0,
  });

  const updateCount = (id, delta) => {
    setCounts((prev) => ({
      ...prev,
      [id]: Math.max(0, prev[id] + delta),
    }));
  };

  const totalItems = Object.values(counts).reduce((a, b) => a + b, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (totalItems === 0) return;

    const selectedItems = FABRIC_ITEMS.filter((item) => counts[item.id] > 0).map((item) => ({
      clothType: item.label,
      quantity: counts[item.id],
    }));

    onSubmit(selectedItems);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center border-b-2 border-dashed border-amber-900/15 pb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>🧶</span> Select Garment Counts
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Use the controls to specify item quantities.</p>
        </div>
        <span className="bg-[#FAF7F2] text-amber-900 font-bold px-3 py-1 rounded-lg text-xs border border-dashed border-amber-900/30">
          Total: {totalItems} Garments
        </span>
      </div>

      {/* Fabric Swatch Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {FABRIC_ITEMS.map((item) => {
          const qty = counts[item.id];
          return (
            <div
              key={item.id}
              className={`p-4 rounded-xl border-2 border-dashed ${item.border} shadow-xs flex flex-col justify-between`}
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2.5">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{item.label}</h4>
                    <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                      {item.badge}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stitched Counter Bar */}
              <div className="bg-white border border-slate-200 rounded-lg p-1.5 flex items-center justify-between shadow-xs mt-2">
                <button
                  type="button"
                  onClick={() => updateCount(item.id, -1)}
                  className="w-7 h-7 bg-slate-100 text-slate-700 font-bold rounded border border-slate-300 hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center cursor-pointer text-sm"
                >
                  -
                </button>
                <span className="font-bold text-slate-900 text-sm px-2">{qty}</span>
                <button
                  type="button"
                  onClick={() => updateCount(item.id, 1)}
                  className="w-7 h-7 bg-[#1E3A8A] text-white font-bold rounded hover:bg-indigo-900 active:scale-95 transition-all flex items-center justify-center cursor-pointer text-sm shadow-xs"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Submit Register Button */}
      <button
        type="submit"
        disabled={loading || totalItems === 0}
        className="w-full bg-[#1E3A8A] hover:bg-indigo-900 disabled:bg-slate-200 disabled:text-slate-400 text-amber-50 font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm cursor-pointer border border-indigo-950"
      >
        {loading ? 'Registering Laundry...' : `Submit Laundry Entry (${totalItems} Garments)`}
      </button>
    </form>
  );
}