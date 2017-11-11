let lib = require('lib');
let https = require('https');
let search = require('./search.js');

let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment'

/**
* Gets Twitter sentiments for a given term
* @param {string} term What you're searching for
* @param {number} desired_count Number of tweets you want
* @param {number} max_reqs Maximum number of requests to make, if we don't get desired_count tweets first
* @returns {object}
*/
module.exports = (term = "HackPrinceton", desired_count = 10, max_reqs = 20, context, callback) => {
  var accessKey = process.env.AZURE_ACCESS_KEY;

  // handle response data from Azure
  let response_handler = function (response) {
      let body = '';
      response.on ('data', function (d) {
          body += d;
      });
      response.on ('end', function () {
          let body_ = JSON.parse (body);
          for (docidx in body_.documents) {
            let doc = body_.documents[docidx];
            doc.text = tweets[docidx].text;
            doc.lat = tweets[docidx].lat;
            doc.lon = tweets[docidx].lon;
          }
          let body__ = JSON.stringify (body_, null, '  ');
          return body_;
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

      let req = https.request (request_params, (response) => {
        response_handler(response);
      });
      req.write (body);
      req.end ();
  };

  return lib[`${context.service.identifier}.search`](term, desired_count, max_reqs, (err, tweets) => {
    let analyzeData = {'documents': []};
    let tweetData = {'documents': []};
    for (tidx in tweets) {
      tweet = {
        text:tweet.text,
        language: 'en',
        id: tidx
      };
      analyze = {
        text: tweet.text,
        language: 'en',
        id: tidx
      };
      tweetData.documents.push(tweetData);
      analyzeData.documents.push(analyze);
    }
    analuyzeData = get_sentiments(analyzeData);
  });
}
