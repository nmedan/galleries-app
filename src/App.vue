<template>
  <div id="app">
    <nav-bar 
      :isAuthenticated="isAuthenticated" @userLoggedOut="logout"
    />
    <router-view @userAuthenticated="setAuthenticated"></router-view>
  </div>
</template>

<style>
  
</style>

<script>
  import NavBar from './components/NavBar.vue'
  import { authService } from './services/Auth'
  
  export default {
    name: 'app',
    components: {
      NavBar
    },
    data () {
      return {
        isAuthenticated: authService.isAuthenticated()
      }
    },
    methods: {
      setAuthenticated() {
        this.isAuthenticated=true;
      },
      
      logout() {
        authService.logout();
        this.isAuthenticated = false;
        this.$router.push({ name: 'login'})
      }
    }
  }
</script>
