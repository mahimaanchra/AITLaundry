import { Link } from 'react-router-dom';
import { Shirt } from 'lucide-react';

export default function Layout({ children, user, onLogout }) {
  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="flex items-center justify-between border-b border-border bg-surface px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
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

        {user && (
          <div className="flex items-center gap-4 text-sm">
            <span className="text-muted">
              {user.name}{' '}
              <span className="ml-1 rounded border border-border bg-background px-2 py-0.5 font-mono text-xs text-muted">
                {user.role}
              </span>
            </span>
            <button
              onClick={onLogout}
              className="font-medium text-muted transition-colors hover:text-danger"
            >
              Sign Out
            </button>
          </div>
        )}
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
