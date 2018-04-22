import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import Board from '@/components/Board'
import Register from '@/components/Register'
import store from "../store"

Vue.use(Router)

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/boards/:boardId',
      name: 'Board',
      component: Board
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
})


router.beforeEach((to, from, next) => {
  // to and from are both route objects
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else if (to.matched.length == 0) {
    next("/")
  } else if (!store.state.user.email) {
    next(false)
  } else {
    next()
  }
})

export default router