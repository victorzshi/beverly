<template>
  <div class="section container">
    <h1 class="title">Sentiment Map</h1>
    <!-- <span>Display child prop-passed statusMessage: {{ statusMessage }}</span> -->
    <div id="map">
      <img id="loading-image" src="https://data.whicdn.com/images/58681812/original.gif">
    </div>
  </div>
</template>

<style scoped>
#map {
  height: 400px;
  width: 100%;
  margin: 0 auto;
  background: white;
}
#loading-image {
  height: 150px;
  object-fit: cover;
}
</style>

<script>
export default {
  name: 'HeatMap',
  props: ['query', 'statusMessage'],
  data: function () {
    return {
      // San Francisco (37.774546, -122.433523)
      map: null,
      heatMapData: []
    }
  },
  methods: {
    // Get twitter requests for term
    // getTwitterHeatMapData: function (term) {
    //   this.$http.get('https://lberkley.lib.id/twitter-map@dev/newsDisplay/?searchTerm=' + query).then(response => {
    //       console.log('twitter response: ' + response.data.heatMapData);
    //       this.heatMapData = response.data.heatMapData;
    //       /*for(let i in articles) {
    //         console.log(articles[i])
    //       }*/
    //    });   
    // }
    getTwitterHeatMapData: function (term) {
      console.log("Retrieving twitter data")
      var xmlhttp = new XMLHttpRequest();
      const options = {
            maxZoom: 5,
            zoom: 1,
            minZoom: 1,
            // San Fran (37.774546, -122.433523)
            // Center of USA 37.0902° N, 95.7129° W
            center: new google.maps.LatLng(30.00, 0.00),
            disableDefaultUI: true,
            styles: [
              {
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#8ec3b9"
                  }
                ]
              },
              {
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1a3646"
                  }
                ]
              },
              {
                "featureType": "administrative.country",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#4b6878"
                  }
                ]
              },
              {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#64779e"
                  }
                ]
              },
              {
                "featureType": "administrative.neighborhood",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "administrative.province",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#4b6878"
                  }
                ]
              },
              {
                "featureType": "landscape.man_made",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#334e87"
                  }
                ]
              },
              {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#023e58"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#283d6a"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#6f9ba5"
                  }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "featureType": "poi.business",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#023e58"
                  }
                ]
              },
              {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#3C7680"
                  }
                ]
              },
              {
                "featureType": "road",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#304a7d"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.icon",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#98a5be"
                  }
                ]
              },
              {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#2c6675"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                  {
                    "color": "#255763"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#b0d5ce"
                  }
                ]
              },
              {
                "featureType": "road.highway",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#023e58"
                  }
                ]
              },
              {
                "featureType": "transit",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#98a5be"
                  }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "labels.text.stroke",
                "stylers": [
                  {
                    "color": "#1d2c4d"
                  }
                ]
              },
              {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                  {
                    "color": "#283d6a"
                  }
                ]
              },
              {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#3a4762"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                  {
                    "color": "#0e1626"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text",
                "stylers": [
                  {
                    "visibility": "off"
                  }
                ]
              },
              {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                  {
                    "color": "#4e6d70"
                  }
                ]
              }
            ]
          }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          // var sentiments_data_str = '{"documents": [], "errors": [], "located": [], "average": 0.5, "keyPhrases": {}}';
          var sentiment_data = JSON.parse(xmlhttp.responseText);
          var positiveHeatMap = [];
          var negativeHeatMap = [];
          for (let i in sentiment_data.located) {
            var point = sentiment_data.located[i];
            // console.log('Adding point (' + point.lat + ', ' + point.lon + ')')
            var latlng = new google.maps.LatLng(point.lat, point.lon);
            if (point.score < 0.5) {
              negativeHeatMap.push({location: latlng, weight: (0.5 - point.score) * 2});
            } else {
              positiveHeatMap.push({location: latlng, weight: (point.score - 0.5) * 2});
            }
            positiveHeatMap.push(latlng)
          }
          console.log("Heat map data finish updating, creating map")

          const element = document.getElementById('map')

          this.map = new google.maps.Map(element, options);

          // Style (Green ish)
          var posHeatmap = new google.maps.visualization.HeatmapLayer({
            data: positiveHeatMap
          });
          var posGradient = [
            'rgba(0, 0, 255, 0)',
            'rgba(0, 0, 255, 0.25)',
            'rgba(0, 0, 255, 0.5)',
          ]

          // Style (purple)
          var negHeatmap = new google.maps.visualization.HeatmapLayer({
            data: negativeHeatMap
          });
          var negGradient = [
            'rgba(255, 0, 0, 0)',
            'rgba(255, 0, 0, 0.25)',
            'rgba(255, 0, 0, 0.5)',
          ]
          negHeatmap.set('gradient', negGradient);
          negHeatmap.set('radius', 35);
          negHeatmap.setMap(this.map);

          posHeatmap.set('gradient', posGradient);
          posHeatmap.set('radius', 35);
          posHeatmap.setMap(this.map);

        }
        else if (xmlhttp.status == 403 || xmlhttp.status == 404) {
          console.log('Could not retrieve twitter')
          const element = document.getElementById('map')
          // const options = {
          //   zoom: 2,
          //   // San Fran (37.774546, -122.433523)
          //   // Center of USA 37.0902° N, 95.7129° W
          //   center: new google.maps.LatLng(40.00, 0.00),
          // }
          this.map = new google.maps.Map(element, options);

          // Style (Green ish)
          var posHeatmap = new google.maps.visualization.HeatmapLayer({
            data: positiveHeatMap
          });
          var posGradient = [
            'rgba(0, 0, 255, 0)',
            'rgba(0, 0, 255, 0.5)',
            'rgba(0, 0, 255, 1)',
          ]
          posHeatmap.set('gradient', posGradient);
          posHeatmap.set('radius', 35);
          posHeatmap.setMap(this.map);

          // Style (purple)
          var negHeatmap = new google.maps.visualization.HeatmapLayer({
            data: negativeHeatMap
          });
          var negGradient = [
            'rgba(255, 0, 0, 0)',
            'rgba(255, 0, 0, 0.5)',
            'rgba(255, 0, 0, 1)',
          ]
          negHeatmap.set('gradient', negGradient);
          negHeatmap.set('radius', 35);
          negHeatmap.setMap(this.map);
        }
      }
      xmlhttp.open('GET', 'https://lberkley.lib.id/twitter-map@dev/sentiments/?term=' + term + '&desired_count=250&max_reqs=3', true);
      xmlhttp.send();
    }
  },
  watch: {
    query: function (text) {
      console.log('Watching change for map: ' + text)
      this.getTwitterHeatMapData(text)
    }
  }
};
</script>