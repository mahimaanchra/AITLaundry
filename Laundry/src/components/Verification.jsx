import { ShieldCheck, User } from 'lucide-react';
import Reveal from './landing/Reveal';
import SectionHeader from './landing/SectionHeader';
import VerificationBadge from './landing/VerificationBadge';

export default function Verification() {
  return (
    <section id="verification" className="bg-surface/60 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          index="04"
          eyebrow="Verification"
          title="Both sides confirm. No confusion."
          description="A handover only closes once the resident student and the laundry desk staff both acknowledge it."
        />

        <Reveal className="mx-auto mt-14 max-w-3xl rounded-lg border border-border bg-background">
          <div className="grid divide-y divide-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
            <div className="p-6">
              <div className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                <User aria-hidden="true" className="h-4 w-4 text-accent" />
                <span>Student Confirmation</span>
              </div>
              <p className="mt-2 font-display text-sm italic text-muted">
                &ldquo;I received my clothes back intact.&rdquo;
              </p>
              <div className="mt-4">
                <VerificationBadge label="Confirmed" timestamp="17 Aug, 6:12 PM" />
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 font-display text-sm font-semibold text-ink">
                <ShieldCheck aria-hidden="true" className="h-4 w-4 text-warn" />
                <span>Staff Confirmation</span>
              </div>
              <p className="mt-2 font-display text-sm italic text-muted">
                &ldquo;I handed over the clothes.&rdquo;
              </p>
              <div className="mt-4">
                <VerificationBadge label="Confirmed" timestamp="17 Aug, 6:14 PM" />
              </div>
            </div>
          </div>

          <div className="bg-paper-ruled border-t border-border px-6 py-4 text-center">
            <span className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-display text-xs font-bold text-accent-ink">
              <ShieldCheck aria-hidden="true" className="h-3.5 w-3.5" /> Distribution Officially Completed
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
