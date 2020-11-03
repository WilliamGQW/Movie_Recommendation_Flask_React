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

export const getMovieInfo = query => {
  return axios
    .get('/getMovieInfo', {
      params : { //请求参数
        mvId: query.mvId
      }})
    .then(response => {
      console.log('success')
      //console.log(response)
      return response.data
    })
}

export const checkUserFav = query => {
  return axios
    .get('/checkUserFav', {
      params : { //请求参数
        email: query.email,
        mvId: query.mvId
      }})
    .then(response => {
      console.log('success')
      //console.log(response)
      return response.data
    }).catch(error => {
      return error
    })
}

export const addToFav = like => {
  return axios
      .post('/addToFav', {
          email: like.email,
          mvId: like.mvId
      })
      .then(response => {
          console.log('Successfully added to Fav List')
          return response.data
      })
}

export const deleteFromFav = like => {
  return axios
      .delete('/deleteFromFav', {
          email: like.email,
          mvId: like.mvId
      })
      .then(response => {
          console.log('Successfully delete from Fav List')
          return response.data
      })
}