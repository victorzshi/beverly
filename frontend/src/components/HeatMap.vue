<template>
  <div class="container">
    <span>Display child prop-passed message: {{ message }}</span>
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
  props: ['mapCenter', 'heatMapData', 'message'],
  data: function () {
    return {
      map: null,
      heatmap: null,
      // Possibly pass an array of points, or grab it
      // markerCoordinates: [{
      //   latitude: 51.501527,
      //   longitude: -0.1921837
      // }, {
      //   latitude: 51.505874,
      //   longitude: -0.1838486
      // }, {
      //   latitude: 51.4998973,
      //   longitude: -0.202432
      // }]
    }
  },
  methods: {
    initMap: function () {

    }
  },
  mounted: function () {
    // Map settings
    const options = {
      center: new google.maps.LatLng(this.mapCenter.lat,this.mapCenter.lng),
      mapTypeControl: false,
      fullscreenControl: false,
      zoom: 13,
      streetViewControl: false,
      styles: [
        {
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [
            {
              // "visibility": "off"
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            },
            {
              "hue": "#0066ff"
            },
            {
              "saturation": 74
            },
            {
              "lightness": 100
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              // "visibility": "simplified"
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            },
            {
              "weight": 0.6
            },
            {
              "saturation": -85
            },
            {
              "lightness": 61
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "all",
          "stylers": [
            {
              // "visibility": "simplified"
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "all",
          "stylers": [
            {
              // "visibility": "simplified"
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              // "visibility": "simplified"
              "visibility": "on"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            },
            {
              "color": "#5f94ff"
            },
            {
              "lightness": 26
            },
            {
              "gamma": 5.86
            }
          ]
        }
      ]
    }

    // Create Google map
    this.map = new google.maps.Map(document.getElementById('map'), options);
    // this.markerCoordinates.forEach((givenCoord) => {
    //   const position = new google.maps.LatLng(givenCoord.latitude, givenCoord.longitude);
    //   const marker = new google.maps.Marker({ 
    //     position,
    //     map
    //   })
    // })
    
  }
};
</script>