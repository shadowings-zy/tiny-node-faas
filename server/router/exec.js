const path = require('path')
const fs = require('fs-extra')
const Router = require('koa-router')
const { runFunction } = require('../faas/core')
const { ROOT_PATH, FUNC_OPTIONS_FILE_NAME, FUNC_FILE_NAME } = require('./constants')
const { filterTargetFuncDir } = require('../utils/file')

const execRouter = new Router({ prefix: '/exec' })

execRouter.post('/:id', async (ctx, next) => {
  const { id } = ctx.params

  const funcRootDirPath = path.join(ROOT_PATH, `./func`)
  const funcDirList = await filterTargetFuncDir(funcRootDirPath, { id })

  if (funcDirList.length === 0) {
    throw Error('wrong id!')
  }

  const options = await fs.readFile(path.join(ROOT_PATH, `./func/${funcDirList[0]}`, FUNC_OPTIONS_FILE_NAME))
  const output = await runFunction(ctx, {
    id,
    scriptPath: path.join(ROOT_PATH, `./func/${funcDirList[0]}`, FUNC_FILE_NAME),
    options: JSON.parse(options.toString())
  })
  ctx.body = output
  await next()
})

module.exports = {
  execRouter,
}
