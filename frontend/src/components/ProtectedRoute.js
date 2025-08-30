import React from 'react';
import authService from '../services/authService';

function ProtectedRoute({ children, requiredRole = null }) {
  if (!authService.isAuthenticated()) {
    return (
      <div className="main-content">
        <div className="form-container">
          <h2>Access Denied</h2>
          <p>Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredRole && !authService.hasRole(requiredRole)) {
    return (
      <div className="main-content">
        <div className="form-container">
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;