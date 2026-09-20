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
    <div className="space-y-6 rounded-lg border border-border bg-surface p-6 shadow-[0_1px_2px_rgba(20,23,31,0.05)]">
      <h3 className="font-display text-lg font-semibold text-ink">Active Laundry Request Status</h3>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-2">
        {STEPS.map((step, idx) => {
          const isDone = idx <= currentStepIndex;
          return (
            <div
              key={step.key}
              className="flex items-center gap-3 sm:flex-1 sm:flex-col sm:items-center sm:gap-2 sm:text-center"
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                  isDone ? 'bg-accent text-accent-ink' : 'border border-border bg-background text-muted'
                }`}
              >
                {idx + 1}
              </div>
              <p className={`text-xs font-medium leading-snug ${isDone ? 'text-ink' : 'text-muted'}`}>
                {step.label}
              </p>
            </div>
          );
        })}
      </div>

      {currentStatus === LAUNDRY_STATUS.READY_FOR_PICKUP && (
        <div className="flex items-center justify-between gap-4 rounded-lg border border-teal/30 bg-teal-soft p-4">
          <p className="text-sm font-medium text-teal">Your clothes are ready at the laundry counter!</p>
          <button
            onClick={onConfirmReceipt}
            className="shrink-0 rounded-md bg-teal px-4 py-2 font-display text-xs font-semibold text-white transition-colors hover:opacity-90"
          >
            Confirm I Received Clothes
          </button>
        </div>
      )}
    </div>
  );
}
