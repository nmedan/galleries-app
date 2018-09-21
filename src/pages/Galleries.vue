<template>
  
  <div class="container mt-4">
    <GallerySearch  @termSearched="filterGalleries"/>
    <h2>Galleries</h2>   
    <div class="list-group">
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
  </div>
</template>

<script>
import { galleries } from '../services/Gallery'
import { authService } from '../services/Auth'
import GallerySearch from '../components/GallerySearch.vue'
export default {
    components: {
      GallerySearch
    },
    data() {
        return {
           user: {},
           galleries: []
        }
    },

    beforeRouteEnter (to, from, next) {
      galleries.getAll()
      .then((response) => {
        next((vm) => {
          vm.galleries = response.data
        })
      })
    },

    created() {
      authService.getUser().then(response=>
      (this.user=response.data)).catch(err => console.log(err))
    },

    methods: { 
      filterGalleries(term) {
        galleries.filter(term).then(response=>
        (this.galleries=response.data)).then(() => {
        this.$router.push({ name: 'filter' })
        }).catch(err => console.log(err))  
        
      }     
    }

    
}
</script>