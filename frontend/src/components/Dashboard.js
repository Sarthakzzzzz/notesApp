import React from 'react';

function Dashboard({ user, onCreateNote }) {
  return (
    <div className="app-content">
      <div className="dashboard-welcome">
        <div className="welcome-icon">📝</div>
        <h1 className="welcome-title">
          Welcome, {user.username}!
        </h1>
        <p className="welcome-subtitle">
          Ready to capture your thoughts and ideas? Create your first note and start organizing your digital life.
        </p>
        <button 
          className="btn btn-primary btn-lg animate-glow"
          onClick={onCreateNote}
        >
          <span>✨</span>
          Create Your First Note
        </button>
      </div>

      <div className="feature-grid">
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3 className="feature-title">Secure & Private</h3>
          <p className="feature-description">Your notes are encrypted and stored securely with JWT authentication.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3 className="feature-title">Lightning Fast</h3>
          <p className="feature-description">Built with React and Spring Boot for optimal performance.</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📱</div>
          <h3 className="feature-title">Responsive Design</h3>
          <p className="feature-description">Access your notes from any device, anywhere, anytime.</p>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h3 className="card-title">🚀 Getting Started</h3>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '2rem', height: '2rem', background: 'var(--primary-500)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>1</div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>Create Notes</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>Click the "Create Note" button to add your first note</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '2rem', height: '2rem', background: 'var(--primary-500)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>2</div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>Organize</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>Use search and sort features to keep your notes organized</p>
                </div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ width: '2rem', height: '2rem', background: 'var(--primary-500)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>3</div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>Edit & Update</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>Click on any note to edit it instantly</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                <div style={{ width: '2rem', height: '2rem', background: 'var(--primary-500)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>4</div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600', marginBottom: '0.5rem' }}>Stay Synced</h4>
                  <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>Your notes are automatically saved and synced</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;