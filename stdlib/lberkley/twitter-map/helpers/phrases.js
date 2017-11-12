let https = require('https');

const uri = 'eastus.api.cognitive.microsoft.com';
const path = '/text/analytics/v2.0/keyPhrases'

const accessKey = process.env.AZURE_ACCESS_KEY;

/**
* Gets key phrases in a list of tweets
* @param {array} tweets Array of strings to analyze
* @param {number} filter_min Ignore phrases with fewer than this many occurrences
* @returns {object}
*/
module.exports = (tweets, filter_min,  callback) => {
  let response_handler = function (response) {
    let body = '';
    response.on ('data', function (d) {
      body += d;
    });
    response.on ('end', function () {
      let body_obj = JSON.parse(body);
      let phrase_freqs = {};

      for (docidx in body_obj.documents) {
        doc = body_obj.documents[docidx];
        for (pidx in doc.keyPhrases) {
          phrase = doc.keyPhrases[pidx];
          if (phrase != "RT") {
            if (phrase in phrase_freqs) {
              phrase_freqs[phrase] += 1;
            } else {
              phrase_freqs[phrase] = 1;
            }
          }
        }
      }

      if (filter_min > 1) {
        for (pidx in phrase_freqs) {
          if (phrase_freqs[pidx] < filter_min) {
            delete phrase_freqs[pidx];
          }
        }
      }
      callback(null, phrase_freqs);
    });
    response.on ('error', function (e) {
      console.log ('Error: ' + e.message);
    });
  };

  let req_docs = [];
  for (i in tweets) {
    req_docs.push({
      language: "en",
      id: i,
      text: tweets[i]
    });
  }

  let req_body = JSON.stringify({documents: req_docs});
  let req_params = {
    method : 'POST',
    hostname : uri,
    path : path,
    headers : {
      'Ocp-Apim-Subscription-Key' : accessKey,
    }
  };

  let req = https.request (req_params, response_handler);
  req.write(req_body);
  req.end();
}
