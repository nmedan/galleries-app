<template>
  <div class="container mt-4">
    <h2>Galleries</h2>
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
import { authService } from '../services/Auth'
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
           searchTerm: ''
        }
    },

   beforeRouteEnter (to, from, next) {
      galleries.getAll()
      .then((response) => {
        next((vm) => {
           vm.allGalleries = response.data;
        })
       }) 
    },

    created() {   
      galleries.paginate(this.currentPage).then(response=>
      (this.galleries=response.data.data)) 
      authService.getUser().then(response=>
      (this.user=response.data)).catch(err => console.log(err))
    },

    methods: {  
      filterGalleries(term) {
         this.searchTerm = term;
         galleries.filter(this.searchTerm, this.currentPage).
         then(response=>(this.galleries=response.data.data))                
      },
      
      loadMore() {
        this.currentPage++;
        if (!this.searchTerm) { 
           galleries.paginate(this.currentPage).then(response=>
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