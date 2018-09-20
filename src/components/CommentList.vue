<template>
  <div class="container mt-4">
    <h2>Comments</h2>   
    <div class="list-group">
      <div v-for="(comment, index) in gallery.comments" :key="index">
            <p>{{ comment.content }}</p>                   
            <p>  
              {{ comment.created_at }} by {{ comment.user.first_name }} {{ comment.user.last_name }}
              <button class="btn-danger" @click="deleteComment(comment.id)" v-if="checkUser(comment.user.id)" type="submit">Delete</button>
            </p>    
            <hr />
       </div>	   
    </div>
  </div>
</template>

<script>
import { galleries } from '../services/Gallery'

export default {
    props: {
	    gallery: {},
      user: {}
	  },
    
    methods: {
      deleteComment(comment_id) {
        if (confirm('Do you really want to delete this comment?')) {
          galleries.deleteComment(comment_id).
          then(() => {
            this.$emit('commentDeleted')
          })
        }
      },

      checkUser(id) {
        return this.user.id === id;
      }
    }
}
</script>