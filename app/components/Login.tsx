import { Form } from 'remix';
import { Alert } from '@mui/material';

type LoginProps = {
  errors?: boolean;
  busy?: boolean;
};

export default function Login({ errors, busy }: LoginProps) {
  return (
    <Form method="post">
      {errors && <Alert severity="error">You screwed up your login!</Alert>}
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" name="username" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" required />
      </div>
      <button type="submit" name="_action" value="login" disabled={busy}>
        Login
      </button>
    </Form>
  );
}
