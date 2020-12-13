import Vue from 'vue'
import Router from 'vue-router'
import Home from '../Views/Home'
import Register from '../Views/Register'
import Login from '../Views/Login'
import Press from '../Views/Press'
import FavCrypto from '../Views/FavCrypto'
import ChangeMDP from '../Views/ChangeMDP'
import NotFound from '../components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/press',
      name: 'Press',
      component: Press
    },
    {
      path: '/favCrytpo',
      name: 'FavCrytpo',
      component: FavCrypto
    },
    {
      path: '/changeMDP',
      name: 'ChangeMDP',
      component: ChangeMDP
    }
  ]
})
