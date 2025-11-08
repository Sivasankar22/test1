import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardCard from '../components/DashboardCard';
import NotificationPanel from '../components/NotificationPanel';
import ChartWidget from '../components/ChartWidget';
import UserMenu from '../components/UserMenu';
import { fetchData } from '../api/api';

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const userName = localStorage.getItem('userName') || 'User';

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await fetchData(`${process.env.REACT_APP_API_URL}/dashboard`, token);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      // Mock data for demo
      setData({
        traffic: { status: 'Moderate', incidents: 3 },
        power: { consumption: '8,450 MW', outages: 2 },
        pollution: { aqi: 156, status: 'Moderate' },
        safety: { activeAlerts: 3, incidents: 12 },
        chartData: {
          labels: ['Traffic', 'Power', 'Pollution', 'Safety'],
          datasets: [{
            label: 'System Status',
            data: [75, 88, 62, 91],
            backgroundColor: [
              'rgba(59, 130, 246, 0.6)',
              'rgba(16, 185, 129, 0.6)',
              'rgba(245, 158, 11, 0.6)',
              'rgba(239, 68, 68, 0.6)',
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(239, 68, 68)',
            ],
            borderWidth: 2,
          }],
        },
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {userName}! 👋
          </h1>
          <p className="text-gray-600">Here's what's happening in the city today</p>
        </div>
        <UserMenu />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div 
          onClick={() => navigate('/traffic')}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <DashboardCard 
            title="Traffic Status" 
            value={data.traffic.status} 
            icon="🚦" 
          />
        </div>
        <div 
          onClick={() => navigate('/power')}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <DashboardCard 
            title="Power Grid" 
            value={data.power.consumption} 
            icon="⚡" 
          />
        </div>
        <div 
          onClick={() => navigate('/pollution')}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <DashboardCard 
            title="Air Quality (AQI)" 
            value={data.pollution.aqi} 
            icon="🌫️" 
          />
        </div>
        <div 
          onClick={() => navigate('/safety')}
          className="cursor-pointer hover:shadow-lg transition-shadow"
        >
          <DashboardCard 
            title="Active Alerts" 
            value={data.safety.activeAlerts} 
            icon="🚨" 
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">System Overview</h2>
          <div className="h-80">
            <ChartWidget 
              data={data.chartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false,
                  },
                },
              }} 
            />
          </div>
        </div>

        {/* Notifications Panel */}
        <div className="lg:col-span-1">
          <NotificationPanel />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => navigate('/traffic')}
            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center transition-colors"
          >
            <div className="text-3xl mb-2">🚦</div>
            <div className="font-semibold text-sm">Traffic Control</div>
          </button>
          <button 
            onClick={() => navigate('/power')}
            className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center transition-colors"
          >
            <div className="text-3xl mb-2">⚡</div>
            <div className="font-semibold text-sm">Power Grid</div>
          </button>
          <button 
            onClick={() => navigate('/pollution')}
            className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg text-center transition-colors"
          >
            <div className="text-3xl mb-2">🌫️</div>
            <div className="font-semibold text-sm">Pollution Monitor</div>
          </button>
          <button 
            onClick={() => navigate('/safety')}
            className="p-4 bg-red-50 hover:bg-red-100 rounded-lg text-center transition-colors"
          >
            <div className="text-3xl mb-2">🚨</div>
            <div className="font-semibold text-sm">Safety & Emergency</div>
          </button>
        </div>
      </div>

      {/* System Status Footer */}
      <div className="mt-6 bg-white p-4 rounded-lg shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">All Systems Operational</span>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
