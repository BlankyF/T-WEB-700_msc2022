<template>
  <div>
    <Header></Header>
    <ChangeMDPForm></ChangeMDPForm>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from '../components/Header'
import Footer from '../components/Footer'
import ChangeMDPForm from '../components/ChangeMDPForm'
export default {
  name: 'ChangeMDP',
  components: {ChangeMDPForm, Footer, Header}
}
</script>

<style scoped>
p {
  color: black;
  margin-top: 80px;
}

</style>
