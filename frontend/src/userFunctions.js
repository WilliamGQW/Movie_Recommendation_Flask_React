import axios from 'axios';

export const search = query => {
  return axios
    .post('/search', {
      name: query.name
    })
    .then(response => {
      console.log('success')
      //console.log(response.data)
      return response.data
    })
}