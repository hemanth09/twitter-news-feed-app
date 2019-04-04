import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Headline from './Headline';

import fetchTweets from '../queries/fetchTweets';

class TweetsList extends Component {

  renderTweets() {
    return this.props.data.user.tweets.map((tweet, index) => {
      const { user } = this.props.data;
      
      return (
        <div className="card blue-grey darken-1 col s12 m12 l6" key={index}>
            <div className="card-content white-text">
                <span className="card-title">{user.name} from {`@${user.screen_name}`}</span>
                <div>
                    <p>{tweet.text}</p>
                    <div className="card-action">
                        <a href={this.getUrl(tweet.text)} target="_blank">link to tweet</a>
                    </div>
                </div>
            </div>
        </div>
      );
    });
  }

  getUrl(url) {
    return url.match(/(https?:\/\/[^\s]+)/g);
  }

  render() {
    if (this.props.data.loading) { return <div>Loading...</div>; }
    const { user } = this.props.data
    return (
        <div className="row">
            <Headline twitterUserName={user.screen_name}/>
            <div className="tweet-layout">
                {this.renderTweets()}
            </div>
        </div>
    );
  }
}

export default graphql(fetchTweets, {
    options: ({props}) => { 
        const identifier = props && props.identifier;
        const identity = props && props.identity; 
        return { variables: { identifier: identifier || "name", identity: identity || "cnnbrk"} } 
    }
})(TweetsList);