const app = require('./app')

const { APP_PORT } = require('./config/config.default')

app.listen(APP_PORT, () => {
  console.log(`Start Sucess. Server running at port ${APP_PORT}`)
})
