
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import UserManagement from './pages/UserManagement';
import DonationManagement from './pages/DonationManagement';
import CampaignManagement from './pages/CampaignManagement';
import VolunteerManagement from './pages/VolunteerManagement';
import CMSManagement from './pages/CMSManagement';
import { useAuth } from '../context/AuthContext';

// Protected Admin Route Component
const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-[#060403]">
        <div className="w-12 h-12 border-2 border-gold/20 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!profile || profile.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AdminApp: React.FC = () => {
  return (
    <Routes>
      {/* Sub-routes wrapped in Layout and ProtectedRoute */}
      <Route
        element={
          <ProtectedAdminRoute>
            <AdminLayout />
          </ProtectedAdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        
        {/* Database Management Routes */}
        <Route path="users" element={<UserManagement />} />
        <Route path="donations" element={<DonationManagement />} />
        <Route path="campaigns" element={<CampaignManagement />} />
        <Route path="volunteers" element={<VolunteerManagement />} />
        <Route path="cms" element={<CMSManagement />} />
        
        {/* Placeholders for remaining modules */}
        <Route path="media" element={<div className="p-8"><h2 className="text-3xl font-serif text-gold underline">Media Library</h2><p className="mt-4 text-beige/40">Enterprise digital asset management. Cloud storage & CDN integration active.</p></div>} />
        <Route path="translations" element={<div className="p-8"><h2 className="text-3xl font-serif text-gold underline">Multilingual control</h2><p className="mt-4 text-beige/40">Manage global sangha translations. Centralized language registry.</p></div>} />
        <Route path="settings" element={<div className="p-8"><h2 className="text-3xl font-serif text-gold underline">Website Control</h2><p className="mt-4 text-beige/40">Themes, banners, and notification settings. Advanced customization portal.</p></div>} />
        
        {/* Fallback to Dashboard */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
};

export default AdminApp;
