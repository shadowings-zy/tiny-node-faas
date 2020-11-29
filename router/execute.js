const Router = require('koa-router')
const { runFunction } = require('../faas/core')

const execRouter = new Router({ prefix: '/exec' })

execRouter.post('/:funcPath ', async (ctx) => {
  const { funcPath } = ctx.params
  const output = await runFunction(ctx, {
    id: funcPath,
    scriptPath: path.join(__dirname, `./func/${funcPath}/func.js`),
  })
  ctx.body = '新闻详情'
})
