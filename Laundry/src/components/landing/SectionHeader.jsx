export default function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}) {
  const isCentered = align === 'center';
  return (
    <div className={`${isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}>
      <div
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent ${
          isCentered ? 'justify-center' : ''
        }`}
      >
        {index && <span className="font-mono text-muted">{index}</span>}
        <span>{eyebrow}</span>
      </div>
      <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
      )}
    </div>
  );
}
