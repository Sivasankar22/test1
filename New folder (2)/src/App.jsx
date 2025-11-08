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
      setIsAuthenticated(!!localStorage.
