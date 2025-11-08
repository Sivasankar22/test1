import React, { useEffect, useState } from 'react';
import { fetchData } from '../api/api';

function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
    // Poll for new notifications every 10 seconds
    const interval = setInterval(loadNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await fetchData(`${process.env.REACT_APP_API_URL}/notifications`, token);
      setNotifications(data.slice(0, 5)); // Show latest 5
      setLoading(false);
    } catch (error) {
      console.error('Error loading notifications:', error);
      // Use mock data for demo
      setNotifications([
        { id: 1, type: 'warning', message: 'High traffic detected on Main Street', time: '2 min ago' },
        { id: 2, type: 'danger', message: 'Power outage reported in Sector 5', time: '5 min ago' },
        { id: 3, type: 'info', message: 'Pollution levels normal', time: '10 min ago' },
      ]);
      setLoading(false);
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'danger': return 'bg-red-100 border-red-500 text-red-800';
      case 'warning': return 'bg-yellow-100 border-yellow-500 text-yellow-800';
      case 'success': return 'bg-green-100 border-green-500 text-green-800';
      default: return 'bg-blue-100 border-blue-500 text-blue-800';
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-bold mb-4">Notifications</h3>
        <div className="animate-pulse space-y-3">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">🔔 Notifications</h3>
        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {notifications.length}
        </span>
      </div>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No new notifications</p>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className={`border-l-4 p-3 rounded ${getNotificationColor(notif.type)}`}
            >
              <p className="text-sm font-medium">{notif.message}</p>
              <p className="text-xs mt-1 opacity-75">{notif.time}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationPanel;
