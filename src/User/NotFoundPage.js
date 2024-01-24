import React from 'react';

const NotFoundPage = () => {
  return (
    <div style={{
      background: 'transparent linear-gradient(to right, #005d1f 0%, #277816 50%, #005d1f 100%) 0% 0% no-repeat padding-box',
      height: '100vh',
      color: '#fff',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <h1 style={{ fontSize: '5rem' }}>404</h1>
      <p style={{ fontSize: '2rem' }}>Oops! Page not found.</p>
      <p style={{ fontSize: '1.5rem' }}>The page you're looking for doesn't seem to exist.</p>
    </div>
  );
};

export default NotFoundPage;
