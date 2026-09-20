import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Tag } from 'lucide-react';
import Button from './common/Button';
import RegisterCard from './landing/RegisterCard';

const GARMENTS = [
  { label: 'Shirts', qty: '03' },
  { label: 'Pants', qty: '02' },
  { label: 'Bedsheets', qty: '01' },
];

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-14 pb-20 sm:pt-20 sm:pb-28">
      <div className="bg-paper-grid pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />

      <div className="mx-auto grid max-w-6xl gap-16 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6"
        >
          <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-widest text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Hostel Operations / Laundry Register
          </span>

          <h1 className="mt-5 text-balance font-display text-[2.6rem] font-semibold leading-[1.08] tracking-tight text-ink sm:text-6xl">
            Your hostel&rsquo;s laundry register
            <span className="block text-accent">finally goes digital.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted">
            Replace the paper register without changing how your laundry already works.
            Students log what they submit, staff confirm what they receive, and every
            page stays searchable long after the notebook would have run out.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/login" variant="primary">
              Login
            </Button>
            <Button href="#how-it-works" variant="secondary" showIcon={false}>
              See How It Works
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6 text-xs font-semibold text-muted sm:max-w-md">
            <div className="flex items-center gap-2">
              <CheckCircle2 aria-hidden="true" className="h-4 w-4 text-teal" />
              <span>Hostel → Flank → Page structure</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-teal" />
              <span>Two-way handover verification</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto max-w-md [perspective:1400px]">
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-20 rounded-lg border border-border bg-surface/40 [transform:translate3d(10px,12px,-40px)_rotateX(3deg)_rotateY(-4deg)]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 -z-10 rounded-lg border border-border bg-surface/70 [transform:translate3d(5px,6px,-20px)_rotateX(3deg)_rotateY(-4deg)]"
            />
            <RegisterCard
              eyebrow="Digital Laundry Register"
              title="Sajal Rawat"
              meta="Hostel A · Flank F-03 · Page #27"
              status="Received"
              statusTone="teal"
              statusIcon={CheckCircle2}
              className="[transform:rotateX(3deg)_rotateY(-4deg)] shadow-[0_35px_60px_-25px_rgba(20,23,31,0.4),0_14px_24px_-12px_rgba(20,23,31,0.25)] transition-transform duration-500 ease-out will-change-transform hover:[transform:rotateX(1.5deg)_rotateY(-2deg)]"
              footer={
                <div className="flex items-center justify-between text-xs text-muted">
                  <span className="font-medium">17 Aug 2026</span>
                  <span className="inline-flex items-center gap-1 rounded bg-background px-2 py-1 font-mono font-semibold text-ink">
                    <Tag aria-hidden="true" className="h-3 w-3" /> Tag #A3-027
                  </span>
                </div>
              }
            >
              <div className="flex justify-between border-b border-border pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
                <span>Garment</span>
                <span>Qty</span>
              </div>
              <ul>
                {GARMENTS.map((item) => (
                  <li
                    key={item.label}
                    className="flex justify-between border-b border-dashed border-border py-2.5 text-sm text-ink last:border-b-0"
                  >
                    <span className="font-medium">{item.label}</span>
                    <span className="font-mono font-semibold">{item.qty}</span>
                  </li>
                ))}
              </ul>
            </RegisterCard>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
