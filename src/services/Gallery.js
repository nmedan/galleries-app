import axios from 'axios'

export default class Galleries {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  getAll() {
    return axios.get('galleries?filter={"include":["images"]}')
  }

  get(id) {
    return axios.get(`galleries/${id}?filter={"include":["comments"]}`);
  }

  getByAuthor(id) {
    return axios.get(`search/${id}?filter={"include":["images"]}`);
  }

  getByUser() {
    return axios.get('my-galleries');
  }

  add(gallery) {
    return axios.post('galleries', gallery)
  }

  addComment(id, comment) {
    return axios.post(`galleries/${id}/comments`, comment);
  }
}

export const galleries = new Galleries()