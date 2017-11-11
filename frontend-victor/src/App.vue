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
    <h1 class="title">First widget</h1>
    <HelloWorld/>
    <h1 class="title">Second widget</h1>
    <HelloWorld2/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import HelloWorld2 from './components/HelloWorld2'

export default {
  name: 'app',
  props: {
    searchText: {
      type: String,
      default: ''
    },
    placeholderText: {
      type: String,
      default: 'Search something...'
    },
    statusMessage: {
      type: String,
      default: 'Status'
    }
  },
  components: {
    HelloWorld,
    HelloWorld2
  },
  methods: {
    submitText: function () {
      this.statusMessage = 'Submitted: ' + this.searchText
    }
  }
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
