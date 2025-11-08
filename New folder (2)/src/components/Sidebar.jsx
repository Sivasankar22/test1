import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/traffic', label: 'Traffic', icon: '🚦' },
    { path: '/power', label: 'Power', icon: '⚡' },
    { path: '/pollution', label: 'Pollution', icon: '🌫️' },
    { path: '/safety', label: 'Safety', icon: '🚨' },
    { path: '/admin', label: 'Admin', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">Urban Ops</h1>
        <p className="text-sm text-gray-400">Command Center</p>
      </div>
      
      <nav className="flex-1">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'hover:bg-gray-700 text-gray-300'
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500 text-center">
          © 2025 Urban Operations
        </p>
      </div>
    </aside>
  );
}

export default Sidebar;
