const lib = require('lib')({token: process.env.STDLIB_LIBRARY_TOKEN});
const maps = require('@google/maps');

const geocode_blacklist = ["", "earth", "the internet", "united states", "us", "usa"];

var maps_client = maps.createClient({
  key: process.env.MAPS_ACCESS_TOKEN
});

module.exports = function (name) {
  return new Promise(resolve => {
    let clean_name = name.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").toLowerCase();
    console.log(clean_name);
    if (geocode_blacklist.indexOf(clean_name) != -1) {
      console.log("resolved from blacklist");
      resolve(null);
    } else {
      lib.utils.storage.get('geocode-' + clean_name, (err, value) => {
        if (value == null) {
          geocode_api_req(clean_name).then(geocode_result => {
            let store_result;
            if (geocode_result == null) {
              store_result = "no value";
            } else {
              store_result = geocode_result;
            }
            lib.utils.storage.set('geocode-' + clean_name, store_result, (err) => {
              if (err) {
                console.log(err);
              }
              console.log("resolved from API call");
              resolve(geocode_result);
            });
          }).catch(err => {
            console.log(err);
            resolve(null);
          });
        } else {
          console.log("resolved from storage");
          if (value == "no value") {
            resolve(null);
          } else {
            resolve(value);
          }
        }
      });
    }
  });
}

function geocode_api_req(name) {
  return new Promise(resolve => {
    maps_client.geocode({address: name}, (err, response) => {
      if (err) {
        throw new Error(err);
      }
      resp_obj = response.json;
      //console.log(resp_obj);
      if (resp_obj.results.length == 0) {
        resolve(null);
      } else {
        types = resp_obj.results[0].types;
        coord_obj = resp_obj.results[0].geometry.location;
        if (types.indexOf("political") != -1 && types.indexOf("country") == -1) {
          resolve({lat: coord_obj.lat, lon:coord_obj.lng});
        } else {
          resolve(null);
        }
      }
    });
  });
}