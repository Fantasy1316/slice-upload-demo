import MD5 from 'js-md5'

/** 创建文件哈希值 */
const createFileHash = (file: File) => {
  return new Promise((resolve, reject) => {
    try {
      const fileReader = new FileReader()
      fileReader.readAsArrayBuffer(file)
      fileReader.onload = (e) => {
        const file = (e.target as any).result
        const hash = MD5(file)

        resolve(hash)
      }
    } catch (error) {
      reject(error)
    }
  })
}

function useFileChunk() {
  const createFileChunk = async (file: File, size?: number) => {
    const hash = await createFileHash(file)

    const chunkFileList = []
    const chunkSize = size || 1024 * 1024 * 1
    let count = 0
    let index = 1

    while (file.size > count) {
      chunkFileList.push({
        file: file.slice(count, count + chunkSize),
        name: `${hash}-${index}`
      })
      count += chunkSize
      index += 1
    }

    return chunkFileList
  }

  return {
    createFileChunk
  }
}

export default useFileChunk
