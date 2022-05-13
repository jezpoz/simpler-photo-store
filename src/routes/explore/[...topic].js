import { gql } from 'graphql-request';
import { client } from '../../utils/graphql-client';

export async function get({ params }) {
  const topicQuery = gql`
    query($path: String!, $language: String!) {
      topic(path: $path, language: $language) {
        name
        parent {
          name
          path
        }
        children {
          name
          path
        }
        items {
          edges {
            node {
              shape {
                identifier
              }
              name: component(id: "name") {
                ... on Component {
                  content {
                    ... on SingleLineContent {
                      text
                    }
                  }
                }
              }
              type
              path
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
              images: component(id: "photographs") {
                ... on Component {
                  content  {
                    ... on ItemRelationsContent {
                      items {
                        path
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
      }
    }
  `;

  const topicVariables = {
    path: '/' + params.topic,
    language: 'en'
  }

  const topicData = await client.request(topicQuery, topicVariables);

  const albums = [];
  const photographs = [];
  const photographers = [];

  for (const item of topicData.topic?.items.edges || []) {
    if (item.node.shape.identifier.includes('album')) {
      if (item.node.path) {
        albums.push({
          name: item.node?.name?.content?.text,
          path: item.node?.path,
          images: item.node?.images?.content?.items?.map(item => ({
            altText: item?.component?.content?.firstImage?.altText,
            variants: item?.component?.content?.firstImage?.variants
          }))
        });
      }
    }
    if (item.node.shape.identifier.includes('photography')) {
      if (item.node.path) {
        photographs.push({
          name: item.node?.name?.content?.text,
          path: item.node?.path,
          picture: item.node?.image?.content?.firstImage
        });
      }
    }
    if (item.node.shape.identifier.includes('photographer')) {
      if (item.node.path) {
        photographers.push({
          name: item.node?.name.content?.text,
          path: item.node?.path,
          image: item.node?.image?.content?.firstImage
        });
      }
    }
  }

  const topic = {
    name: topicData.topic?.name,
    parentTopic: topicData.topic?.parent ? {
      name: topicData.topic?.parent.name,
      path: topicData.topic?.parent.path
    } : null,
    subTopics: topicData.topic?.children?.map(subTopic => ({
      name: subTopic.name,
      path: subTopic.path,
    })) || [],
    children: {
      albums,
      photographs,
      photographers
    },
  };

  return {
    status: 200,
    body: {
      topic
    }
  }
}