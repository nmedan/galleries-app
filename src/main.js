import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import { authService } from './services/Auth'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/galleries' },
  { path: '/galleries', name: 'galleries' },
  { path: '/login', component: Login, name: 'login' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (!authService.isAuthenticated() && to.name != 'login') {
    next('login');
  }
  else if (authService.isAuthenticated() && to.name == 'login') {
    next('galleries');
  }
  else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
