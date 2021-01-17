const path = require('path')
const fs = require('fs-extra')
const Router = require('koa-router')
const { formatResponse } = require('../middlewares/formatResponse')
const { runFunction } = require('../faas/core')
const { ROOT_PATH, FUNC_OPTIONS_FILE_NAME, FUNC_FILE_NAME } = require('./constants')
const { filterTargetFuncDir } = require('../utils/file')

const execRouter = new Router({ prefix: '/exec' })

execRouter.use(formatResponse)
execRouter.get('/:id', async (ctx, next) => {
  ctx.rawResponse = true // 无需format response

  const { id } = ctx.params

  const funcRootDirPath = path.join(ROOT_PATH, `./func`)
  const funcDirList = await filterTargetFuncDir(funcRootDirPath, { id })

  if (funcDirList.length === 0) {
    throw Error('wrong id!')
  }

  const optionsStr = await fs.readFile(path.join(ROOT_PATH, `./func/${funcDirList[0]}`, FUNC_OPTIONS_FILE_NAME))
  const options = JSON.parse(optionsStr.toString())

  if (options.allowMethod.includes('GET')) {
    const output = await runFunction(ctx, {
      id,
      scriptPath: path.join(ROOT_PATH, `./func/${funcDirList[0]}`, FUNC_FILE_NAME),
      options,
    })
    ctx.body = output
    await next()
  } else {
    ctx.body = 'GET method not support.'
    await next()
  }
})

execRouter.post('/:id', async (ctx, next) => {
  ctx.rawResponse = true // 无需format response

  const { id } = ctx.params

  const funcRootDirPath = path.join(ROOT_PATH, `./func`)
  const funcDirList = await filterTargetFuncDir(funcRootDirPath, { id })

  if (funcDirList.length === 0) {
    throw Error('wrong id!')
  }

  const optionsStr = await fs.readFile(path.join(ROOT_PATH, `./func/${funcDirList[0]}`, FUNC_OPTIONS_FILE_NAME))
  const options = JSON.parse(optionsStr.toString())

  if (options.allowMethod.includes('POST')) {
    const output = await runFunction(ctx, {
      id,
      scriptPath: path.join(ROOT_PATH, `./func/${funcDirList[0]}`, FUNC_FILE_NAME),
      options,
    })
    ctx.body = output
    await next()
  } else {
    ctx.body = 'POST method not support.'
    await next()
  }
})

module.exports = {
  execRouter,
}
