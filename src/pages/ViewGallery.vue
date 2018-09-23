<template>
  <div class="container mt-4">
    <gallery-details
	    :gallery="gallery" @galleryDeleted="deleteGallery" :user="user"
	  />
    <images-carousel 
      :gallery="gallery"
    />
    <comment-list 
      :user="user" :gallery="gallery" @commentDeleted="setGallery"
    />
    <comment-form 
      v-if="isAuthenticated" :comment="comment" :gallery="gallery" @commentPosted="setGallery" 
    />
  </div>
</template>

<script>
  import GalleryDetails from '../components/GalleryDetails.vue'
  import ImagesCarousel from '../components/ImagesCarousel.vue'
  import CommentForm from '../components/CommentForm.vue'
  import CommentList from '../components/CommentList.vue'
  import { galleries } from '../services/Gallery'
  import { authService } from '../services/Auth'

  export default {
    components: {
      GalleryDetails,
      ImagesCarousel,
      CommentForm,
      CommentList
    },
    
    data() {
      return {
        gallery: {
          title: '',
          description: '',
		      user: {},
		      images: [],
          comments: []
        },
        comment: {},
        user: {},
        isAuthenticated: authService.isAuthenticated() 

	    }
	  },
    
    beforeRouteEnter (to, from, next) {
      authService.getUser()
      .then((response) => {
        next((vm) => {
           vm.user = response.data;
          
        })
       })     
    },
    
    created() {
      if (this.$route.params.id) {
        galleries.get(this.$route.params.id).then(response=>
        (this.gallery=response.data)).catch(err => console.log(err))
      /*  authService.getUser().then(response=>
        (this.user=response.data)).catch(err => console.log(err))*/
      }
    },

    methods: {
        setGallery() {
          this.comment={};          
          galleries.get(this.$route.params.id).then(response=>
          (this.gallery=response.data)).catch(err => console.log(err))
        },

        deleteGallery(id) {
          galleries.delete(id)
         .then(() => {
          this.$router.push({name: 'galleries'})
        })
    }
    }
  }
</script>