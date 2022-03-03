import Request from '../utils/request'
import FDRequest from '../utils/fdRequest'

export const uploadFile = (data: any) => {
  return FDRequest('/upload', data)
}

export const getFileUrl = (data: any) => {
  console.log(data)

  return Request('post', '/file_url', data)
}
