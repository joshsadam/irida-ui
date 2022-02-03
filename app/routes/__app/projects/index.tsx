import { useEffect, useRef } from 'react';
import { gql } from '@apollo/client';
import {
  ActionFunction,
  Form,
  LoaderFunction,
  MetaFunction,
  redirect,
  useLoaderData,
  useTransition,
} from 'remix';
import { Token } from 'simple-oauth2';
import { Project } from '../../../../types';
import { authenticator } from '../../../../services/auth';
import client from '../../../../services/apollo-client';
import { formatTimeStamp } from '../../../../utils/date-utils';
import { DataGrid } from '@mui/x-data-grid';
import Title from '~/components/Title';
import Box from '@mui/material/Box';
import { Button, Grid, TextField } from '@mui/material';

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

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION($project: ProjectInput) {
    createProject(input: $project) {
      id
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

export const action: ActionFunction = async ({ request }) => {
  const token: Token | null = await authenticator.isAuthenticated(request);
  if (token === null) {
    return redirect('/login');
  }
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === 'create') {
    await client.mutate({
      mutation: CREATE_PROJECT_MUTATION,
      variables: {
        project: {
          name: values.name,
          projectDescription: values.description,
        },
      },
      context: {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      },
    });
  }
  return {};
};

export const meta: MetaFunction = () => {
  return {
    title: 'IRIDA REMIXED: Projects',
    description: 'All projects you have access to within the IRIDA Platform',
  };
};

export default function Projects() {
  const projects = useLoaderData<Project[]>();
  const transition = useTransition();
  const formRef = useRef();

  const isCreating =
    transition.state === 'submitting' &&
    transition.submission.formData.get('_action') === 'create';

  useEffect(() => {
    if (!isCreating) {
      formRef.current?.reset();
    }
  }, [isCreating]);

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
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
    <main>
      <Title>PROJECTS</Title>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={projects}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
        />
      </div>

      <br />
      <hr />
      <br />

      <Box
        component={Form}
        ref={formRef}
        method="post"
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              label="Project Name"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              id="description"
              label="Project Description"
              name="description"
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              name="_action"
              value="create"
            >
              Create Project
            </Button>
          </Grid>
        </Grid>
      </Box>
    </main>
  );
}
