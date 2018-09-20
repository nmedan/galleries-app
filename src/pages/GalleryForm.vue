<template>
  <div class="container mt-4">
    <h2>New gallery</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group row">
        <label for="name" class="col-2 col-form-label">Name</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" v-model="gallery.name">
          </div>
		  <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
        </div>		
      </div>
      <div class="form-group row">
        <label for="description" class="col-2 col-form-label">Description</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" v-model="gallery.description">
          </div>
		  <p class="text-danger" v-if="errors.description">{{ errors.description[0] }}</p>
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
  import { galleries } from '../services/Gallery'

  export default {
    data() {
      return {
        gallery: {
		  name: '',
          description: '',		  
        },
		image: {
		  url: ''
		},
        errors: []
      }
    },
    methods: { 
	   onSubmit() {
	       this.addGallery(this.gallery);
	   },

	   addGallery(gallery) {
	       galleries.add(gallery)
          .then(() => {
		  console.log(gallery.id);
		  this.$router.push({ name: 'galleries' })
          }).catch(error => {this.error = error.response.data.error})   
	   }
    }   
  }
</script>