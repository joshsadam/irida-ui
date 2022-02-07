import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1D0B38',
    },
    secondary: {
      main: '#D38157',
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
