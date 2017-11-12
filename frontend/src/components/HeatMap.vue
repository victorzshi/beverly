<template>
  <div class="container">
    <span>Display child prop-passed message: {{ message }}</span>

<!--     <div id="filters-panel">
      <div class="field">
        <a class="button" v-on:click="toggleHeatmap()">Toggle Heatmap</a>
      </div>
    </div> -->

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
  props: ['mapCenter', 'heatmapData', 'message'],
  data: function () {
    return {
      markerCoordinates: [{
        latitude: 51.501527,
        longitude: -0.1921837
      }, {
        latitude: 51.505874,
        longitude: -0.1838486
      }, {
        latitude: 51.4998973,
        longitude: -0.202432
      }],
    }
  },
  mounted: function () {
    const element = document.getElementById('map')
    const options = {
      zoom: 14,
      // London? Show markers
      // center: new google.maps.LatLng(51.501527,-0.1921837)
      // San Francisco show the heat map
      center: new google.maps.LatLng(37.774546, -122.433523)
    }
    const map = new google.maps.Map(element, options);

    this.markerCoordinates.forEach((coord) => {
      const position = new google.maps.LatLng(coord.latitude, coord.longitude);
      const marker = new google.maps.Marker({ 
        position,
        map
      });
    });

    let heatmapData = [
      new google.maps.LatLng(37.782, -122.447),
      new google.maps.LatLng(37.782, -122.445),
      new google.maps.LatLng(37.782, -122.443),
      new google.maps.LatLng(37.782, -122.441),
      new google.maps.LatLng(37.782, -122.439),
      new google.maps.LatLng(37.782, -122.437),
      new google.maps.LatLng(37.782, -122.435),
      new google.maps.LatLng(37.785, -122.447),
      new google.maps.LatLng(37.785, -122.445),
      new google.maps.LatLng(37.785, -122.443),
      new google.maps.LatLng(37.785, -122.441),
      new google.maps.LatLng(37.785, -122.439),
      new google.maps.LatLng(37.785, -122.437),
      new google.maps.LatLng(37.785, -122.435)
    ];

    var heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatmapData
    });
    heatmap.setMap(map);

  }
};
</script>