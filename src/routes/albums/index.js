import { gql } from 'graphql-request';
import { client } from '../../utils/graphql-client';

export async function get() {
  const query = gql`
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
        children {
          path
          name: component(id: "name") {
            ... on Component {
              content {
                ... on SingleLineContent {
                  text
                }
              }
            }
          }
          image: component(id: "photographs") {
            ... on Component {
              content {
                ... on ItemRelationsContent {
                  items {
                    component(id: "picture") {
                      ... on Component {
                        content {
                          ... on ImageContent {
                            firstImage {
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
            }
          }
        }
      }
    }
  `;

  const variables = {
    path: '/albums',
    language: "en",
    version: "published",
  }

  const data = await client.request(query, variables);

  const albums = data.catalogue.children.map(child => ({
    name: child?.name?.content?.text,
    path: child?.path,
    images: child?.image?.content?.items?.map(item => ({
      altText: item?.component?.content?.firstImage?.altText,
      variants: item?.component?.content?.firstImage?.variants,
    }))
  }));

  return {
    status: 200,
    body: {
      title: data.catalogue.name?.content?.text,
      summary: data.catalogue.summary?.content?.html,
      albums
    }
  }
}