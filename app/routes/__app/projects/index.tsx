import { gql } from '@apollo/client';
import { Button, Container, Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {
  Link,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
  useNavigate,
} from 'remix';
import { Token } from 'simple-oauth2';
import Title from '~/components/Title';
import client from '~/services/apollo-client';
import { authenticator } from '~/services/auth';
import { Project } from '~/types';
import { formatTimeStamp } from '~/utils/date-utils';

const ALL_PROJECTS_QUERY = gql`
  query ALL_PROJECTS_QUERY {
    viewer {
      projects {
        id
        name
        createdDate
        modifiedDate
        projectDescription
      }
    }
  }
`;

interface GraphqlResponse {
  data: {
    viewer: {
      projects: Project[];
    };
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const token: Token | null = await authenticator.isAuthenticated(request);
  if (token === null) {
    return redirect('/login');
  }
  const response: GraphqlResponse = await client.query({
    query: ALL_PROJECTS_QUERY,
    context: {
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  });
  return response.data.viewer.projects;
};

export const meta: MetaFunction = () => {
  return {
    title: 'IRIDA REMIXED: Projects',
    description: 'All projects you have access to within the IRIDA Platform',
  };
};

export default function Projects() {
  const navigate = useNavigate();
  const projects = useLoaderData<Project[]>();

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      renderCell: ({ row }) => {
        return <Link to={`/projects/${row.id}`}>{row.name}</Link>;
      },
    },
    {
      field: 'projectDescription',
      headerName: 'Description',
      width: 300,
    },
    {
      field: 'createdDate',
      headerName: 'Created',
      width: 200,
      valueGetter: (params) => formatTimeStamp(params.createdDate),
    },
  ];

  return (
    <Container>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ pb: 1 }}
      >
        <Title>PROJECTS</Title>
        <Button variant="outlined" onClick={() => navigate('/projects/create')}>
          Create New Project
        </Button>
      </Stack>
      <Paper>
        <Box sx={{ p: 2, height: '800px' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flex: 1 }}>
              <DataGrid
                rows={projects}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </div>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}
