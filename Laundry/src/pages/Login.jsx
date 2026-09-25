import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Quote, Shirt } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from '../components/common/ThemeToggle';
import API from '../services/api';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await API.post('/auth/login', {
        email: formData.email,
        password: formData.password
      });

      // Safely extract the user data from the backend response
      const userData = response.data.user || response.data.student || response.data.staff || response.data;
      
      // Update the AuthContext
      login(userData);
      
      // Navigate to the correct dashboard based on role
      const userRole = userData.role ? userData.role.toUpperCase() : '';
      if (userRole === 'STAFF' || userRole === 'ADMIN') {
        navigate('/staff');
      } else {
        navigate('/student');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-6 lg:p-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-black/10 lg:grid-cols-2">
        <div className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-1.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-accent-ink">
                <Shirt aria-hidden="true" className="h-3.5 w-3.5" />
              </span>
              <span className="font-display text-lg font-bold uppercase tracking-tight text-ink">
                WashLog<span className="text-accent">.</span>
              </span>
            </Link>
            <ThemeToggle />
          </div>

          <div className="mt-10 max-w-sm lg:mt-16">
            <h1 className="font-display text-4xl font-bold tracking-tight text-ink sm:text-[42px]">
              Hi there!
            </h1>
            <p className="mt-2 text-[15px] text-muted">
              Welcome to the Digital Laundry Register
            </p>

            {error && (
              <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your email"
                className="w-full rounded-xl border border-border bg-background px-4 py-3.5 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
              />

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Password"
                  className="w-full rounded-xl border border-border bg-background px-4 py-3.5 pr-16 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/30"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-1 text-xs font-medium text-muted transition-colors hover:text-ink"
                >
                  {showPassword ? (
                    <>
                      <EyeOff aria-hidden="true" className="h-3.5 w-3.5" />
                      Hide
                    </>
                  ) : (
                    <>
                      <Eye aria-hidden="true" className="h-3.5 w-3.5" />
                      Show
                    </>
                  )}
                </button>
              </div>

              <div className="flex justify-end">
                <Link to="#" className="text-sm font-medium text-accent hover:text-accent-strong">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-ink py-3.5 text-sm font-semibold text-background transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Signing in…' : 'Log In'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted">
              New here? Ask your hostel staff for an activation link.
            </p>
          </div>
        </div>

        <div className="relative hidden overflow-hidden lg:block">
          <img
            src="/images/laundry-fold.jpg"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-ink/5" />

          <div className="relative flex h-full flex-col justify-end p-10">
            <Quote aria-hidden="true" className="mb-3 h-6 w-6 fill-background/80 text-background/80" />
            <p className="font-display text-2xl font-bold leading-snug tracking-tight text-background">
              Track every wash, every page,
              <br />
              from anywhere!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}