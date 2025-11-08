import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import ChartWidget from '../components/ChartWidget';
import { fetchData } from '../api/api';

function PowerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPowerData();
  }, []);

  const loadPowerData = async () => {
    try {
      const token = localStorage.getItem('token');
      const result = await fetchData
