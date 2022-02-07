import type { ActionFunction } from 'remix';
import { redirect } from 'remix';
import { destroySession, getSession } from '~/services/session.server';

export const action: ActionFunction = async ({ request }) => {
  console.log('REDIRECTING');
  return redirect('/login', {
    headers: {
      'Set-Cookie': await destroySession(await getSession(request)),
    },
  });
};

export const loader: LoaderFunction = () => {
  throw new Response('', { status: 404 });
};
