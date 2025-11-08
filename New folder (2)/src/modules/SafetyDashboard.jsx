import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import ChartWidget from '../components/ChartWidget';
import MapWidget from '../components/MapWidget';
import { fetchData } from '../api/api';

function SafetyDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSafetyData();
  }, []);

  const loadSafetyData = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await fetchData(`${process.env.REACT_APP_API_URL}/safety`, token);
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error('Error loading safety data:', error);
      // Mock data for demo
      setData({
        totalIncidents: 12,
        activeAlerts: 3,
        emergencyResponse: '4 min',
        crimesReported: 8,
        chartData: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Incidents',
            data: [15, 12, 18, 10, 14, 12],
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
            borderColor: 'rgb(239, 68, 68)',
            borderWidth: 2,
          }],
        },
        recentIncidents: [
          { id: 1, type: 'Accident', location: 'MG Road', time: '10 min ago', status: 'Active' },
          { id: 2, type: 'Fire', location: 'Sector 5', time: '25 min ago', status: 'Resolved' },
          { id: 3, type: 'Medical Emergency', location: 'Park Street', time: '1 hour ago', status: 'Active' },
        ],
        mapCenter: [77.5946, 12.9716],
      });
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800';
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">🚨 Safety & Emergency Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Incidents" value={data.totalIncidents} icon="📋" />
        <DashboardCard title="Active Alerts" value={data.activeAlerts} icon="🚨" />
        <DashboardCard title="Avg Response Time" value={data.emergencyResponse} icon="⏱️" />
        <DashboardCard title="Crimes Reported" value={data.crimesReported} icon="⚠️" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Incident Trend</h2>
          <ChartWidget data={data.chartData} options={{responsive: true}} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Incident Map</h2>
          <MapWidget coordinates={data.mapCenter} />
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Recent Incidents</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Location</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.recentIncidents.map((incident) => (
                <tr key={incident.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{incident.type}</td>
                  <td className="p-3">{incident.location}</td>
                  <td className="p-3">{incident.time}</td>
                  <td className="p-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(incident.status)}`}>
                      {incident.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SafetyDashboard;
