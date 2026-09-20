import { Link } from 'react-router-dom';
import { ArrowRight, BellRing, Mail } from 'lucide-react';
import Reveal from './landing/Reveal';

export default function Notifications() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <div className="mx-auto max-w-sm rounded-lg border border-ink/10 bg-ink p-6 text-background shadow-[0_20px_45px_-25px_rgba(0,0,0,0.5)]">
              <div className="flex items-center justify-between border-b border-background/10 pb-3">
                <div className="flex items-center gap-2">
                  <Mail aria-hidden="true" className="h-4 w-4 text-warn" />
                  <span className="text-xs font-semibold text-background/70">Laundry Arrival Alert</span>
                </div>
                <span className="font-mono text-[10px] text-background/40">Just now</span>
              </div>
              <div className="mt-4 space-y-2 text-xs">
                <p className="font-semibold text-background/90">
                  Laundry staff has arrived at{' '}
                  <span className="font-bold text-warn">Hostel A · Flank F-03</span>
                </p>
                <p className="text-background/60">
                  Submit your clothes during today&rsquo;s collection window.
                </p>
              </div>
              <Link
                to="/login"
                className="group/btn mt-4 flex w-full items-center justify-center gap-2 rounded-md border border-background/15 py-2.5 font-display text-sm font-semibold text-background transition-colors duration-200 hover:bg-background/10"
              >
                <span>Login</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2 lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent-ink px-3 py-1 font-mono text-[11px] font-bold text-accent">
              <BellRing aria-hidden="true" className="h-3.5 w-3.5" /> Arrival Alerts
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
              Know exactly when laundry arrives.
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
              Students get an automated alert the moment laundry staff reach their hostel
              flank — no more waiting around or missing the collection window.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
