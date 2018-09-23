<template>
  <div>
    <p>
      <h2>{{ gallery.name }}</h2>
    </p>
    <p>Author: 
      <router-link :to="{ name: 'authors-galleries', params: { id: gallery.user.id }}">
        {{ gallery.user.first_name }} {{ gallery.user.last_name }}
      </router-link>
    </p>  
    <p>
      Created: {{ gallery.created_at }}
    </p>
    <p>
      Description: {{ gallery.description }}
    </p>
    <p v-if="checkUser(gallery.user.id)">
      <router-link :to="{ name: 'edit', params: { id: gallery.id }}">
        <button class="btn-info" type="button">Edit</button>
      </router-link>
      <button class="btn-danger" @click="deleteGallery(gallery.id)" type="submit">Delete</button>
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

