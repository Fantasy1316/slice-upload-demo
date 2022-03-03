import axios, { Method } from 'axios'

const service = axios.create({
  baseURL: 'http://localhost:9583',
  timeout: 10000,
  transformRequest: [
    function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }
  ],
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

const Request = (method: Method, url: string, data: any) => {
  return service({
    method,
    url,
    data
  })
}

export default Request
