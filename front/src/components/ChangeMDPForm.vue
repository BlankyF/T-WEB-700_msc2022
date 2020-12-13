<template>
  <v-card class="loginCard">
    <h1> Modifier mot de passe </h1>
    <v-text-field
      required
      v-model="currentPassword"
      type="password"
      placeholder="Mot de passe actuel"
      class="textFieldLogin"
      solo
      dense>
    </v-text-field>
    <v-text-field
      required
      v-model="newPassword"
      type="password"
      placeholder="Nouveau mot de passe"
      class="textFieldLogin"
      solo
      dense>
    </v-text-field>
    <v-text-field
      required
      v-model="ConfirmnewPassword"
      type="password"
      placeholder="Confirmation nouveau de passe"
      class="textFieldLogin"
      solo
      dense>
    </v-text-field>
    <v-btn
      @click="initCheckForm"
      elevation="2"
      class="btnChange">
      Changer
    </v-btn>

    <v-alert
      v-if="hasErrorForm"
      type="error"
      outlined>
      {{errorMessage}}
    </v-alert>
  </v-card>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChangeMDPForm',
  data () {
    return {
      currentPassword: '',
      newPassword: '',
      confirmnewPassword: '',
      hasErrorForm: false,
      errorMessage: ''
    }
  },
  methods: {
    initCheckForm () {
      this.hasErrorForm = false
      this.errorMessage = ''
      this.checkNewPassword()
    },
    checkNewPassword () {
      if (this.newPassword === '') {
        this.hasErrorForm = true
        this.errorMessage += 'Nouveau mot de passe vide '
      }
      this.checkPassword()
    },
    checkPassword () {
      this.isEmptyPassword()
      if (!this.hasErrorForm) {
        this.ChangePassword()
      } else {
        this.removeError()
      }
    },
    isEmptyPassword () {
      if (this.confirmnewPassword === '') {
        this.hasErrorForm = true
        this.errorMessage += 'Confirmation vide '
      }
    },
    removeError () {
      setTimeout(() => {
        this.errorMessage = ''
        this.hasErrorForm = false
      }, 3000)
    },
    ChangePassword: function () {
      axios.post('http://localhost:3000/users/changeMDPForm', {
        newPassword: this.password
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

.btnChange {
  position: absolute;
  margin-bottom: 60px;
  left: 35%;
}

</style>
