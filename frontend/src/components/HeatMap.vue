<template>
  <div class="container">
    <span>Display child prop-passed statusMessage: {{ statusMessage }}</span>
    <div id="map"></div>
  </div>
</template>

<style scoped>
#map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
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
            console.log('Adding point (' + point.lat + ', ' + point.lon + ')')
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
            // 'rgba(255, 0, 255, 0)',
            // 'rgba(255, 0, 255, 0.5)',
            // 'rgba(191, 0, 255, 0.5)',
            // 'rgba(127, 0, 255, 0.5)',
            // 'rgba(63, 0, 255, 0.5)',
            // 'rgba(0, 0, 255, 0.5)',
            // 'rgba(0, 0, 223, 0.5)',
            // 'rgba(0, 0, 191, 0.5)',
            // 'rgba(0, 0, 159, 0.5)',
            // 'rgba(0, 0, 127, 0.5)',
            // 'rgba(63, 0, 91, 0.5)',
            // 'rgba(127, 0, 63, 0.5)',
            // 'rgba(191, 0, 31, 0.5)',
            // 'rgba(255, 0, 0, 0.5)'
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
            // 'rgba(0, 255, 255, 0)',
            // 'rgba(0, 255, 255, 0.5)',
            // 'rgba(0, 191, 255, 0.5)',
            // 'rgba(0, 127, 255, 0.5)',
            // 'rgba(0, 63, 255, 0.5)',
            // 'rgba(0, 0, 255, 0.5)',
            // 'rgba(0, 0, 223, 0.5)',
            // 'rgba(0, 0, 191, 0.5)',
            // 'rgba(0, 0, 159, 0.5)',
            // 'rgba(0, 0, 127, 0.5)',
            // 'rgba(63, 0, 91, 0.5)',
            // 'rgba(127, 0, 63, 0.5)',
            // 'rgba(191, 0, 31, 0.5)',
            // 'rgba(255, 0, 0, 0.5)'
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
      console.log('Watching change: ' + text)
      this.getTwitterHeatMapData(text)
    }
  }
};
</script>