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
        photographs: component(id: "photographs") {
          ... on Component {
            content {
              ... on ItemRelationsContent {
                items {
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
                  photograph: component(id: "picture") {
                    ... on Component {
                      content {
                        ... on ImageContent {
                          firstImage {
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
            }
          }
        }
        photographers: component(id: "photographer") {
          ... on Component {
            content {
              ... on ItemRelationsContent {
                items {
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
    photographs: albumData.catalogue.photographs.content.items.map((item) => ({
      name: item.name.content.text,
      path: item.path,
      picture: item.photograph.content.firstImage,
    })),
    photographers: albumData.catalogue.photographers.content.items.map((item) => ({
      name: item.name.content.text,
      path: item.path,
      image: item.image.content?.firstImage,
    }))
  }

  return {
    status: 200,
    body: {
      album
    }
  }
}