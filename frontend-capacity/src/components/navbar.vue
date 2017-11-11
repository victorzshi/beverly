<!-- Component for the top navigation bar -->

<template lang="html">
<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">

      <router-link class="nav-item" to="/">
        <!-- <img src="#" alt="logo"> -->
        <h1 class="title has-text-centered is-large">BVRLY</h1>
      </router-link>
    </div>

    <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
    <span class="nav-toggle" v-on:click="toggleMenu">
      <span>
        <a v-on:click="openModal('about')"></a>
      </span>
      <span></span>
      <span></span>
    </span>

    <!-- This "nav-menu" is hidden on mobile -->
    <div class="nav-right nav-menu" v-bind:class="{ 'is-active': menu_open }">
      <a class="nav-item" v-on:click="openModal('about')">
        About
      </a>
    </div>

    <!-- The modals for the various buttons -->
    <nav_about :visible="modals.about" v-on:closeModal="closeModal('about')"></nav_about>
  </div>
</nav>
</template>

<style>
.nav {
  background-color: #eeeeee;
}
</style>

<script>
// For each button, we will have a modal (preferably seperate components)
import nav_about from '../components/navmodals/nav_about.vue'

export default {
  name: 'navbar',
  components: {
    nav_about,
  },
  data: function () {
    return {
      menu_open: false,
      modals:{
        about: false,
      }
    }
  },
  methods: {
    // Button configurations
    toggleMenu: function () {
      this.menu_open = !this.menu_open;
    },
    openModal: function (name) {
      this.modals[name] = true;
    },
    closeModal: function (name) {
      this.modals[name] = false;
    }
  },
}
</script>

<style type="text/css">
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>