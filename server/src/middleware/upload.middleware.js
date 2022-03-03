const fs = require('fs')
const path = require('path')

// 判断文件是否存在
const checkFileExist = async (ctx, next) => {
  const { name } = ctx.request.body
  const filePath = path.join(__dirname, '../upload/' + name)
  const isExist = fs.existsSync(filePath)

  if (isExist) {
    ctx.body = {
      code: 0,
      message: '文件已存在，无需再次上传'
    }
    return
  }

  await next()
}

// 写入文件
const saveStream = async (ctx, next) => {
  const { file } = ctx.request.files
  const { name } = ctx.request.body

  const reader = fs.createReadStream(file.path)
  const targetPath = path.join(__dirname, '../upload/' + name)

  const stream = fs.createWriteStream(targetPath)
  reader.pipe(stream)

  await next()
}

module.exports = {
  checkFileExist,
  saveStream
}
