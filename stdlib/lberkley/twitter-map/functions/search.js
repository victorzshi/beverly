var Twitter = require('twitter');

/**
* Searches Twitter for a given term
* @param {string} term What you're searching for
* @returns {array}
*/
module.exports = (term = "HackPrinceton", context, callback) => {

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  req_obj = {
    q: term,
    geocode: "40,-75,10mi",
    count: 100
  }

  client.get('search/tweets', req_obj, function(error, tweets, response) {
    tweet_data = [];
    for (tid in tweets.statuses) {
      t = tweets.statuses[tid];
      if (t.coordinates != null) {
        tweet_data.push({
          text: t.text,
          lat: t.coordinates.coordinates[0],
          lon: t.coordinates.coordinates[1],
          source: "coordinates"
        });
      } else if (t.place != null) {
        box = t.place.bounding_box.coordinates[0]
        lat = (box[0][0] + box[1][0]) / 2
        lon = (box[1][1] + box[2][1]) / 2
        tweet_data.push({
          text: t.text,
          lat: lat,
          lon: lon,
          source: "place"
        });
      }
    }
    callback(null, tweet_data);
  });

};
