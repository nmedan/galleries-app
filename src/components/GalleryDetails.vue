<template>
  <div>
    <p>
      <h2>{{ gallery.name }}</h2>
    </p>
    <p>Author: {{ gallery.user.first_name }} {{ gallery.user.last_name }}</p>
    <p>
      Created: {{ gallery.created_at }}
      <router-link v-if="gallery.user.id===user.id" :to="{ name: 'edit', params: { id: gallery.id }}">
        <button class="btn-info" type="button">Edit</button>
      </router-link>
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

