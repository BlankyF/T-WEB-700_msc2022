<template>
  <div class="vue-rss-feed">
    <Feed :feedUrl="feedUrl" :name="name" :limit="limit"/>
  </div>
</template>

<script>
import Feed from './Feed.vue'

export default {
  name: 'RssFeed',
  components: {
    Feed
  },
  props: {
    feedUrl: String,
    name: String,
    limit: Number
  }
}
</script>

<style scoped>
.vue-rss-feed {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  max-width: 600px;
  width: 100%;
  text-align: center;
  color: #2c3e50;
}
</style>
