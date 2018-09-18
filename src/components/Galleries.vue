<template>
    <div class="list-group">
       <div v-for="(gallery, index) in galleries" :key="index">
            <p><h4>{{ gallery.name }}</h4></p>
            <p>{{ gallery.description }}</p>
            <p>{{ gallery.createdAt} </p> 
            <div style="float:right">{{ gallery.images[0] }}</div>          
            <hr/>
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