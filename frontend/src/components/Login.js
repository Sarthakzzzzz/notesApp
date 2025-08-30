import React, { useState } from "react";
import authService from "../services/authService";

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = await authService.login(formData);
      onLogin(userData);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      {error && (
        <div className="form-message form-message-error">
          {error}
        </div>
      )}
      
      <div className="form-group">
        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          className="form-control"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
        />
      </div>
      
      <button 
        type="submit" 
        className={`btn btn-primary w-full ${loading ? 'btn-loading' : ''}`}
        disabled={loading}
      >
        {loading ? "Signing In..." : "Sign In"}
      </button>
    </form>
  );
}

export default Login;