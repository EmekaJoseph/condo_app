import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import { useAppStore } from './store/useAppStore';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
// import Deceased from './pages/Deceased'; // Pending implementation
import Deceased from './pages/Deceased';
import Dashboard from './pages/admin/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';
// const PageNotFound = () => <div>404</div>;
import PageNotFound from './components/LoadingComponent'; // Temporary placeholder or use dedicated 404

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn() ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicOnlyRoute = () => {
    const { isLoggedIn } = useAuthStore();
    return !isLoggedIn() ? <Outlet /> : <Navigate to="/dashboard" replace />;
}

function App() {
  const { appTheme } = useAppStore();

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', appTheme);
  }, [appTheme]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/condo/:id/:name" element={<Deceased />} />
        
        <Route element={<PublicOnlyRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Route>

        <Route path="/account" element={<ProtectedRoute />}>
           <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route index element={<Navigate to="dashboard" replace />} />
           </Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
