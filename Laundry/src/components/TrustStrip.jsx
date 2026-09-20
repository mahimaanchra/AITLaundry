const ITEMS = [
  { number: '01', label: 'Digital Records', detail: 'Every entry replaces a handwritten line, not the process around it.' },
  { number: '02', label: 'Verification History', detail: 'Both sides confirm before a page closes.' },
  { number: '03', label: 'Instant Search', detail: 'Find any student, page, or tag in seconds.' },
  { number: '04', label: 'Hostel Ready', detail: 'Built around Hostel → Flank → Page, not generic inventory.' },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.number} className="px-1 py-6 sm:px-6">
              <span className="font-mono text-xs text-accent">{item.number}</span>
              <p className="mt-2 font-display text-sm font-semibold text-ink">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
