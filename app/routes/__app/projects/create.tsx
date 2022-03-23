import { gql } from '@apollo/client';
import { Box, Button, Grid, Paper, TextField } from '@mui/material';
import { useEffect, useRef } from 'react';
import { ActionFunction, Form, redirect, useTransition } from 'remix';
import { Token } from 'simple-oauth2';
import Title from '~/components/Title';
import client from '~/services/apollo-client';
import authenticator from '~/services/auth.server';

const CREATE_PROJECT_MUTATION = gql`
  mutation CREATE_PROJECT_MUTATION($project: ProjectInput) {
    createProject(input: $project) {
      id
    }
  }
`;

export const action: ActionFunction = async ({ request }) => {
  const token: Token | null = await authenticator.isAuthenticated(request);

  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  if (_action === 'create') {
    const {
      data: {
        createProject: { id },
      },
    } = await client.mutate({
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
    return redirect(`/projects/${id}`);
    // TODO: Handle error creating projects
  }
  return {};
};

export default function CreateProject() {
  const formRef = useRef();
  const transition = useTransition();

  const isCreating =
    transition.state === 'submitting' &&
    transition.submission.formData.get('_action') === 'create';

  useEffect(() => {
    if (!isCreating) {
      formRef.current?.reset();
    }
  }, [isCreating]);

  return (
    <>
      <Title>Create New Project</Title>
      <Paper>
        <Box
          component={Form}
          ref={formRef}
          method="post"
          sx={{
            p: 2,
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
                name="_action"
                value="create"
              >
                Create Project
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </>
  );
}
