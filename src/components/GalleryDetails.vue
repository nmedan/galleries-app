<template>
  <div>
    <p>Name: {{ gallery.name }}</h4></p>	
	      
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img class="d-block w-100" :src="gallery.images[0].image_url">
        </div>
        <div class="carousel-item" v-for="(image, index) in gallery.images" :key="index" v-if="index!==0">
          <img class="d-block w-100" :src="image.image_url">
        </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
         <span class="carousel-control-next-icon" aria-hidden="true"></span>
         <span class="sr-only">Next</span>
      </a>
      </div>
    </div>	
    <hr/>
  </div>
</template>

<script>
 /* $(document).ready(function() {
            $('#carouselExampleControls').carousel({
                interval:   1000
            });
        });*/
  export default {
    props: ['gallery']
  }
</script>

