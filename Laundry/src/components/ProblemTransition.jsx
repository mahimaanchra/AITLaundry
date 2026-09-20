import { useState } from 'react';
import { GripVertical } from 'lucide-react';
import Reveal from './landing/Reveal';
import SectionHeader from './landing/SectionHeader';

const ROWS = [
  { name: 'Sajal Rawat', items: 'Shirts 3 · Pants 2', status: 'Received' },
  { name: 'Aditya Menon', items: 'Bedsheets 1 · Towel 2', status: 'Pending' },
  { name: 'Ravi Iyer', items: 'Shirts 4', status: 'Received' },
];

export default function ProblemTransition() {
  const [value, setValue] = useState(50);

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="01"
          eyebrow="The Problem"
          title="Same register. Fewer ways for it to go wrong."
          description="Drag to compare the paper log your hostel already keeps against the digital version of the same page."
        />

        <Reveal
          className="relative mx-auto mt-14 aspect-[4/5] max-w-3xl touch-none overflow-hidden rounded-lg border border-border bg-surface select-none sm:aspect-[16/9]"
        >
          <div className="absolute inset-0 bg-background p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-widest text-accent">
              WashLog · Digital Register
            </p>
            <div className="mt-4 space-y-2">
              {ROWS.map((row) => (
                <div
                  key={row.name}
                  className="flex items-center justify-between gap-2 rounded-md border border-border bg-surface px-3 py-2.5 text-xs sm:text-sm"
                >
                  <span className="font-semibold text-ink">{row.name}</span>
                  <span className="hidden truncate text-muted sm:inline">{row.items}</span>
                  <span
                    className={`shrink-0 font-mono text-[11px] font-bold ${
                      row.status === 'Received' ? 'text-teal' : 'text-warn'
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="absolute inset-0 bg-paper-bg p-6 text-paper-ink sm:p-8"
            style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-widest text-paper-muted">
              Physical Register
            </p>
            <div className="mt-4 space-y-3">
              {ROWS.map((row, idx) => (
                <p
                  key={row.name}
                  className="border-b border-paper-border pb-2 font-display text-sm italic"
                  style={{ transform: `rotate(${idx % 2 === 0 ? '-0.4deg' : '0.5deg'})` }}
                >
                  {row.name} — {row.items}
                </p>
              ))}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-0 z-10" style={{ left: `${value}%` }}>
            <div className="h-full w-px bg-ink/40" />
            <div className="absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface shadow-sm">
              <GripVertical aria-hidden="true" className="h-4 w-4 text-muted" />
            </div>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            aria-label="Drag to compare the physical and digital register"
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          />
        </Reveal>

        <div className="mx-auto mt-4 flex max-w-3xl justify-between font-mono text-[11px] font-semibold uppercase tracking-widest text-muted">
          <span>Physical</span>
          <span>Digital</span>
        </div>
      </div>
    </section>
  );
}
