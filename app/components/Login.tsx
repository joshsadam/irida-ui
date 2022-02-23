import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Form, Link } from 'remix';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

type LoginProps = {
  errors?: boolean;
  busy?: boolean;
};

export default function Login({ errors, busy }: LoginProps) {
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component={Form} method="post" sx={{ mt: 1 }}>
          {errors && (
            <Alert severity="error">
              <AlertTitle>Login Failure</AlertTitle>
              Please check your username or password
            </Alert>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={busy}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );

  // return (
  //   <Form method="post">
  //
  //     <div>
  //       <label htmlFor="username">Username</label>
  //       <input type="text" name="username" required />
  //     </div>
  //     <div>
  //       <label htmlFor="password">Password</label>
  //       <input type="password" name="password" required />
  //     </div>
  //     <button type="submit" name="_action" value="login" disabled={busy}>
  //       Login
  //     </button>
  //   </Form>
  // );
}
