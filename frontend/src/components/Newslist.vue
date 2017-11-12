<template>
  <div class="section container">

    <h1 class="title">Article List</h1>

    <div class="container">
      <!-- <a class="media" v-for="article in articles"> -->
      <a class="media" v-for="index in 4">
        <figure class="media-left">
          <p class="image is-64x64">
            <img v-bind:src="articles[index].thumbnail">
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <p>
              <a v-bind:href="articles[index].url" target="_blank"> {{ articles[index].name }}</a>
            </p>
          </div>
        </div>
      </a>
    </div>

  </div>
</template>
<script>
export default {
  name: 'newslist',
  props: ['query'],
  data () {
    return {
      articles: []
    }
  },
  methods: {
    updateSource: function (query) {
      this.$http.get('https://lberkley.lib.id/twitter-map@dev/newsDisplay/?searchTerm=' + query)
       .then(response => {
         console.log(response.data.articles);
         this.articles = response.data.articles;
         /*for(let i in articles) {
            console.log(articles[i])
         }*/
       });   
    }
  },
  created: function () {
    this.updateSource(query);
  },
  watch: {
    query: function (val) {
      console.log('Watching article change')
      this.updateSource(val);
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .media-object {
    width: 128px;
    padding: 10px;
  }
  .media {
    border-top: 1px solid lightgray;
    padding-top: 20px;
  }
</style>