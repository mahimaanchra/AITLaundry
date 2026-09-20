import { Camera, Check, Shirt } from 'lucide-react';
import Reveal from './landing/Reveal';

export default function PhotoFeature() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-warn/30 bg-warn-soft px-3 py-1 font-mono text-[11px] font-bold text-warn-strong">
              <Camera aria-hidden="true" className="h-3.5 w-3.5" /> Optional Identification
            </span>
            <h2 className="mt-4 text-balance font-display text-3xl font-semibold tracking-tight text-ink">
              Need to identify a specific garment later?
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Students can optionally save a photo or a unique tag for individual items when
              submitting them. Use it for anything expensive, borrowed, or easy to mix up —
              skip it for everything else.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <div className="bg-paper-ruled mx-auto max-w-sm rounded-lg border border-border bg-background p-5">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-muted">Cloth Identification</span>
                <span className="rounded bg-border/60 px-2 py-0.5 font-mono text-[10px] font-bold text-muted">
                  OPTIONAL
                </span>
              </div>

              <div className="space-y-3 rounded-md border border-border bg-surface p-4">
                <div className="flex h-32 items-center justify-center rounded border border-border bg-background text-muted">
                  <Shirt aria-hidden="true" className="h-10 w-10" strokeWidth={1.5} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-sm font-semibold text-ink">Navy Denim Jacket</h4>
                    <p className="font-mono text-[11px] text-muted">Code: SH-024</p>
                  </div>
                  <div className="space-y-0.5 text-right font-mono text-[11px] font-semibold text-teal">
                    <div className="flex items-center justify-end gap-1">
                      <Check aria-hidden="true" className="h-3 w-3" /> Submitted
                    </div>
                    <div className="flex items-center justify-end gap-1">
                      <Check aria-hidden="true" className="h-3 w-3" /> Handed Over
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
