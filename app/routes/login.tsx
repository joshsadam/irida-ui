import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  useTransition,
} from 'remix';
import { Form, json, redirect, useActionData } from 'remix';
import { AuthorizationError } from 'remix-auth';
import { authenticator } from '../../services/auth';
import type { Token } from 'simple-oauth2';

export const loader: LoaderFunction = async ({ request }) => {
  const token: Token | null = await authenticator.isAuthenticated(request);

  if (token && new Date(token.expires_at) > new Date()) {
    return redirect('/');
  }

  return {};
};

export const action: ActionFunction = async ({ request, context }) => {
  try {
    await authenticator.authenticate('form', request, {
      successRedirect: '/',
      throwOnError: true,
      context,
    });
  } catch (e) {
    if (e instanceof AuthorizationError) {
      return json({ error: true });
    }
    return e;
  }
};

export const meta: MetaFunction = () => {
  return { title: 'IRIDA' };
};

export default function Login() {
  const errors = useActionData();
  const transition = useTransition();

  const busy = typeof transition.submission === 'object';

  return (
    <Form method="post">
      {errors && (
        <div style={{ background: 'red', color: 'white', padding: `10px` }}>
          ❌ You screwed up your login!
        </div>
      )}
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
