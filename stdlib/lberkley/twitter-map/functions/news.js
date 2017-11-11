let async = require('async');
let https = require ('https');

let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment'

/**
* Searches Bing News API for related aritcles
* @param {string} searchTerm What you're searching for
* @returns {object}
*/
module.exports = (searchTerm = "HackPrinceton", callback) => {

  let subscriptionKey = process.env.AZURE_ACCESS_KEY_NEWS;
  let host = 'api.cognitive.microsoft.com';
  let path = '/bing/v7.0/news/search';

  let term = searchTerm;

  let response_handler = function (response) {
      let body = '';
      response.on('data', function (d) {
          body += d;
      });
      response.on('end', function () {
          console.log('\nRelevant Headers:\n');
          for (var header in response.headers)
              // header keys are lower-cased by Node.js
              if (header.startsWith("bingapis-") || header.startsWith("x-msedge-"))
                   console.log(header + ": " + response.headers[header]);
          body = JSON.parse(body);
          callback(null, body);
          // console.log('\nJSON Response:\n');
          // console.log(body);

      });
      response.on('error', function (e) {
          console.log('Error: ' + e.message);
      });
  };

  let bing_news_search = function (search) {
    console.log('Searching news for: ' + term);
    let request_params = {
          method : 'GET',
          hostname : host,
          path : path + '?q=' + encodeURIComponent(search),
          headers : {
              'Ocp-Apim-Subscription-Key' : subscriptionKey,
          }
      };

      let req = https.request(request_params, response_handler);
      req.end();
  }
  bing_news_search(term);

};
