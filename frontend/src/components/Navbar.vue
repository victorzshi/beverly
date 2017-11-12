<!-- Component for the top navigation bars -->

<template lang="html">
<nav class="nav has-shadow">
  <div class="container">
    <div class="nav-left">

      <a class="nav-item" href="#">
        <h1 class="title has-text-centered">
         <p class="content has-text-light">BEVERLY</p>
       </h1>
      </a>
    </div>

    <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
    <span class="nav-toggle" v-on:click="toggleMenu">
      <span>
        <a class="nav-item has-text-light" v-on:click="openModal('about')">
          About
        </a>
      </span>
      <span></span>
      <span></span>
    </span>

    <!-- This "nav-menu" is hidden on mobile -->
    <div class="nav-right nav-menu" v-bind:class="{ 'is-active': menu_open }">
      <a class="nav-item" v-on:click="openModal('about')">
        <p class="content has-text-light">
          About
        </p>
      </a>
    </div>

    <!-- The modals for the various buttons -->
    <nav_about :visible="modals.about" v-on:closeModal="closeModal('about')"></nav_about>
  </div>
</nav>
</template>

<style>
.nav {
  background-color: #6666ff;
}
</style>

<!-- For each button, we will have a modal (preferably seperate components) -->
<script>
import nav_about from './nav_about.vue'

export default {
  name: 'Navbar',
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
  created: function () {

  }
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