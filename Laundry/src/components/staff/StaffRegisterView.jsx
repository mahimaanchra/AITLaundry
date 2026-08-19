import { LAUNDRY_STATUS } from '../../utils/constants';

export default function StaffRegisterView({ pageData, onUpdateStatus }) {
  if (!pageData) {
    return (
      <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500">
        Select a Hostel, Flank, and Page Number above to view a student's laundry register page.
      </div>
    );
  }

  const { student, activeEntry } = pageData;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden space-y-6 p-6">
      {/* Student Page Header */}
      <div className="flex flex-wrap justify-between items-center pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            Page #{student.page}
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">{student.name}</h2>
          <p className="text-sm text-slate-500">Roll No: {student.rollNo} | {student.hostel} → {student.flank}</p>
        </div>

        <div className="text-right">
          <span className="text-xs text-slate-500 block">Current Status</span>
          <span className="font-semibold text-slate-800 text-sm">{activeEntry ? activeEntry.status : 'No Active Entry'}</span>
        </div>
      </div>

      {/* Entry Details */}
      {activeEntry ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-slate-500">
            <span>Submitted: {new Date(activeEntry.createdAt).toLocaleString()}</span>
            <span>Entry ID: #{activeEntry.id}</span>
          </div>

          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 text-xs uppercase">
                <th className="py-2">Cloth Type</th>
                <th className="py-2">Quantity</th>
                <th className="py-2">Tag / Code</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeEntry.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2.5 font-medium text-slate-800">{item.clothType}</td>
                  <td className="py-2.5 text-slate-600">{item.quantity}</td>
                  <td className="py-2.5 text-slate-500">{item.itemCode || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Action Buttons for Staff */}
          <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-3">
            {activeEntry.status === LAUNDRY_STATUS.SUBMITTED && (
              <button
                onClick={() => onUpdateStatus(LAUNDRY_STATUS.RECEIVED_BY_STAFF)}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Mark Received at Counter
              </button>
            )}

            {activeEntry.status === LAUNDRY_STATUS.RECEIVED_BY_STAFF && (
              <button
                onClick={() => onUpdateStatus(LAUNDRY_STATUS.READY_FOR_PICKUP)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
              >
                Mark Ready for Pickup
              </button>
            )}

            {activeEntry.status === LAUNDRY_STATUS.STUDENT_CONFIRMED && (
              <button
                onClick={() => onUpdateStatus(LAUNDRY_STATUS.COMPLETED)}
                className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-900 transition-colors"
              >
                Complete & Archive Entry
              </button>
            )}
          </div>
        </div>
      ) : (
        <p className="text-sm text-slate-500 text-center py-6">This student has no active laundry entries right now.</p>
      )}
    </div>
  );
}