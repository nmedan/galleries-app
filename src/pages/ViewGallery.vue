<template>
  <div class="container mt-4">
    <GalleryDetails 
	    :gallery="gallery"
	  />
    <ImagesCarousel :gallery="gallery"/>
    <CommentList :gallery="gallery"/>
    <CommentForm :comment="comment" :gallery="gallery" @commentPosted="setGallery"/>
  </div>
</template>

<script>
  import GalleryDetails from '../components/GalleryDetails.vue'
  import ImagesCarousel from '../components/ImagesCarousel.vue'
  import CommentForm from '../components/CommentForm.vue'
  import CommentList from '../components/CommentList.vue'
  import { galleries } from '../services/Gallery'

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
        comment: {}
	    }
	  },
    
    created() {
      if (this.$route.params.id) {
        galleries.get(this.$route.params.id).then(response=>
        (this.gallery=response.data)).catch(err => console.log(err))
      }
    },

    methods: {
        setGallery() {          
          galleries.get(this.$route.params.id).then(response=>
         (this.gallery=response.data)).catch(err => console.log(err))
        }
    }
  }
</script>