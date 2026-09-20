import { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Shirt } from 'lucide-react';
import { activateAccount } from '../services/authService';
import Button from '../components/common/Button';

export default function ActivateAccount() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState({ error: '', success: false, loading: false });

  const handleActivation = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setStatus({ ...status, error: 'Passwords do not match' });
    }

    setStatus({ error: '', success: false, loading: true });

    try {
      await activateAccount({ token, password });
      setStatus({ error: '', success: true, loading: false });
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setStatus({ error: err.response?.data?.message || 'Activation failed', success: false, loading: false });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-sm">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-accent-strong bg-accent text-accent-ink">
            <Shirt aria-hidden="true" className="h-4 w-4" />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            WashLog
          </span>
        </Link>

        <div className="rounded-lg border border-border bg-surface p-7 shadow-[0_1px_2px_rgba(20,23,31,0.05)]">
          <h2 className="font-display text-xl font-semibold text-ink">Activate your account</h2>
          <p className="mt-1 text-sm text-muted">Set a password to complete activation.</p>

          {status.error && (
            <div className="mt-4 rounded-md border border-danger/30 bg-danger-soft px-3 py-2 text-sm text-danger">
              {status.error}
            </div>
          )}
          {status.success && (
            <div className="mt-4 rounded-md border border-teal/30 bg-teal-soft px-3 py-2 text-sm text-teal">
              Account activated! Redirecting to login…
            </div>
          )}

          <form onSubmit={handleActivation} className="mt-5 space-y-5">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                New Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                className="w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-accent/30"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button
              as="button"
              type="submit"
              disabled={status.loading || status.success}
              showIcon={false}
              className="w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status.loading ? 'Activating…' : 'Set Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
