let async = require('async');
let https = require ('https');

/**
* Searches Bing News API for related aritcles
* @param {string} searchTerm What you're searching for
* @returns {array}
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
          body = JSON.parse(body);
          callback(null, body.value);
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
          path : path + '?q=' + encodeURIComponent(search) + '&count=50' + '&freshness=month',
          headers : {
              'Ocp-Apim-Subscription-Key' : subscriptionKey,
          }
      };

      let req = https.request(request_params, response_handler);
      req.end();
  }
  bing_news_search(term);

};
