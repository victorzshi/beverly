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
    <!-- v-bind:heat-map-data="heatMapData" -->
    <HeatMap v-bind:query="query" v-bind:status-message="statusMessage"></HeatMap>

  </div>
</template>

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

<!-- 

Justin don't touch anything below this

 -->

<script>
import HelloWorld from './components/HelloWorld'
import HeatMap from './components/HeatMap'

export default {
  name: 'app',
  data: function() {
    return {
      searchText: '',
      placeholderText: 'Search something...',
      query: '',
      statusMessage: 'Nothing has happened'
    }
  },
  components: {
    HelloWorld,
    HeatMap
  },
  methods: {
    submitText: function () {
      this.statusMessage = 'User has submitted text'
      this.query = this.searchText
    }
  }
}
</script>
