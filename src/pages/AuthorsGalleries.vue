<template>
  <div class="container mt-4">
    <gallery-search
	  @termSearched="filterGalleries"
	/>
    <gallery-list
      :galleries="galleries"
	  :lastPage="lastPage"
	  :currentPage="currentPage"
      @moreGalleriesLoaded="loadMore"
    />
  </div>
</template>

<script>
import GalleryList from '../components/GalleryList.vue'
import GallerySearch from '../components/GallerySearch.vue'
import { galleries } from '../services/Gallery'

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
    if (this.$route.params.id, this.currentPage) {
      galleries.getByAuthor(this.$route.params.id, this.currentPage).then(response=>
      (this.lastPage=response.data.last_page)).catch(err => console.log(err))
      galleries.getByAuthor(this.$route.params.id, this.currentPage).then(response=>
      (this.galleries=response.data.data)).catch(err => console.log(err))
    }
  },

  methods: { 
    loadMore() { 
	     this.currentPage++;
	     if (this.term) {
		     galleries.filterAuthorsGalleries(this.$route.params.id, this.term, this.currentPage).then(response=>        
		     (this.galleries=this.galleries.concat(response.data.data)))
		   }
		   else  {
             galleries.getByAuthor(this.$route.params.id, this.currentPage).then(response=>        
		       (this.galleries=this.galleries.concat(response.data.data))
		     )
		   }
        
    },
	
	filterGalleries(term) {
	     this.currentPage = 1;
	     this.term = term;
		 galleries.filterAuthorsGalleries(this.$route.params.id, term, this.currentPage).then(response=>        
		     (this.lastPage=response.data.last_page)
		 )
         galleries.filterAuthorsGalleries(this.$route.params.id, term, this.currentPage).then(response=>        
		     (this.galleries=response.data.data)
		 )
    }
  }
}
</script>