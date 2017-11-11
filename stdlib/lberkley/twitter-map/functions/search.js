var Twitter = require('twitter');
var async = require('async');

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

  req_obj = {
    q: term,
    geocode: "40,-75,1000mi",
    count: 100,
    result_type: "recent"
  }

  console.log("started");
  tweet_data = [];

  get_more_tweets = (n, done) => {
    if (tweet_data.length >= desired_count) done(null);
    last_id = -1;
    client.get('search/tweets', req_obj, function(error, tweets, response) {
      console.log(error);
      for (tidx in tweets.statuses) {
        if (tweet_data.length < desired_count) {
          t = tweets.statuses[tidx];
          if (t.id < last_id || last_id == -1) {
            last_id = t.id
          }
          if (t.coordinates != null || t.place != null) {
            data = {text: t.text};
            if (t.coordinates != null) {
              data.lat = t.coordinates.coordinates[0];
              data.lon = t.coordinates.coordinates[1];
              data.source = "coordinates";
            } else {
              box = t.place.bounding_box.coordinates[0]
              data.lat = (box[0][0] + box[1][0]) / 2
              data.lon = (box[1][1] + box[2][1]) / 2
              data.source = "place";
            }
            tweet_data.push(data);
          }
        } else {
          break;
        }
      }
      req_obj.max_id = last_id - 1;
      done();
    });
  }

  async.timesSeries(max_reqs, get_more_tweets, function (err) { callback(err, tweet_data); });

  // for (var i = 0; i < max_reqs; i++) {
  //   client.get('search/tweets', req_obj, function(error, tweets, response) {
  //     for (tidx in tweets.statuses) {
  //       if (tweet_data.length < desired_count) {
  //         t = tweets.statuses[tidx];
  //         last_id = t.id
  //         if (t.coordinates != null || t.place != null) {
  //           data = {text: t.text};
  //           if (t.coordinates != null) {
  //             data.lat = t.coordinates.coordinates[0];
  //             data.lon = t.coordinates.coordinates[1];
  //             data.source = "coordinates";
  //           } else {
  //             box = t.place.bounding_box.coordinates[0]
  //             data.lat = (box[0][0] + box[1][0]) / 2
  //             data.lon = (box[1][1] + box[2][1]) / 2
  //             data.source = "place";
  //           }
  //           tweet_data.push(data);
  //         }
  //       } else {
  //         break;
  //       }
  //     }
  //     have_resp = true;
  //   });
  //   console.log("waiting for response");
  //   while (!have_resp);
  //   console.log("did an iteration");
  //   have_resp = false;
  //   if (tweet_data.length >= desired_count) break;
  //   req_obj.max_id = last_id - 1;
  // }

  // callback(null, tweet_data);
};

// function get_more_tweets(n, done) {
//   if (tweet_data.length >= desired_count) done(null);
//   client.get('search/tweets', req_obj, function(error, tweets, response) {
//       for (tidx in tweets.statuses) {
//         if (tweet_data.length < desired_count) {
//           t = tweets.statuses[tidx];
//           last_id = t.id
//           if (t.coordinates != null || t.place != null) {
//             data = {text: t.text};
//             if (t.coordinates != null) {
//               data.lat = t.coordinates.coordinates[0];
//               data.lon = t.coordinates.coordinates[1];
//               data.source = "coordinates";
//             } else {
//               box = t.place.bounding_box.coordinates[0]
//               data.lat = (box[0][0] + box[1][0]) / 2
//               data.lon = (box[1][1] + box[2][1]) / 2
//               data.source = "place";
//             }
//             tweet_data.push(data);
//           }
//         } else {
//           break;
//         }
//       }
//       req_obj.max_id = last_id - 1;
//       done();
//     });
// }
