import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../page/Index.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Hello
    }
  ]
})
