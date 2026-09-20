export default function FeatureBlock({ index, icon: Icon, title, description, className = '' }) {
  return (
    <div className={`flex flex-col justify-between rounded-lg border border-border bg-surface p-6 ${className}`}>
      <div>
        <div className="flex items-center justify-between">
          <Icon aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.75} />
          <span className="font-mono text-xs text-muted">{index}</span>
        </div>
        <h3 className="mt-4 font-display text-base font-semibold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
      </div>
    </div>
  );
}
