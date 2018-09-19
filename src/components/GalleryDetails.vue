<template>
  <div>
    <p>Name: {{ gallery.name }}</h4></p>	
	      <div v-for="(image, index) in gallery.images" :key="index">
		    <img :src="image.image_url" />
		  </div>

	
    <hr/>
  </div>
</template>

<script>
  export default {
    props: ['gallery']
  }
</script>

