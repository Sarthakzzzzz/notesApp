import React, { useState } from "react";
import authService from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    role: "USER"
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

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
      await authService.register(formData);
      setMessage("Registration successful! You can now login.");
      setFormData({ username: "", password: "", role: "USER", email: "" });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {message && (
        <div className={`form-message ${
          message.includes('successful') 
            ? 'form-message-success' 
            : 'form-message-error'
        }`}>
          {message}
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
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="form-label">Role</label>
        <select
          name="role"
          className="form-control"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
      </div>
      
      <button 
        type="submit" 
        className={`btn btn-success w-full ${loading ? 'btn-loading' : ''}`}
        disabled={loading}
      >
        {loading ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}

export default Register;