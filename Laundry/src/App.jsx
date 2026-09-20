import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { LaundryProvider } from './context/LaundryContext';
import AppRoutes from './routes/AppRoutes';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LaundryProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LaundryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
