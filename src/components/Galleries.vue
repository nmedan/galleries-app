<template>
  <div class="container mt-4">
    <h2>Galleries</h2>   
    <div class="list-group">
      <div v-for="(gallery, index) in galleries" :key="index">
            <div style="display:inline-block; padding-right:30px;"><img :src="gallery.images[0].image_url"  /></div>
            <div style="display:inline-block; vertical-align:middle">
            <p><h4>{{ gallery.name }}</h4></p>
            <p>{{ gallery.description }}</p>                     
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

    beforeRouteEnter (to, from, next) {
      galleries.getAll()
      .then((response) => {
        next((vm) => {
          vm.galleries = response.data
        })
      })
    }
}
</script>