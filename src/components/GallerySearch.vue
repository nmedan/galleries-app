<template>
  <div>
   <input type="text" v-model="term"/>
   <button @click="filterGalleries" type="btn-info">Filter</button>
  </div>
</template>

<script>

export default {
    data() {
      return {
        term: ''
      }
    },
    methods: {
        filterGalleries() {
		    console.log(this.term);
            this.$emit('termSearched', this.term);                         
        }
    }
}
</script>