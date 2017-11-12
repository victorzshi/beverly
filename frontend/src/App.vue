<template>
  <div id="app">
    <!-- Import logo image -->
    <div class="container">
      <img src="./assets/logo.png">
    </div>
    <!-- Some display text -->
    <div class="container">
      <h1 class="title has-text-centered">Welcome to BVRLY</h1>
    </div>
    <!-- Search bar -->
    <div class="container">
      <div class="column is-half is-offset-one-quarter">
        <div id="search-bar" class="control has-icon has-icon-right">
          <input class="input is-large" type="text"
            v-model="searchText"
            v-on:keyup.enter="submitText"  
            v-bind:placeholder="placeholderText">
          <span class="icon is-small">
            <i id="search-icon" class="fa fa-search"></i>
          </span>
        </div>

        <!-- Testing -->
        <p>{{ statusMessage }}</p>

      </div>
    </div>
    <!-- Import Vue components -->
    <HeatMap v-bind:map-center="mapCenter" v-bind:message="message"></HeatMap>

  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import HeatMap from './components/HeatMap'

export default {
  name: 'app',
  data: function() {
    return {
      searchText: '',
      placeholderText: 'Search something...',
      statusMessage: 'Status',
      // Temporary san fran
      mapCenter: {
        // lat: 51.501527,
        lat: 37.774546,
        // lng: -0.1921837
        lng: -122.433523
      },
      message: 'test message'
    }
  },
  components: {
    HelloWorld,
    // HelloWorld2
    HeatMap
  },
  methods: {
    submitText: function () {
      this.statusMessage = 'Submitted: ' + this.searchText
    },
    // updatePlace: function() {
    //   this.place_id = this.$route.params.id

    //   console.log('place id: ' + this.place_id)

    //   // Calls google maps for place getDetails
    //   this.gmaps.getDetails({ placeId: this.place_id }, (data, status) => {
    //     console.log(status)

    //     if (status == google.maps.places.PlacesServiceStatus.OK) {
    //       console.log(data)
    //       this.name = data.name
    //       this.address = data.formatted_address
    //       // this.type = data.types[0]
    //       // this.rating = data.rating
    //       const lat = data.geometry.location.lat()
    //       const lng = data.geometry.location.lng()

    //       this.coords = {
    //         lat: lat,
    //         lng: lng
    //       }

    //       // get suggested places
    //       this.gmaps.nearbySearch({
    //           location: this.coords,
    //           type: this.type,
    //           radius: 5000,
    //           // openNow: true,
    //           rankBy: google.maps.places.RankBy.PROMINENCE
    //         }, (data, status) => {
    //           console.log('NOTICE')
    //           console.log(data)
    //           this.nearby = data
    //         let suggested = []
    //         if (status == google.maps.places.PlacesServiceStatus.OK) {
    //           suggested = data.filter(place => {
    //             return this.place_id != place.place_id
    //           })
    //           this.recommended = suggested
    //           console.log(suggested)
    //         } 
    //         else {
    //           suggested = []
    //           this.recommended = suggested
    //         }

    //         let placeList = []
    //         let compcontext = this

    //         let findCAP = function (places) {
    //           console.log(places.length)

    //           if (places.length <= 0) {
    //             compcontext.heatPlaces = placeList
    //             console.log(compcontext.heatPlaces)
    //             return
    //           }
    //           api.getPlace(compcontext, places[0].place_id, result => {
    //             placeList.push(result)
    //             findCAP(places.slice(1))
    //           })
    //         }

    //         console.log('NOTICE')
    //         console.log(data)
    //         findCAP(data)
    //       })  
    //     } else {
    //       alert('error fetching place info')
    //     }
    //   })    

    //   // Calls backend for data
    //   api.getPlace(this, this.place_id, result => {
    //     console.log(result)
    //     this.graph_data = result.body.heatMap
    //   })
    // },
  },
  created: function () {
    // this.gmaps = new google.maps.places.PlacesService(document.createElement('div'))
    // this.updatePlace()
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
