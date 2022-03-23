import { gql } from '@apollo/client';
import type { LoaderFunction } from 'remix';
import { redirect, useLoaderData, useParams } from 'remix';
import type { Token } from 'simple-oauth2';
import Title from '~/components/Title';
import client from '~/services/apollo-client';
import authenticator from '~/services/auth.server';
import type { Project } from '~/types';

interface GraphqlResponse {
  data: {
    viewer: {
      projects: Project[];
    };
  };
}

const PROJECT_QUERY = gql`
  query Project($id: String!) {
    viewer {
      projects(id: $id) {
        id
        name
        createdDate
        modifiedDate
        projectDescription
      }
    }
  }
`;

export const loader: LoaderFunction = async ({ request, params }) => {
  const token: Token | null = await authenticator.isAuthenticated(request);
  // TODO: This is not yet implemented in IRIDA

  // const response: GraphqlResponse = await client.query({
  //   query: PROJECT_QUERY,
  //   variables: { id: params.projectId },
  //   context: {
  //     headers: {
  //       Authorization: `Bearer ${token.access_token}`,
  //     },
  //   },
  // });
  // return response.data.viewer.projects;
  return {};
};

export default function Project() {
  const { projectId } = useParams();
  const project = useLoaderData();
  console.log({ project });

  return <Title>You found project {projectId}</Title>;
}
