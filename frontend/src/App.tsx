import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import { RoleRoute } from './components/RoleRoute';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Scholarships } from './pages/Scholarships';
import { Applications } from './pages/Applications';
import { ManageScholarships } from './pages/admin/ManageScholarships';
import { Users } from './pages/admin/Users';
import { Analytics } from './pages/admin/Analytics';
import { Students } from './pages/agent/Students';
import { useAuth } from './context/AuthContext';
import { Profile } from './pages/Profile';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <ThemeProvider>
        <AuthProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <Navbar />
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              
              {/* Common Routes */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              {/* Student Routes */}
              <Route
                path="/scholarships"
                element={
                  <RoleRoute allowedRoles={['student']}>
                    <Scholarships />
                  </RoleRoute>
                }
              />
              <Route
                path="/applications"
                element={
                  <RoleRoute allowedRoles={['student']}>
                    <Applications />
                  </RoleRoute>
                }
              />

              {/* Agent Routes */}
              <Route
                path="/students"
                element={
                  <RoleRoute allowedRoles={['agent']}>
                    <Students />
                  </RoleRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="/manage-scholarships"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <ManageScholarships />
                  </RoleRoute>
                }
              />
              <Route
                path="/users"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <Users />
                  </RoleRoute>
                }
              />
              <Route
                path="/analytics"
                element={
                  <RoleRoute allowedRoles={['admin']}>
                    <Analytics />
                  </RoleRoute>
                }
              />
            </Routes>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;