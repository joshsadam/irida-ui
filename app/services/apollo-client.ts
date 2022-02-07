import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

export function createApolloClient() {
  const httpLink = createHttpLink({
    uri: process.env.GRAPHQL_ENDPOINT || `http://localhost:8080/api/graphql`,
  });

  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

const client = createApolloClient();

export default client;
