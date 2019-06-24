<template>
  <div class="container mt-4">
    <h2> {{ heading }}</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group row">
        <label for="name" class="col-2 col-form-label">Name</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" placeholder="Name" v-model="gallery.name" required minlength="2" maxlength="255">
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
      <button class="btn-success" type="button" @click="moveUp(image)">Move up</button>
      <button class="btn-danger" type="button" @click="moveDown(image)">Move down</button>
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
        <div>
          <button class="btn btn-danger" type="button" @click="cancel">Cancel</button>        
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
        errors: []
      }
    },
    
    created() {
      if (this.$route.params.id) {
        galleries.edit(this.$route.params.id).then(response=>
        (this.gallery=response.data)).catch(err => console.log(err))
      }
    },
    
    methods: { 
    
     validURL(str) {
       var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
       if(!regex .test(str)) {
          return false;
       } else {
          return true;
       }
     },
     
     isImageURL(str) {
       var regex = /^(http)?s?:?(\/\/[^\']*\.(?:png|jpg|jpeg))/;
       if(!regex .test(str)) {
          return false;
       } else {
          return true;
       }
     },
     
     validated() 
     {
       console.log(this.gallery.name);
       if (!this.gallery.name) {
         console.log(this.gallery.name);
         alert('You must enter gallery name');
         return false;
       } 
       else if (this.gallery.name.length<2 || this.gallery.name.length>255) {
         alert('The name must have between 2 and 255 characters.');
         return false;
       }
       else if (this.gallery.description.length>1000) {
         alert('The text for description field is too long');
         return false;
       }
       for (let i = 0; i<this.gallery.images.length; i++) {
          if (!this.gallery.images[i].image_url) {
             alert('Url field cannot be empty'); 
             return false;
             break;
          }
          else if (!this.validURL(this.gallery.images[i].image_url)) {
             alert('Url is not valid');
             return false;
             break
          }
          else if (!this.isImageURL(this.gallery.images[i].image_url)) {
             alert('This is not image url.');  
             return false;
             break;
          }
       }
       return true;
     },
     
	   onSubmit() {
       if (this.validated()) {
         if (!this.$route.params.id) {
	         this.addGallery(this.gallery);
         }
         else {
           this.editGallery(this.gallery);
         }
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
        })
	   },
     
     editGallery(gallery) {
        galleries.update(this.$route.params.id, gallery)
        .then(() => {		  
		    this.$router.push({ name: 'view-gallery' })         
        }).catch(error => {this.errors = error.response.data.errors})
     },

     moveUp(image) {
        let index = this.gallery.images.indexOf(image);
        if (index > 0) {
          this.gallery.images.splice(index, 1);
          this.gallery.images.splice(index-1, 0, image);       
        }
     },
     
     moveDown(image) {
        let index = this.gallery.images.indexOf(image);
        if (index < this.gallery.images.length-1) {
          this.gallery.images.splice(index, 1);
          this.gallery.images.splice(index+1, 0, image);       
        }
     },
        
     cancel() {
        if (this.$route.params.id) {
          this.$router.push({ name: 'view-gallery' });
        }
        else {
          this.$router.push({ name: 'galleries' });
        }
     }
      
     
    },
    
    computed: {
      heading() {
        if (!this.$route.params.id) {
          return 'New gallery';
        }
        else {
          return 'Edit gallery';
        }
      }
    }
  }
</script>