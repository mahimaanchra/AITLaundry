import Reveal from './Reveal';

export function TimelineCompact({ steps }) {
  return (
    <ol className="space-y-3">
      {steps.map((step) => (
        <li key={step.title} className="flex items-start gap-3">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-background font-mono text-[11px] font-semibold text-accent">
            {step.number}
          </span>
          <div>
            <p className="text-sm font-semibold text-ink">{step.title}</p>
            {step.description && <p className="text-xs text-muted">{step.description}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function Timeline({ steps }) {
  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
      {steps.map((step, idx) => (
        <Reveal
          key={step.title}
          delay={idx * 0.08}
          className="group relative pl-8 lg:pl-0 lg:pt-12"
        >
          <span
            aria-hidden="true"
            className="absolute left-[11px] top-0 h-full w-px bg-border lg:left-0 lg:right-0 lg:top-[19px] lg:h-px lg:w-auto"
          />
          <span className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs font-semibold text-accent transition-transform duration-300 ease-out group-hover:-translate-y-1 lg:top-[7px]">
            {step.number}
          </span>
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted">{step.tag}</p>
          <h3 className="mt-2 font-display text-lg font-semibold text-ink">{step.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
        </Reveal>
      ))}
    </div>
  );
}
