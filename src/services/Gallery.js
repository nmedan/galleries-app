import axios from 'axios'

export default class Galleries {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  getAll() {
    return axios.get('galleries')
  }

  get(id) {
    return axios.get(`galleries/${id}`);
  }

  edit(id) {
      return axios.get(`galleries/edit/${id}`);
  }

  getByAuthor(id) {
    return axios.get(`search/${id}`);
  }

  getByUser() {
    return axios.get(`my-galleries`);
  }

  add(gallery) {
    return axios.post('galleries', gallery);
  }

  update(id, gallery) {
    return axios.put(`galleries/${id}`, gallery);
  }

  delete(id) {
    return axios.delete(`galleries/${id}`);    
  }

  filter(term) {
    return axios.get(`filter/${term}`);
  }

  addComment(id, comment) {
    return axios.post(`galleries/${id}/comments`, comment);
  }

  deleteComment(id) {
    return axios.delete(`delete-comment/${id}`);
  }
}

export const galleries = new Galleries()