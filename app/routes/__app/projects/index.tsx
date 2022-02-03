import { useEffect, useRef } from 'react';
import { gql } from '@apollo/client';
import {
  ActionFunction,
  Form,
  Link,
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

  return (
    <main>
      <h1>PROJECTS</h1>
      <table>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td>
                <Link to={`/projects/${project.id}`}>{project.name}</Link>
              </td>
              <td>{project.projectDescription}</td>
              <td>{formatTimeStamp(new Date(project.createdDate))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <hr />
      <br />

      <Form ref={formRef} replace method="post">
        <label htmlFor="name">
          Project Name
          <input type="text" name="name" />
        </label>
        <label htmlFor="description">
          Project Description
          <input type="text" name="description" />
        </label>
        <button type="submit" name="_action" value="create">
          Create Project
        </button>
      </Form>
    </main>
  );
}
