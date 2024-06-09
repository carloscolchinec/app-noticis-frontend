import React from 'react';
import { Typography, Box } from '@mui/material';
import { darkTheme } from '../../themes';


function BoxContent({ children }) {
  return (
    <div style={{
      position: 'absolute',
      top: 195,
      left: 0,
      right: 0,
      margin: '0 0px',
      borderRadius: "20px 20px 0px 0px",
      background: darkTheme.palette.background.default,
      minHeight: '100vh', // Ajusta la altura mínima según necesites
      zIndex: 999,
      padding: '20px',
      color: '#fff',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {children}
    </div>
  );
}

export default BoxContent;
