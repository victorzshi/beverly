<template>
  <div class="section container">
    <h1 class="title">Sentiment Map</h1>
    <!-- <span>Display child prop-passed statusMessage: {{ statusMessage }}</span> -->
    <div id="map">
      <img id="loading-image" src="http://i.giftrunk.com/44frgm.gif">
    </div>
  </div>
</template>

<style scoped>
#map {
  height: 400px;
  width: 100%;
  margin: 0 auto;
  background: gray;
}
#loading-image {
  height: 400px;
  width: 100%;
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
    getTwitterHeatMapData: function (term) {
      console.log("Retrieving twitter data")
      var xmlhttp = new XMLHttpRequest();
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
          const options = {
            zoom: 2,
            // San Fran (37.774546, -122.433523)
            // Center of USA 37.0902° N, 95.7129° W
            center: new google.maps.LatLng(40.00, 0.00)
          }
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
        else if (xmlhttp.status == 403 || xmlhttp.status == 404) {
          console.log('Could not retrieve twitter')
          const element = document.getElementById('map')
          const options = {
            zoom: 2,
            // San Fran (37.774546, -122.433523)
            // Center of USA 37.0902° N, 95.7129° W
            center: new google.maps.LatLng(40.00, 0.00)
          }
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
  mounted: function () {
    // 
  },
  watch: {
    query: function (text) {
      console.log('Watching change for map: ' + text)
      this.getTwitterHeatMapData(text)
    }
  }
};
</script>