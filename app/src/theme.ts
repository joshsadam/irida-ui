import { PaletteMode } from '@mui/material';
import { amber, deepOrange } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // palette values for light mode
          primary: amber,
          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          // palette values for dark mode
          primary: deepOrange,
          divider: deepOrange[700],
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: '#fff',
            secondary: grey[500],
          },
        }),
  },
});

// Create a theme instance.
// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#1D0B38',
//     },
//     secondary: {
//       main: '#BFFA37',
//     },
//   },
// });
//
// declare module '@mui/material/styles' {
//   interface Palette {
//     main: Palette['primary'];
//   }
//
//   interface PaletteOptions {
//     main?: PaletteOptions['primary'];
//   }
// }

// export default responsiveFontSizes(theme);
