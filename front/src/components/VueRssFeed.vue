<template>
  <div class="vue-rss-feed">
    <Feed :feedUrl="feedUrl" :name="name" :limit="limit"/>
  </div>
</template>

<script>
import Feed from './Feed'

export default {
  name: 'VueRssFeed',
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
  text-align: center;
  color: #2c3e50;
}
</style>
