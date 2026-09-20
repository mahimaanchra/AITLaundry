import { Link } from 'react-router-dom';
import { Shirt } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-border bg-surface px-4 py-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-accent-strong bg-accent text-accent-ink">
            <Shirt aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="leading-none">
            <span className="block font-display text-[15px] font-semibold tracking-tight text-ink">
              WashLog
            </span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
              Laundry Register
            </span>
          </span>
        </Link>

        <div className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2 sm:flex-initial sm:gap-x-4">
          {user && (
            <>
              <span className="flex min-w-0 items-baseline gap-1.5 text-sm text-muted">
                <span className="min-w-0 truncate">{user.name}</span>
                <span className="shrink-0 whitespace-nowrap rounded border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted">
                  {user.role}
                </span>
              </span>
              <button
                onClick={onLogout}
                className="shrink-0 rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-danger/40 hover:bg-danger-soft hover:text-danger"
              >
                Sign Out
              </button>
            </>
          )}
          <ThemeToggle className="shrink-0" />
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
