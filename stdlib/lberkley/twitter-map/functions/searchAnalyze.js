var Twitter = require('twitter');
let https = require ('https');

let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment';

/**
* Searches Twitter for a given term
* @param {string} term What you're searching for
* @returns {object}
*/
module.exports = (term = "HackPrinceton", context, callback) => {

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  var accessKey = process.env.AZURE_ACCESS_KEY;

  req_obj = {
    q: term,
    geocode: "40,-75,10mi",
    count: 100
  }

  tweet_data = [];
  analyzeData = {'documents': []};

  client.get('search/tweets', req_obj, function(error, tweets, response) {
    count = 0;
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
        analyzeData.documents.push({
          id: count,
          text: t.text,
          language: "en"
        })
        tweet_data.push({
          id: count,
          text: t.text,
          lat: lat,
          lon: lon,
          source: "place"
        });
        count  = count + 1;
      }
    }
    get_sentiments(analyzeData);
  });

  // handle response data from Azure
  let response_handler = function (response) {
      let body = '';
      response.on ('data', function (d) {
          body += d;
      });
      response.on ('end', function () {
          let body_ = JSON.parse (body);
          let body__ = JSON.stringify (body_, null, '  ');
          callback(null, body_);
      });
      response.on ('error', function (e) {
          console.log ('Error: ' + e.message);
      });
  };

  // post array to Azure cloud services
  let get_sentiments = function (documents) {
      let body = JSON.stringify (documents);

      let request_params = {
          method : 'POST',
          hostname : uri,
          path : path,
          headers : {
              'Ocp-Apim-Subscription-Key' : accessKey,
          }
      };

      let req = https.request (request_params, response_handler);
      req.write (body);
      req.end ();
  }
};
