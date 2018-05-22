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
  // if it doesnt match a route, go to the dashboard '/'
  } else if (to.matched.length == 0) {
    next("/")
  // if there is no user, dont navigate to the new route
  } else if (!store.state.user.email) {
    next(false)
  // if we passed all these statements, this is a valid route, proceed.
  } else {
    next()
  }
})

export default router