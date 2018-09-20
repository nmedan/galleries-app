<template>
  <div class="container mt-4">
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div class="form-group row">
        <label for="first_name" class="col-2 col-form-label">First name</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" v-model="user.first_name">
          </div>
		  <p class="text-danger" v-if="errors.first_name">{{ errors.first_name[0] }}</p>
        </div>		
      </div>
      <div class="form-group row">
        <label for="last_name" class="col-2 col-form-label">Last name</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" v-model="user.last_name">
          </div>
		  <p class="text-danger" v-if="errors.last_name">{{ errors.last_name[0] }}</p>
        </div>		
      </div>
      <div class="form-group row">
        <label for="email" class="col-2 col-form-label">Email</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" v-model="user.email">
          </div>
		     <p class="text-danger" v-if="errors.email">{{ errors.email[0] }}</p>
        </div>		
      </div>
      <div class="form-group row">
        <label for="password" class="col-2 col-form-label">Password</label>
        <div class="col-4">
          <div class="input-group">
            <input type="password" id="password" name="password" class="form-control here" v-model="user.password">
          </div>
		      <p class="text-danger" v-if="errors.password">{{ errors.password[0] }}</p>
        </div>		
      </div>
	  <div class="form-group row">
        <label for="password_confirmation" class="col-2 col-form-label">Confirm password</label>
        <div class="col-4">
          <div class="input-group">
            <input type="password" id="password_confirmation" name="password_confirmation" v-model="user.password_confirmation" class="form-control here">
          </div>
        </div>		
      </div>
      <div class="form-group row">
        <div>
          <button name="submit" type="submit" class="btn btn-success">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { authService } from '../services/Auth'

  export default {
    data() {
      return {
        user: {
		      first_name: '',
          last_name: '',
          email: '',
          password: '',
		      password_confirmation: ''
        },
        errors: []
      }
    },
    methods: {              
        register() {
          authService.register(this.user)
          .then(response=> {
          this.login(this.user.email, this.user.password)           
          }).catch(error => {this.errors = error.response.data.errors})
        },

        login(email, password) {
          authService.login(email, password)
          .then(() => {
          this.$emit('userAuthenticated')
          this.$router.push({ name: 'galleries' })
          }).catch(error => {this.error = error.response.data.error})    
	    }     	  
    }   
  }
</script>