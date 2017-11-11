var Twitter = require('twitter');
var async = require('async');
var geocode = require('../helpers/geocode.js');

/**
* Searches Twitter for a given term
* @param {string} term What you're searching for
* @param {number} desired_count Number of tweets you want
* @param {number} max_reqs Maximum number of requests to make, if we don't get desired_count tweets first
* @returns {array}
*/
module.exports = (term = "HackPrinceton", desired_count = 10, max_reqs = 20, context, callback) => {

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var accessKey = process.env.AZURE_ACCESS_KEY;

  req_obj = {
    q: term,
    geocode: "39,-95.5,1600mi",
    count: 100,
    result_type: "recent"
  }

  console.log("started");
  let tweet_data = [];
  let last_id;

  let process_tweet = async (tweets, n, done) => {
    if (tweet_data.length < desired_count) {
      t = tweets.statuses[n];
      if (t.id < last_id || last_id == -1) {
        last_id = t.id;
      }
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
        loc = t.user.location;
        data.source = "profile";
        coords = await geocode(loc);
        if (coords != null) {
          data.lat = coords.lat;
          data.lon = coords.lon;
          data.loc = loc;
          write = true;
        } else {
          write = false;
        }
      }
      console.log(t.text);
      if (write) {
        tweet_data.push(data);
      }
    }
    done();
  }

  let get_more_tweets = (n, done) => {
    if (tweet_data.length >= desired_count) done(null);
    last_id = -1;
    client.get('search/tweets', req_obj, function(error, tweets, response) {
      if (error) {
        console.log("Error: " + JSON.stringify(error));
      }
      async.timesSeries(tweets.statuses.length, (n, done) => {
        process_tweet(tweets, n, done);
      }, (err) => {
        if (err) {
          console.log(err);
        }
        req_obj.max_id = last_id - 1;
        done();
      });
    });
  }

  async.timesSeries(max_reqs, get_more_tweets, function (err) {
    callback(err, tweet_data);
  });

};
