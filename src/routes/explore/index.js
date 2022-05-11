import { gql } from 'graphql-request';
import { client } from '../../utils/graphql-client';

export async function get() {
  const query = gql`
    query {
      topics {
        name
        path
        children {
          name
          path
        }
      }
    }
  `;

  const topicData = await client.request(query);

  const topics = topicData.topics.map(topic => ({
    name: topic.name,
    path: topic.path,
    subTopics: topic.children.map(subTopic => ({
      name: subTopic.name,
      path: subTopic.path,
    })),
  }));

  return {
    status: 200,
    body: {
      topics
    }
  }
}