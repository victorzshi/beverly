<!-- The container for the place page -->

<template lang="html">
  <div>

    <navbar></navbar>

    <div id="placepage" class="section container">

      <div class="column is-half">
        <div class="card">
          <place_map :coords="coords" :heatPlaces="heatPlaces"></place_map>
        </div>
      </div>

      <!-- Add more display cards -->

    </div>

  </div>
</template>

<!-- $route.params.id for place id -->
<script>
import router from '../router'
import api from '../api'

import navbar from '../components/navbar.vue'

// All the sub-components
import place_map from '../components/place/place_map.vue'

export default {
  name: 'place',
  components: {
    navbar,
    place_map,
  },
  data: function () {
    return {
      place_id: null,
      coords: {
        lat: null,
        lng: null
      },
      gmaps: null,
      graph_data: null,
      heatPlaces: null
    };
  },
  created: function () {
    this.gmaps = new google.maps.places.PlacesService(document.createElement('div'));
    this.updatePlace();
  },
  methods: {
    updatePlace: function() {
      this.place_id = this.$route.params.id;
      
      console.log('Place id: ' + this.place_id);

      // // Calls google maps for place getDetails
      this.gmaps.getDetails({ placeId: this.place_id }, (data, status) => {
      //   console.log(status);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          this.coords = {
            lat: 37.423021,
            lng: -122.083739
          };
        } else {
          alert('Error fetching place info');
        }
      });    

      // Calls backend for data
      api.getPlace(this, this.place_id, result => {
        console.log(result);
        this.graph_data = result.body.heatMap;
      });
    }
  }
}
</script>