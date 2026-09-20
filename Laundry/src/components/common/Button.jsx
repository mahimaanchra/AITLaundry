import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const VARIANTS = {
  primary:
    'bg-accent text-accent-ink hover:bg-accent-strong border border-accent-strong shadow-[0_1px_0_0_rgba(0,0,0,0.05)]',
  secondary:
    'bg-transparent text-ink border border-border hover:border-ink/40 hover:bg-surface',
  ghost: 'bg-transparent text-ink hover:bg-ink/5 border border-transparent',
  invert: 'bg-background text-ink border border-background hover:bg-background/90',
};

const SIZES = {
  md: 'px-5 py-3 text-sm',
  sm: 'px-4 py-2 text-[13px]',
};

export default function Button({
  as = 'a',
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  icon: Icon = ArrowRight,
  showIcon = true,
  className = '',
  children,
  ...rest
}) {
  const classes = `group/btn relative inline-flex items-center justify-center gap-2 rounded-md font-display font-semibold tracking-tight transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {showIcon && (
        <Icon aria-hidden="true" className="h-4 w-4 shrink-0 transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
      )}
    </>
  );

  if (as === 'a') {
    const isInPageAnchor = href?.startsWith('#');
    const isExternal = href?.startsWith('http') || href?.startsWith('mailto:');

    if (href && !isInPageAnchor && !isExternal) {
      return (
        <Link to={href} className={classes} {...rest}>
          {content}
        </Link>
      );
    }

    return (
      <a href={href} className={classes} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  );
}
