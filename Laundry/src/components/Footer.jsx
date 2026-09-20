import { Link } from 'react-router-dom';
import { Shirt } from 'lucide-react';

const NAV = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#features', label: 'Features' },
  { href: '#verification', label: 'Verification' },
  { href: '#about', label: 'About' },
];

const PRODUCT = [
  { href: '/login', label: 'Login' },
  { href: '/login', label: 'History' },
  { href: '#verification', label: 'Verification' },
];

function FooterLink({ href, children }) {
  const className = 'transition-colors hover:text-background';
  if (href.startsWith('#')) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={href} className={className}>
      {children}
    </Link>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-background/70">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-background/20 bg-background/10 text-background">
                <Shirt aria-hidden="true" className="h-4 w-4" />
              </span>
              <span className="font-display text-base font-semibold text-background">WashLog</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed">
              Laundry register for modern hostel operations.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-background/40">
              Navigation
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-widest text-background/40">
              Product
            </p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {PRODUCT.map((item) => (
                <li key={item.label}>
                  <FooterLink href={item.href}>{item.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-background/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} WashLog. All rights reserved.</span>
          <span className="font-mono text-background/40">Laundry Register / 2026</span>
        </div>
      </div>
    </footer>
  );
}
