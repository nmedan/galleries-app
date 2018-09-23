<template>
  <div class="container mt-4">
    <gallery-list
      :galleries="galleries"
      :allGalleries="allGalleries"
      :currentPage="currentPage"
      @moreGalleriesLoaded="loadMore"
      @galleriesFiltered="filterGalleries"
    />
  </div>
</template>

<script>
import GalleryList from '../components/GalleryList.vue'
import { galleries } from '../services/Gallery'

export default {
  components: {
    GalleryList
  },
  data() {
      return {
          galleries: [],
          allGalleries: [],
          currentPage: 1,
          searchTerm: '',
      }
  },

  created() {
    if (this.$route.params.id, this.currentPage) {
      galleries.getByAuthorAll(this.$route.params.id).then(response=>
      (this.allGalleries=response.data)).catch(err => console.log(err))
      galleries.getByAuthor(this.$route.params.id, this.currentPage).then(response=>
      (this.galleries=response.data.data)).catch(err => console.log(err))
    }
  },

  methods: { 
    filterGalleries(term) {
      
    },
      
    loadMore() {
        this.currentPage++;
        if (!this.searchTerm) { 
           galleries.getByAuthor(this.$route.params.id, this.currentPage).then(response=>
           (this.galleries=this.galleries.concat(response.data.data)))
        }
        else {
          galleries.filter(this.searchTerm, this.currentPage).then(response=>
          (this.galleries=this.galleries.concat(response.data.data)))
        }   
    }
  }
}
</script>