<template>
  <div>
    <Header></Header>
    <h1> Articles - Flux RSS </h1>
    <p v-if="!isLogged">  Vous avez accès seulement au dernier article de notre bibliothèque  </p>
    <SelectRSSFeed></SelectRSSFeed>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import SelectRSSFeed from '../components/SelectRSSFeed'
export default {
  name: 'Press',
  components: {SelectRSSFeed, Footer, Header},
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
