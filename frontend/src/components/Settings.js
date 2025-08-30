import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

function Settings({ user }) {
  const { theme, setTheme } = useTheme();
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    language: 'en',
    timezone: 'UTC',
    maxNotes: 1000,
    sessionTimeout: 30
  });

  const [message, setMessage] = useState('');

  const handleChange = (key, value) => {
    if (key === 'theme') {
      setTheme(value);
    } else {
      setSettings(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  const handleSave = () => {
    // Simulate saving settings
    setMessage('Settings saved successfully!');
    setTimeout(() => setMessage(''), 3000);
    console.log('Settings saved:', settings);
  };

  const handleReset = () => {
    setTheme('dark');
    setSettings({
      notifications: true,
      autoSave: true,
      language: 'en',
      timezone: 'UTC',
      maxNotes: 1000,
      sessionTimeout: 30
    });
    setMessage('Settings reset to defaults');
    setTimeout(() => setMessage(''), 3000);
  };

  if (user?.role !== 'ADMIN') {
    return <div className="access-denied">Access denied. Admin only.</div>;
  }

  return (
    <div className="app-content">
      <div className="section-header">
        <div>
          <h1 className="section-title">System Settings</h1>
          <p className="section-subtitle">Configure application settings and preferences</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-secondary" onClick={handleReset}>
            🔄 Reset
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            💾 Save Settings
          </button>
        </div>
      </div>

      {message && (
        <div className={`form-message ${
          message.includes('successfully') ? 'form-message-success' : 'form-message-info'
        }`} style={{ marginBottom: '2rem' }}>
          {message}
        </div>
      )}

      <div style={{ display: 'grid', gap: '2rem' }}>
        {/* Appearance Settings */}
        <div className="card" style={{ background: 'rgba(255, 255, 255, 0.95)', padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ color: '#2d3748', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🎨 Appearance
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>
                Theme
              </label>
              <select 
                value={theme}
                onChange={(e) => handleChange('theme', e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  background: 'white',
                  color: '#2d3748',
                  width: '200px'
                }}
              >
                <option value="light">☀️ Light</option>
                <option value="dark">🌙 Dark</option>
                <option value="auto">🔄 Auto</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>
                Language
              </label>
              <select 
                value={settings.language}
                onChange={(e) => handleChange('language', e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  background: 'white',
                  color: '#2d3748',
                  width: '200px'
                }}
              >
                <option value="en">🇺🇸 English</option>
                <option value="es">🇪🇸 Spanish</option>
                <option value="fr">🇫🇷 French</option>
                <option value="de">🇩🇪 German</option>
              </select>
            </div>
          </div>
        </div>

        {/* System Settings */}
        <div className="card" style={{ background: 'rgba(255, 255, 255, 0.95)', padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ color: '#2d3748', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚙️ System
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <label style={{ fontWeight: '600', color: '#4a5568' }}>Auto Save</label>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Automatically save notes while typing</p>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '3rem', height: '1.5rem' }}>
                <input
                  type="checkbox"
                  checked={settings.autoSave}
                  onChange={(e) => handleChange('autoSave', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings.autoSave ? '#10b981' : '#d1d5db',
                  borderRadius: '1.5rem',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '1.25rem',
                    width: '1.25rem',
                    left: settings.autoSave ? '1.625rem' : '0.125rem',
                    bottom: '0.125rem',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s'
                  }}></span>
                </span>
              </label>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <label style={{ fontWeight: '600', color: '#4a5568' }}>Notifications</label>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Enable system notifications</p>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '3rem', height: '1.5rem' }}>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => handleChange('notifications', e.target.checked)}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute',
                  cursor: 'pointer',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: settings.notifications ? '#10b981' : '#d1d5db',
                  borderRadius: '1.5rem',
                  transition: '0.3s'
                }}>
                  <span style={{
                    position: 'absolute',
                    content: '',
                    height: '1.25rem',
                    width: '1.25rem',
                    left: settings.notifications ? '1.625rem' : '0.125rem',
                    bottom: '0.125rem',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    transition: '0.3s'
                  }}></span>
                </span>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>
                Session Timeout (minutes)
              </label>
              <input
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => handleChange('sessionTimeout', parseInt(e.target.value))}
                min="5"
                max="120"
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  background: 'white',
                  color: '#2d3748',
                  width: '150px'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>
                Maximum Notes per User
              </label>
              <input
                type="number"
                value={settings.maxNotes}
                onChange={(e) => handleChange('maxNotes', parseInt(e.target.value))}
                min="100"
                max="10000"
                step="100"
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  background: 'white',
                  color: '#2d3748',
                  width: '150px'
                }}
              />
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card" style={{ background: 'rgba(255, 255, 255, 0.95)', padding: '2rem', borderRadius: '1rem' }}>
          <h3 style={{ color: '#2d3748', fontWeight: '700', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🔒 Security
          </h3>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', color: '#4a5568', marginBottom: '0.5rem' }}>
                Timezone
              </label>
              <select 
                value={settings.timezone}
                onChange={(e) => handleChange('timezone', e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '2px solid #e2e8f0',
                  borderRadius: '0.5rem',
                  background: 'white',
                  color: '#2d3748',
                  width: '200px'
                }}
              >
                <option value="UTC">🌍 UTC</option>
                <option value="EST">🇺🇸 Eastern</option>
                <option value="PST">🇺🇸 Pacific</option>
                <option value="GMT">🇬🇧 GMT</option>
              </select>
            </div>
            
            <div style={{ padding: '1rem', background: '#fef3c7', borderRadius: '0.5rem', border: '1px solid #f59e0b' }}>
              <p style={{ color: '#92400e', fontSize: '0.875rem', margin: 0 }}>
                ⚠️ Security settings require server restart to take effect.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;