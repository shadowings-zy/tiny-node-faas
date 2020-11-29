const PORT = 12000

const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const app = new Koa()
const router = new Router()

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(PORT)
console.log(`tiny-node-faas run in port ${PORT}`)
