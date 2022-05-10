import { gql } from 'graphql-request';
import { client } from '../utils/graphql-client';

export async function get() {
  const data = await client.request(gql`
  query ($language: String!, $path: String!) {
    catalogue(language: $language, path: $path) {
      name
    }
  }
    `, { path: '/', language: 'en' });
  return {
    status: 200,
    body: {
      name: data.catalogue.name,
    }
  }
}