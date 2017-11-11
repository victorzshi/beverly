var Twitter = require('twitter');

/**
* Searches Twitter for a given term
* @param {string} term What you're searching for
* @returns {string}
*/
module.exports = (term = "HackPrinceton", context, callback) => {

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  client.get('search/tweets', {q: term}, function(error, tweets, response) {
    callback(null, tweets.statuses[0]);
  });

};