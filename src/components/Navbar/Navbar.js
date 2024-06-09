import React from 'react';
import { Typography, Container } from '@mui/material';

const Root = {
  flexGrow: 1,
  // marginTop: "30px",
  // padding: '16px', // You can set your own padding here
  // backgroundColor: '#1a1a1a', // Default background color
};

const Title = {
  flexGrow: 1,
  marginTop: "30px",
  marginLeft: "-8px",
  fontWeight: 800,
  fontSize: "32px",
  marginBottom: "1px",
  color: '#fff', // Text color
};

const Navbar = () => {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Buenos días';
    } else if (currentHour < 18) {
      return 'Buenas tardes';
    } else {
      return 'Buenas noches';
    }
  };

  return (
    <div style={Root}>
      <Container>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <Typography variant="h6" style={Title}>
            {getGreeting()}
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
