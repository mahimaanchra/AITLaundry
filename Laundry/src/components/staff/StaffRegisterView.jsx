import { LAUNDRY_STATUS } from '../../utils/constants';

export default function StaffRegisterView({ pageData, onUpdateStatus }) {
  if (!pageData) {
    return (
      <div className="rounded-lg border border-border bg-surface p-12 text-center text-sm text-muted">
        Select a Hostel, Flank, and Page Number above to view a student's laundry register page.
      </div>
    );
  }

  const { student, activeEntry } = pageData;

  return (
    <div className="space-y-6 rounded-lg border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(20,23,31,0.05)]">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <span className="rounded-md bg-accent-ink px-2.5 py-1 font-mono text-xs font-semibold text-accent">
            Page #{student.page}
          </span>
          <h2 className="mt-2 font-display text-xl font-semibold text-ink">{student.name}</h2>
          <p className="text-sm text-muted">
            Roll No: {student.rollNo} | {student.hostel} → {student.flank}
          </p>
        </div>

        <div className="text-right">
          <span className="block font-mono text-xs uppercase tracking-widest text-muted">Current Status</span>
          <span className="font-display text-sm font-semibold text-ink">
            {activeEntry ? activeEntry.status : 'No Active Entry'}
          </span>
        </div>
      </div>

      {activeEntry ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between font-mono text-xs text-muted">
            <span>Submitted: {new Date(activeEntry.createdAt).toLocaleString()}</span>
            <span>Entry ID: #{activeEntry.id}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase text-muted">
                  <th className="py-2 font-semibold">Cloth Type</th>
                  <th className="py-2 font-semibold">Quantity</th>
                  <th className="py-2 font-semibold">Tag / Code</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {activeEntry.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-medium text-ink">{item.clothType}</td>
                    <td className="py-2.5 font-mono text-muted">{item.quantity}</td>
                    <td className="py-2.5 font-mono text-muted">{item.itemCode || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap gap-3 border-t border-border pt-4">
            {activeEntry.status === LAUNDRY_STATUS.SUBMITTED && (
              <button
                onClick={() => onUpdateStatus(LAUNDRY_STATUS.RECEIVED_BY_STAFF)}
                className="rounded-md bg-accent px-4 py-2 font-display text-sm font-semibold text-accent-ink transition-colors hover:bg-accent-strong"
              >
                Mark Received at Counter
              </button>
            )}

            {activeEntry.status === LAUNDRY_STATUS.RECEIVED_BY_STAFF && (
              <button
                onClick={() => onUpdateStatus(LAUNDRY_STATUS.READY_FOR_PICKUP)}
                className="rounded-md bg-teal px-4 py-2 font-display text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                Mark Ready for Pickup
              </button>
            )}

            {activeEntry.status === LAUNDRY_STATUS.STUDENT_CONFIRMED && (
              <button
                onClick={() => onUpdateStatus(LAUNDRY_STATUS.COMPLETED)}
                className="rounded-md bg-ink px-4 py-2 font-display text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                Complete & Archive Entry
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="py-6 text-center text-sm text-muted">This student has no active laundry entries right now.</p>
      )}
    </div>
  );
}
