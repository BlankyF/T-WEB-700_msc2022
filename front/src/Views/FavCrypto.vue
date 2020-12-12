<template>
  <div>
    <Header></Header>
    <p> Bonjour ici toute les crytpo favorites</p>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  name: 'FavCrypto',
  components: {Footer, Header}
}
</script>

<style scoped>
p {
  color: black;
  margin-top: 80px;
}

</style>
