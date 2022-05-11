import { gql } from 'graphql-request';
import { client } from '../../utils/graphql-client';

export async function get({ params }) {
  const profileQuery = gql`
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
        profileImage: component(id: "picture") {
          ... on Component {
            content {
              ... on ImageContent {
                images {
                  altText
                  caption {
                    html
                  }
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
  `;

  const profileVariables = {
    path: `/photographers/${params.photographer}`,
    language: 'en',
    version: 'published',
  }

  const profileData = await client.request(profileQuery, profileVariables);

  if (!profileData.catalogue) {
    return {
      status: 404,
    }
  }

  const picturesQuery = gql`
    query($path: String!, $language: String!) {
      topic(path: $path, language: $language) {
        items(first: 10) {
          edges {
            node {
              ... on Product {
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
                image: component(id: "picture") {
                  ... on Component {
                    content {
                      ... on ImageContent {
                        firstImage {
                          altText,
                          caption {
                            html
                          }
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
  `;

  const picturesVariables = {
    path: `/photographer/${params.photographer}`,
    language: 'en',
  }

  const picturesData = await client.request(picturesQuery, picturesVariables);

  const pictures = [];
  if (picturesData.topic) {
    for(const edge of picturesData.topic.items.edges) {
      const node = edge.node;
      pictures.push({
        path: node.path,
        name: node.name.content.text,
        image: node.image.content.firstImage
      })
    }
  }
  

  const profile = {
    name: profileData.catalogue.name.content.text,
    summary: profileData.catalogue.summary.content.html,
    profilePictures: profileData.catalogue.profileImage.content?.images || [],
  }

  return {
    status: 200,
    body: {
      profile,
      pictures
    }
  }
}