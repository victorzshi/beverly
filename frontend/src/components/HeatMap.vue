<!-- HTML -->

<template>
  <div class="container">
    <span>Display child prop-passed message: {{ message }}</span>
    <div id="map"></div>
  </div>
</template>

<!-- CSS -->

<style scoped>
#map {
  width: 800px;
  height: 600px;
  margin: 0 auto;
  background: gray;
}
</style>
<!-- JS -->

<script>
export default {
  name: 'HeatMap',
  props: ['mapCenter','message'],
  data: function () {
    return {
      // Possibly pass an array of points, or grab it
      markerCoordinates: [{
        latitude: 51.501527,
        longitude: -0.1921837
      }, {
        latitude: 51.505874,
        longitude: -0.1838486
      }, {
        latitude: 51.4998973,
        longitude: -0.202432
      }]
    }
  },
  mounted: function () {
    const options = {
      zoom: 14,
      // center: new google.maps.LatLng(,-0.1921837)
      center: new google.maps.LatLng(this.mapCenter.lat,this.mapCenter.lng)
    }
    const map = new google.maps.Map(document.getElementById('map'), options);
    this.markerCoordinates.forEach((givenCoord) => {
      const position = new google.maps.LatLng(givenCoord.latitude, givenCoord.longitude);
      const marker = new google.maps.Marker({ 
        position,
        map
      })
    })
  }
};
</script>