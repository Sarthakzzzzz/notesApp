import React from "react";

function AdminPanel({ user, onNavigate }) {
  if (user?.role !== 'ADMIN') {
    return (
      <div className="access-denied">
        Access denied. Admin only.
      </div>
    );
  }

  return (
    <div className="app-content">
      <div className="section-header">
        <div>
          <h1 className="section-title">Admin Panel</h1>
          <p className="section-subtitle">System administration and management</p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stats-card">
          <span className="stats-number">1</span>
          <span className="stats-label">Total Users</span>
        </div>
        
        <div className="stats-card">
          <span className="stats-number">0</span>
          <span className="stats-label">Total Notes</span>
        </div>
        
        <div className="stats-card">
          <span className="stats-number">100%</span>
          <span className="stats-label">System Health</span>
        </div>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3 className="feature-title">User Management</h3>
          <p className="feature-description">View and manage all system users, roles, and permissions.</p>
          <button 
            className="btn btn-primary btn-sm" 
            style={{ marginTop: '1rem' }}
            onClick={() => onNavigate('users')}
          >
            Manage Users
          </button>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3 className="feature-title">System Status</h3>
          <p className="feature-description">Monitor system health, performance, and API endpoints.</p>
          <button 
            className="btn btn-primary btn-sm" 
            style={{ marginTop: '1rem' }}
            onClick={() => onNavigate('status')}
          >
            View Status
          </button>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🔧</div>
          <h3 className="feature-title">System Settings</h3>
          <p className="feature-description">Configure system settings, security, and maintenance.</p>
          <button 
            className="btn btn-primary btn-sm" 
            style={{ marginTop: '1rem' }}
            onClick={() => onNavigate('settings')}
          >
            Settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;