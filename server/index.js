const PORT = 12000
const STATIC_PATH = './static'

const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const compress = require('koa-compress')
const { checkUrl } = require('./middlewares/checkUrl')
const { baseRouter } = require('./router/base')
const { execRouter } = require('./router/exec')
const { funcRouter } = require('./router/func')
const { async } = require('crypto-random-string')

const app = new Koa()

app.use(checkUrl)
app.use(bodyParser())
app.use(baseRouter.routes())
app.use(baseRouter.allowedMethods())
app.use(execRouter.routes())
app.use(execRouter.allowedMethods())
app.use(funcRouter.routes())
app.use(funcRouter.allowedMethods())
app.use(compress())
app.use(static(path.join(__dirname, STATIC_PATH)))

app.listen(PORT)
console.log(`tiny-node-faas run in port ${PORT}`)
