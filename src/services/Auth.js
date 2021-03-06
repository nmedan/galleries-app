import axios from 'axios'

export default class AuthService {

  constructor() {
    this.setAxiosDefaultAuthorizationHeader();
  }

  login(email, password) {
	console.log('Nemanja')
    return axios.post('http://127.0.0.1:8000/api/auth/login', {
      email, password
    }).then(data => {
      window.localStorage.setItem('loginToken', data.data.access_token)
      this.setAxiosDefaultAuthorizationHeader()
    })
  }

  setAxiosDefaultAuthorizationHeader() {
	console.log('Nemanja');
    const TOKEN = window.localStorage.getItem('loginToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${TOKEN}`
  }

  logout() {
    window.localStorage.removeItem('loginToken')
    delete axios.defaults.headers.common['Authorization']
  }

  register(user) {
    return axios.post('http://localhost:8000/api/auth/register', user);
  }

  isAuthenticated() {
    return !!window.localStorage.getItem('loginToken')
  }

  getUser() {
    return axios.post('http://localhost:8000/api/auth/me'); 
  }
}

export const authService = new AuthService()