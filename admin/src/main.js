import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
import articleList from './component/ArticleList.vue'
import articleEdit from './component/ArticleEdit.vue'
import atricleLabel from './component/ArticleLabel.vue'
import articlePreview from './component/ArticlePreview.vue'

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
	routes: [
        { path: '/', redirect: '/articleList/all' },
		{path: '/articleList/:state', component: articleList,name: "articleList",
		    children: [
                {path: 'articleEdit/:id', component: articleEdit,name: "articleEdit"},
                {path: 'articlePreview/:id', component: articlePreview,name: "articlePreview"},
            ]
		},
        {path: '/atricleLabel/whenlable', component: articleList},
		{path: '/atricleLabel', component: atricleLabel},
		// {path: '/about', component: about},
		// {path: '/articleDetails:id', component: articleDetails},
		// {path: '/classify', component: classify},
		// {path: '/label', component: label},
	]
})

new Vue({
  	el: '#app',
  	router: router,
  	render: h => h(App)
})
