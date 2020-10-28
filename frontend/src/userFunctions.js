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