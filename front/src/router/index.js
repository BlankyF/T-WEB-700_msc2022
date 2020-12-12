import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import Register from '../components/Register'
import Home from '../components/Home'
import Press from '../components/Press'
import Article from '../components/Article'
import NotFound from '../components/NotFound'
import User from '../components/User'
import UserCrypto from '../components/UserCrypto'

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
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/press',
      name: 'Press',
      component: Press
    },
    {
      path: '/article/:articleID',
      name: 'Article',
      component: Article
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/user/crypto',
      name: 'UserCrypto',
      component: UserCrypto
    }
  ]
})
