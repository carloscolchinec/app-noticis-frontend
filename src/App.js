import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

import RoutesConf from './RoutesConfig';

import { darkTheme } from './themes';

const Root = styled('div')({
  flexGrow: 1,
  backgroundColor: darkTheme.palette.background.default,
  minHeight: '100vh',
  position: 'relative',
});

const SpinnerContainer = styled('div')({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
});

const AppContent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Root>
      {loading ? (
        <SpinnerContainer>
          <CircularProgress />
        </SpinnerContainer>
      ) : (
        <RoutesConf />
      )}
    </Root>
  );
};

function App() {
  return (
    <div>
      <AppContent />
    </div>
  );
}

export default App;
