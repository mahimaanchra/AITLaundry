import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { activateAccount } from '../services/authService';

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Activate Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Set your password to complete activation</p>

        {status.error && <div className="bg-red-50 text-red-600 p-3 rounded mb-4 text-sm">{status.error}</div>}
        {status.success && <div className="bg-green-50 text-green-600 p-3 rounded mb-4 text-sm">Account activated! Redirecting to login...</div>}

        <form onSubmit={handleActivation} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input
              type="password"
              required
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-indigo-500 outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={status.loading || status.success}
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            {status.loading ? 'Activating...' : 'Set Password'}
          </button>
        </form>
      </div>
    </div>
  );
}