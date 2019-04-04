import gql from 'graphql-tag';

export default gql`
  query UserQuery($identifier: UserIdentifier!, $identity: UserIdentity!) {
    user(identifier: $identifier, identity: $identity) {
        id
        screen_name
        name
        url
        tweets(limit: 10
        ) {
          text
        }
    }
  }
`;