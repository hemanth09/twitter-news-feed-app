# Twitter News Feed App

React GraphQL application utilising Twitter API to get latest 10 tweets

### Tech Stack
- Twitter API
- Node.js
- Express.js
- ReactJS
- GraphQL
- Apollo

### Getting started

## Prerequisites
Make sure you installed these on your machine
- Node (https://nodejs.org/en/)
- NPM (https://www.npmjs.com/get-npm)
- Nodemon (https://www.npmjs.com/package/nodemon)
- Twitters Developer account to access tokens (https://developer.twitter.com/)


## Set Up
Clone and install:

```bash
git clone https://github.com/hemanth09/twitter-news-feed-app.git
cd twitter-news-feed-app
npm install
```

## Setup enviornment variables
Once you create the devloper acoount on twitter Api, You need conumer_key and consumer_secret to gain Api Access

```bash
cp .env-example .env
```

```
TWITTER_CONSUMER_SECRET=
TWITTER_ACCESS_TOKEN_KEY=
```

### Running the Application

Run it using:

```bash
npm run dev
```
And in browser App will running on http://localhost:3000/

### Project structure

##Server Folder

##Schema
`twitter.js` Consits of GraphQl schema for twitter api.
`apis/twiiter.js` Helper methods to gain access to the Api and load in GraphQl schema.

##server
`server.js` Consits of SSR Logic

##Client Folder

## components
In this directory are all UI components that are used. `Headline` is responsible for rendering headline. `TweetList` is responsible for displaying the Tweets Data using Apollo GraphQl.

## queries
`fetchTweets.js` GraphQl Query to fetch the required feilds

## style
consits of styles

`index.js` Responsible for the UI to load utilising Apollo client

## Things To Do

- Unit Test Coverage
 