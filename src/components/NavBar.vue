<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link class="navbar-brand" to="/">Galleries App</router-link>
    <div class="navbar-nav">
      <router-link class="nav-item nav-link" to="/">All galleries</router-link>
      <router-link class="nav-item nav-link" v-if="!isAuthenticated" to="/login">Login</router-link>
      <router-link class="nav-item nav-link" v-if="!isAuthenticated" to="/register">Register</router-link>
	    <router-link class="nav-item nav-link" v-if="isAuthenticated" to="/my-galleries">My Galleries</router-link>
	    <router-link class="nav-item nav-link" v-if="isAuthenticated" to="/create">Create New Gallery</router-link>
      <a href="#" class="nav-item nav-link" @click="logout" v-if="isAuthenticated">Logout</a>
    </div>
  </nav>
</template>

<script> 
  export default {
    props:{
      isAuthenticated: Boolean
    },
    components: {
    },
    methods: {
      logout() {
        this.$emit('userLoggedOut');
      }
    }
}
</script>