import React from 'react';

export default ({ twitterUserName }) => {
  return (
    <div className="header">
        <h3>
            Latest 10 news tweets from @{twitterUserName}
        </h3>
    </div>
  )
}