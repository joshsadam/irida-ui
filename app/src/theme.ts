import { PaletteMode } from '@mui/material';
import { amber, deepOrange, grey } from '@mui/material/colors';

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    // ...(mode === 'light'
    //   ? {
    //       // palette values for light mode
    //       primary: '##465a8c',
    //       divider: amber[200],
    //       text: {
    //         primary: grey[900],
    //         secondary: grey[800],
    //       },
    //     }
    //   : {
    //       // palette values for dark mode
    //       primary: '#465a8c',
    //       divider: deepOrange[700],
    //       background: {
    //         default: deepOrange[900],
    //         paper: deepOrange[900],
    //       },
    //       text: {
    //         primary: '#fff',
    //         secondary: grey[500],
    //       },
    //     }),
  },
});
