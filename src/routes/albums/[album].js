import { gql } from 'graphql-request';
import { client } from '../../utils/graphql-client';

export async function get({ params }) {
  const albumQuery = gql`
    query($path: String, $language: String, $version: VersionLabel) {
      catalogue(path: $path, language: $language, version: $version) {
        name: component(id: "name") {
          ... on Component {
            content {
              ... on SingleLineContent {
                text
              }
            }
          }
        }
        summary: component(id: "summary") {
          ... on Component {
            content {
              ... on RichTextContent {
                html
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    path: `/albums/${params.album}`,
    language: 'en',
    version: 'published',
  }

  const albumData = await client.request(albumQuery, variables);

  if (!albumData.catalogue) {
    return {
      status: 404,
    }
  }

  const album = {
    name: albumData.catalogue.name.content.text,
    summary: albumData.catalogue.summary.content.html,
  }

  return {
    status: 200,
    body: {
      album
    }
  }
}