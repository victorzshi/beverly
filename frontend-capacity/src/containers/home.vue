<template lang="html">
<section class="hero is-fullheight">

  <div id="hero-body-id" class="hero-body">
    <div class="container">
      <h1 class="title has-text-centered">Welcome to BVRLY</h1>
      <!-- Centered column -->
      <div class="column is-half is-offset-one-quarter">
        <div id="search-bar" class="control has-icon has-icon-right">
          <input v-model="search_text" v-on:keyup.enter="submit_text" class="input is-large" type="text" v-bind:placeholder="placeholder_text">
          <span class="icon is-small">
            <i id="search-icon" v-on:click="submit_text" class="fa fa-search"></i>
          </span>
        </div>
      </div>
    </div>
  </div>

</section>
</template>

<style scoped>
.title {
  color: white;
}
#hero-body-id {
  background: linear-gradient(rgba(0, 0, 200, 0.5), rgba(0, 126, 0, 0.5));
  background-position: center top;
  background-size: cover !important;
}
#hero-body-id img {
  margin-bottom: 10%;
}
#search-bar {
  margin-bottom: 0;
}
#search-icon {
  z-index: 3;
}
</style>

<script>

import router from '../router'

export default {
  name: 'home',
  data: function () {
    return {
      default_location: { // London, Ontario
        lat: 42.9849,
        lng: 81.2453
      },
      location: {
        lat: null,
        lng: null
      },
      search_text: '',
      search_rad: 10000,
      autocomplete: null,
      suggestions: [],
      placeholder_nouns: [
        'People',
        'Politics',
        'Technology',
        'Entertainment',
        'Food',
        'Travel',
        'Business',
        'Shopping',
        'Health',
        ],
      placeholder_text: ''
    }
  },
  methods: {
    selectPlace: function (place) {
      // Route to the place page
      console.log("Redirecting to: " + place);
      router.push({ name: 'place', params: { id: place.place_id }})
    },
    // When enter key is pressed in search bar, return first place page
    submit_text: function() {
      if (this.suggestions.length !== 0) {
        this.selectPlace(this.suggestions[0])
      }
    }
  },
  created: function() { // Component initialization: variables, etc...

    this.location.lat = this.default_location.lat;
    this.location.lng = this.default_location.lng;

    // Initialize autocompleteservice
    this.autocomplete = new google.maps.places.AutocompleteService();

    // Generate random numbers
    var list_length = this.placeholder_nouns.length;
    console.log("List length: " + list_length);
    function randomPlaceIndex(array_length) {
      // Returns int from 0 to array.length - 1
      return Math.floor(Math.random() * array_length);
    }

    var first, second, third; 
    first = randomPlaceIndex(list_length);
    do {
      second = randomPlaceIndex(list_length);
    }
    while (second === first);
    do {
      third = randomPlaceIndex(list_length);
    }
    while (third === first || third === second);

    console.log("First: " + first)
    console.log("Second: " + second);
    console.log("Third: " + third);
    // Add 3 elements to placeholder_array
    var placeholder_array = [];
    placeholder_array.push(this.placeholder_nouns[first]);
    placeholder_array.push(this.placeholder_nouns[second]);
    placeholder_array.push(this.placeholder_nouns[third]);

    // Add to text that displays within search bar
    this.placeholder_text += placeholder_array[0];
    // this.placeholder_text += ', ' + placeholder_array[1].toLowerCase();
    // this.placeholder_text += ', anywhere';
    for (var i = 1; i < 3; i++) {
      this.placeholder_text += ', ' + placeholder_array[i].toLowerCase();
    }
    this.placeholder_text += '...';

  },
  
  // Fires off events on data changes
  watch: {

    // When user types something into the searchbar
    search_text: function (new_text) {

      // Calls google autocomplete and updates data
      const latlng = new google.maps.LatLng(this.location.lat, this.location.lng);
      if (new_text != '') {
        this.autocomplete.getPlacePredictions(
          {
            location: latlng,
            radius: this.search_rad,
            types: ['establishment'],
            input: new_text
          },
          (response, status) => {

            if (status != google.maps.places.PlacesServiceStatus.OK) {
              console.warn(status);
            } else {
              this.suggestions = response;
            }
          }
        );
      } else {
        this.suggestions = [];
      }
    }
  }
}
</script>