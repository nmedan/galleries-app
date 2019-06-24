<template>
  <div class="container mt-4">
    <h2>Galleries</h2>
	<gallery-search
	  @termSearched="filterGalleries"
	/>
    <gallery-list
      :galleries="galleries"
	  :currentPage="currentPage"
	  :lastPage="lastPage"
      @moreGalleriesLoaded="loadMore"
    />
  </div>
</template>

<script>
import { galleries } from '../services/Gallery'
import { authService } from '../services/Auth'
import GalleryList from '../components/GalleryList.vue'
import GallerySearch from '../components/GallerySearch.vue'
export default {
    components: {
      GalleryList,
	  GallerySearch
    },
    data() {
        return {
           galleries: [],
           lastPage: 1,
		   currentPage: 1,
		   term: ''
        }
    },

    created() { 
      galleries.getAll(this.currentPage).then(response=>
      (this.lastPage=response.data.last_page))	
      galleries.getAll(this.currentPage).then(response=>
      (this.galleries=response.data.data)) 
      authService.getUser().then(response=>
      (this.user=response.data)).catch(err => console.log(err))
	
    },

    methods: {      
      loadMore() { 	       
	       this.currentPage++;
		   if (this.term) {
		     galleries.filterAllGalleries(this.term, this.currentPage).then(response=>        
		     (this.galleries=this.galleries.concat(response.data.data)))
		   }
		   else  {
             galleries.getAll(this.currentPage).then(response=>        
		       (this.galleries=this.galleries.concat(response.data.data))
		     )
		   }
      },

      filterGalleries(term) {
	     this.currentPage = 1;
	     this.term = term;
		 galleries.filterAllGalleries(term, this.currentPage).then(response=>        
		     (this.lastPage=response.data.last_page)
		 )
         galleries.filterAllGalleries(term, this.currentPage).then(response=>        
		     (this.galleries=response.data.data)
		 )
      }	  
   }
	 
}
</script>