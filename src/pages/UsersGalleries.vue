<template>
  <div class="container mt-4">
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
    
    created() 
    {
	  galleries.getByUser(this.currentPage).then(response=>
      (this.lastPage=response.data.last_page))
      galleries.getByUser(this.currentPage).then(response=>
      (this.galleries=response.data.data))
    },

    methods: { 
      loadMore() {
	    this.currentPage++;
		   if (this.term) {
		     galleries.filterUsersGalleries(this.term, this.currentPage).then(response=>        
		     (this.galleries=this.galleries.concat(response.data.data)))
		   }
		   else  {
             galleries.getByUser(this.currentPage).then(response=>        
		       (this.galleries=this.galleries.concat(response.data.data))
		     )
		   }
      },
	  
	  filterGalleries(term) {
	     this.currentPage = 1;
	     this.term = term;
		 galleries.filterUsersGalleries(term, this.currentPage).then(response=>        
		     (this.lastPage=response.data.last_page)
		 )
         galleries.filterUsersGalleries(term, this.currentPage).then(response=>        
		     (this.galleries=response.data.data)
		 )
	  }
    }
}
</script>