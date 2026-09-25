import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // 1. If there is no user in context at all, kick them back to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Safely convert the backend role to UPPERCASE so it matches ['STAFF'] or ['STUDENT']
  const userRole = user.role ? user.role.toUpperCase() : '';

  // 3. Check if they are allowed in
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    // 4. If they try to access the wrong URL, send them to their correct home
    if (userRole === 'STAFF' || userRole === 'ADMIN') {
      return <Navigate to="/staff" replace />;
    } else {
      return <Navigate to="/student" replace />;
    }
  }

  // 5. If everything matches, let them see the dashboard!
  return children;
}