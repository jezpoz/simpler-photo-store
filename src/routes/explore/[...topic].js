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
              name
              type
              path
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
    children: topicData.topic.items.edges?.map(item => ({
      name: item.node?.name,
      path: item.node?.path,
    })) || [],
  } || [];

  return {
    status: 200,
    body: {
      topic
    }
  }
}