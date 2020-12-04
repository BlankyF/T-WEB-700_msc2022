<template>
  <v-card class="loginCard">
    <h1> Login </h1>
    <v-text-field
      required
      v-model="username"
      placeholder="username"
      class="textFieldLogin"
      solo
      dense
    ></v-text-field>
    <v-text-field
      type="email"
      placeholder="email"
      class="textFieldLogin"
      solo
      dense
    ></v-text-field>
    <v-text-field
      required
      v-model="password"
      type="password"
      placeholder="password"
      class="textFieldLogin"
      solo
      dense
    ></v-text-field>
    <v-btn
      @click="initCheckForm"
      elevation="2"
      class="btnLogin"
    > Login </v-btn>
    <v-btn
      text
    >
      <router-link :to="'/register'" class="btnToRegister">
        Register ?
      </router-link>
    </v-btn>

    <v-alert
      v-if="hasErrorForm"
      type="error"
      outlined
    > {{errorMessage}}</v-alert>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'LoginForm',
  data () {
    return {
      username: '',
      password: '',
      hasErrorForm: false,
      errorMessage: ''
    }
  },
  methods: {
    initCheckForm () {
      this.hasErrorForm = false
      this.errorMessage = ''
      this.checkUsername()
    },
    checkUsername () {
      if (this.username === '') {
        this.hasErrorForm = true
        this.errorMessage += 'Username requis. '
      }
      this.checkPassword()
    },
    checkPassword () {
      this.isEmptyPassword()
      if (!this.hasErrorForm) {
        this.login()
      } else {
        this.removeError()
      }
    },
    isEmptyPassword () {
      if (this.password === '') {
        this.hasErrorForm = true
        this.errorMessage += 'Mot de passe requis. '
      }
    },
    removeError () {
      setTimeout(() => {
        this.errorMessage = ''
        this.hasErrorForm = false
      }, 3000)
    },
    login: function () {
      axios.post('http://localhost:3000/users/login', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          if (response.data.token) {
            localStorage.setItem('JWT', response.data.token)
            localStorage.setItem('UserId', response.data.id)
            this.$router.push({name: 'Home'})
          } else {
            this.errorMessage = response.data
            this.hasErrorForm = true
            this.removeError()
          }
        })
        .catch(error => {
          this.errorMessage = error.response.data
          this.hasErrorForm = true
          this.removeError()
        })
    }
  }
}
// recup token localStorage.getItem("JWT")
// remove token localStorafe.removeItem("JWT")
</script>

<style scoped>
  .loginCard {
    background-color: #F9C81D;
    height: 70%;
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  h1 {
    margin-top: 30px;
    text-align: center;
  }

  .textFieldLogin {
    margin: 20px;
    background-color: #F9C81D;
  }

  .btnLogin {
    position: absolute;
    margin-bottom: 60px;
    left: 40%;
  }

  .btnToRegister {
    text-decoration: none;
    color: white;
    margin: 30px;
  }
</style>
