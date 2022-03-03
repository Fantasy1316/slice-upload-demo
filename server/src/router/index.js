const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const {
  checkFileExist,
  saveStream
} = require('../middleware/upload.middleware')

const router = new Router()

router.post('/upload', checkFileExist, saveStream, (ctx) => {
  const { file } = ctx.request.files

  if (file) {
    ctx.body = {
      code: 0,
      data: {
        url: path.basename(file.path)
      },
      message: '图片上传成功'
    }
  } else {
    console.error('图片上传失败：', file)
    ctx.app.emit('error', uploadFileError, ctx)
  }
})

router.post('/file_url', (ctx) => {
  const { name, type, total } = ctx.request.body
  const fileType = type.split('/')[1]
  const filePath = path.join(__dirname, '../upload/' + name + '.' + fileType)
  const fileIsExist = fs.existsSync(filePath)

  if (fileIsExist) {
    ctx.body = {
      code: 0,
      data: {
        url: name + '.' + fileType
      },
      message: '获取文件链接成功'
    }
  } else {
    // 合并文件流 TODO
    const chunkPath = []
    for (let i = 1; i <= total; i++) {
      const p = path.join(__dirname, `../upload/${name}-${i}`)
      chunkPath.push(p)
    }

    const targetStream = fs.createWriteStream(filePath)

    const mergeStaram = (arrayBuffer, mergePath) => {
      const readPath = arrayBuffer.shift()
      const originStream = fs.createReadStream(readPath)
      originStream.pipe(targetStream, { end: false })
      originStream.on('end', () => {
        fs.unlinkSync(readPath)
        if (arrayBuffer.length > 0) {
          mergeStaram(arrayBuffer, mergePath)
        }
      })
    }
    mergeStaram(chunkPath, filePath)

    ctx.body = {
      code: 0,
      data: {
        url: `${name}.${fileType}`
      },
      message: '获取文件链接成功'
    }
  }
})

module.exports = router
