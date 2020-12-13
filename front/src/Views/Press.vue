<template>
  <div>
    <Header></Header>
    <h1> Articles - Flux RSS </h1>
    <p v-if="!isLogged">  Vous avez accès seulement au dernier article de notre bibliothèque  </p>
    <v-row>
      <v-col class="examples">
        <h3> Autres Flux </h3>
        <ul>
          <li>
            <a
              href="https://rss.app/feeds/cAN1yH3jU6nVYJvw.xml"
              @click="loadExample"
            >99 bitcoin</a>
          </li>
          <li>
            <a
              href="https://rss.app/feeds/YxkSC62K6JgmWxq6.xml"
              @click="loadExample"
            >Google news: Bitcoin</a>
          </li>
          <li>
            <a
              href="https://rss.app/feeds/DJf78F9cmjUoWYzw.xml"
              @click="loadExample"
            >Bitcoin Magazine</a>
          </li>
        </ul>
      </v-col>
      <v-col class="powered-rss-app">
        Powered by
        <a href="https://rss.app">RSS.app</a>
      </v-col>
    </v-row>
    <v-container>
      <div class="preview-vue-rss-feed">
        <RssFeed :feedUrl="feedUrl" :name="name" :limit="limit"/>
      </div>
    </v-container>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import RssFeed from '../components/RssFeed'

export default {
  name: 'Press',
  components: {RssFeed, Footer, Header},
  computed: {
    isLogged () {
      return !!localStorage.getItem('JWT')
    }
  },
  data () {
    return {
      feedUrl: 'https://rss.app/feeds/cAN1yH3jU6nVYJvw.xml',
      name: '',
      limit: 0,
      rssFeedForm: {
        feedUrl: 'https://rss.app/feeds/cAN1yH3jU6nVYJvw.xml'
      }
    }
  },
  mounted () {
    this.returnLimit()
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
    returnLimit () {
      if (localStorage.getItem('JWT')) {
        this.limit = 10
      } else {
        this.limit = 1
      }
    },
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

<style scoped>
h1 {
  color: black;
  margin-top: 80px;
}

</style>
