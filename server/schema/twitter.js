const _ = require('lodash');
const twitter = require('./apis/twitter');
const graphql = require('graphql');

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLScalarType,
  GraphQLEnumType
} = graphql;

const { GraphQLError } = require('graphql/error');
const { Kind } = require('graphql/language');

let UserType = new GraphQLObjectType({
  name        : 'TwitterUser',
  description : 'Twitter user',
  fields      : () => ({
    created_at        : { type: GraphQLString },
    description       : { type: GraphQLString },
    id                : { type: GraphQLID },
    screen_name       : { type: GraphQLString },
    name              : { type: GraphQLString },
    profile_image_url : { type: GraphQLString },
    url               : { type: GraphQLString },
    tweets          : {
      type        : new GraphQLList(TweetType),
      description : 'Get a list of tweets for current user',
      args        : {
        limit: {
          type         : GraphQLInt,
          defaultValue : 10
        }
      },
      //             user            args
      resolve: ({ id: user_id }, { limit }) => twitter.getTweets(user_id, limit)
    }
  })

});

let TweetType = new GraphQLObjectType({
  name        : 'Tweet',
  description : 'A tweet object',
  fields      : () => ({
    id            : { type: GraphQLID },
    created_at    : { type: GraphQLString },
    text          : { type: GraphQLString },
    retweet_count : { type: GraphQLInt },
    user          : { type: UserType }
  })
});

let userIdentityType = new GraphQLScalarType({
  name         : 'UserIdentity',
  description  : 'Parse user provided identity',
  serialize    : value => value,
  parseValue   : value => value,
  parseLiteral : ast => {

    if (ast.kind !== Kind.STRING && ast.kind !== Kind.INT) {
      throw new GraphQLError("Query error: Can only parse Integer and String but got a: " + ast.kind, [ast]);
    }

    return ast.value;
  }
});

let userIdentifierType = new GraphQLEnumType({
  name        : 'UserIdentifier',
  description : 'Either user unique ID, or screen name',
  values      : {
    'id'   : { value: 'user_id' },
    'name' : { value: 'screen_name' }
  }
});

let twitterType = new GraphQLObjectType({
  name        : 'TwitterAPI',
  description : 'The Twitter API',
  fields : {
    user : {
      type : UserType,
      args : {
        identifier: {
          description : 'Either user_id or screen_name',
          type        : new GraphQLNonNull(userIdentifierType)
        },
        identity: {
          description : 'User ID (Integer) or Screen name (String) to identify user',
          type        : new GraphQLNonNull(userIdentityType)
        },
      },
      resolve: (  _, { identifier, identity }) => twitter.getUser(identifier, identity)
    }
  }
});


module.exports = new GraphQLSchema({
  query: twitterType
});
