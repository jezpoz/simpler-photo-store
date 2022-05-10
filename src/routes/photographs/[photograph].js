import { gql } from 'graphql-request';
import { client } from '../../utils/graphql-client';

export async function get({ params }) {
  const photoQuery = gql`
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
        image: component(id: "picture") {
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
        photographer: component(id: "photographer") {
          ... on Component {
            content {
              ... on ItemRelationsContent {
                items {
                  path
                }
              }
            }
          }
        }
      }
    }
  `;

  const photoVariables = {
    path: `/photographs/${params.photograph}`,
    language: 'en',
    version: 'published',
  }

  const photoData = await client.request(photoQuery, photoVariables);

  if (!photoData.catalogue) {
    return {
      status: 404,
    }
  }

  const photographersPaths = photoData.catalogue.photographer.content.items.map((item) => (item.path));

  const photographers = [];
  for (const photographerPath of photographersPaths) {
    const photographerQuery = gql`
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
        }
      }
    `;
    const photographerVariables = {
      path: photographerPath,
      language: 'en',
      version: 'published',
    };

    const photographerData = await client.request(photographerQuery, photographerVariables);
    photographers.push({
      name: photographerData.catalogue.name.content.text,
      path: photographerPath,
    });
  }

  const photograph = {
    name: photoData.catalogue.name.content.text,
    summary: photoData.catalogue.summary.content.html,
    image: photoData.catalogue.image.content.firstImage,
  }

  return {
    status: 200,
    body: {
      photograph,
      photographers,
    }
  }
}