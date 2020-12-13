<template>
  <v-container>
    <v-main>
      <v-row>
        <v-col :span="12">
          <div class="preview-vue-rss-feed">
            <VueRssFeed :feedUrl="feedUrl" :name="name" :limit="limit"/>
          </div>
        </v-col>
        <v-col :span="12">
          <div style="margin: 20px;"></div>
          <div class="examples">
            <h3> Autres Flux </h3>
            <ul>
              <li>
                <a
                  href="https://rss.app/feeds/cAN1yH3jU6nVYJvw.xml"
                  @click="loadExample"
                > 99 BitCoins </a>
              </li>
              <li>
                <a
                  href="https://rss.app/feeds/YxkSC62K6JgmWxq6.xml"
                  @click="loadExample"
                > Google news: Bitcoin </a>
              </li>
            </ul>
          </div>
          <v-row class="powered-rss-app">
            Powered by
            <a href="https://rss.app"> RSS.app </a>
          </v-row>
        </v-col>
      </v-row>
    </v-main>
  </v-container>
</template>

<script>
import VueRssFeed from './VueRssFeed'

const PIXALS_FROM_BOTTOM = 200

export default {
  name: 'SelectRSSFeed',
  components: {
    VueRssFeed
  },
  data () {
    return {
      feedUrl: 'https://rss.app/feeds/cAN1yH3jU6nVYJvw.xml',
      name: '',
      limit: 5,
      rssFeedForm: {
        feedUrl: 'https://rss.app/feeds/cAN1yH3jU6nVYJvw.xml'
      }
    }
  },
  mounted () {
    this.scrollEvent = window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - PIXALS_FROM_BOTTOM
      ) {
        this.increaseLimit()
      }
    })
  },
  destroyed () {
    if (this.scrollEvent) {
      window.removeEventListener(this.scrollEvent)
    }
  },
  methods: {
    increaseLimit (loadMore = 5) {
      this.limit += loadMore
    },
    loadExample (evt) {
      evt.preventDefault()
      this.rssFeedForm.feedUrl = evt.toElement.href
      this.feedUrl = evt.toElement.href
    }
  },
  watch: {
    getFeedUrl () {
      return this.feedUrl
    }
  }
}
</script>

<style>
body {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.examples h3 {
  color: #2c3e50;
  font-weight: normal;
  margin: 0;
}

.examples ul {
  margin: 10px;
}

.examples li {
  margin-bottom: 5px;
}

.examples a {
  color: #ff641b;
  margin-bottom: 5px;
}

a {
  color: #ff641b;
}

.powered-rss-app {
  margin-top: 20px;
  font-size: 13px;
}

.el-header h1 {
  margin: 0;
  font-weight: 400;
}

.nav-left img {
  margin-right: 5px;
}
</style>
