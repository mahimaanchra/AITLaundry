import { useState } from 'react';
import Button from '../common/Button';

const FABRIC_ITEMS = [
  { id: 'tshirt', label: 'T-Shirts & Tops', icon: '👕', badge: 'Cotton' },
  { id: 'trousers', label: 'Pants & Jeans', icon: '👖', badge: 'Denim' },
  { id: 'bedsheet', label: 'Bedsheets', icon: '🛏️', badge: 'Linen' },
  { id: 'towel', label: 'Towels', icon: '🧴', badge: 'Terry' },
  { id: 'socks', label: 'Socks & Delicates', icon: '🧦', badge: 'Knit' },
  { id: 'other', label: 'Other Clothes', icon: '🧺', badge: 'Mixed' },
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
      <div className="flex items-center justify-between border-b border-dashed border-border pb-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">Select Garment Counts</h3>
          <p className="mt-0.5 text-xs text-muted">Use the controls to specify item quantities.</p>
        </div>
        <span className="rounded-md border border-border bg-background px-3 py-1 font-mono text-xs font-bold text-muted">
          Total: {totalItems} Garments
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {FABRIC_ITEMS.map((item) => {
          const qty = counts[item.id];
          return (
            <div
              key={item.id}
              className="flex flex-col justify-between rounded-lg border border-border bg-surface p-4"
            >
              <div className="mb-3 flex items-start gap-2.5">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <div>
                  <h4 className="font-display text-sm font-semibold text-ink">{item.label}</h4>
                  <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="mt-2 flex items-center justify-between rounded-md border border-border bg-background p-1.5">
                <button
                  type="button"
                  onClick={() => updateCount(item.id, -1)}
                  className="flex h-7 w-7 items-center justify-center rounded border border-border bg-surface text-sm font-bold text-ink transition-colors hover:bg-border/40 active:scale-95"
                >
                  −
                </button>
                <span className="px-2 font-mono text-sm font-bold text-ink">{qty}</span>
                <button
                  type="button"
                  onClick={() => updateCount(item.id, 1)}
                  className="flex h-7 w-7 items-center justify-center rounded bg-accent text-sm font-bold text-accent-ink transition-colors hover:bg-accent-strong active:scale-95"
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <Button
        as="button"
        type="submit"
        disabled={loading || totalItems === 0}
        showIcon={false}
        className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? 'Registering Laundry…' : `Submit Laundry Entry (${totalItems} Garments)`}
      </Button>
    </form>
  );
}
