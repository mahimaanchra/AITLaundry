import { BellRing, FileText, Hash, History } from 'lucide-react';
import Reveal from './landing/Reveal';
import FeatureBlock from './landing/FeatureBlock';
import SectionHeader from './landing/SectionHeader';
import { TimelineCompact } from './landing/Timeline';
import VerificationBadge from './landing/VerificationBadge';

const VERIFY_STEPS = [
  { number: '01', title: 'Student submits', description: 'Logged against their page' },
  { number: '02', title: 'Staff records', description: 'Quantities confirmed on intake' },
  { number: '03', title: 'Verified', description: 'Both sides sign off' },
];

export default function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="03"
          eyebrow="The System"
          title="Built specifically for hostel needs"
          description="Not a generic inventory tool — every feature maps to a step your laundry desk already performs."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          <Reveal className="rounded-lg border border-border bg-surface p-7 lg:col-span-4">
            <div className="flex items-start justify-between">
              <FileText aria-hidden="true" className="h-5 w-5 text-accent" strokeWidth={1.75} />
              <span className="font-mono text-xs text-muted">01</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">
              Digital Register Mapping
            </h3>
            <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
              Follows the familiar Hostel → Flank → Page hierarchy your staff already use, so
              nobody has to learn a new mental model to find a record.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2 font-mono text-xs font-semibold">
              <span className="rounded border border-border bg-background px-2.5 py-1 text-ink">
                Hostel A
              </span>
              <span className="text-muted">→</span>
              <span className="rounded border border-border bg-background px-2.5 py-1 text-ink">
                Flank F-03
              </span>
              <span className="text-muted">→</span>
              <span className="rounded border border-accent/30 bg-accent-ink px-2.5 py-1 text-accent">
                Page #27
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.08} className="rounded-lg border border-border bg-surface p-7 lg:col-span-2">
            <div className="flex items-start justify-between">
              <span className="rounded-full border border-teal/30 bg-teal-soft px-2 py-0.5 font-mono text-[10px] font-bold text-teal">
                DUAL SIGN-OFF
              </span>
              <span className="font-mono text-xs text-muted">02</span>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">Student Verification</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Both student and staff confirm distribution before an entry closes.
            </p>
            <div className="mt-5">
              <TimelineCompact steps={VERIFY_STEPS} />
            </div>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-2">
            <FeatureBlock
              index="03"
              icon={Hash}
              title="Page-Based Tracking"
              description="Every entry is addressed by hostel, flank, and page number, exactly like the register book it replaces."
            />
          </Reveal>

          <Reveal delay={0.16} className="lg:col-span-2">
            <FeatureBlock
              index="04"
              icon={History}
              title="Laundry History"
              description="A permanent record of past entries, searchable the moment they're written."
            />
          </Reveal>

          <Reveal delay={0.2} className="rounded-lg border border-border bg-surface p-6 lg:col-span-2">
            <div className="flex items-center justify-between">
              <span className="font-display text-base font-semibold text-ink">Dispute Resolution</span>
              <span className="font-mono text-xs text-muted">05</span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              A missing item claim resolves in seconds against a signed record.
            </p>
            <div className="mt-4">
              <VerificationBadge label="Verified" timestamp="17 Aug, 6:42 PM" />
            </div>
          </Reveal>

          <Reveal
            delay={0.24}
            className="flex flex-col items-start justify-between gap-4 rounded-lg border border-border bg-surface p-6 sm:flex-row sm:items-center sm:col-span-2 lg:col-span-6"
          >
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-warn/30 bg-warn-soft text-warn">
                <BellRing aria-hidden="true" className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display text-base font-semibold text-ink">Notifications</h3>
                <p className="text-sm text-muted">
                  Automated alerts tell residents exactly when laundry staff reach their flank.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-muted">06</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
