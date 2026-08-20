import { LAUNDRY_STATUS } from '../../utils/constants';

const STEPS = [
  { key: LAUNDRY_STATUS.SUBMITTED, label: 'Submitted' },
  { key: LAUNDRY_STATUS.RECEIVED_BY_STAFF, label: 'Received by Staff' },
  { key: LAUNDRY_STATUS.READY_FOR_PICKUP, label: 'Ready for Pickup' },
  { key: LAUNDRY_STATUS.STUDENT_CONFIRMED, label: 'Confirmed Received' },
  { key: LAUNDRY_STATUS.COMPLETED, label: 'Completed' },
];

export default function StatusTracker({ currentStatus, onConfirmReceipt }) {
  const currentStepIndex = STEPS.findIndex((s) => s.key === currentStatus);

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Active Laundry Request Status</h3>

      <div className="flex items-center justify-between relative">
        {STEPS.map((step, idx) => {
          const isDone = idx <= currentStepIndex;
          return (
            <div key={step.key} className="flex-1 text-center relative z-10">
              <div
                className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-bold ${
                  isDone ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {idx + 1}
              </div>
              <p className={`text-xs mt-2 font-medium ${isDone ? 'text-indigo-900' : 'text-slate-400'}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {currentStatus === LAUNDRY_STATUS.READY_FOR_PICKUP && (
        <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-lg flex items-center justify-between">
          <p className="text-sm text-indigo-900 font-medium">Your clothes are ready at the laundry counter!</p>
          <button
            onClick={onConfirmReceipt}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-xs font-semibold hover:bg-indigo-700 transition-colors"
          >
            Confirm I Received Clothes
          </button>
        </div>
      )}
    </div>
  );
}