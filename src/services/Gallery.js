import axios from 'axios'

export default class Galleries {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  getAll() {
      return axios.get('galleries');
  }

  get(id) {
    return axios.get(`galleries/${id}`);
  }

  edit(id) {
      return axios.get(`edit/${id}`);
  }

  getByAuthor(id, currentPage) {
    return axios.get(`authors/${id}/${currentPage}`);
  }
 
  getByAuthorAll(id) {
    return axios.get(`authors/${id}`)
  }

  getByUser(currentPage) {
    return axios.get(`my-galleries/${currentPage}`);
  }

  getByUserAll() {
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

  filter(term, currentPage) {
    return axios.get(`filter/${term}/${currentPage}`);
  }

  paginate(currentPage) {
      return axios.get(`paginate/${currentPage}`);
  }

  addComment(id, comment) {
    return axios.post(`galleries/${id}/comments`, comment);
  }

  deleteComment(id) {
    return axios.delete(`galleries/${id}/comments`);
  }
}

export const galleries = new Galleries()