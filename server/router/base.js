const Router = require('koa-router')
const { formatResponse } = require('../middlewares/formatResponse')
const baseRouter = new Router()

baseRouter.use(formatResponse)
baseRouter.get('/', async (ctx) => {
  ctx.body = 'welcome to tiny node faas!'
})

module.exports = {
  baseRouter
}