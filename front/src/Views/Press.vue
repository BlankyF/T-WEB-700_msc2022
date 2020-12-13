<template>
  <div>
    <Header></Header>
    <h1> Articles - Flux RSS </h1>
    <p v-if="!isLogged">  Vous avez accès seulement au dernier article de notre bibliothèque  </p>
    <VueRssFeed :feedUrl="feedUrl" :name="name" :limit="limit"/>
    <Footer></Footer>
  </div>
</template>

<script>
import VueRssFeed from '../components/VueRssFeed'
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  name: 'Press',
  components: {Footer, Header, VueRssFeed},
  data () {
    return {
      feedUrl: 'https://rss.app/feeds/cAN1yH3jU6nVYJvw.xml',
      name: '',
      limit: 5
    }
  },
  computed: {
    isLogged () {
      return !!localStorage.getItem('JWT')
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
