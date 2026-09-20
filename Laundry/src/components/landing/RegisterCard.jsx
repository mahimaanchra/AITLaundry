const TONE_CLASSES = {
  teal: 'border-teal/30 bg-teal-soft text-teal',
  accent: 'border-accent/30 bg-accent-ink text-accent',
  warn: 'border-warn/30 bg-warn-soft text-warn-strong',
};

export default function RegisterCard({
  eyebrow,
  title,
  meta,
  status,
  statusTone = 'teal',
  statusIcon: StatusIcon,
  children,
  footer,
  className = '',
}) {
  return (
    <div
      className={`relative rounded-lg border border-border bg-surface shadow-[0_1px_2px_rgba(20,23,31,0.05)] ${className}`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-dashed border-border px-6 py-4">
        <div>
          {eyebrow && (
            <p className="font-mono text-[11px] uppercase tracking-widest text-muted">{eyebrow}</p>
          )}
          {title && <h3 className="mt-1 font-display text-lg font-semibold text-ink">{title}</h3>}
          {meta && <p className="mt-0.5 text-xs font-medium text-muted">{meta}</p>}
        </div>
        {status && (
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold ${TONE_CLASSES[statusTone]}`}
          >
            {StatusIcon && <StatusIcon aria-hidden="true" className="h-3.5 w-3.5" />}
            {status}
          </span>
        )}
      </div>
      <div className="px-6 py-5">{children}</div>
      {footer && (
        <div className="bg-paper-ruled border-t border-border px-6 py-3">{footer}</div>
      )}
    </div>
  );
}
