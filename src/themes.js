import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Color primario
    },
    secondary: {
      main: '#f48fb1', // Color secundario
    },
    background: {
      default: '#121212', // Color de fondo predeterminado
      paper: '#333', // Color de fondo del papel
    },
    text: {
      primary: '#fff', // Color del texto primario
      secondary: '#ccc', // Color del texto secundario
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Fuente de texto predeterminada
  },
});
