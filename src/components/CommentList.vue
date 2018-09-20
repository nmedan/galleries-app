<template>
  <div class="container mt-4">
    <h2>Comments</h2>   
    <div class="list-group">
      <div v-for="(comment, index) in gallery.comments" :key="index">
            <p>{{ comment.content }}</p>                   
            <p> {{ comment.created_at }} by {{ comment.user.first_name }} {{ comment.user.last_name }}</p>    
            <hr />
       </div>
	   
    </div>
  </div>
</template>

<script>
export default {
    props: {
	  gallery: {}
	}
}
</script>