<template>
  <div>
    <p>
      <h2>{{ gallery.name }}</h2>
    </p>
    <p>Author: {{ gallery.user.first_name }} {{ gallery.user.last_name }}</p>
    <p>
      Created: {{ gallery.created_at }}
      <button class="btn-info" v-if="gallery.user.id===user.id" type="submit">Edit</button> 
      <button class="btn-danger" @click="deleteGallery(gallery.id)" v-if="checkUser(gallery.user.id)" type="submit">Delete</button>  
    </p>   
  </div>
</template>

<script>
  export default {
    props: {
      gallery: {},
      user: {}
    },

    methods: {
      deleteGallery(id) {
        if (confirm('Do you really want to delete this gallery?')) {
          this.$emit('galleryDeleted', id)
        }
      },

      checkUser(id) {
        return this.user.id === id;
      }
    }
  }
</script>

