import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import UserMenu from './components/UserMenu';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TrafficDashboard from './modules/TrafficDashboard';
import PowerDashboard from './modules/PowerDashboard';
import PollutionDashboard from './modules/PollutionDashboard';
import SafetyDashboard from './modules/SafetyDashboard';
import AdminDashboard from './modules/AdminDashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!localStorage.getItem('token')
  );

  // Listen for storage changes to update auth state
  React.useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events from same window
    window.addEventListener('auth-change', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-change', handleStorageChange);
    };
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/login" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Login />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated ? <Navigate to="/" replace /> : <Signup />
            } 
          />

          {/* Protected Routes */}
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <div className="flex h-screen overflow-hidden">
                  {/* Sidebar */}
                  <Sidebar />
                  
                  {/* Main Content */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Top Navigation */}
                    <header className="bg-white shadow-sm z-10">
                      <div className="flex items-center justify-between px-6 py-4">
                        <h1 className="text-2xl font-bold text-gray-800">
                          Urban Operations Command Center
                        </h1>
                        <UserMenu />
                      </div>
                    </header>

                    {/* Main Content Area */}
                    <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
                      <div className="container mx-auto px-6 py-8">
                        <Routes>
                          <Route path="/" element={<Home />} />
                          <Route path="/traffic" element={<TrafficDashboard />} />
                          <Route path="/power" element={<PowerDashboard />} />
                          <Route path="/pollution" element={<PollutionDashboard />} />
                          <Route path="/safety" element={<SafetyDashboard />} />
                          <Route path="/admin" element={<AdminDashboard />} />
                          <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                      </div>
                    </main>
                  </div>
                </div>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
