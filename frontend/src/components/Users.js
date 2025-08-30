import React, { useState, useEffect } from "react";
import { userAPI } from "../services/api";

function Users({ user }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchUsers();
    }
  }, [user]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await userAPI.getAllUsers();
      setUsers(response.data);
      console.log('Users fetched:', response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      alert(`Error fetching users: ${error.response?.status} ${error.response?.statusText}`);
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="section-title">All Users ({users.length})</h1>
          <p className="section-subtitle">Manage system users</p>
        </div>
        <button 
          className="btn btn-primary" 
          onClick={fetchUsers} 
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Refresh'}
        </button>
      </div>
      
      {loading ? (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <p>Loading users...</p>
        </div>
      ) : (
        <div className="data-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>#{u.id}</td>
                  <td><strong>{u.username}</strong></td>
                  <td>{u.email}</td>
                  <td>
                    <span className={`role-badge ${u.role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="btn btn-danger btn-sm">
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Users;