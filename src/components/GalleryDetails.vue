<template>
  <div>
    <p>
      <h2>{{ gallery.name }}</h2>
    </p>
    <p>Author: {{ gallery.user.first_name }} {{ gallery.user.last_name }}</p>
    <p>Created: {{ gallery.created_at }}</p>
  </div>
</template>

<script>
  export default {
    props: ['gallery']
  }
</script>

