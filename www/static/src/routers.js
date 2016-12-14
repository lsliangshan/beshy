/**
 * Created by liang.shan on 2016/11/16.
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from 'components/404.vue'
import Home from 'components/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes
})

export default router
