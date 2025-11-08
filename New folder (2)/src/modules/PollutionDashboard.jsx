import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import ChartWidget from '../components/ChartWidget';
import MapWidget from '../components/MapWidget';
import { fetchData } from '../api/api';

function PollutionDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPollutionData();
    // Refresh data every 30 seconds
    const interval = setInterval(loadPollutionData, 30000);
    return () => clearInterval(interval);
  }, []);

  const loadPollutionData = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await fetchData(`${process.env.REACT_APP_API_URL}/pollution`, token);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error loading pollution data:', error);
      // Mock data for demo
      setData({
        aqi: 156,
        pm25: 78,
        pm10: 145,
        status: 'Moderate',
        chartData: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [{
            label: 'AQI Level',
            data: [120, 135, 145, 160, 156, 142, 138],
            backgroundColor: 'rgba(245, 158, 11, 0.5)',
            borderColor: 'rgb(245, 158, 11)',
            borderWidth: 2,
            fill: true,
          }],
        },
        mapCenter: [77.5946, 12.9716],
      });
      setLoading(false);
    }
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-green-600';
    if (aqi <= 100) return 'text-yellow-600';
    if (aqi <= 150) return 'text-orange-600';
    if (aqi <= 200) return 'text-red-600';
    return 'text-purple-600';
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🌫️ Pollution Monitoring Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard 
          title="AQI" 
          value={<span className={getAQIColor(data.aqi)}>{data.aqi}</span>} 
          icon="💨" 
        />
        <DashboardCard title="PM2.5" value={`${data.pm25} μg/m³`} icon="🔬" />
        <DashboardCard title="PM10" value={`${data.pm10} μg/m³`} icon="🔍" />
        <DashboardCard title="Status" value={data.status} icon="📊" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">AQI Trend (7 Days)</h2>
          <ChartWidget data={data.chartData} options={{responsive: true}} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Pollution Hotspots Map</h2>
          <MapWidget coordinates={data.mapCenter} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">AQI Guidelines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-semibold text-green-700">Good (0-50)</h3>
            <p className="text-sm text-gray-600">Air quality is satisfactory</p>
          </div>
          <div className="border-l-4 border-yellow-500 pl-4">
            <h3 className="font-semibold text-yellow-700">Moderate (51-100)</h3>
            <p className="text-sm text-gray-600">Acceptable for most people</p>
          </div>
          <div className="border-l-4 border-orange-500 pl-4">
            <h3 className="font-semibold text-orange-700">Unhealthy (101-150)</h3>
            <p className="text-sm text-gray-600">Sensitive groups may be affected</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PollutionDashboard;
