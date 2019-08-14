import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Login from "./views/Login.vue";
import NotFound from "./views/404.vue";
import Home from "./views/Home.vue";
import Infoshow from "./views/Infoshow.vue";
import Blacklist from "./views/Blacklist.vue";

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        {path: '', component: Home},
        {path: '/home', name: 'home', component: Home},
        {path: '/infoshow', name: 'infoshow', component: Infoshow},
        {path: '/blacklist', name: 'blacklist', component: Blacklist}

      ]
    }, 
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '/404',
      component: NotFound
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.BWmelonApiToken ? true : false;
    if( to.path == '/login') {
      next();
    } else {
      isLogin ? next() : next('/login');
    }
})

export default router;