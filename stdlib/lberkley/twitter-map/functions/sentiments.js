let lib = require('lib');
let https = require('https');
let search = require('./search.js');
let phrases = require('../helpers/phrases.js');

let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment'

/**
* Gets Twitter sentiments for a given term
* @param {string} term What you're searching for
* @param {number} desired_count Number of tweets you want
* @param {number} max_reqs Maximum number of requests to make, if we don't get desired_count tweets first
* @returns {object}
*/
module.exports = (term = "HackPrinceton", desired_count = 100, max_reqs = 1, context, callback) => {
  var accessKey = process.env.AZURE_ACCESS_KEY;

  // handle response data from Azure
  let response_handler = function (response, tweets, keyPhrases) {
      let body = '';
      response.on ('data', function (d) {
          body += d;
      });
      response.on ('end', function () {
          let body_ = JSON.parse (body);
          averageSentiment = 0;
          body_.located = [];
          for(article in body_.documents) {
            averageSentiment = averageSentiment + body_.documents[article].score
            if(tweets[article]) {
              lat = tweets[article].lat;
              lon = tweets[article].lon;
              body_.located.push({
                lat: lat,
                lon: lon,
                score: body_.documents[article].score
              })
            }
          }
          body_.average = averageSentiment / body_.documents.length;
          body_.keyPhrases = keyPhrases;
          callback(null, body_);
      });
      response.on ('error', function (e) {
          console.log ('Error: ' + e.message);
      });
  };

  // post array to Azure cloud services
  let get_sentiments = function (documents, tweets, keyPhrases) {
      let body = JSON.stringify (documents);

      let request_params = {
          method : 'POST',
          hostname : uri,
          path : path,
          headers : {
              'Ocp-Apim-Subscription-Key' : accessKey,
          }
      };

      let req = https.request (request_params, (response) => {
        response_handler(response, tweets, keyPhrases);
      });
      req.write (body);
      req.end ();
  };

  return lib[`${context.service.identifier}.search`](term, desired_count, max_reqs, (err, tweets) => {
    let analyzeData = {'documents': []};
    let geoData = {'documents': []};
    console.log(tweets);
    for (tidx in ((tweets && tweets.all) || [])) {
      analyze = {
        text: tweets.all[tidx],
        language: 'en',
        id: tidx
      };
      analyzeData.documents.push(analyze);
    }
    for (tidx in ((tweets && tweets.geolocated) || [])) {
      geocode = {
        text: tweets.geolocated[tidx],
        language: 'en',
        id: tidx,
        lat: tweets.geolocated[tidx].lat,
        lon: tweets.geolocated[tidx].lon
      };
      geoData.documents.push(analyze);
    }
    phrases(tweets.all, 3, (err, keyPhrases) => {
      if (err) {
        console.log(err);
      }
      get_sentiments(analyzeData, tweets.geolocated, keyPhrases);
    });
  });
}
