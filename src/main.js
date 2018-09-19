import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Galleries from './components/Galleries.vue'
import { authService } from './services/Auth'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/galleries' },
  { path: '/galleries', component: Galleries, name: 'galleries' },
  { path: '/login', component: Login, name: 'login' },
  { path: '/register', component: Register, name: 'register' }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (authService.isAuthenticated() && (to.name == 'login' || to.name == 'register')) {
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
