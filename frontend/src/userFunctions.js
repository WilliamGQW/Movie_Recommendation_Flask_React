import axios from 'axios';

export const search = query => {
  return axios
    .get('/search', {
      params : { //请求参数
        name: query.name
      }})
    .then(response => {
      console.log('success')
      //console.log(response)
      return response.data
    })
}

export const login = user => {
  return axios
      .post('/login', {
          email: user.email,
          password: user.password
      })
      .then(response => {
          localStorage.setItem('usertoken', response.data)
          return response.data
      })
      .catch(err => {
          console.log(err)
      })
}

export const register = user => {
  return axios
      .post('/register', {
          email: user.email,
          password: user.password
      })
      .then(response => {
          //localStorage.setItem('usertoken', response.data)
          window.alert("Successfullt registered!")
          return response.data
      })
      .catch(err => {
          window.alert("username or email already exists")
          console.log(err)
      })
}