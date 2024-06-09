import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';

import Tendencias from './Tendencias';
import BoxContent from '../components/General/BoxContent';
import RecipeList from '../components/CardsLists/RecipeList';

import MorningIcon from '@mui/icons-material/WbSunny';
import AfternoonIcon from '@mui/icons-material/Brightness7';
import EveningIcon from '@mui/icons-material/NightsStay';
import NewspaperIcon from '@mui/icons-material/Newspaper';

function Home() {
  const [greeting, setGreeting] = useState('');
  const [greetingIcon, setGreetingIcon] = useState(null);

  useEffect(() => {
    // Obtener la hora actual
    const currentHour = new Date().getHours();
    // Determinar el saludo y el icono según la hora
    if (currentHour >= 6 && currentHour < 12) {
      setGreeting('Buenos días');
      setGreetingIcon(<MorningIcon style={{ marginRight: "10px", fontSize: "16px" }} />);
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreeting('Buenas tardes');
      setGreetingIcon(<AfternoonIcon style={{ marginRight: "10px", fontSize: "16px" }} />);
    } else {
      setGreeting('Buenas noches');
      setGreetingIcon(<EveningIcon style={{ marginRight: "10px", fontSize: "16px" }} />);
    }
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <Tendencias />
      <BoxContent>
        <Typography style={{
          fontWeight: 700,
          fontSize: "16px",
          marginBottom: "10px",
          marginTop: "5px"
        }} variant="h4" gutterBottom>
          {greetingIcon} {greeting}
        </Typography>
        <Typography style={{
          fontWeight: 700
        }} variant="h4" gutterBottom>
          <NewspaperIcon style={{ marginRight: "10px", fontSize: "24px" }} />Noticias
        </Typography>

        <RecipeList />

      </BoxContent>
    </div>
  );
}

export default Home;
