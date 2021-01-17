const path = require('path')
const fs = require('fs-extra')
const Router = require('koa-router')
const cryptoRandomString = require('crypto-random-string')
const { formatResponse } = require('../middlewares/formatResponse')
const { FUNC_FILE_NAME, FUNC_OPTIONS_FILE_NAME, FUNC_ID_LENGHT, ROOT_PATH } = require('./constants')
const { DEFAULT_FUNCTION_EXEC_OPTIONS } = require('../faas/constants')
const { filterTargetFuncDir, getFuncBasicInfo } = require('../utils/file')

const funcRouter = new Router({ prefix: '/func' })

funcRouter.use(formatResponse)
funcRouter.get('/', async (ctx, next) => {
  const { namespace, author, id } = ctx.request.query

  const funcRootDirPath = path.join(ROOT_PATH, `./func`)
  const funcDirList = await filterTargetFuncDir(funcRootDirPath, { namespace, author, id })
  const targetFuncList = await Promise.all(
    funcDirList.map(async (item) => {
      const funcInfo = getFuncBasicInfo(item)
      const funcFilePath = path.join(funcRootDirPath, item, FUNC_FILE_NAME)
      const funcOptionsPath = path.join(funcRootDirPath, item, FUNC_OPTIONS_FILE_NAME)

      const funcContentBuffer = await fs.readFile(funcFilePath)
      funcInfo.content = funcContentBuffer.toString()

      if (fs.pathExists(funcOptionsPath)) {
        const funcOptionsBuffer = await fs.readFile(funcOptionsPath)
        funcInfo.options = JSON.parse(funcOptionsBuffer.toString())
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
  const { namespace, author, func, options } = ctx.request.body

  const id = cryptoRandomString({ length: FUNC_ID_LENGHT })

  const funcDirStorePath = path.join(ROOT_PATH, `./func/${id}|${author}|${namespace}`)
  const funcFileStorePath = path.join(funcDirStorePath, FUNC_FILE_NAME)
  const funcOptionsStorePath = path.join(funcDirStorePath, FUNC_OPTIONS_FILE_NAME)

  await fs.ensureDir(funcDirStorePath)
  await fs.writeFile(funcFileStorePath, func)
  await fs.writeFile(funcOptionsStorePath, options ? options : JSON.stringify(DEFAULT_FUNCTION_EXEC_OPTIONS))

  ctx.body = { id }
  await next()
})

funcRouter.put('/update', async (ctx, next) => {
  const { id, func, options } = ctx.request.body

  const funcRootDirPath = path.join(ROOT_PATH, `./func`)
  const funcDirList = await filterTargetFuncDir(funcRootDirPath, { id })
  if (funcDirList.length !== 1) {
    throw Error('invalid function id!')
  }
  const funcDirStorePath = path.join(funcRootDirPath, `./${funcDirList[0]}`)
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
