const PORT = 12000
const STATIC_PATH = './static'

const path = require('path')
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const static = require('koa-static')
const { formatResponse } = require('./middlewares/formatResponse')
const { baseRouter } = require('./router/base')
const { execRouter } = require('./router/exec')
const { funcRouter } = require('./router/func')

const app = new Koa()

app.use(static(path.join(__dirname, STATIC_PATH)))
app.use(bodyParser())
app.use(formatResponse)
app.use(baseRouter.routes())
app.use(baseRouter.allowedMethods())
app.use(execRouter.routes())
app.use(execRouter.allowedMethods())
app.use(funcRouter.routes())
app.use(funcRouter.allowedMethods())

app.listen(PORT)
console.log(`tiny-node-faas run in port ${PORT}`)
