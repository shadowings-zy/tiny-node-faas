const Router = require('koa-router')
const baseRouter = new Router()

baseRouter.get('/', async (ctx) => {
  ctx.body = 'welcome to tiny node faas!'
})

module.exports = {
  baseRouter
}