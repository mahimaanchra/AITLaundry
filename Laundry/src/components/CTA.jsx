import Button from './common/Button';
import Reveal from './landing/Reveal';

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-background sm:py-24">
      <div className="bg-paper-grid pointer-events-none absolute inset-0 opacity-[0.06]" />
      <Reveal className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-warn">
          Register / 2026
        </span>
        <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Ready to leave the paper register behind?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-background/65 sm:text-base">
          Open your hostel&rsquo;s digital register and keep every submission, wash cycle, and
          return organized in one searchable place.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/login" variant="invert">
            Login
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
