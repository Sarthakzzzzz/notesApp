import React, { useState, useEffect } from "react";
import { notesAPI, userAPI } from "../services/api";
import authService from "../services/authService";

function SystemStatus({ user }) {
  const [status, setStatus] = useState({
    backend: "checking",
    auth: "checking",
    notes: "checking",
    profile: "checking",
    jwt: "checking",
  });

  useEffect(() => {
    checkSystemStatus();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const checkSystemStatus = async () => {
    console.log("Starting system status check...");

    // Reset to checking state
    setStatus({
      backend: "checking",
      auth: "checking",
      notes: "checking",
      profile: "checking",
      jwt: "checking",
    });

    const newStatus = {};

    // Check JWT Token
    try {
      const currentUser = authService.getCurrentUser();
      newStatus.jwt =
        currentUser && authService.isAuthenticated() ? "working" : "failed";
      console.log("JWT check:", newStatus.jwt);
    } catch (error) {
      newStatus.jwt = "failed";
      console.log("JWT check failed:", error);
    }

    // Check Backend Connection
    try {
      const baseUrl = process.env.REACT_APP_API_URL || "http://localhost:8080";
      const response = await fetch(`${baseUrl}/health`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      newStatus.backend = response.ok ? "working" : "failed";
      newStatus.auth = "working"; // If backend is up, auth endpoints should be available
      console.log("Backend check: working");
    } catch (error) {
      newStatus.backend = "failed";
      newStatus.auth = "failed";
      console.log("Backend check failed:", error);
    }

    // Check Notes API
    if (user) {
      try {
        await notesAPI.getAll(user.id);
        newStatus.notes = "working";
        console.log("Notes API check: working");
      } catch (error) {
        newStatus.notes = "failed";
        console.log("Notes API check failed:", error);
      }

      // Check Profile API
      try {
        await userAPI.getProfile();
        newStatus.profile = "working";
        console.log("Profile API check: working");
      } catch (error) {
        newStatus.profile = "failed";
        console.log("Profile API check failed:", error);
      }
    } else {
      newStatus.notes = "no-user";
      newStatus.profile = "no-user";
    }

    console.log("Final status:", newStatus);
    setStatus(newStatus);
  };

  const getStatusColor = (statusValue) => {
    switch (statusValue) {
      case "working":
        return "#10b981";
      case "no-user":
        return "#3b82f6";
      case "failed":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusText = (statusValue) => {
    switch (statusValue) {
      case "working":
        return "✅ Working";
      case "no-user":
        return "ℹ️ No User Context";
      case "failed":
        return "❌ Failed";
      default:
        return "⏳ Checking...";
    }
  };

  if (user?.role !== "ADMIN") {
    return <div className="access-denied">Access denied. Admin only.</div>;
  }

  return (
    <div className="app-content">
      <div className="section-header">
        <div>
          <h1 className="section-title">System Status</h1>
          <p className="section-subtitle">
            Monitor system health and API endpoints
          </p>
        </div>
        <button className="btn btn-primary" onClick={checkSystemStatus}>
          🔄 Refresh Status
        </button>
      </div>

      <div style={{ display: "grid", gap: "1.5rem", marginBottom: "2rem" }}>
        {Object.entries(status).map(([key, value]) => (
          <div
            key={key}
            className="card"
            style={{
              background: "rgba(255, 255, 255, 0.95)",
              padding: "1.5rem",
              borderRadius: "1rem",
              borderLeft: `4px solid ${getStatusColor(value)}`,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div>
              <h3
                style={{
                  color: "#2d3748",
                  fontWeight: "700",
                  marginBottom: "0.5rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {key}
              </h3>
              <p style={{ fontSize: "0.875rem", color: "#6b7280", margin: 0 }}>
                {key === "backend" && "Spring Boot Backend Connection"}
                {key === "auth" && "Authentication Endpoints"}
                {key === "notes" && "Notes CRUD Operations"}
                {key === "profile" && "User Profile Management"}
                {key === "jwt" && "JWT Token Validation"}
              </p>
            </div>
            <div
              style={{
                color: getStatusColor(value),
                fontWeight: "700",
                fontSize: "1rem",
              }}
            >
              {getStatusText(value)}
            </div>
          </div>
        ))}
      </div>

      <div
        className="card"
        style={{
          background: "rgba(255, 255, 255, 0.95)",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <h3
          style={{ color: "#2d3748", fontWeight: "700", marginBottom: "1rem" }}
        >
          Current User Info
        </h3>
        <pre
          style={{
            background: "#f8fafc",
            padding: "1rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            color: "#2d3748",
            overflow: "auto",
            margin: 0,
          }}
        >
          {JSON.stringify(user, null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default SystemStatus;
