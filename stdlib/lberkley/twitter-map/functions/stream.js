var Twitter = require('twitter');

/**
* Streams tweets matching a givne term
* @param {string} term What you're searching for
* @param {number} timeout Stop after this many seconds
* @returns {array}
*/
module.exports = (term = "hack", timeout = 10, context, callback) => {
  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  let tweet_data = [];

  setTimeout(() => {
    callback(null, tweet_data);
  }, timeout * 1000);

  let stream = client.stream('statuses/filter', {track: term});

  stream.on('data', (t) => {
    let write = false;
    data = {text: t.text};
    if (t.coordinates != null) {
      data.lat = t.coordinates.coordinates[1];
      data.lon = t.coordinates.coordinates[0];
      data.source = "coordinates";
      write = true;
    } else if (t.place != null) {
      box = t.place.bounding_box.coordinates[0]
      data.lat = (box[1][1] + box[2][1]) / 2
      data.lon = (box[0][0] + box[1][0]) / 2
      data.source = "place";
      write = true;
    } else if (t.user != null && t.user.location != null) {
      data.loc = t.user.location;
      data.source = "profile";
      write=false;
    }
    console.log(t.text);
    if (write) {
      tweet_data.push(data);
    }
  });

  stream.on('error', function(error) {
    console.log(error);
  });
}
