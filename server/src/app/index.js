const path = require('path')
const Koa = require('koa')
const KoaBody = require('koa-body')
const KoaStatic = require('koa-static')
const router = require('../router')

const app = new Koa()

app.use(async (ctx, next) => {
  // 设置语序请求源
  ctx.set('Access-Control-Allow-Origin', '*')
  // 处理OPTIONS请求
  if (ctx.request.methods === 'OPTIONS') {
    ctx.body = '请求测试成功'
  } else {
    await next()
  }
})

/** 设置上传文件 */
app.use(
  KoaBody({
    multipart: true,
    formidable: {
      // uploadDir: path.join(__dirname, '../upload'),
      keepExtensions: true
    }
  })
)

/** 设置静态资源文件夹 */
app.use(KoaStatic(path.join(__dirname, '../upload')))

/** 注册路由 */
app.use(router.routes()).use(router.allowedMethods())

module.exports = app
