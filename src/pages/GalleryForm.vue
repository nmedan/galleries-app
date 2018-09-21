<template>
  <div class="container mt-4">
    <h2>New gallery</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group row">
        <label for="name" class="col-2 col-form-label">Name</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" placeholder="Name" v-model="gallery.name">
          </div>
		  <p class="text-danger" v-if="errors.name">{{ errors.name[0] }}</p>
        </div>		
      </div>
      <div class="form-group row">
        <label for="description" class="col-2 col-form-label">Description</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" placeholder="Description" v-model="gallery.description">
          </div>
		  <p class="text-danger" v-if="errors.description">{{ errors.description[0] }}</p>
        </div>		
      </div>
	  <div v-for="(image, index) in gallery.images" :key="index" class="form-group row">
	    <div class="col-2">&nbsp</div>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" placeholder="Url" v-model="gallery.images[index].image_url">
          </div>
        </div>	
		<div v-if="gallery.images.length>1" class="col-6">
		  <button class="btn-danger" type="button" @click="deleteUrl(index)">Remove</button>
		</div>
      </div>
	  <div class="form-group row">
	    <div class="col-2">&nbsp</div>
        <div class="col-4">
          <button type="button" @click="addUrl" class="btn-success">Add url</button>
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
		    images: [{image_url: ''}]
        },
        errors: [],	
      }
    },
    
    created() {
      if (this.$route.params.id) {
        galleries.edit(this.$route.params.id).then(response=>
        (this.gallery=response.data)).catch(err => console.log(err))
      }
    },
    
    methods: { 
	   onSubmit() {
       if (!this.$route.params.id) {
	       this.addGallery(this.gallery);
       }
       else {
         this.editGallery(this.gallery);
       }
	   },

	   addUrl() {
	     this.gallery.images.push({});
	   },

	   deleteUrl(index) {
         this.gallery.images.splice(index, 1);
	   },

	   addGallery(gallery) {
	       galleries.add(gallery)
         .then(() => {		  
		      this.$router.push({ name: 'galleries' })         
          }).catch(error => {this.errors = error.response.data.errors})
	   },
     
     editGallery(gallery) {
        galleries.update(this.$route.params.id, gallery)
        .then(() => {		  
		    this.$router.push({ name: 'galleries' })         
        }).catch(error => {this.errors = error.response.data.errors})
     }
    }   
  }
</script>