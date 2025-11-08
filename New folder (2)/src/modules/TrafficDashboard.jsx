import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import ChartWidget from '../components/ChartWidget';
import MapWidget from '../components/MapWidget';
import { fetchData } from '../api/api';

function TrafficDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrafficData();
  }, []);

  const loadTrafficData = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await fetchData(`${process.env.REACT_APP_API_URL}/traffic`, token);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error loading traffic data:', error);
      // Mock data for demo
      setData({
        totalVehicles: 15420,
        avgSpeed: 42,
        congestionLevel: 'Medium',
        incidents: 3,
        chartData: {
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
          datasets: [{
            label: 'Traffic Volume',
            data: [300, 200, 800, 1200, 1500, 900],
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgb(59, 130, 246)',
            borderWidth: 2,
          }],
        },
        mapCenter: [77.5946, 12.9716], // Bangalore coordinates
      });
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🚦 Traffic Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Vehicles" value={data.totalVehicles.toLocaleString()} icon="🚗" />
        <DashboardCard title="Avg Speed" value={`${data.avgSpeed} km/h`} icon="⏱️" />
        <DashboardCard title="Congestion" value={data.congestionLevel} icon="🚥" />
        <DashboardCard title="Incidents" value={data.incidents} icon="⚠️" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Traffic Volume Over Time</h2>
          <ChartWidget data={data.chartData} options={{responsive: true}} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Live Traffic Map</h2>
          <MapWidget coordinates={data.mapCenter} />
        </div>
      </div>
    </div>
  );
}

export default TrafficDashboard;
