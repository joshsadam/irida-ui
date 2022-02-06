import { gql } from '@apollo/client';
import { LoaderFunction, Outlet, redirect, useLoaderData } from 'remix';
import { authenticator } from '../../services/auth';
import client from '../../services/apollo-client';
import Dashboard from '~/components/Dashboard';
import { ThemeProvider } from '@mui/material';
import theme from '~/src/theme';

export const VIEWER_QUERY = gql`
  query VIEWER_QUERY {
    viewer {
      id
      username
      firstName
      lastName
    }
  }
`;

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export const loader: LoaderFunction = async ({ request }) => {
  const token = await authenticator.isAuthenticated(request, {
    failureRedirect: '/login',
  });

  if (!token || new Date(token.expires_at) < new Date()) {
    return redirect('/login');
  }

  const response = await client.query({
    query: VIEWER_QUERY,
    context: {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  });

  return response.data.viewer;
};

export default function AppLayout() {
  const viewer = useLoaderData();
  return (
    <ThemeProvider theme={theme}>
      <Dashboard viewer={viewer}>
        <Outlet />
      </Dashboard>
    </ThemeProvider>
  );
}
