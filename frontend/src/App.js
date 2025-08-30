import React, { useState, useEffect } from "react";
import Noteslist from "./components/Noteslist";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import AdminPanel from "./components/AdminPanel";
import Users from "./components/Users";
import SystemStatus from "./components/SystemStatus";
import Settings from "./components/Settings";
import { useTheme } from "./contexts/ThemeContext";
import authService from "./services/authService";

function App() {
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('login');
  const [activeTab, setActiveTab] = useState('notes');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser && authService.isAuthenticated()) {
      setUser(currentUser);
      setCurrentView('dashboard');
    } else {
      setUser(null);
      setCurrentView('login');
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setCurrentView('login');
    setActiveTab('notes');
  };

  const handleProfileUpdate = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("username", updatedData.username);
    localStorage.setItem("email", updatedData.email);
  };

  const renderDashboard = () => {
    switch (activeTab) {
      case 'notes':
        return <Noteslist user={user} />;
      case 'profile':
        return <UserProfile user={user} onProfileUpdate={handleProfileUpdate} onLogout={handleLogout} />;
      case 'admin':
        return user?.role === 'ADMIN' ? <AdminPanel user={user} onNavigate={setActiveTab} /> : <div className="access-denied">Access denied</div>;
      case 'users':
        return user?.role === 'ADMIN' ? <Users user={user} /> : <div className="access-denied">Access denied</div>;
      case 'status':
        return user?.role === 'ADMIN' ? <SystemStatus user={user} /> : <div className="access-denied">Access denied</div>;
      case 'settings':
        return user?.role === 'ADMIN' ? <Settings user={user} /> : <div className="access-denied">Access denied</div>;
      default:
        return <Noteslist user={user} />;
    }
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading NotesApp...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Animated Background */}
      <div className="app-background">
        <div className="bg-shape bg-shape-1"></div>
        <div className="bg-shape bg-shape-2"></div>
        <div className="bg-shape bg-shape-3"></div>
      </div>

      {user && (
        <header className="app-header">
          <div className="header-container">
            <div className="header-brand">
              <div className="brand-icon">📝</div>
              <h1 className="brand-title">NotesApp</h1>
            </div>
            <div className="header-user">
              <div className="user-info">
                <span className="user-name">Welcome, {user.username}!</span>
                <span className={`role-badge ${user.role === 'ADMIN' ? 'role-admin' : 'role-user'}`}>
                  {user.role}
                </span>
              </div>
              <button 
                onClick={toggleTheme} 
                className="btn btn-secondary btn-sm"
                style={{ marginRight: '0.5rem' }}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button onClick={handleLogout} className="btn btn-danger btn-sm">
                <span>🚪</span>
                Logout
              </button>
            </div>
          </div>
        </header>
      )}
      
      {!user ? (
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <div className="auth-icon">
                {currentView === 'login' ? '🔐' : '🚀'}
              </div>
              <h2 className="auth-title">
                {currentView === 'login' ? 'Welcome Back' : 'Join NotesApp'}
              </h2>
              <p className="auth-subtitle">
                {currentView === 'login' 
                  ? 'Sign in to your account' 
                  : 'Create your account to get started'
                }
              </p>
            </div>
            
            {currentView === 'login' ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Register />
            )}
            
            <div className="auth-footer">
              <p className="auth-switch-text">
                {currentView === 'login' 
                  ? "Don't have an account?" 
                  : "Already have an account?"
                }
              </p>
              <button 
                onClick={() => setCurrentView(currentView === 'login' ? 'register' : 'login')} 
                className="btn btn-ghost btn-sm"
              >
                {currentView === 'login' ? 'Create Account' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="app-main">
          <nav className="app-nav">
            <div className="nav-container">
              <div className="nav-tabs">
                <button 
                  className={`nav-tab ${activeTab === 'notes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('notes')}
                >
                  <span className="nav-tab-icon">📝</span>
                  <span className="nav-tab-text">My Notes</span>
                </button>
                <button 
                  className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  <span className="nav-tab-icon">👤</span>
                  <span className="nav-tab-text">Profile</span>
                </button>
                {user.role === 'ADMIN' && (
                  <>
                    <button 
                      className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`}
                      onClick={() => setActiveTab('admin')}
                    >
                      <span className="nav-tab-icon">🛠️</span>
                      <span className="nav-tab-text">Admin Panel</span>
                    </button>
                    <button 
                      className={`nav-tab ${activeTab === 'users' ? 'active' : ''}`}
                      onClick={() => setActiveTab('users')}
                    >
                      <span className="nav-tab-icon">👥</span>
                      <span className="nav-tab-text">Users</span>
                    </button>
                    <button 
                      className={`nav-tab ${activeTab === 'status' ? 'active' : ''}`}
                      onClick={() => setActiveTab('status')}
                    >
                      <span className="nav-tab-icon">📊</span>
                      <span className="nav-tab-text">Status</span>
                    </button>
                    <button 
                      className={`nav-tab ${activeTab === 'settings' ? 'active' : ''}`}
                      onClick={() => setActiveTab('settings')}
                    >
                      <span className="nav-tab-icon">⚙️</span>
                      <span className="nav-tab-text">Settings</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          </nav>
          
          <main className="app-content">
            {renderDashboard()}
          </main>
        </div>
      )}
    </div>
  );
}

export default App;