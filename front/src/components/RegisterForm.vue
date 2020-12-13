<template>
  <v-card class="registerCard">
    <h1> Register </h1>

    <v-text-field
      required
      v-model="username"
      type="username"
      placeholder="username"
      class="textFieldRegister"
      solo
      dense
    ></v-text-field>

    <v-text-field
      type="email"
      placeholder="email"
      class="textFieldRegister"
      solo
      dense
    ></v-text-field>

    <v-text-field
      required
      type="password"
      v-model="password"
      placeholder="password"
      class="textFieldRegister"
      solo
      dense
    ></v-text-field>

    <v-text-field
      v-model="passwordCheck"
      type="password"
      placeholder="confirm password"
      class="textFieldRegister"
      solo
      dense
    ></v-text-field>

    <v-btn
      @click="initCheckForm"
      elevation="2"
      class="btnRegister"
    > Register </v-btn>

    <v-btn
      text
    >
      <router-link :to="'/login'" class="btnToLogin">
        Login ?
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
  name: 'RegisterForm',
  data () {
    return {
      username: '',
      password: '',
      passwordCheck: '',
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
        this.errorMessage += 'Username requis'
      }
      this.checkPassword()
    },
    // checkEmail () {
    // const patternEmail = /^(([^<>()[]\.,;:\s@"]+(.[^<>()[]\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    isEmptyPassword () {
      if (this.password === '') {
        this.hasErrorForm = true
        this.errorMessage += 'Mot de passe requis'
      }
    },
    checkStrenghtPassword () {
      const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])(?=.{8,}).*$/
      const found = regexPassword.test(this.password)
      console.log(found)
      if (!found) {
        this.hasErrorForm = true
        this.errorMessage = 'Le mot de passe doit contenir 8 caractères dont 1 majuscule, 1 chiffre et 1 caractère spécial'
      }
    },
    checkPassword () {
      this.isEmptyPassword()
      if (this.password !== this.passwordCheck) {
        this.hasErrorForm = true
        this.errorMessage += 'Les mots de passes ne sont pas identiques'
        this.removeError()
      } else {
        this.checkStrenghtPassword()
        if (!this.hasErrorForm) {
          this.register()
        } else {
          this.removeError()
        }
      }
    },
    removeError () {
      setTimeout(() => {
        this.errorMessage = ''
        this.hasErrorForm = false
      }, 3000)
    },
    register () {
      axios.post('http://localhost:3000/users/register', {
        username: this.username,
        password: this.password
      })
        .then(response => {
          console.log(response)
          this.$router.push({name: 'Login'})
        })
        .catch(error => {
          console.log(error)
          this.errorMessage = error.response.data.error
          this.hasErrorForm = true
          this.removeError()
        })
    }
  }
}
</script>

<style scoped>
  .registerCard {
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

  .textFieldRegister {
    margin: 20px;
    background-color: #F9C81D;
  }

  .btnRegister {
    position: absolute;
    margin-bottom: 40px;
    left: 40%;
  }

  .btnToLogin {
    text-decoration: none;
    color: white;
    margin: 30px;
  }
</style>
