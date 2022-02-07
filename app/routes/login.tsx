import {
  ActionFunction,
  json,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useTransition,
} from 'remix';
import { AuthorizationError } from 'remix-auth';
import { Token } from 'simple-oauth2';
import Login from '~/components/Login';
import { authenticator } from '~/services/auth';

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

export default function LoginPage() {
  const errors = useActionData();
  const transition = useTransition();

  const busy = typeof transition.submission === 'object';

  return <Login errors={errors} busy={busy} />;
}
