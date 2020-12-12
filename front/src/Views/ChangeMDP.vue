<template>
  <div>
    <Header></Header>
    <p> Ici ça change son MDP </p>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
export default {
  name: 'ChangeMDP',
  components: {Footer, Header}
}
</script>

<style scoped>
p {
  color: black;
  margin-top: 80px;
}

</style>
