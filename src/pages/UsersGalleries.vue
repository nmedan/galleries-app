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
import { galleries } from '../services/Gallery'
import GalleryList from '../components/GalleryList.vue'
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

    beforeRouteEnter (to, from, next) {
      galleries.getByUserAll()
      .then((response) => {
        next((vm) => {
          vm.allGalleries = response.data
        })
      })
    },
    
    created() 
    {
      galleries.getByUser(this.currentPage).then(response=>
      (this.galleries=this.galleries.concat(response.data.data)))
    },

    methods: { 
      filterGalleries(term) {
         
      },
      
      loadMore() {
        this.currentPage++;
        if (!this.searchTerm) { 
           galleries.getByUser(this.currentPage).then(response=>
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