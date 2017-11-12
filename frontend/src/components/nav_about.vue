<template lang="html">
<transition name="fade">
<div class="modal is-active" v-if="visible">
  <div class="modal-background" v-on:click="closeModal"></div>
  <div class="modal-content">
    <div class="box">
      <div class="content">
        <h1>About Beverly</h1>
        <p class="has-text-centered">
          Beverly is a dynamic, real-time sentiment analysis tool that links the Twitter world's emotions with current events. Any keyword can be analyzed and visualized upon a map of the United States to gain insight into how the population is feeling.
          <br>
          <br>
          Authors:
          <br>
          <br>
          Andrew McCann - Back-end development and ideation
          <br>
          Justin Koh - Front-end development and design
          <br>
          Lincoln Berkley - Back-end development and API hacker
          <br>
          Victor Shi - Front-end development and middleware connection
          <br>
          <br>
          Built for HackPrinceton 2017
        </p>
        <a href="https://github.com/VictoryShoe/hackprinceton-app">
          Visit our project GitHub!
        </a>
      </div>
    </div>
  </div>
  <button class="modal-close" v-on:click="closeModal"></button>
</div>
</transition>
</template>

<script>
export default {
  name: 'nav_about',
  props: ['visible'],
  data: function () {
    return {
      
    }
  },
  created: function () {

  },
  methods: {
    closeModal: function () {
      this.$emit('closeModal');
    }
  }
}
</script>