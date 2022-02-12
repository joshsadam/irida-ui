import SettingsIcon from '@mui/icons-material/Settings';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  '& .MuiDrawer-paperAnchorRight': {
    borderRadius: '10px',
  },
  // '& .MuiDrawer-paper': {
  //     position: 'relative',
  //     whiteSpace: 'nowrap',
  //     width: DRAWER_WIDTH,
  //     transition: theme.transitions.create('width', {
  //         easing: theme.transitions.easing.sharp,
  //         duration: theme.transitions.duration.enteringScreen,
  //     }),
  //     boxSizing: 'border-box',
  //     ...(!open && {
  //         overflowX: 'hidden',
  //         transition: theme.transitions.create('width', {
  //             easing: theme.transitions.easing.sharp,
  //             duration: theme.transitions.duration.leavingScreen,
  //         }),
  //         width: theme.spacing(7),
  //         [theme.breakpoints.up('sm')]: {
  //             width: theme.spacing(9),
  //         },
  //     }),
  // },
}));

export function Settings() {
  const [open, setOpen] = React.useState<boolean>(true);

  const toggleDrawer = () => setOpen(!open);

  return (
    <>
      <IconButton aria-label="delete" onClick={toggleDrawer}>
        <SettingsIcon />
      </IconButton>
      <MuiDrawer anchor="right" open={open} onClose={toggleDrawer}>
        <Toolbar />
        <p>HELLO</p>
      </MuiDrawer>
    </>
  );
}
