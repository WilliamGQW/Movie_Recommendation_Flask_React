import axios from 'axios';

export const search = query => {
  return axios
    .get('/search', {
      params: {
        name: query.name
      }
    })
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
      if (!response.Error || !response.error) {
        localStorage.setItem('usertoken', response.data)
        return response.data
      } else {
        console.log(response)
        return response
      }

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
      if (response.success) {
        window.alert("Successfully registered!")
        return response.data
      }
      //localStorage.setItem('usertoken', response.data)
      else {
        console.log(typeof (response))
        return response
      }
    })
    .catch(err => {
      if (user.email === '' || user.password === '') {
        window.alert("Please fill all the fields")
      } else {
        window.alert("This email has already registered.")
      }
    })
}

export const getMovieInfo = query => {
  return axios
    .get('/getMovieInfo', {
      params: {
        mvId: query.mvId
      }
    })
    .then(response => {
      console.log('success')
      //console.log(response)
      return response.data
    })
}

export const checkUserFav = query => {
  return axios
    .get('/checkUserFav', {
      params: {
        email: query.email,
        mvId: query.mvId
      }
    })
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
      mvId: like.mvId,
      title: like.title
    })
    .then(response => {
      console.log('Successfully added to Fav List')
      return response.data
    })
}

export const deleteFromFav = like => {
  return axios
    .post('/deleteFromFav', {
      email: like.email,
      mvId: like.mvId,
      title: like.title
    })
    .then(response => {
      console.log('Successfully delete from Fav List')
      return response.data
    })
}

// export const updateMovComment = req => {
//   return axios
//     .patch('/updateMovComment', {
//       comment: req.comment,
//       email: req.email,
//       mvId: req.mvId
//     })
//     .then(response => {
//       console.log(response)
//       return response.data
//     })
// }

export const updateMovComment = req => {
  return axios
    .patch('/updateMovComment', {
      query: req.query
    })
    .then(response => {
      console.log(response)
      return response.data
    })
}

export const getUserFav = query => {
  return axios
    .get('/getUserFav', {
      params: {
        email: query.email,
      }
    })
    .then(response => {

      console.log('success')
      //console.log(response)
      return response.data


    }).catch(error => {
      return error
    })
}