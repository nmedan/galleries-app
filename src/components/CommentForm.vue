<template>
  <div class="container mt-4">
    <h2>Post comment</h2>
    <form @submit.prevent="onSubmit">
      <div class="form-group row">
        <label for="content" class="col-2 col-form-label">Content</label>
        <div class="col-4">
          <div class="input-group">
            <input type="text" class="form-control here" v-model="comment.content">
          </div>
           <p class="text-danger" v-if="errors.content">{{ errors.content[0] }}</p>
        </div>
      </div>
      <div class="form-group row">
        <div>
          <button name="submit" type="submit" class="btn btn-success">Submit</button>
        </div>
      </div>      
    </form>
  </div>
</template>

<script>
  import { galleries } from '../services/Gallery'
  
  export default {
    props: {     
      comment: {},
      gallery: {},
      
    },
    
    data () {
      return {
        errors: []
      }
    },
      
    methods: {  
      validated() {
        if (!this.comment.content) {
          alert('You must enter some text');
          return false;
        }
        else if (this.comment.content.length > 1000) {
          alert('The text is too long');
          return false;
        }
        return true;
      },
      
	    onSubmit() {
        if (this.validated()) {
	        this.addComment();
        }
	    },

      addComment() {
        galleries.addComment(this.gallery.id, this.comment).
        then(() => {
          this.$emit('commentPosted')
        }).catch(error => {this.errors = error.response.data.errors});
	    }
    }     
  }
</script>