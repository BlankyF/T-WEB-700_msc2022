/* eslint-disable */
<template>
  <div id="app">
      <v-app-bar dense fixed app height="70px">
        <router-link :to="'/'" class="btnHeader">
          <v-img
            lazy-src="https://image.winudf.com/v2/image1/bmV0LmRld2VwLmludHJhbmV0ZXBpdGVjaF9pY29uXzE1NjcwMTU4MzhfMDU5/icon.png?w=340&fakeurl=1"
            max-height="50"
            max-width="50"
            src="https://image.winudf.com/v2/image1/bmV0LmRld2VwLmludHJhbmV0ZXBpdGVjaF9pY29uXzE1NjcwMTU4MzhfMDU5/icon.png?w=340&fakeurl=1"
          ></v-img>
        </router-link>
        <v-toolbar-title style="margin-left: 20px">
          <router-link :to="'/'" class="btnHeader"> Epitech Cryptocurrencies Dashboard </router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text>
            <router-link :to="'/'" class="btnHeader"> Home </router-link>
          </v-btn>
          <v-btn text>
            <router-link :to="'/press'" class="btnHeader"> Press </router-link>
          </v-btn>
          <v-btn text v-if="!isLogged">
            <router-link :to="'/register'" class="btnHeader"> Register </router-link>
          </v-btn>
          <v-btn text v-if="isLogged" @click="logout" class="btnHeader">
              Logout
          </v-btn>
          <v-menu
            down
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                v-if="isLogged">
                <v-img
                  lazy-src="https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-12.jpg"
                  max-height="50"
                  max-width="50"
                  src="https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-12.jpg">
                </v-img>
              </v-btn>
            </template>

            <v-list>
              <v-list-item>
                <v-list-item-title>
                  <v-row>
                    <v-col>
                      <p> John Doe </p>
                    </v-col>
                    <v-col>
                      <v-img
                        lazy-src="https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-12.jpg"
                        max-height="30"
                        max-width="30"
                        src="https://icon-library.com/images/anonymous-user-icon/anonymous-user-icon-12.jpg"
                        style="margin-left: 50%">
                      </v-img>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
                <v-list-item>
                  <router-link :to="'/favCrytpo'" class="btnHeader"> Cryptomonnaies </router-link>
                </v-list-item>
                <v-list-item>
                  <router-link :to="'/press'" class="btnHeader"> Press </router-link>
                </v-list-item>
                <v-list-item>
                  <router-link :to="'/changeMDP'" class="btnHeader"> Changer mot de passe </router-link>
                </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar-items>
      </v-app-bar>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  },
  methods: {
    logout () {
      localStorage.removeItem('JWT')
      this.$router.push({name: 'Login'})
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
  .btnHeader {
    text-decoration: none;
    color: black;
  }
</style>
