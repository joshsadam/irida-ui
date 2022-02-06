import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      dark: '#FA6900',
      main: '#F38630',
      light: '#E0E4CC',
    },
    secondary: {
      main: '#A7DBD8',
      light: '#69D2E7',
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
