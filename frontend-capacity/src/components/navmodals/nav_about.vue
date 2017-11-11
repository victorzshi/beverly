<template lang="html">
<transition name="fade">
<div class="modal is-active" v-if="visible">
  <div class="modal-background" v-on:click="closeModal"></div>
  <div class="modal-content">
    <div class="box">
      <div class="content">
        <h1>About Bvrly</h1>
        <p class="has-text-left">
          Capture a nation's emotional profile. Bvrly parses and analyzes the latest datasets of information for you, and  presents it in a beautiful visual map display.
          <br><br>
          This tool is designed to help everyone, from curious personalities to research endeavours, to get a more accurate and fact-based nation wide perspective on any topic at just a glace.
        </p>
        <a href="#">
          Built for HackPrinceton 2017!
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
  methods: {
    closeModal: function () {
      this.$emit('closeModal');
    }
  }
}
</script>