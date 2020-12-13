const path = require('path')
const fs = require('fs-extra')
const Router = require('koa-router')
const cryptoRandomString = require('crypto-random-string')
const { FUNC_FILE_NAME, FUNC_OPTIONS_FILE_NAME, FUNC_ID_LENGHT, ROOT_PATH } = require('./constants')
const { filterTargetFuncDir } = require('../utils/file')

const funcRouter = new Router({ prefix: '/func' })

funcRouter.get('/', async (ctx, next) => {
  const { author, id } = ctx.request.query

  const funcRootDirPath = path.join(ROOT_PATH, `./func`)
  const funcDirList = await filterTargetFuncDir(funcRootDirPath, id ? `${id}|${author}` : author)
  const targetFuncList = await Promise.all(
    funcDirList.map(async (item) => {
      const funcInfo = { id: item.split('|')[0], content: '' }
      const funcFilePath = path.join(funcRootDirPath, item, FUNC_FILE_NAME)
      const funcOptionsPath = path.join(funcRootDirPath, item, FUNC_OPTIONS_FILE_NAME)

      const funcContentBuffer = await fs.readFile(funcFilePath)
      funcInfo.content = funcContentBuffer.toString()

      if (fs.pathExists(funcOptionsPath)) {
        const funcOptionsBuffer = await fs.readFile(funcOptionsPath)
        funcInfo.options = funcOptionsBuffer.toString()
      }

      return funcInfo
    })
  )

  ctx.body = {
    funcs: targetFuncList,
  }
  await next()
})

funcRouter.post('/add', async (ctx, next) => {
  const { author, func, options } = ctx.request.body

  const id = cryptoRandomString({ length: FUNC_ID_LENGHT })

  const funcDirStorePath = path.join(ROOT_PATH, `./func/${id}|${author}`)
  const funcFileStorePath = path.join(funcDirStorePath, FUNC_FILE_NAME)
  const funcOptionsStorePath = path.join(funcDirStorePath, FUNC_OPTIONS_FILE_NAME)

  await fs.ensureDir(funcDirStorePath)
  await fs.writeFile(funcFileStorePath, func)
  if (options) {
    await fs.writeFile(funcOptionsStorePath, options)
  }

  ctx.body = { id }
  await next()
})

funcRouter.put('/update', async (ctx, next) => {
  const { author, id, func, options } = ctx.request.body

  const funcDirStorePath = path.join(ROOT_PATH, `./func/${id}|${author}`)
  const isValidFuncPath = await fs.pathExists(funcDirStorePath)
  if (!isValidFuncPath) {
    throw Error('invalid function id!')
  }

  const funcFileStorePath = path.join(funcDirStorePath, FUNC_FILE_NAME)
  const funcOptionsStorePath = path.join(funcDirStorePath, FUNC_OPTIONS_FILE_NAME)

  await fs.ensureDir(funcDirStorePath)
  await fs.writeFile(funcFileStorePath, func)
  if (options) {
    await fs.writeFile(funcOptionsStorePath, options)
  }

  await next()
})

module.exports = {
  funcRouter,
}
