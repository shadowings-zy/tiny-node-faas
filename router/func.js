const path = require('path')
const Router = require('koa-router')

const funcRouter = new Router({ prefix: '/func' })

funcRouter.get('/', async (ctx, next) => {
  await next()
})

funcRouter.post('/add', async (ctx, next) => {
  await next()
})

funcRouter.put('/update', async (ctx, next) => {
  await next()
})


module.exports = {
  funcRouter,
}
