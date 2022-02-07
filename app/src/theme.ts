import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#230B00',
    },
    secondary: {
      main: '#AABE9B',
    },
  },
});

declare module '@mui/material/styles' {
  interface Palette {
    main: Palette['primary'];
  }

  interface PaletteOptions {
    main?: PaletteOptions['primary'];
  }
}

export default responsiveFontSizes(theme);
