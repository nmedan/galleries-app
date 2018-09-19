<template>
  <div class="container mt-4">
    <GalleryDetails 
	  :gallery="gallery"
	/>
  </div>
</template>

<script>
  import GalleryDetails from '../components/GalleryDetails.vue'
  import { galleries } from '../services/Gallery'

  export default {
    components: {
      GalleryDetails
    },
    
    data() {
      return {
        gallery: {
          title: '',
          description: '',
		  user: {},
		  images:[],
        }
	  }
	},
    
    created() {
      if (this.$route.params.id) {
        galleries.get(this.$route.params.id).then(response=>
        (this.gallery=response.data)).catch(err => console.log(err))
      }
    },

    methods: {
         
    }
  }
</script>