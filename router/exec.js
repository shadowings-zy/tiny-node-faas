const path = require('path')
const Router = require('koa-router')
const { runFunction } = require('../faas/core')
const { ROOT_PATH } = require('./constants')

const execRouter = new Router({ prefix: '/exec' })

execRouter.post('/:funcPath', async (ctx, next) => {
  const { funcPath } = ctx.params
  const output = await runFunction(ctx, {
    id: funcPath,
    scriptPath: path.join(ROOT_PATH, `./func/${funcPath}/func.js`),
  })
  ctx.body = output

  await next()
})

module.exports = {
  execRouter,
}
