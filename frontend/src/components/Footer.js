import React from 'react';

function Footer() {
  return (
    <footer style={{
      background: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)',
      padding: '2rem',
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.8)',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
          📝 <strong>NotesApp</strong> - Your thoughts, organized beautifully
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <span>🔒 Secure & Private</span>
          <span>☁️ Cloud Synced</span>
          <span>📱 Responsive Design</span>
          <span>⚡ Lightning Fast</span>
        </div>
        <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
          © 2025 NotesApp. Built with Spring Boot & React. Made with ❤️
        </p>
      </div>
    </footer>
  );
}

export default Footer;
