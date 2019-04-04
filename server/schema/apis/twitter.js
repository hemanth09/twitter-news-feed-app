const Twit  = require('twit');
const _ = require('lodash');
require('dotenv').config()

const {
  TWITTER_CONSUMER_KEY,
  TWITTER_CONSUMER_SECRET
} = process.env;

// Twit throws a runtime error if you try to create a client
// without API keys, so we do it lazily
let twitterClient = undefined;

const getTwitterClient = () => {
  if (!twitterClient) {
    twitterClient = new Twit({
      consumer_key        : TWITTER_CONSUMER_KEY,
      consumer_secret     : TWITTER_CONSUMER_SECRET,
      app_only_auth       : true
    });
  }
  return twitterClient;
};

const getUser = (identifier, identity) => __getPromise('users/show', { [identifier]: identity });
const getTweets = (user_id, count)     => __getPromise('statuses/user_timeline', { user_id, count });

const __getPromise = (endpoint, parameters, resultPath = null) => {

  return new Promise((resolve, reject) => {

    getTwitterClient().get(
      endpoint,
      parameters,
      (error, result) => {

        if (error) {
          reject(error);
        }
        else {
          resolve( resultPath !== null ? _.get(result, resultPath) : result );
        }
      }
    )
  });
};

module.exports = {
  getUser,
  getTweets
}