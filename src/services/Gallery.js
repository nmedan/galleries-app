import axios from 'axios'

export default class Galleries {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  getAll(currentPage) {
      return axios.get(`galleries/index/${currentPage}`);
  }
  
  filterAllGalleries(term, currentPage) {
      return axios.get(`galleries/index/${currentPage}/${term}`);
  }

  get(id) {
    return axios.get(`galleries/details/${id}`);
  }

  edit(id) {
      return axios.get(`edit/${id}`);
  }
 
  getByAuthor(id, currentPage) {
    return axios.get(`authors/${id}/${currentPage}`)
  }
  
  filterAuthorsGalleries(id, term, currentPage) {
    return axios.get(`authors/${id}/${currentPage}/${term}`)
  }

  getByUser(currentPage) {
    return axios.get(`my-galleries/${currentPage}`);
  }
  
  filterUsersGalleries(term, currentPage) {
    return axios.get(`my-galleries/${currentPage}/${term}`);
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

  addComment(id, comment) {
    return axios.post(`galleries/${id}/comments`, comment);
  }

  deleteComment(id) {
    return axios.delete(`galleries/${id}/comments`);
  }
}

export const galleries = new Galleries()