<template>
  <div>
    <Header></Header>
    <Homepage></Homepage>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import Homepage from '../components/Homepage'

export default {
  name: 'Home',
  components: {Homepage, Footer, Header}
}
</script>

<style scoped>
p {
color: black;
  margin-top: 80px;
}
</style>
