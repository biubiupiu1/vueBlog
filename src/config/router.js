import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../page/Index.vue'
import Tags from '../page/Tags.vue'
import About from '../page/About.vue'
import Article from '../page/article.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Hello
    },
    {
      path: '/tags',
      name: 'Tags',
      component: Tags
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/article/:id',
      name: 'Article',
      component: Article
    }
  ]
})
