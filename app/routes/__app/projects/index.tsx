import { gql } from '@apollo/client';
import { AddOutlined } from '@mui/icons-material';
import { Button, Paper, Stack } from '@mui/material';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
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

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 250,
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
      type: 'dateTime',
      width: 250,
      valueGetter: ({ value }) => value && new Date(value),
    },
  ];

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        pb={1}
        sx={{ height: 40 }}
      >
        <Title>PROJECTS</Title>
        <Button
          startIcon={<AddOutlined />}
          variant="contained"
          onClick={() => navigate('/projects/create')}
        >
          New
        </Button>
      </Stack>
      <Paper>
        <Box sx={{ p: 2, height: '800px' }}>
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
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
    </>
  );
}
