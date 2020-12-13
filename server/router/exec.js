const path = require('path')
const fs = require('fs-extra')
const Router = require('koa-router')
const { runFunction } = require('../faas/core')
const { ROOT_PATH } = require('./constants')
const { filterTargetFuncDir } = require('../utils/file')

const execRouter = new Router({ prefix: '/exec' })

execRouter.post('/:id', async (ctx, next) => {
  const { id } = ctx.params

  const funcRootDirPath = path.join(ROOT_PATH, `./func`)
  const funcDirList = await filterTargetFuncDir(funcRootDirPath, `${id}|`)
  if (funcDirList.length === 0) {
    throw Error('wrong id!')
  }

  const output = await runFunction(ctx, {
    id,
    scriptPath: path.join(ROOT_PATH, `./func/${funcDirList[0]}/func.js`),
  })
  ctx.body = output
  await next()
})

module.exports = {
  execRouter,
}
