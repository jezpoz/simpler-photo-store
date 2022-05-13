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
              name
              type
              path
              __typename
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
          name: item.node?.name,
          path: item.node?.path
        });
      }
    }
    if (item.node.shape.identifier.includes('photography')) {
      if (item.node.path) {
        photographs.push({
          name: item.node?.name,
          path: item.node?.path
        });
      }
    }
    if (item.node.shape.identifier.includes('photographer')) {
      if (item.node.path) {
        photographers.push({
          name: item.node?.name,
          path: item.node?.path
        });
      }
    }
  }

  const topic = {
    name: topicData.topic.name,
    parentTopic: topicData.topic.parent ? {
      name: topicData.topic.parent.name,
      path: topicData.topic.parent.path
    } : null,
    subTopics: topicData.topic.children?.map(subTopic => ({
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