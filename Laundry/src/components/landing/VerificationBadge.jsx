import { CheckCircle2 } from 'lucide-react';

export default function VerificationBadge({ label = 'Verified', timestamp, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-teal/30 bg-teal-soft px-2.5 py-1 text-[11px] font-bold text-teal ${className}`}
    >
      <CheckCircle2 aria-hidden="true" className="h-3.5 w-3.5" />
      {label}
      {timestamp && <span className="font-mono font-medium text-teal/70">· {timestamp}</span>}
    </span>
  );
}
