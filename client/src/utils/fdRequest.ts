import axios, { Method } from 'axios'

interface IFormData {
  file: File
  [propName: string]: any
}

const FDRequest = (url: string, data: IFormData) => {
  const formData = new FormData()

  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      formData.append(key, data[key])
    }
  }

  return axios.post(`http://localhost:9583${url}`, formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export default FDRequest
