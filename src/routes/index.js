import { gql } from 'graphql-request';
import { client } from '../utils/graphql-client';

export async function get() {
  const data = await client.request(gql`
    query ($language: String!, $path: String!) {
      catalogue(language: $language, path: $path) {
        title: component(id: "title") {
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
        grids: component(id: "grids") {
          ... on Component {
            content {
              ... on GridRelationsContent {
                grids {
                  id
                }
              }
            }
          }
        }
        body: component(id: "body") {
          ... on Component {
            content {
              ... on ParagraphCollectionContent {
                paragraphs {
                  body {
                    html
                  }
                  title {
                    text
                  }
                  images {
                    altText
                    variants {
                      height
                      width
                      size
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { path: '/web/index', language: 'en' });

  const page = data.catalogue;

  return {
    status: 200,
    body: {
      page,
    }
  }
}