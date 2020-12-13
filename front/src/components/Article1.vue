<template>
  <div>
    <v-card class="articleCard">
      <v-card class="articleImg">
        <v-img
          lazy-src="https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-12.jpg"
          max-height="100"
          max-width="100"
          src="https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-12.jpg">
        </v-img>
      </v-card>
      <p> Je suis un article </p>
      <v-divider></v-divider>
      <router-link :to="'/'" class="btnHeader"> lien vers article </router-link>
      <p> Description </p>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Article'
}
</script>

<style scoped>
  .articleCard {
    margin: 100px;
    height: 100%;
    width: 10%;
    background-color: #F9C81D;
  }
  .articleImg {
    background-color: white;
    height: 90%;
    width: 90%;
  }
</style>
