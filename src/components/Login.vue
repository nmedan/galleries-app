<template>
  <div class="container mt-4">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div class="form-group row">
        <label for="email" class="col-2 col-form-label">Email</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" v-model="userLogin.email">
          </div>
        </div>		
      </div>
      <div class="form-group row">
        <label for="password" class="col-2 col-form-label">Password</label>
        <div class="col-4">
          <div class="input-group">
            <input type="password" class="form-control here" v-model="userLogin.password">
          </div>
        </div>		
      </div>
      <div class="form-group row">
        <div>
          <button name="submit" type="submit" class="btn btn-success">Submit</button>
        </div>
      </div>
      <p class="text-danger" v-if="error">The username or password is incorrect.</p>
    </form>
  </div>
</template>

<script>
  import { authService } from '../services/Auth'

  export default {
    data() {
      return {
        userLogin: {
          email: '',
          password: ''
        },
	    error: ''
      }
    },
    methods: {              
      login() {
        authService.login(this.userLogin.email, this.userLogin.password)
          .then(() => {
          this.$emit('userAuthenticated')
          this.$router.push({ name: 'galleries' })
          }).catch(error => {this.error = error.response.data.error})    
	    }
    }     
  }
</script>