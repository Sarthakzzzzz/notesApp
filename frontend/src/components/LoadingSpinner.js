import React from 'react';

function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '3rem',
      color: 'rgba(255,255,255,0.8)'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid rgba(255,255,255,0.3)',
        borderTop: '4px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        marginBottom: '1rem'
      }}></div>
      <p style={{ fontSize: '1.1rem' }}>{message}</p>
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default LoadingSpinner;