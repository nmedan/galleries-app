import axios from 'axios'

export default class Posts {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  getAll() {
    return axios.get('posts?filter={"include":["comments"]}')
  }

  get(id) {
      return axios.get(`posts/${id}?filter={"include":["comments"]}`);
  }

  add(post) {
    return axios.post('posts', post);
  }

  edit(post) {
    return axios.put(`posts/${post.id}`, post);
  }

  delete(id) {
      return axios.delete(`posts/${id}`);
  }

  addComment(comment, id) {
      return axios.post(`posts/${id}/comments`, comment);
  }

}

export const posts = new Posts()