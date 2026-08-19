import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ActivateAccount from './pages/ActivateAccount';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/activate" element={<ActivateAccount />} />
        {/* Placeholder routes for next step */}
        <Route path="/student" element={<div className="p-8">Student Dashboard</div>} />
        <Route path="/staff" element={<div className="p-8">Staff Dashboard</div>} />
      </Routes>
    </BrowserRouter>
  );
}