import axios from 'axios'

export default class Galleries {
  constructor () {
    axios.defaults.baseURL = 'http://localhost:8000/api/'
  }

  getAll() {
    return axios.get('galleries?filter={"include":["images"]}')
  }

}

export const galleries = new Galleries()