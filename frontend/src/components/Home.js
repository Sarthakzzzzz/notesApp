import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

function Home({ onNavigate }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="home-page">
      {/* Navigation Header */}
      <nav className="home-nav">
        <div className="nav-container">
          <div className="nav-brand">
            <span className="brand-icon">📝</span>
            <span className="brand-name">NotesApp</span>
          </div>
          <div className="nav-actions">
            <button onClick={toggleTheme} className="theme-toggle">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button onClick={() => onNavigate('login')} className="nav-btn">
              Sign In
            </button>
            <button onClick={() => onNavigate('register')} className="nav-btn nav-btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Your Ideas, <span className="highlight">Organized</span>
            </h1>
            <p className="hero-description">
              Capture thoughts, organize ideas, and never lose track of what matters. 
              The simple, secure way to manage your digital notes.
            </p>
            <div className="hero-buttons">
              <button 
                onClick={() => onNavigate('register')} 
                className="btn-hero btn-hero-primary"
              >
                Start Writing for Free
              </button>
              <button 
                onClick={() => onNavigate('login')} 
                className="btn-hero btn-hero-secondary"
              >
                Sign In
              </button>
            </div>
            <p className="hero-note">✨ No credit card required • Free forever</p>
          </div>
          <div className="hero-visual">
            <div className="demo-card">
              <div className="demo-header">
                <div className="demo-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>
              <div className="demo-content">
                <div className="demo-note">
                  <h4>📚 Meeting Notes</h4>
                  <p>Discussed project timeline and deliverables...</p>
                </div>
                <div className="demo-note">
                  <h4>💡 Ideas</h4>
                  <p>New feature concepts for the mobile app...</p>
                </div>
                <div className="demo-note">
                  <h4>📝 To-Do</h4>
                  <p>Review code, update documentation...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Everything you need to stay organized</h2>
            <p>Powerful features designed for modern productivity</p>
          </div>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Private</h3>
              <p>End-to-end encryption keeps your notes safe and private</p>
            </div>
            <div className="feature">
              <div className="feature-icon">⚡</div>
              <h3>Lightning Fast</h3>
              <p>Instant sync across all your devices with real-time updates</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🔍</div>
              <h3>Smart Search</h3>
              <p>Find any note instantly with powerful search and filters</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Works Everywhere</h3>
              <p>Access your notes on desktop, tablet, and mobile devices</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🎨</div>
              <h3>Beautiful Design</h3>
              <p>Clean interface with dark and light themes</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👥</div>
              <h3>Team Ready</h3>
              <p>Admin tools for managing teams and organizations</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to get organized?</h2>
            <p>Join thousands of users who trust NotesApp with their ideas</p>
            <button 
              onClick={() => onNavigate('register')} 
              className="btn-cta"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <span className="brand-icon">📝</span>
              <span className="brand-name">NotesApp</span>
            </div>
            <p className="footer-text">
              © 2025 NotesApp. Built with React & Spring Boot.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;