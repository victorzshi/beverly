<template>
  <div id="app">
    <Navbar></Navbar>
    <!-- Import logo image -->
    <div class="container">
      <img src="./assets/logo.png">
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

      </div>
    </div>
    <!-- Import Vue components -->
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <HeatMap v-bind:query="query" v-bind:status-message="statusMessage"></HeatMap>
        </div>
        <div class="column is-half">
          <h1 class="section title">Article List</h1>
          <Newslist v-bind:query="query"></Newslist>
        </div>
      </div>
    </div>

  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<!-- 

Justin don't touch anything below this

 -->

<script>
import HeatMap from './components/HeatMap'
import Newslist from './components/Newslist'
import Navbar from './components/Navbar'

export default {
  name: 'app',
  data: function() {
    return {
      searchText: '',
      placeholderText: 'How does the world feel about...',
      query: '',
      statusMessage: 'Nothing has happened',
      // source: ''
    }
  },
  components: {
    HeatMap,
    Newslist,
    Navbar
  },
  methods: {
    submitText: function () {
      this.statusMessage = 'User has submitted text'
      this.query = this.searchText
    }
  }
}
</script>
