import {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
  redirect,
  useActionData,
  useTransition,
} from 'remix';
import { Token } from 'simple-oauth2';
import Login from '~/components/login';
import authenticator from '~/services/auth.server';

export const loader: LoaderFunction = async ({ request }) => {
  const token: Token | null = await authenticator.isAuthenticated(request);

  if (token && new Date(token.expires_at) > new Date()) {
    return redirect('/');
  }

  return {};
};

export const action: ActionFunction = async ({ request, context }) => {
  return await authenticator.authenticate('form', request, {
    successRedirect: '/',
    failureRedirect: '/login',
    throwOnError: true,
    context,
  });
};

export const meta: MetaFunction = () => {
  return { title: 'IRIDA' };
};

export default function LoginPage() {
  const loaderData = useActionData();
  const transition = useTransition();

  const busy = typeof transition.submission === 'object';

  return <Login errors={loaderData?.error} busy={busy} />;
}
