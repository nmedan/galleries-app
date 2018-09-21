import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Login from './pages/Login.vue'
import Register from './pages/Register.vue'
import Galleries from './pages/Galleries.vue'
import AuthorsGalleries from './pages/AuthorsGalleries.vue'
import UsersGalleries from './pages/UsersGalleries.vue'
import ViewGallery from './pages/ViewGallery.vue'
import GalleryForm from './pages/GalleryForm.vue'
import { authService } from './services/Auth'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)

const routes = [
  { path: '/', redirect: '/galleries' },
  { path: '/galleries', component: Galleries, name: 'galleries' },
  { path: '/my-galleries', component: UsersGalleries, name: 'my-galleries' },
  { path: '/galleries/:id', component: ViewGallery, name: 'view-gallery' },
  { path: '/authors/:id', component: AuthorsGalleries, name: 'authors-galleries' },
  { path: '/create', component: GalleryForm, name: 'create' },
  { path: '/edit/:id', component: GalleryForm, name: 'edit' },
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
