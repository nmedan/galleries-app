<template>
 <div>
    <GallerySearch  @termSearched="filterGalleries"/>    
        
    <div v-if="allGalleries.length" class="list-group">
      <div v-for="(gallery, index) in galleries" :key="index">
            <div style="display:inline-block; padding-right:30px;"><img :src="gallery.images[0].image_url" /></div>
            <div style="display:inline-block; vertical-align:middle">
            <p>
              <h4>
                <router-link :to="{ name: 'view-gallery', params: { id: gallery.id }}">
                  {{ gallery.name }}
                </router-link>             
              </h4>
            </p>
            <p>{{ gallery.description }}</p>                     
            <p> {{ gallery.created_at }} 
                by 
                 <router-link :to="{ name: 'authors-galleries', params: { id: gallery.user.id }}">
                 {{ gallery.user.first_name }} {{ gallery.user.last_name }} 
                </router-link>         
            </p>
            </div>
            <hr/>
       </div>
    </div>
	<div v-else>
	  No galleries
	</div>
    <button v-if="toLoadMore" type="button" @click="loadMore" class="btn">Load more</button>
  </div>
</template>

<style>
  img {
    height:100px;
    width:200px;
  }
</style>

<script>
  import GallerySearch from '../components/GallerySearch.vue'
  export default {
    props: {
	  galleries: Array,
	  allGalleries: Array,
	  currentPage: Number
	},

	components: {
	  GallerySearch
	},

	methods: {
	  loadMore() {
	    this.$emit('moreGalleriesLoaded');
	  },

	  filterGalleries(term) {
	    this.$emit('galleriesFiltered', term);
	  }
	   
	},

	computed: {
      toLoadMore() {
        return Math.ceil(this.allGalleries.length/10) > this.currentPage;
      }
	}
  }
</script>