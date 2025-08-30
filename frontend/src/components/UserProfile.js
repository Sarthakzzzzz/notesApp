import React, { useState } from "react";
import { userAPI } from "../services/api";

function UserProfile({ user, onProfileUpdate, onLogout }) {
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updateData = {
        username: formData.username,
        email: formData.email
      };
      if (formData.password) {
        updateData.password = formData.password;
      }
      
      await userAPI.updateProfile(updateData);
      onProfileUpdate(updateData);
      setMessage("Profile updated successfully!");
      setFormData({ ...formData, password: "" });
    } catch (error) {
      setMessage("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      try {
        await userAPI.deleteProfile();
        onLogout();
      } catch (error) {
        setMessage("Failed to delete account.");
      }
    }
  };

  return (
    <div className="app-content">
      <div className="form-container">
        <div className="auth-header">
          <div className="auth-icon">👤</div>
          <h1 className="auth-title">Profile Settings</h1>
          <p className="auth-subtitle">Manage your account information</p>
        </div>

        {message && (
          <div className={`form-message ${
            message.includes('successfully') 
              ? 'form-message-success' 
              : 'form-message-error'
          }`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">New Password (leave blank to keep current)</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Role</label>
            <div className="form-control" style={{ background: 'var(--gray-100)', cursor: 'not-allowed' }}>
              <span className={`role-badge ${user.role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
                {user.role}
              </span>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
            <button 
              type="submit" 
              className={`btn btn-primary flex-1 ${loading ? 'btn-loading' : ''}`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Profile"}
            </button>
            <button 
              type="button" 
              className="btn btn-danger"
              onClick={handleDeleteAccount}
            >
              Delete Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;