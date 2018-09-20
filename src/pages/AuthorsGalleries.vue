<template>
  <div class="container mt-4">
    <h2>Galleries</h2>   
    <div class="list-group">
      <div v-for="(gallery, index) in galleries" :key="index">
            <div style="display:inline-block; padding-right:30px;"><img :src="gallery.images[0].image_url" />{{ gallery.images.length }}</div>
            <div style="display:inline-block; vertical-align:middle">
            <p>
              <h4>
                <router-link :to="{ name: 'view-gallery', params: { id: gallery.id }}">
                  {{ gallery.name }}
                </router-link>             
              </h4>
            </p>
            <p> {{ gallery.description }}</p>                     
            <p> {{ gallery.created_at }} by {{ gallery.user.first_name }} {{ gallery.user.last_name }}</p>    
            </div>
            <hr/>
       </div>
    </div>
  </div>
</template>

<script>
import { galleries } from '../services/Gallery'

export default {
    data() {
        return {
           galleries: []
        }
    },

    created() {
      if (this.$route.params.id) {
        galleries.getByAuthor(this.$route.params.id).then(response=>
        (this.galleries=response.data)).catch(err => console.log(err))
      }
    },
}
</script>