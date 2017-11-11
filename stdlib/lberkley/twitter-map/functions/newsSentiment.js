let lib = require('lib');
let https = require('https');
let search = require('./news.js');

let uri = 'eastus.api.cognitive.microsoft.com';
let path = '/text/analytics/v2.0/sentiment'

/**
* Gets sentiments for news article found in Bing
* @param {string} term What you're searching for
* @returns {object}
*/
module.exports = (term = "HackPrinceton", context, callback) => {
  var accessKey = process.env.AZURE_ACCESS_KEY;

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

      let req = https.request (request_params, (response) => {
        response_handler(response);
      });
      req.write (body);
      req.end ();
  };

  return lib[`${context.service.identifier}.news`](term, (err, news) => {
    let newsData = {'documents': []};
    count = 0;
    for (article in news) {
      analyze = {
        id: count,
        text: news[article].name + ' ' + news[article].description
      };
      //console.log(article);
      count = count + 1;
      newsData.documents.push(analyze);
    }

    get_sentiments(newsData);
  });
}
