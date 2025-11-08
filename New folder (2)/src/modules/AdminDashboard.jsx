import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import { fetchData } from '../api/api';

function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadAdminData();
  }, []);

  const loadAdminData = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await fetchData(`${process.env.REACT_APP_API_URL}/admin`, token);
      setData(result);
      setUsers(result.users || []);
      setLoading(false);
    } catch (error) {
      console.error('Error loading admin data:', error);
      // Mock data for demo
      setData({
        totalUsers: 245,
        activeUsers: 189,
        departments: 12,
        systemStatus: 'Operational',
      });
      setUsers([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Department Head', status: 'Active' },
        { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Inactive' },
        { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active' },
      ]);
      setLoading(false);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-800';
      case 'Department Head': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Active' ? 'text-green-600' : 'text-gray-400';
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
      <h1 className="text-3xl font-bold mb-6 text-gray-800">⚙️ Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard title="Total Users" value={data.totalUsers} icon="👥" />
        <DashboardCard title="Active Users" value={data.activeUsers} icon="✅" />
        <DashboardCard title="Departments"
